import moviesData from "../data/movies.json"
import recommendationsData from "../data/recommendations.json"
import type { Movie } from "./movieUtils"

export interface MovieCache {
  movies: Movie[]
  recommendationsSet: Set<string>
  recommendationNotes: Map<string, string>
}

let movieCache: MovieCache | null = null

/**
 * Returns the centralized movie and recommendation data.
 * The cache is initialized once and persists in memory for the lifetime of the process/lambda.
 * This ensures high performance while centralizing the data source of truth.
 */
export function getMovieCache(): MovieCache {
  if (!movieCache) {
    movieCache = {
      movies: moviesData as Movie[],
      recommendationsSet: new Set(recommendationsData.map((r) => r.const).filter((c): c is string => !!c)),
      recommendationNotes: new Map(
        recommendationsData
          .filter((r) => r.const && r.note)
          .map((r) => [r.const as string, r.note as string]),
      ),
    }
  }
  return movieCache!
}

/**
 * Legacy wrapper for backward compatibility with existing code.
 */
export function getRecommendationsCache() {
  const cache = getMovieCache()
  return {
    set: cache.recommendationsSet,
    notes: cache.recommendationNotes,
  }
}
