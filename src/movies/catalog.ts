import moviesData from "../data/movies.json"
import recommendationsData from "../data/recommendations.json"
import { buildSearchString, type Movie } from "./query"

export interface MovieCache {
  movies: Movie[]
  moviesMap: Map<string, Movie>
  recommendationsSet: Set<string>
  recommendationNotes: Map<string, string>
}

export type MovieRecommendation = { const?: string; note?: string | null }

let movieCache: MovieCache | null = null

/**
 * Pure cache builder: Movie-only filter, search haystack, maps/sets.
 * Injectable for tests; runtime uses getMovieCache() with JSON imports.
 */
export function buildMovieCache(movies: Movie[], recommendations: MovieRecommendation[]): MovieCache {
  const processedMovies = movies
    .filter((movie) => movie.title_type === "Movie")
    .map((movie) => ({
      ...movie,
      _searchString: buildSearchString(movie),
    }))

  return {
    movies: processedMovies,
    moviesMap: new Map(processedMovies.map((m) => [m.const, m])),
    recommendationsSet: new Set(recommendations.map((r) => r.const).filter((c): c is string => !!c)),
    recommendationNotes: new Map(
      recommendations.filter((r) => r.const && r.note).map((r) => [r.const as string, r.note as string]),
    ),
  }
}

/**
 * Returns the centralized movie and recommendation data.
 * The cache is initialized once and persists in memory for the lifetime of the process/lambda.
 */
export function getMovieCache(): MovieCache {
  if (!movieCache) {
    movieCache = buildMovieCache(moviesData as Movie[], recommendationsData)
  }
  return movieCache
}
