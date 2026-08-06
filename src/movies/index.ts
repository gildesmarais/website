/**
 * Public movie domain surface for pages and the poster API.
 * Prefer importing from here over deep paths; tests may import siblings directly.
 */
export { getMovieCache } from "./catalog"
export type { MovieCache } from "./catalog"

export {
  processMovies,
  parseUrlParams,
  toCatalogEntry,
  buildMoviesPageUrl,
  nextSortOptions,
  recommendationChrome,
  type Movie,
  type MovieCatalogEntry,
  type MovieFilters,
  type MovieSortOptions,
  type SortBy,
  type SortDir,
} from "./query"

export {
  mapOmdbToPoster,
  isPosterOk,
  isImdbId,
  type PosterResponse,
  type PosterOk,
  type PosterErr,
} from "./poster"

export { initPosterLoader } from "./posterLoader"
export { initMovieList } from "./listClient"
