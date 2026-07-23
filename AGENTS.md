# Repository Guidelines

## Project Structure & Module Organization

- **Astro app:** Core pages live in `src/pages` (e.g., `index.astro`, route folders), layouts in `src/layouts`, reusable UI in `src/components`, and global styles in `src/styles`.
- **Content layers:** Markdown-driven sections stay in `src/content`; media and fonts belong in `src/assets` and `public` for static delivery. Poster placeholders live in `public/poster-*.svg` — keep palette aligned with `01-tokens.css`, no Arial, prefer geometry over `<text>` for img-loaded SVGs.
- **Data sources:** Dynamic copy and movie metadata reside in `src/data`. Regenerate `movies.json` from `ratings.csv` via `bin/migrate-ratings` whenever ratings change.

## Build, Test & Development Commands

- **Install dependencies:** `npm ci` (or `make ci-install`) ensures lockfile-consistent installs.
- **Local dev server:** `npm run dev` (alias `make serve`) launches Astro with hot reload at `http://localhost:4321`.
- **Production build:** `npm run build` (alias `make build`) outputs the static site to `dist/`.
- **Preview build output:** `npm run preview` serves the built site for smoke-testing before deploy.
- **Format codebase:** `make fix` runs `npm exec prettier -- . --write` across Astro, TypeScript, and Markdown files.

## Coding Style & Naming Conventions

- **Formatting:** Prettier + `prettier-plugin-astro` enforce two-space indentation, semicolonless JavaScript, and consistent attribute ordering. Always run `make fix` before review.
- **Components vs. routes:** Astro/TSX components use PascalCase filenames (`MovieCard.astro`); routes and API handlers use kebab-case (`src/pages/blog`, `feed.xml.ts`).
- **Imports:** Prefer relative aliases within `src` and keep side-effect imports (styles, fonts) near the file top.
- **Inline prose + links:** Astro compresses HTML whitespace at build time (`compressHTML` defaults to `true`). When plain text and `<a>` (or `</a>`) sit on adjacent lines, the space between them is dropped — use `{" "}` or keep the space on the same line as the tag (e.g. `> spans` not `>\nspans`).
- **Design System Compliance:** All style adjustments, transitions, border weights, or spacing offsets must adhere to and extend design system tokens (defined in `src/styles/partials/01-tokens.css`). Avoid introducing ad-hoc hex colors, hardcoded transition timings, or spacing offsets ("snowflakes"). If a visual styling property or layout spacer repeats, promote it to a design token.

## Testing Guidelines

- **Automated tests:** None currently. Validate changes by running `npm run dev` for interactive checks and `npm run preview` against a production build.
- **Regression focus:** Verify navigation, RSS feed (`/feed.xml`), and movie filters after data or layout changes.
- **Future work:** If adding tests, align with Astro’s recommended Vitest setup and mirror page/component structure under `src/`.

## Commit & Pull Request Guidelines

- **Commit messages:** Follow the existing concise convention (`feat:`, `fix:`, `refactor:`) with imperative verbs and focused scope.
- **Branch hygiene:** Keep commits small, rebased, and scoped to a single feature or fix; remove debug artifacts before pushing.
- **Pull requests:** Provide a clear summary, link related issues, list manual validation steps, and attach before/after screenshots for UI-impacting updates.

## Data & Deployment Notes

- **Movie data refresh:** Place the latest `ratings.csv` at the repo root, run `bin/migrate-ratings`, then review `src/data/recommendations.json` manually.
- **Cache awareness:** Restart `npm run dev` after regeneration so the server-side cache picks up new data.
- **Post-deploy ping:** Production deployments should rerun the Makefile’s `post-deploy` target to notify search engines about updated sitemaps.
