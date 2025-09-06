// Movie data processing utilities
export interface Movie {
  const: string
  title: string
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
}

export interface MovieFilters {
  searchQuery?: string
  isRecommendation?: boolean
}

export interface MovieSortOptions {
  sortBy: "title" | "year" | "yourRating" | "imdbRating" | "runtimeMins"
  sortDir: "asc" | "desc"
}

export interface ProcessedMovies {
  movies: Movie[]
}

/**
 * Creates a map of movie ratings for quick lookup
 */
export function createRatingsMap(
  ratings: Array<{ title: string; year: number; rating: number }>,
): Map<string, number> {
  return new Map(ratings.map((r) => [`${r.title} (${r.year})`, r.rating]))
}

/**
 * Creates a set of recommendation constants for quick lookup
 */
export function createRecommendationsSet(recommendations: Array<{ const: string }>): Set<string> {
  return new Set(recommendations.map((r) => r.const))
}

/**
 * Creates a map of recommendation notes for quick lookup
 */
export function createRecommendationNotesMap(
  recommendations: Array<{ const: string; note?: string | null }>,
): Map<string, string> {
  return new Map(recommendations.map((r) => [r.const, r.note || ""]).filter(([, note]) => note))
}

/**
 * Processes movies by adding ratings from the ratings data
 */
export function processMoviesWithRatings(movies: Movie[], ratingsMap: Map<string, number>): Movie[] {
  return movies.map((movie) => {
    const key = `${movie.title} (${movie.year})`
    const your_rating = ratingsMap.get(key) || movie.your_rating
    return { ...movie, your_rating }
  })
}

/**
 * Filters movies based on search query
 */
export function filterMovies(movies: Movie[], filters: MovieFilters): Movie[] {
  let filtered = movies

  // Apply search filter
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filtered = filtered.filter((movie) => {
      const searchText = `${movie.title} ${movie.directors} ${movie.genres}`.toLowerCase()
      return searchText.includes(query)
    })
  }

  return filtered
}

/**
 * Sorts movies based on the specified criteria
 */
export function sortMovies(movies: Movie[], sortOptions: MovieSortOptions): Movie[] {
  return [...movies].sort((a, b) => {
    let aVal: string | number
    let bVal: string | number

    switch (sortOptions.sortBy) {
      case "title":
        aVal = a.title.toLowerCase()
        bVal = b.title.toLowerCase()
        break
      case "year":
        aVal = a.year
        bVal = b.year
        break
      case "yourRating":
        aVal = a.your_rating
        bVal = b.your_rating
        break
      case "imdbRating":
        aVal = a.imdb_rating
        bVal = b.imdb_rating
        break
      case "runtimeMins":
        aVal = a.runtime_mins
        bVal = b.runtime_mins
        break
      default:
        aVal = a.title.toLowerCase()
        bVal = b.title.toLowerCase()
    }

    if (aVal < bVal) return sortOptions.sortDir === "asc" ? -1 : 1
    if (aVal > bVal) return sortOptions.sortDir === "asc" ? 1 : -1
    return 0
  })
}

/**
 * Main function to process movies with all filters and sorting
 */
export function processMovies(
  movies: Movie[],
  ratings: Array<{ title: string; year: number; rating: number }>,
  recommendations: Array<{ const: string; note?: string | null }>,
  filters: MovieFilters,
  sortOptions: MovieSortOptions,
): ProcessedMovies {
  const ratingsMap = createRatingsMap(ratings)
  const recommendationsSet = createRecommendationsSet(recommendations)

  let processedMovies = processMoviesWithRatings(movies, ratingsMap)

  // Apply recommendation filter if needed
  if (filters.isRecommendation) {
    processedMovies = processedMovies.filter((movie) => recommendationsSet.has(movie.const))
  }

  // Apply search filter
  const filteredMovies = filterMovies(processedMovies, filters)
  const sortedMovies = sortMovies(filteredMovies, sortOptions)

  return {
    movies: sortedMovies,
  }
}

/**
 * Parses URL search parameters into typed objects
 */
export function parseUrlParams(url: URL): { filters: MovieFilters; sortOptions: MovieSortOptions } {
  const searchQuery = url.searchParams.get("q") || ""
  const isRecommendation = url.searchParams.get("isRecommendation") === "true"
  const sortBy = (url.searchParams.get("sort") || "title") as MovieSortOptions["sortBy"]
  const sortDir = (url.searchParams.get("dir") || "asc") as MovieSortOptions["sortDir"]

  return {
    filters: {
      searchQuery: searchQuery || undefined,
      isRecommendation: isRecommendation || undefined,
    },
    sortOptions: { sortBy, sortDir },
  }
}
