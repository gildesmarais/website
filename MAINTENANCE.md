# Maintenance Guide

This document outlines key maintenance procedures for the Astro website.

## Tooling layout

- **`bin/`** — operator CLIs run by hand (e.g. `bin/migrate-ratings`).
- **`scripts/`** — build/CI helpers invoked by npm/Make (e.g. `scripts/visual-guardrails.mjs` via `make check`).

## Movie Data Management

The website uses two committed data files for movie functionality:

- `src/data/movies.json`: Detailed movie catalog (titles, ratings, IMDb IDs, etc.) — **runtime source of truth** consumed by the site
- `src/data/recommendations.json`: Manually maintained recommendation notes keyed by IMDb ID

`ratings.csv` at the repo root is the **operator input**. It is not committed and is not read at runtime. Regenerate `movies.json` from it when ratings change.

### Updating Movie Data

**Current Process:**

1. **Movies Data**: Generate `src/data/movies.json` from `ratings.csv`:

   ```bash
   bin/migrate-ratings
   ```

   - Expects `ratings.csv` in the project root
   - Writes `src/data/movies.json`
   - Does not touch recommendations

2. **Recommendations Data**: Maintain `src/data/recommendations.json` by hand:
   - Movie IMDb IDs (`const` field)
   - Recommendation notes (`note` field)

**To update movie data:**

1. Place the latest `ratings.csv` in the project root
2. Run `bin/migrate-ratings`
3. Review/update `src/data/recommendations.json` as needed
4. Commit the regenerated `movies.json` (runtime SoT)
5. Restart the development server if running: `npm run dev`

**Performance**: Recommendation data is cached server-side. The cache rebuilds when the server restarts.
