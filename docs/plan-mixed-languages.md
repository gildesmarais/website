# Handover: Mixed Languages Handling

## Problem

The site has blog posts in English and German. Language is tracked via a `language` frontmatter field (default `"en"`), but it's only partially surfaced:

- `<html lang>` is set correctly per post — good.
- Archive and blog index show a `[DE]` superscript — functional but minimal.
- **RSS feed includes all posts regardless of language**, with no language signaling. German-only RSS subscribers get mixed content.
- No way for readers to filter the archive by language.
- No visible language note inside a post itself (readers who land on a DE post from a search engine get no heads-up).

## Files Involved

| File                           | Role                                                  |
| ------------------------------ | ----------------------------------------------------- |
| `src/content/config.ts`        | Defines `language` field (default `"en"`)             |
| `src/layouts/BaseLayout.astro` | Accepts `language` prop, sets `<html lang>`           |
| `src/layouts/PostLayout.astro` | Passes `language` through to `BaseLayout`             |
| `src/pages/blog/index.astro`   | Shows `[LANG]` sup for non-EN posts                   |
| `src/pages/blog/archive.astro` | Shows `[LANG]` sup for non-EN posts                   |
| `src/pages/feed.xml.ts`        | RSS — no language filtering or per-item lang metadata |

## Intended Changes (in priority order)

### 1. RSS feed — filter to English only (or add `xml:lang` per item)

The feed currently publishes everything. German posts will confuse EN-only subscribers.

**Option A (simpler):** Filter RSS to English posts only. Add a note on the blog page that DE posts are archive-only.

```ts
// feed.xml.ts
const posts = await getCollection(
  "blog",
  ({ data }) => !data.draft && data.listed !== false && (data.language ?? "en") === "en",
)
```

**Option B:** Keep mixed feed, but signal language per item using a custom XML field. The `@astrojs/rss` package supports `customData` per item:

```ts
items: posts.map((post) => ({
  title: post.data.title,
  pubDate: post.data.date,
  link: `/blog/${post.slug}`,
  customData:
    post.data.language && post.data.language !== "en"
      ? `<language>${post.data.language}</language>`
      : undefined,
}))
```

Option A is recommended — simpler, honest to subscribers.

### 2. Archive — language filter buttons

The movies page already uses URL params for filtering. Apply the same pattern here.

Add buttons to `/blog/archive`:

- **All** (default)
- **English**
- **Deutsch**

Implementation sketch:

```txt
---
const url = Astro.url
const lang = url.searchParams.get("lang") ?? "all"
const allPosts = await getCollection("blog", ...)
const posts = lang === "all" ? allPosts : allPosts.filter(p => (p.data.language ?? "en") === lang)
---

<!-- Filter buttons -->
<nav>
  <a href="?" class:list={["minimal-btn", { active: lang === "all" }]}>All</a>
  <a href="?lang=en" class:list={["minimal-btn", { active: lang === "en" }]}>English</a>
  <a href="?lang=de" class:list={["minimal-btn", { active: lang === "de" }]}>Deutsch</a>
</nav>
```

Note: archive already has `prerender` as default (static). To use `Astro.url.searchParams`, the page needs `export const prerender = false`. Alternatively render all posts and filter client-side via JS — simpler and keeps the page static.

Client-side approach (keeps static):

```astro
<script>
  const params = new URLSearchParams(location.search)
  const lang = params.get("lang") ?? "all"
  document.querySelectorAll("[data-lang]").forEach((el) => {
    el.hidden = lang !== "all" && el.dataset.lang !== lang
  })
</script>
```

Each `<li>` gets `data-lang={data.language ?? "en"}`.

### 3. Post layout — visible language note for non-EN posts

When a post is in German, add a small visible note in `PostLayout.astro` so readers who land directly know immediately.

```astro
{
  language && language !== "en" && (
    <p class="micro" lang="de">
      Dieser Artikel ist auf Deutsch verfasst.
    </p>
  )
}
```

Place it below the `<hgroup>`, above the description. Keep it subtle — `.micro` class is sufficient.

## What Not To Do

- Don't add `/de/blog/` routing — the volume of DE posts doesn't justify a separate route tree.
- Don't add `hreflang` alternate links — there are no translated equivalents of any post, so hreflang would be misleading.
- Don't change the `language` field in config — the existing schema is correct, just underused.

## Definition of Done

- [ ] RSS feed excludes non-EN posts (or signals language per item)
- [ ] Archive has language filter (static JS approach preferred)
- [ ] Non-EN posts show a brief language note in `PostLayout`
- [ ] `[DE]` superscripts in listings remain (they're useful, keep them)
