import { describe, expect, it } from "vitest"
import { buildMovieCache } from "./catalog"
import { buildSearchString, type Movie } from "./query"

function movie(partial: Partial<Movie> & Pick<Movie, "const" | "title" | "title_type">): Movie {
  return {
    year: 2000,
    your_rating: 7,
    date_rated: "2020-01-01",
    url: "https://example.com",
    imdb_rating: 7,
    runtime_mins: 100,
    genres: "Drama",
    num_votes: 1000,
    release_date: "2000-01-01",
    directors: "Director",
    ...partial,
  }
}

describe("buildMovieCache", () => {
  it("keeps only title_type Movie rows", () => {
    const cache = buildMovieCache(
      [
        movie({ const: "tt1", title: "Feature", title_type: "Movie" }),
        movie({ const: "tt2", title: "Series", title_type: "TV Series" }),
        movie({ const: "tt3", title: "Short", title_type: "Short" }),
      ],
      [],
    )

    expect(cache.movies.map((m) => m.const)).toEqual(["tt1"])
    expect(cache.moviesMap.has("tt1")).toBe(true)
    expect(cache.moviesMap.has("tt2")).toBe(false)
  })

  it("builds searchString via buildSearchString helper", () => {
    const feature = movie({
      const: "tt1",
      title: "Inception",
      title_type: "Movie",
      directors: "Christopher Nolan",
      genres: "Sci-Fi",
    })
    const cache = buildMovieCache([feature], [])

    expect(cache.movies[0]._searchString).toBe(buildSearchString(feature))
  })

  it("builds recommendation set and notes map", () => {
    const cache = buildMovieCache(
      [movie({ const: "tt1", title: "A", title_type: "Movie" })],
      [{ const: "tt1", note: "Worth a rewatch" }, { const: "tt-missing" }, { note: "orphan note" }],
    )

    expect([...cache.recommendationsSet]).toEqual(["tt1", "tt-missing"])
    expect(cache.recommendationNotes.get("tt1")).toBe("Worth a rewatch")
    expect(cache.recommendationNotes.has("tt-missing")).toBe(false)
  })
})
