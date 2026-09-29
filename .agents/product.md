# Product

Admission gate for gil.desmarais.de. A change ships only when it serves one persona on a golden path, stays inside the click budget, and misses the reject registry.

## Direction

Primary, ahead of the showcase: a calm personal hub. Essays, film notes, music tools, open source. No cookies, no cross-site tracking; GoatCounter is the only counter. Static, no popups, built to last.

Secondary: proof that one engineer with agents ships production outcomes, with low organisational overhead.

## Doctrine ledger

- Last re-baseline: none
- Override count: not recorded
- Tranche count: none recorded
- Thresholds: none declared

## Anchors

Hiring surface: `/`, `/resume`, `/contact`, `/about`, `/projects`, plus `corePages` in `src/data/site.ts` and `src/data/skills.ts`. `scripts/check-dist.mjs` enforces the bans on those pages and on `llms.txt` / `llms-full.txt`.

- Show the stance. Do not declare traditional engineering obsolete.
- Homepage: one first-person line in the hero lead. The subtitle is evidence only (no first person): html2rss MCP, dotfiles agent skills, published Rust, Swift, and WASM.
- No employer-specific AI claims, no AI tool names, no "not an expert".
- Title stays "Engineering Team Lead — Platform". Do not self-describe with "lead", "leading", "roadmap", "translate", or "guide teams". No "Staff-level" or "incremental delivery".
- "Calm" only with speed. Business value only beside a shipped outcome (complaints and revenue per patient).

## Personas

**Reader** (primary). Engineers, friends, cinephiles, and electronic music listeners. Reading on desktop or mobile; arrived via search, a share, or word of mouth. Wants signal and a fast read, without intrusive chrome.

**Hiring** (secondary). A VP, CTO, founder, or recruiter hiring a senior or staff IC who owns outcomes and works with agents. Not a people-manager search. Scanning quickly for outcome ownership and evidence of agent-driven delivery, not claims. Needs a summary, impact, stack clarity, and a low-friction contact route.

**Collaborator.** Arrives from GitHub, RubyGems, crates.io, or another registry. Needs real links, the actual publish mechanism, status, and machine-readable files.

Statuses: maintained (issues, PRs, releases), evergreen (fixes on request), legacy (reference only).

## Golden paths

**Reader**

- Film: homepage cue → `/movies/recommendations` → notes → IMDb on the list (detail optional).
- Reading: a post or `/blog` → one heading per TOC row → related posts or projects.
- Tools: `/projects` → html2rss, moodbar.rs, dotfiles → GitHub or demo.
- Music: homepage or `/projects` → moodbar.rs demo.

**Hiring**

- `/` thesis ("I build and run systems that move business numbers. Agents are part of how I ship.") → `/resume` (summary, current work, capabilities, skills).
- `/contact` → "What to expect" → "Email Gil" opens the mail client. Contact is a nav item, including inside the small-screen menu. The 404 page links to `/contact`.

**Collaborator**

- `/projects` → status → highlights and publish mechanism → repo or docs.
- `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/.well-known/llms.txt`, `/sitemap-index.xml`, `robots.txt`.

## Click budgets

**Reader.** No consent banners. Prefetch (sub-second transitions). No multi-page catalogs.

**Hiring.** Qualifications legible in about 30 seconds. Mail client opens in two clicks from any page, including mobile and the 404 page. Email requires JavaScript (address obfuscation); socials are the no-JS route. Sticky headings. TOC stays one row per heading.

**Collaborator.** No blanket supply-chain claim. Sitemap is indexable URLs only (`src/seo.ts`). RSS 2.0 is the feed. `scripts/check-dist.mjs` requires `llms.txt` internal links and sitemap URLs to exist in the build, and sitemap HTML must not be noindex. Those endpoints stay valid and unblocked.

## Mental models

- Static HTML by default. Server work only on authenticated or rate-limited seams (poster proxy).
- Remove, then hide, consolidate, automate, and only then add.
- Posts in `src/content/blog/`. Entities in `src/data/`. Movies in committed `src/data/movies.json`.
- Curate: notes on recommendations, hand-picked posts.
- No ads, no session recording, no unvetted analytics. GoatCounter is the only counter.

## Reject registry

Accounts, comments, discussion, votes. Feedback belongs in email or GitHub issues.

SPA routers or client state libraries where Astro and vanilla TS suffice.

The movie catalog is feature-complete. Watchlists, Letterboxd sync, share buttons, facet sliders.

Newsletter popups, exit modals, subscription banners.

Theme switchers (dark only), font pickers, expert controls.

Unvetted analytics and session recording. GoatCounter is the only exception.
