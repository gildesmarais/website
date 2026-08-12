/** Full movie row from movies.json (JSON field `const` = IMDb id). */
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
  _searchString?: string
}

export interface MovieFilters {
  searchQuery?: string
  isRecommendation: boolean
}

export const SORT_BY = ["default", "title", "year", "yourRating", "imdbRating", "runtimeMins"] as const
export type SortBy = (typeof SORT_BY)[number]

export const SORT_DIR = ["asc", "desc"] as const
export type SortDir = (typeof SORT_DIR)[number]

export type MovieSortOptions = {
  sortBy: SortBy
  sortDir: SortDir
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

const SORT_BY_SET: ReadonlySet<string> = new Set(SORT_BY)
const SORT_DIR_SET: ReadonlySet<string> = new Set(SORT_DIR)

function isSortBy(value: string): value is SortBy {
  return SORT_BY_SET.has(value)
}

function isSortDir(value: string): value is SortDir {
  return SORT_DIR_SET.has(value)
}

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

export function defaultSortDir(sortBy: SortBy): SortDir {
  return sortBy === "title" ? "asc" : "desc"
}

export function nextSortOptions(current: MovieSortOptions, clickedSortBy: SortBy): MovieSortOptions {
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

  const sortBy = sortOptions.sortBy
  const { sortDir } = sortOptions

  return [...movies].sort((a, b) => {
    const aVal = comparableSortValue(a, sortBy)
    const bVal = comparableSortValue(b, sortBy)
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1
    return 0
  })
}

function comparableSortValue(movie: MovieCatalogEntry, sortBy: Exclude<SortBy, "default">): string | number {
  switch (sortBy) {
    case "title":
      return (movie.title || "").toLowerCase()
    case "year":
      return movie.year || 0
    case "yourRating":
      return movie.your_rating || 0
    case "imdbRating":
      return movie.imdb_rating || 0
    case "runtimeMins":
      return movie.runtime_mins || 0
  }
}

/**
 * Applies recommendation filter, search, and sort.
 * Assumes input is already type-filtered (e.g. from catalog cache).
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

/** Cache shape needed for taste-ranked recommendations (avoids catalog↔query cycle). */
export type RecommendedMoviesSource = {
  movies: Movie[]
  recommendationsSet: Set<string>
  recommendationNotes: Map<string, string>
}

export type RecommendedMovie = {
  movie: Movie
  note?: string
}

export type ListRecommendedMoviesOptions = {
  limit?: number
}

/**
 * Recommended ∩ catalog, ranked by your_rating desc → imdb_rating desc → title.
 * Skips recommendation ids missing from the catalog. Optionally slices the top N.
 */
export function listRecommendedMovies(
  cache: RecommendedMoviesSource,
  options: ListRecommendedMoviesOptions = {},
): RecommendedMovie[] {
  const ranked = cache.movies
    .filter((movie) => cache.recommendationsSet.has(movie.const))
    .sort((a, b) => {
      if (a.your_rating !== b.your_rating) return b.your_rating - a.your_rating
      if (a.imdb_rating !== b.imdb_rating) return b.imdb_rating - a.imdb_rating
      return (a.title || "").localeCompare(b.title || "", undefined, { sensitivity: "base" })
    })
    .map((movie) => {
      const note = cache.recommendationNotes.get(movie.const)
      return note === undefined ? { movie } : { movie, note }
    })

  const { limit } = options
  if (limit === undefined) return ranked
  return ranked.slice(0, Math.max(0, limit))
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
  const sortParam = url.searchParams.get("sort") || "default"
  const dirParam = url.searchParams.get("dir") || "asc"

  return {
    filters: {
      searchQuery: searchQuery || undefined,
      isRecommendation,
    },
    sortOptions: {
      sortBy: isSortBy(sortParam) ? sortParam : "default",
      sortDir: isSortDir(dirParam) ? dirParam : "asc",
    },
  }
}
