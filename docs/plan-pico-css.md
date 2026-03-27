# Handover: Pico CSS — Replace with Plain CSS

## Problem

Pico CSS 2.1.1 is imported as a classless framework, but the site is fighting it at almost every level:

- `[data-theme="dark"]` overrides **40+ Pico custom properties** in BaseLayout — effectively rewriting Pico's entire dark theme.
- Spacing for `section`, `h2/h3`, `p+p`, `ul/ol`, `article`, `details` is all re-overridden.
- A custom button system (`.minimal-btn`) exists because Pico's default buttons don't fit the aesthetic.
- Brand tokens (`--brand-*`) are defined and then mapped into Pico variables — a double indirection.
- `--pico-border-radius: 1px` overrides Pico's rounding entirely.

The custom CSS is well-structured and coherent. Pico is contributing noise, not value.

## What Pico Actually Contributes (inventory)

Things that would need to be recreated or verified after removal:

| Pico feature                  | Used?    | Notes                                       |
| ----------------------------- | -------- | ------------------------------------------- |
| CSS reset / normalize         | Yes      | Box model, margins, base typography         |
| `nav` styling                 | Yes      | Used in `Navigation.astro`, footer          |
| `details`/`summary`           | Yes      | Used in resume, skills                      |
| `blockquote`                  | Yes      | Blog posts                                  |
| `table`                       | Yes      | Skills matrix                               |
| `code`/`pre`                  | Yes      | Blog posts, styled via Shiki too            |
| `hgroup`                      | Yes      | Post headers                                |
| Form elements                 | Unlikely | No real forms beyond contact                |
| `progress`, `range`, `switch` | No       | Not used                                    |
| Dropdown                      | No       | Not used                                    |
| Tooltip                       | No       | Not used                                    |
| Grid/container                | Partial  | `.container` class is used — this is Pico's |
| Dark/light theme toggle       | No       | Dark-only site                              |

## Files Involved

| File                            | Role                                                     |
| ------------------------------- | -------------------------------------------------------- |
| `src/layouts/BaseLayout.astro`  | All CSS lives here (4× `is:global` blocks + Pico import) |
| `src/layouts/PostLayout.astro`  | Scoped post-specific styles                              |
| `src/layouts/MovieLayout.astro` | Scoped movie-specific styles                             |
| `src/components/*.astro`        | Each may have scoped `<style>` blocks                    |
| `package.json`                  | Remove `@picocss/pico` dep                               |

## Intended Approach

Replace Pico with a single `src/styles/global.css` file. Keep everything that's already working. Add a minimal CSS reset and the handful of semantic element styles that Pico was providing.

### Step 1 — Audit `.container` usage

Pico's `.container` class sets `max-width` and centering. It's used on `<header>`, `<main>`, and `<footer>` in BaseLayout. Before removing Pico, define a replacement:

```css
.container {
  width: 100%;
  max-width: 1200px; /* match current Pico default or tune to taste */
  margin-inline: auto;
  padding-inline: 1rem;
}
```

Check the actual max-width Pico uses for the site's breakpoints — inspect the built output or Pico source.

### Step 2 — Extract a minimal reset

Replace Pico's normalize with a focused reset:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0;
}
img,
video {
  max-width: 100%;
  display: block;
}
```

Pico does more than this, but most of it is browser-baseline stuff that's not relevant to this site's actual elements.

### Step 3 — Recreate only the semantic element styles in use

Priority elements (from the inventory above):

- **`nav`**: Currently Pico styles `<nav>` with flex + spacing. Extract the relevant rules from the computed output or write fresh.
- **`details`/`summary`**: Pico gives it cursor pointer + styling. Already overridden in BaseLayout (`cursor: pointer`). Minimal.
- **`blockquote`**: PostLayout already overrides Pico's blockquote with a custom left border. Just keep that.
- **`table`**: Pico gives responsive tables with borders. Skills matrix uses this. Recreate or scope a simple table style.
- **`code`/`pre`**: PostLayout has custom code styling. Shiki handles syntax blocks. May need minor baseline styles.
- **`hgroup`**: Pico collapses margin between `<hgroup>` children. PostLayout uses `hgroup` for title + date. Verify layout after removal.

### Step 4 — Consolidate the 4× `is:global` blocks into one file

Currently BaseLayout has:

1. Font + CSS vars block
2. Customizations (`.micro`, `.lead`, `.width`, spacing overrides)
3. Print styles
4. Dark theme Pico overrides (→ becomes brand token application)

After removing Pico, blocks 1, 2, 3 stay largely as-is. Block 4 transforms into direct variable definitions (no `--pico-*` mapping needed).

Move all global styles out of `BaseLayout.astro` into `src/styles/global.css` and import it once:

```astro
import "../styles/global.css"
```

This makes styles reviewable outside of a component and removes the clutter from BaseLayout.

### Step 5 — Remove Pico

```bash
npm remove @picocss/pico
```

Remove the import from BaseLayout:

```diff
- import "@picocss/pico/css/pico.min.css"
```

### Step 6 — Verify visually

Pages to check:

- `/` — hero, navigation
- `/resume` — skills table, details/summary, highlights
- `/blog/[slug]` — blockquote, code, hgroup, TOC
- `/movies` — grid, filter buttons
- `/contact` — any form elements

## What Not To Do

- Don't use another CSS framework as a drop-in replacement — the custom CSS is the actual design system.
- Don't convert to Tailwind or utility classes — the current authoring style (semantic HTML + scoped/global CSS) is coherent and fits Astro well.
- Don't refactor component styles during this migration — scope is CSS only.

## Definition of Done

- [ ] `@picocss/pico` removed from `package.json` and imports
- [ ] `src/styles/global.css` created with all global styles consolidated
- [ ] `.container` behavior preserved
- [ ] All 6 check pages visually correct
- [ ] No `--pico-*` variables remaining in the codebase (except optionally as a compatibility shim during transition)
- [ ] Print styles preserved
- [ ] Dark theme preserved
