# Repository Guidelines

## Project Structure & Module Organization

- **Astro app:** Core pages live in `src/pages` (e.g., `index.astro`, route folders), layouts in `src/layouts`, reusable UI in `src/components`, and global styles in `src/styles`.
- **Movie domain:** Catalog/query/poster logic lives in `src/movies/`; movie UI under `src/components/movies/`. Pages import the public surface from `src/movies` (not deep utils paths).
- **Content layers:** Markdown-driven sections stay in `src/content`; media and fonts belong in `src/assets` and `public` for static delivery. Poster placeholders live in `public/poster-*.svg` — keep palette aligned with `01-tokens.css`, no Arial, prefer geometry over `<text>` for img-loaded SVGs.
- **Data sources:** Site identity, projects, skills, and movie metadata live in `src/data`. Committed `src/data/movies.json` is the **runtime source of truth** for the movie catalog. `ratings.csv` (repo root, untracked) is the **operator input** — regenerate JSON via `bin/migrate-ratings` when ratings change.
- **Tooling split:** `bin/` holds operator CLIs (e.g. `bin/migrate-ratings`). `scripts/` holds build/CI helpers (e.g. `scripts/visual-guardrails.mjs`).

## Build, Test & Development Commands

- **Install dependencies:** `npm ci` (or `make ci-install`) ensures lockfile-consistent installs.
- **Local dev server:** `npm run dev` (alias `make serve`) launches Astro with hot reload at `http://localhost:4321`.
- **Production build:** `npm run build` (alias `make build`) outputs the static site to `dist/`.
- **Preview build output:** `npm run preview` serves the built site for smoke-testing before deploy.
- **Quick gate:** `make check` runs build, visual guardrails, and `astro check`.
- **Unit tests:** `npm test` runs Vitest (`vitest run`).
- **Format codebase:** `make fix` runs `npm exec prettier -- . --write` across Astro, TypeScript, and Markdown files.

## Coding Style & Naming Conventions

- **Formatting:** Prettier + `prettier-plugin-astro` enforce two-space indentation, semicolonless JavaScript, and consistent attribute ordering. Always run `make fix` before review.
- **Components vs. routes:** Astro/TSX components use PascalCase filenames (`MovieCard.astro`); routes and API handlers use kebab-case (`src/pages/blog`, `feed.xml.ts`).
- **Imports:** Prefer relative aliases within `src` and keep side-effect imports (styles, fonts) near the file top.
- **Inline prose + links:** Astro compresses HTML whitespace at build time (`compressHTML` defaults to `true`). When plain text and `<a>` (or `</a>`) sit on adjacent lines, the space between them is dropped — use `{" "}` or keep the space on the same line as the tag (e.g. `> spans` not `>\nspans`).
- **Design System Compliance:** All style adjustments, transitions, border weights, font sizes, or spacing offsets must adhere to and extend design system tokens (defined in `src/styles/partials/01-tokens.css`). Avoid introducing ad-hoc hex colors, hardcoded rem/px sizes, transition timings, or layout "snowflakes". Never leave un-tokenized literal dimensions in component or page CSS — integrate them into existing design tokens or promote repeated spacers into `01-tokens.css`.

## Testing Guidelines

- **Automated tests:** Vitest via `npm test`. Colocate `*.test.ts` next to the module under test (e.g. under `src/movies/`, `src/utils/`).
- **Regression focus:** Verify navigation, RSS feed (`/feed.xml`), and movie filters after data or layout changes. Prefer extending unit tests for query/sort/poster helpers over manual-only checks.
- **Manual smoke:** `npm run dev` for interactive checks; `npm run preview` against a production build when layout or CSS changes.

## Commit & Pull Request Guidelines

- **Commit messages:** Follow the existing concise convention (`feat:`, `fix:`, `refactor:`) with imperative verbs and focused scope.
- **Branch hygiene:** Keep commits small, rebased, and scoped to a single feature or fix; remove debug artifacts before pushing.
- **Pull requests:** Provide a clear summary, link related issues, list manual validation steps, and attach before/after screenshots for UI-impacting updates.

## Data & Deployment Notes

- **Movie data refresh:** Place the latest `ratings.csv` at the repo root, run `bin/migrate-ratings`, then review `src/data/recommendations.json` manually. Commit the regenerated `movies.json` — that file is what the site reads at build/runtime.
- **Cache awareness:** Restart `npm run dev` after regeneration so the server-side cache picks up new data.
- **Post-deploy ping:** Production deployments should rerun the Makefile’s `post-deploy` target to notify search engines about updated sitemaps.
