# Repository guidelines

Non-inferable invariants. Directory layout, Prettier, and commit etiquette are visible in the tree.

## Sources of truth

- `src/data/movies.json` is the runtime movie catalog. `ratings.csv` (repo root, untracked) is operator input; regenerate with `bin/migrate-ratings`, then review `src/data/recommendations.json`. Restart `npm run dev` after regeneration so the server cache reloads.
- Page meta descriptions and llms excerpts for `/`, `/about`, `/resume`, `/contact`, and `/projects` come from `corePages` in `src/data/site.ts` via `corePage(path)`. `/blog`, `/movies`, and `/imprint` keep their own meta descriptions.
- Personas, golden paths, click budgets, mental models, and the doctrine ledger live in `.agents/product.md`. Copy on `/`, `/resume`, `/contact`, `/about`, and `/projects` must satisfy that file.
- `src/seo.ts` is the only noindex list (`isIndexable` / `defaultRobots`). Sitemap filtering and the BaseLayout robots default both call it. Résumé keeps an explicit robots prop.
- Pages import the movie catalog from `src/movies`, not from deep utils paths.

## Gates

- `make check` before committing: production build, visual guardrails, `check:dist`, `lint-xml`, and `astro check`.
- `lint-xml` runs `xmllint --noout` on `dist/client/feed.xml`, `sitemap-index.xml`, and `sitemap-0.xml`. CI calls `make lint-xml` after the dist checks.
- `make lintfix && make ready` before a pull request. `make ready` runs lint, Vitest, and `make check`.

## Traps

- Astro `compressHTML` drops whitespace between plain text and `<a>` or `</a>` on adjacent lines. Keep the space on the same line as the tag, or use `{" "}`.
- CSS uses design tokens in `src/styles/partials/01-tokens.css` only. No ad-hoc hex, rem/px, or timing literals in component or page CSS.
- Poster placeholders (`public/poster-*.svg`) stay on that palette, use no Arial, and prefer geometry over `<text>` (img-loaded SVGs).

## Tooling

- `bin/` is operator CLIs. `scripts/` is build and CI helpers.
