# Product Doctrine & Personas

Product doctrine and audience definition for [gil.desmarais.de](https://gil.desmarais.de).

This document serves as the **admission gate** for all future feature proposals, UX expansions, and scope decisions. Features must earn their existence by serving one of these canonical personas on a documented golden path without violating documented budgets or the Reject Registry.

---

## 1. Product Mission & Stance

The site serves two balanced purposes with clear priority:

1. **Primary Purpose (60% weight) — The Calm Personal Hub & Digital Garden:**
   An artisanal, durable, low-maintenance digital home for Gil Desmarais. A quiet place for systems thinking essays, curated film recommendations, electronic music/DJ tools, and personal open-source projects. No cookies, no cross-site tracking; one vetted cookieless page counter (GoatCounter). Zero popups, static-first, built for longevity.

2. **Secondary Purpose (40% weight) — Builder Showcase:**
   Proof that one engineer with agents ships production outcomes fast, with low organisational overhead.

---

## Hiring-surface narrative

Applies to `/`, `/resume`, `/contact`, `/about`, `/projects`, `src/data/site.ts`, and `src/data/skills.ts`.

- Demonstrate the stance. Do not declare that traditional engineering is obsolete.
- The hero lead is the one first-person line on `/`; the subtitle carries evidence: the html2rss MCP server, the dotfiles `agents/skills` pipeline, and published Rust, Swift, and WASM.
- No employer-specific AI claims. No AI tool names. No negative self-statement ("not an expert").
- The current job title stays factual: "Engineering Team Lead — Platform". Do not use "lead", "leading", "roadmap", "translate", or "guide teams" as self-description. Do not use "Staff-level" or "incremental delivery".
- "Calm" only when paired with speed.
- Business value stays attached to a shipped outcome (complaints and revenue per patient).

---

## 2. Canonical Personas

### Persona 1: The Curious Reader & Cultural Peer (Primary)

- **Who:** Engineers, friends, cinephiles, and electronic music listeners discovering Gil's writing or recommendations.
- **Context:** Reading on desktop or mobile; arrived via search, social share, or word of mouth.
- **Needs:** Authentic thoughts, high-signal curation, fast reading experience without intrusive chrome.
- **Golden Paths:**
  1. _Film Discovery:_ Follows the homepage cue to `/movies/recommendations` → scans top-ranked recommendations with personal notes → opens the IMDb link on the list (detail page optional).
  2. _Systems Reading:_ Lands on a blog post (or `/blog`) → reads distraction-free content with table of contents → checks related posts or projects.
  3. _Tool Exploration:_ Visits `/projects` → reads concise descriptions of purposeful tools (`html2rss`, `moodbar.rs`, dotfiles) → jumps to GitHub or live demo.
  4. _Music Tool:_ Follows the homepage cue or opens `/projects` → opens the moodbar.rs card → launches the live demo.
- **UX & Interaction Budget:**
  - Zero cookie/consent banners or analytics popups.
  - Sub-second page transitions via Astro prefetching.
  - Zero pagination fatigue (curated lists are compact or scrollable; no multi-page clicking).

### Persona 2: The Executive Hiring Partner & Recruiter (Secondary)

- **Who:** VPs of Engineering, CTOs, founders, or lead tech recruiters seeking a senior/staff IC hire who owns outcomes end-to-end and works with agents; explicitly not a people-manager hire.
- **Context:** Evaluating candidates quickly; scanning for outcome ownership, architecture trade-offs, and evidence of agent-driven delivery.
- **Needs:** Clear executive summary, proven impact metrics, tech stack clarity, an immediate, low-friction contact route, and evidence of agent-driven delivery, not claims.
- **Golden Paths:**
  1. _Candidate Qualification:_ Lands on `/` → reads core thesis ("I build and run systems that move business numbers. Agents are part of how I ship.") → clicks to `/resume` → scans Executive Summary, Current Work, Capabilities, and Skills Matrix.
  2. _Direct Engagement:_ Navigates to `/contact` → reads on-page "What to expect" → "Email Gil" opens the mail client.
- **UX & Interaction Budget:**
  - Time-to-signal: Candidate qualifications and impact legible within 30 seconds.
  - Mail client opens in ≤2 clicks from any page, including mobile and the 404 page. Email requires JavaScript (address obfuscation); socials are the no-JS route.
  - Scannable visual hierarchy with sticky section headers and mobile-friendly table of contents.

### Persona 3: The Open-Source Collaborator & Developer

- **Who:** Developers using or contributing to Gil's open-source projects (`html2rss`, `moodbar.rs`, etc.).
- **Context:** Arrives from GitHub, RubyGems, crates.io, or package registries.
- **Needs:** Accurate links, supply-chain transparency, clear project statuses, and machine-readable data.
- **Statuses:**
  - **maintained** — accepting issues/PRs; releases ongoing.
  - **evergreen** — feature-complete; fixes on request.
  - **legacy** — kept for reference; no new work.
- **Golden Paths:**
  1. _Project Verification:_ Lands on `/projects` → checks project status (`maintained` / `evergreen` / `legacy`) → reads architectural highlights and the project's actual publish mechanism → links out to GitHub repo or docs.
  2. _Syndication / LLM Discovery:_ Pulls `/feed.xml` (RSS 2.0) into a feed reader, or accesses `/llms.txt`, `/.well-known/llms.txt`, `/sitemap-index.xml`, or `robots.txt` for machine discovery.
- **UX & Interaction Budget:**
  - Supply-chain bar: each project states its actual publish mechanism; no blanket claims.
  - Internal links are exercised by the PR build.
  - Sitemap lists indexable pages only. RSS 2.0 is the canonical feed format.
  - Machine-readable endpoints (`/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/.well-known/llms.txt`, `/sitemap-index.xml`, `robots.txt`) always stay valid and unblocked.

---

## 3. Core Doctrine & Preserved Mental Models

1. **Static-First Simplicity:**
   Pages are prerendered static HTML by default. Dynamic server-side execution is strictly reserved for authenticated or rate-limited external seams (e.g. OMDb poster API proxy).
2. **Remove → Hide → Consolidate → Automate → Add:**
   Before adding new UI controls, pages, or settings, exhaust simpler options. Prefer removing dead copy, consolidating related views, or automating behind the scenes.
3. **Single Source of Truth:**
   Content lives in Markdown (`src/content/blog/`); metadata and site entities live in TypeScript constants (`src/data/`); runtime movie data lives in committed `src/data/movies.json`.
4. **Taste Over Volume:**
   The site values curation over completeness. The movie section highlights _recommendations with notes_ over an unopinionated dump; the blog showcases _hand-picked highlights_ over an endless chronological wall.
5. **No Slop & Zero Friction:**
   No cookies, no cross-site tracking; one vetted cookieless page counter (GoatCounter). No third-party ad scripts. Clean CSS tokens, fast fonts, native browser semantics.

---

## 4. Reject Registry (Anti-Goals & Prohibited Patterns)

Proposals matching these patterns are **Rejected** at the product gate:

- ❌ **Interactive Community Features:** No user accounts, comments, discussion threads, or upvoting mechanisms. Feedback belongs in email or GitHub issues.
- ❌ **Heavy Client-Side Frameworks / SPAs:** No introducing client-side SPA routing libraries or runtime state managers where Astro components and vanilla TS suffice.
- ❌ **Movie Catalog Expansion:** The movie catalog is **feature-complete**. Reject proposals for user watchlists, Letterboxd auto-sync, social sharing buttons, or complex facet sliders.
- ❌ **Intrusive Marketing & Growth Hacks:** No newsletter popups, exit-intent modals, or aggressive subscription banners.
- ❌ **Secondary Settings Surfaces:** No theme switchers (dark-only by design; no theme switcher), font size pickers, or expert algorithm controls on public surfaces.
- ❌ **Unvetted Tracking:** No third-party behavioral analytics or session recording tools. GoatCounter (cookieless page counter) is the only vetted exception.

---

## 5. Decision Gate Workflow

Every new feature, route, or significant UI adjustment must pass this 7-point check before implementation:

1. **Persona Served:** Does this serve Persona 1 (Reader), Persona 2 (Hiring Partner), or Persona 3 (Developer)?
2. **Golden Path:** Which documented golden path does this touch? Does it remove or add friction?
3. **Cognitive Load:** Does it add steps or cognitive overhead to primary reading or scanning workflows?
4. **Concept Budget:** Does it introduce more than one new concept or UI abstraction?
5. **Simplification:** Could the same value be achieved by removing, consolidating, or automating an existing surface?
6. **Maintenance Burden:** Does this require ongoing operational upkeep or external API maintenance?
7. **Reject Registry Check:** Is this prohibited by Section 4?
