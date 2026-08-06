import { describe, expect, it } from "vitest"
import {
  buildMoviesPageUrl,
  buildSearchString,
  defaultSortDir,
  nextSortOptions,
  parseUrlParams,
  processMovies,
  recommendationChrome,
  sortMovies,
  toCatalogEntry,
  type Movie,
} from "./query"

function movie(partial: Partial<Movie> & Pick<Movie, "const" | "title">): Movie {
  return {
    year: 2000,
    your_rating: 7,
    date_rated: "2020-01-01",
    url: "https://example.com",
    title_type: "Movie",
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

  it("falls back to default sort and asc dir for unknown params", () => {
    const parsed = parseUrlParams(new URL("https://example.com/movies/?sort=not-a-key&dir=sideways&q=x"))

    expect(parsed).toEqual({
      filters: { searchQuery: "x", isRecommendation: true },
      sortOptions: { sortBy: "default", sortDir: "asc" },
    })
  })

  it("defaults recommendation on and omits empty search", () => {
    expect(parseUrlParams(new URL("https://example.com/movies/"))).toEqual({
      filters: { searchQuery: undefined, isRecommendation: true },
      sortOptions: { sortBy: "default", sortDir: "asc" },
    })
  })
})

describe("buildSearchString", () => {
  it("joins title, directors, and genres lowercased", () => {
    expect(
      buildSearchString({
        title: "Inception",
        directors: "Christopher Nolan",
        genres: "Sci-Fi, Action",
      }),
    ).toBe("inception christopher nolan sci-fi, action")
  })

  it("tolerates missing fields", () => {
    expect(buildSearchString({ title: "Solo", directors: "", genres: "" })).toBe("solo  ")
  })
})

describe("toCatalogEntry", () => {
  it("projects catalog fields and preserves precomputed search string", () => {
    const full = movie({
      const: "tt1",
      title: "Inception",
      directors: "Christopher Nolan",
      genres: "Sci-Fi",
      original_title: "Inception",
      date_rated: "2021-01-01",
      url: "https://imdb.example/tt1",
      num_votes: 2_000_000,
      release_date: "2010-07-16",
      _searchString: "precomputed haystack",
    })

    expect(toCatalogEntry(full)).toEqual({
      const: "tt1",
      title: "Inception",
      year: 2000,
      your_rating: 7,
      imdb_rating: 7,
      runtime_mins: 100,
      genres: "Sci-Fi",
      directors: "Christopher Nolan",
      _searchString: "precomputed haystack",
    })
  })

  it("builds search string when missing", () => {
    const entry = toCatalogEntry(
      movie({
        const: "tt2",
        title: "Amélie",
        directors: "Jean-Pierre Jeunet",
        genres: "Comedy",
      }),
    )

    expect(entry._searchString).toBe(buildSearchString(entry))
  })
})

describe("processMovies", () => {
  it("filters by search and recommendation set on catalog entries", () => {
    const movies = [
      toCatalogEntry(
        movie({
          const: "tt1",
          title: "Inception",
          directors: "Christopher Nolan",
          genres: "Sci-Fi",
        }),
      ),
      toCatalogEntry(
        movie({
          const: "tt2",
          title: "Amélie",
          directors: "Jean-Pierre Jeunet",
          genres: "Comedy",
        }),
      ),
      toCatalogEntry(
        movie({
          const: "tt3",
          title: "Interstellar",
          directors: "Christopher Nolan",
          genres: "Sci-Fi",
        }),
      ),
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

describe("sortMovies", () => {
  const movies = [
    toCatalogEntry(movie({ const: "tt1", title: "Zodiac", year: 2007, your_rating: 8 })),
    toCatalogEntry(movie({ const: "tt2", title: "Amélie", year: 2001, your_rating: 9 })),
    toCatalogEntry(movie({ const: "tt3", title: "Heat", year: 1995, your_rating: 8 })),
  ]

  it("reverses catalog order when default sort is desc", () => {
    expect(sortMovies(movies, { sortBy: "default", sortDir: "desc" }).map((m) => m.const)).toEqual([
      "tt3",
      "tt2",
      "tt1",
    ])
  })

  it("sorts by title ascending and year descending", () => {
    expect(sortMovies(movies, { sortBy: "title", sortDir: "asc" }).map((m) => m.title)).toEqual([
      "Amélie",
      "Heat",
      "Zodiac",
    ])
    expect(sortMovies(movies, { sortBy: "year", sortDir: "desc" }).map((m) => m.year)).toEqual([
      2007, 2001, 1995,
    ])
  })
})
