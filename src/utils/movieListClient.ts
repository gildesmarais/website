import {
  buildMoviesPageUrl,
  parseUrlParams,
  processMovies,
  type Movie,
  type MovieCatalogEntry,
  type MovieSortOptions,
} from "./movieUtils"

interface MovieCatalogData {
  catalog: MovieCatalogEntry[]
  recommendations: string[]
}

function readCatalog(): MovieCatalogData {
  const el = document.getElementById("movie-catalog")
  if (!el?.textContent) throw new Error("Movie catalog not found")
  return JSON.parse(el.textContent)
}

export function initMovieList(): void {
  const grid = document.querySelector(".recommendations-grid") as HTMLElement | null
  if (!grid) return

  const { catalog, recommendations } = readCatalog()
  const recommendationsSet = new Set(recommendations)
  const cardMap = new Map<string, HTMLElement>()

  for (const card of grid.querySelectorAll<HTMLElement>(".movie-card[data-imdb-id]")) {
    const id = card.dataset.imdbId
    if (id) cardMap.set(id, card)
  }

  const searchInput = document.getElementById("movieFilter") as HTMLInputElement | null
  const searchForm = document.getElementById("searchForm") as HTMLFormElement | null
  const recToggle = document.getElementById("recommendationToggle") as HTMLAnchorElement | null
  const sortBtns = document.querySelectorAll<HTMLAnchorElement>(".sort-btn")

  let state = parseUrlParams(new URL(window.location.href))

  if (searchInput) searchInput.value = state.filters.searchQuery || ""

  const updateUI = () => {
    const { filters, sortOptions } = state

    if (filters.isRecommendation) {
      recToggle?.classList.add("active")
      recToggle?.setAttribute("aria-pressed", "true")
      recToggle?.setAttribute("aria-label", "Show all movies")
      if (recToggle) recToggle.title = "Show all movies"
    } else {
      recToggle?.classList.remove("active")
      recToggle?.setAttribute("aria-pressed", "false")
      recToggle?.setAttribute("aria-label", "Show only recommended movies")
      if (recToggle) recToggle.title = "Show only recommended movies"
    }

    sortBtns.forEach((btn) => {
      const sortKey = btn.dataset.sort
      const iconSpan = btn.querySelector(".sort-icon") as HTMLElement | null
      if (sortKey === sortOptions.sortBy) {
        btn.classList.add("active")
        if (iconSpan) iconSpan.textContent = sortOptions.sortDir === "asc" ? " ▲" : " ▼"
      } else {
        btn.classList.remove("active")
        if (iconSpan) iconSpan.textContent = ""
      }
    })
  }

  const updateList = () => {
    const { movies } = processMovies(catalog as Movie[], recommendationsSet, state.filters, state.sortOptions)

    const visibleIds = new Set(movies.map((m) => m.const))
    const allCards = Array.from(cardMap.values())

    requestAnimationFrame(() => {
      allCards.forEach((card) => {
        const id = card.dataset.imdbId
        card.style.display = id && visibleIds.has(id) ? "" : "none"
      })
      movies.forEach((movie) => {
        const card = cardMap.get(movie.const)
        if (card) grid.appendChild(card)
      })

      let emptyEl = grid.querySelector(".movies-empty")
      if (movies.length === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement("p")
          emptyEl.className = "movies-empty"
          emptyEl.textContent = "No matches"
          grid.appendChild(emptyEl)
        }
      } else {
        emptyEl?.remove()
      }
    })

    window.history.replaceState({}, "", buildMoviesPageUrl(state, {}))
    updateUI()
  }

  recToggle?.addEventListener("click", (e) => {
    e.preventDefault()
    const isRec = !state.filters.isRecommendation
    state = {
      ...state,
      filters: { ...state.filters, isRecommendation: isRec ? true : undefined },
    }
    updateList()
  })

  sortBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const sort = btn.dataset.sort as MovieSortOptions["sortBy"]
      if (state.sortOptions.sortBy === sort) {
        state = {
          ...state,
          sortOptions: {
            ...state.sortOptions,
            sortDir: state.sortOptions.sortDir === "asc" ? "desc" : "asc",
          },
        }
      } else {
        state = {
          ...state,
          sortOptions: {
            sortBy: sort,
            sortDir: sort === "title" ? "asc" : "desc",
          },
        }
      }
      updateList()
    })
  })

  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault()
  })

  searchInput?.addEventListener("input", (e) => {
    state = {
      ...state,
      filters: {
        ...state.filters,
        searchQuery: (e.target as HTMLInputElement).value || undefined,
      },
    }
    updateList()
  })

  updateList()
}
