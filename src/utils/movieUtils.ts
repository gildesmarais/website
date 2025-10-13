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

// Filter out TV series, shorts, and other non-movie content
export function filterMoviesOnly(movies: Movie[]): Movie[] {
  return movies.filter((movie) => movie.title_type === "Movie")
}

export function filterMovies(movies: Movie[], filters: MovieFilters): Movie[] {
  let filtered = movies

  if (filters.searchQuery?.trim()) {
    const query = filters.searchQuery.trim().toLowerCase()
    filtered = filtered.filter((movie) => {
      const searchText = `${movie.title || ""} ${movie.directors || ""} ${movie.genres || ""}`.toLowerCase()
      return searchText.includes(query)
    })
  }

  return filtered
}

export function sortMovies(movies: Movie[], sortOptions: MovieSortOptions): Movie[] {
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

export function processMovies(
  movies: Movie[],
  recommendationsSet: Set<string>,
  filters: MovieFilters,
  sortOptions: MovieSortOptions,
): ProcessedMovies {
  let processedMovies = filterMoviesOnly(movies)

  if (filters.isRecommendation) {
    processedMovies = processedMovies.filter((movie) => recommendationsSet.has(movie.const))
  }

  const filteredMovies = filterMovies(processedMovies, filters)
  const sortedMovies = sortMovies(filteredMovies, sortOptions)

  return {
    movies: sortedMovies,
  }
}

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
