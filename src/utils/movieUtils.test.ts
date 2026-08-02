import { describe, expect, it } from "vitest"
import {
  buildMoviesPageUrl,
  defaultSortDir,
  nextSortOptions,
  parseUrlParams,
  processMovies,
  recommendationChrome,
  type Movie,
} from "./movieUtils"

function movie(partial: Partial<Movie> & Pick<Movie, "const" | "title">): Movie {
  return {
    year: 2000,
    your_rating: 7,
    date_rated: "2020-01-01",
    url: "https://example.com",
    title_type: "movie",
    imdb_rating: 7,
    runtime_mins: 100,
    genres: "Drama",
    num_votes: 1000,
    release_date: "2000-01-01",
    directors: "Director",
    ...partial,
  }
}

describe("defaultSortDir / nextSortOptions", () => {
  it("uses asc for title and desc for rating on first click", () => {
    expect(defaultSortDir("title")).toBe("asc")
    expect(defaultSortDir("yourRating")).toBe("desc")
    expect(defaultSortDir("imdbRating")).toBe("desc")

    expect(nextSortOptions({ sortBy: "default", sortDir: "asc" }, "title")).toEqual({
      sortBy: "title",
      sortDir: "asc",
    })

    expect(nextSortOptions({ sortBy: "default", sortDir: "asc" }, "yourRating")).toEqual({
      sortBy: "yourRating",
      sortDir: "desc",
    })
  })

  it("toggles direction when the same sort key is clicked again", () => {
    expect(nextSortOptions({ sortBy: "title", sortDir: "asc" }, "title")).toEqual({
      sortBy: "title",
      sortDir: "desc",
    })

    expect(nextSortOptions({ sortBy: "yourRating", sortDir: "desc" }, "yourRating")).toEqual({
      sortBy: "yourRating",
      sortDir: "asc",
    })
  })
})

describe("recommendationChrome", () => {
  it("pairs state label with the action aria label", () => {
    expect(recommendationChrome(false)).toEqual({
      stateLabel: "All movies",
      ariaLabel: "Show only recommended movies",
      title: "Show only recommended movies",
    })

    expect(recommendationChrome(true)).toEqual({
      stateLabel: "Recommended",
      ariaLabel: "Show all movies",
      title: "Show all movies",
    })
  })
})

describe("parseUrlParams ↔ buildMoviesPageUrl", () => {
  it("round-trips search, recommendation off, and non-default sort", () => {
    const current = {
      filters: { searchQuery: "nolan", isRecommendation: false },
      sortOptions: { sortBy: "year" as const, sortDir: "desc" as const },
    }

    const href = buildMoviesPageUrl(current, {})
    const parsed = parseUrlParams(new URL(href, "https://example.com"))

    expect(parsed).toEqual(current)
  })
})

describe("processMovies", () => {
  it("filters by search and recommendation set", () => {
    const movies = [
      movie({
        const: "tt1",
        title: "Inception",
        directors: "Christopher Nolan",
        genres: "Sci-Fi",
      }),
      movie({
        const: "tt2",
        title: "Amélie",
        directors: "Jean-Pierre Jeunet",
        genres: "Comedy",
      }),
      movie({
        const: "tt3",
        title: "Interstellar",
        directors: "Christopher Nolan",
        genres: "Sci-Fi",
      }),
    ]
    const recommendations = new Set(["tt1", "tt2"])

    const result = processMovies(
      movies,
      recommendations,
      { searchQuery: "nolan", isRecommendation: true },
      { sortBy: "default", sortDir: "asc" },
    )

    expect(result.map((m) => m.const)).toEqual(["tt1"])
  })
})
