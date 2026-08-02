export interface Movie {
  const: string
  title: string
  original_title?: string
  year: number
  your_rating: number
  date_rated: string
  url: string
  title_type: string
  imdb_rating: number
  runtime_mins: number
  genres: string
  num_votes: number
  release_date: string
  directors: string
  _searchString?: string // Pre-computed for performance
}

export interface MovieFilters {
  searchQuery?: string
  isRecommendation: boolean
}

export interface MovieSortOptions {
  sortBy: "default" | "title" | "year" | "yourRating" | "imdbRating" | "runtimeMins"
  sortDir: "asc" | "desc"
}

export type MovieCatalogEntry = Pick<
  Movie,
  | "const"
  | "title"
  | "year"
  | "your_rating"
  | "imdb_rating"
  | "runtime_mins"
  | "genres"
  | "directors"
  | "_searchString"
>

export function buildSearchString(movie: Pick<Movie, "title" | "directors" | "genres">): string {
  return `${movie.title || ""} ${movie.directors || ""} ${movie.genres || ""}`.toLowerCase()
}

export function toCatalogEntry(movie: Movie): MovieCatalogEntry {
  return {
    const: movie.const,
    title: movie.title,
    year: movie.year,
    your_rating: movie.your_rating,
    imdb_rating: movie.imdb_rating,
    runtime_mins: movie.runtime_mins,
    genres: movie.genres,
    directors: movie.directors,
    _searchString: movie._searchString ?? buildSearchString(movie),
  }
}

export function defaultSortDir(sortBy: MovieSortOptions["sortBy"]): MovieSortOptions["sortDir"] {
  return sortBy === "title" ? "asc" : "desc"
}

export function nextSortOptions(
  current: MovieSortOptions,
  clickedSortBy: MovieSortOptions["sortBy"],
): MovieSortOptions {
  if (current.sortBy === clickedSortBy) {
    return {
      sortBy: clickedSortBy,
      sortDir: current.sortDir === "asc" ? "desc" : "asc",
    }
  }
  return {
    sortBy: clickedSortBy,
    sortDir: defaultSortDir(clickedSortBy),
  }
}

export function recommendationChrome(isRecommendation: boolean): {
  stateLabel: string
  ariaLabel: string
  title: string
} {
  if (isRecommendation) {
    return {
      stateLabel: "Recommended",
      ariaLabel: "Show all movies",
      title: "Show all movies",
    }
  }
  return {
    stateLabel: "All movies",
    ariaLabel: "Show only recommended movies",
    title: "Show only recommended movies",
  }
}

export function filterMovies(movies: MovieCatalogEntry[], filters: MovieFilters): MovieCatalogEntry[] {
  let filtered = movies

  if (filters.searchQuery?.trim()) {
    const tokens = filters.searchQuery.trim().toLowerCase().split(/\s+/)
    filtered = filtered.filter((movie) => {
      const searchBase = movie._searchString || buildSearchString(movie)
      return tokens.every((token) => searchBase.includes(token))
    })
  }

  return filtered
}

export function sortMovies(movies: MovieCatalogEntry[], sortOptions: MovieSortOptions): MovieCatalogEntry[] {
  if (sortOptions.sortBy === "default") {
    return sortOptions.sortDir === "asc" ? [...movies] : [...movies].reverse()
  }

  return [...movies].sort((a, b) => {
    let aVal: string | number
    let bVal: string | number

    switch (sortOptions.sortBy) {
      case "title":
        aVal = (a.title || "").toLowerCase()
        bVal = (b.title || "").toLowerCase()
        break
      case "year":
        aVal = a.year || 0
        bVal = b.year || 0
        break
      case "yourRating":
        aVal = a.your_rating || 0
        bVal = b.your_rating || 0
        break
      case "imdbRating":
        aVal = a.imdb_rating || 0
        bVal = b.imdb_rating || 0
        break
      case "runtimeMins":
        aVal = a.runtime_mins || 0
        bVal = b.runtime_mins || 0
        break
      default:
        aVal = (a.title || "").toLowerCase()
        bVal = (b.title || "").toLowerCase()
    }

    if (aVal < bVal) return sortOptions.sortDir === "asc" ? -1 : 1
    if (aVal > bVal) return sortOptions.sortDir === "asc" ? 1 : -1
    return 0
  })
}

/**
 * Processes movies by applying filters and sorting.
 * Assumes input movies are already pre-filtered for type (e.g., from movieCache).
 */
export function processMovies(
  movies: MovieCatalogEntry[],
  recommendationsSet: Set<string>,
  filters: MovieFilters,
  sortOptions: MovieSortOptions,
): MovieCatalogEntry[] {
  let processed = movies

  if (filters.isRecommendation) {
    processed = processed.filter((movie) => recommendationsSet.has(movie.const))
  }

  const filtered = filterMovies(processed, filters)
  return sortMovies(filtered, sortOptions)
}

export function buildMoviesPageUrl(
  current: { filters: MovieFilters; sortOptions: MovieSortOptions },
  updates: Partial<MovieFilters & MovieSortOptions>,
): string {
  const filters: MovieFilters = { ...current.filters }
  const sortOptions: MovieSortOptions = { ...current.sortOptions }

  if ("searchQuery" in updates) {
    filters.searchQuery = updates.searchQuery || undefined
  }
  if ("isRecommendation" in updates) {
    filters.isRecommendation = updates.isRecommendation ?? filters.isRecommendation
  }
  if ("sortBy" in updates && updates.sortBy !== undefined) {
    sortOptions.sortBy = updates.sortBy
  }
  if ("sortDir" in updates && updates.sortDir !== undefined) {
    sortOptions.sortDir = updates.sortDir
  }

  const params = new URLSearchParams()
  if (filters.searchQuery) params.set("q", filters.searchQuery)
  if (!filters.isRecommendation) params.set("isRecommendation", "false")
  if (sortOptions.sortBy !== "default") params.set("sort", sortOptions.sortBy)
  if (sortOptions.sortDir !== "asc") params.set("dir", sortOptions.sortDir)

  const query = params.toString()
  return query ? `/movies/?${query}` : `/movies/`
}

export function parseUrlParams(url: URL): { filters: MovieFilters; sortOptions: MovieSortOptions } {
  const searchQuery = url.searchParams.get("q") || ""
  const isRecommendation = url.searchParams.get("isRecommendation") !== "false"
  const sortBy = (url.searchParams.get("sort") || "default") as MovieSortOptions["sortBy"]
  const sortDir = (url.searchParams.get("dir") || "asc") as MovieSortOptions["sortDir"]

  return {
    filters: {
      searchQuery: searchQuery || undefined,
      isRecommendation,
    },
    sortOptions: { sortBy, sortDir },
  }
}
