# gil.desmarais.de

Personal website for [Gil Desmarais](https://gil.desmarais.de): portfolio, résumé, engineering blog, and movie ratings catalog.

Built with [Astro](https://docs.astro.build/) (static output), deployed on Vercel.

## Prerequisites

- **Node.js** `>=22.12.0 <23` (see `package.json` `engines` and `.tool-versions`)
- **npm** (lockfile-based installs via `npm ci`)

Optional, for movie-catalog operator work only:

- **Ruby** (runs `bin/migrate-ratings`)
- **OMDb API key** in `.env` (see `.env.example`) for server-side poster lookups

## Quick start

```sh
npm ci
make serve
```

Open [http://localhost:4321](http://localhost:4321). Hot reload is on.

Useful Makefile targets:

| Target       | What it does                                        |
| ------------ | --------------------------------------------------- |
| `make serve` | Dev server (`astro dev`)                            |
| `make build` | Production build → `dist/`                          |
| `make check` | Build + visual guardrails + `astro check` (default) |
| `make test`  | Vitest unit tests                                   |
| `make ready` | Lint + test + check (pre-PR / CI-shaped gate)       |
| `make fix`   | Prettier + stylelint autofix                        |

Preview a production build with `npm run preview` after `make build`.

## What’s in the repo

| Area                                    | Location                                           |
| --------------------------------------- | -------------------------------------------------- |
| Pages & routes                          | `src/pages/`                                       |
| Layouts & UI                            | `src/layouts/`, `src/components/`                  |
| Blog & other Markdown                   | `src/content/`                                     |
| Site identity, projects, skills, movies | `src/data/`                                        |
| Movie catalog / query logic             | `src/movies/`                                      |
| Design tokens & styles                  | `src/styles/` (tokens in `partials/01-tokens.css`) |
| Operator CLIs                           | `bin/`                                             |
| Build / CI helpers                      | `scripts/`                                         |

Committed `src/data/movies.json` is the runtime movie catalog. Regenerating it from an IMDb `ratings.csv` export is documented in [MAINTENANCE.md](MAINTENANCE.md).

## Contributing locally

Agent and contributor conventions live in [AGENTS.md](AGENTS.md). Before opening a PR:

```sh
make lintfix && make ready
```

CI on `master` and pull requests runs lint, tests, build, visual guardrails, and `astro check` (see `.github/workflows/ci.yml`).

## License

Dual-licensed — details in [LICENSE.md](LICENSE.md):

- **Source code** (templates, scripts, styles, config): MIT
- **Written content, data, and media** (`src/content/`, `src/data/`, associated assets): [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/)
