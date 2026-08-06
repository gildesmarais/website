import { describe, expect, it } from "vitest"
import { isImdbId, isPosterOk, mapOmdbToPoster } from "./poster"

describe("isImdbId", () => {
  it("accepts tt + digits only", () => {
    expect(isImdbId("tt0111161")).toBe(true)
    expect(isImdbId("tt1")).toBe(true)
    expect(isImdbId("tt0111161&plot=full")).toBe(false)
    expect(isImdbId("TT0111161")).toBe(false)
    expect(isImdbId("")).toBe(false)
  })
})

describe("mapOmdbToPoster", () => {
  it("maps a successful OMDb poster payload", () => {
    expect(
      mapOmdbToPoster({
        Response: "True",
        Poster: "https://example.com/poster.jpg",
        Title: "Inception",
      }),
    ).toEqual({
      poster: "https://example.com/poster.jpg",
      title: "Inception",
    })
  })

  it("returns PosterErr when Response is True but Poster is N/A", () => {
    expect(
      mapOmdbToPoster({
        Response: "True",
        Poster: "N/A",
        Title: "No Art",
      }),
    ).toEqual({ error: "No poster found" })
  })

  it("returns PosterErr with OMDb Error message", () => {
    expect(
      mapOmdbToPoster({
        Response: "False",
        Error: "Incorrect IMDb ID.",
      }),
    ).toEqual({ error: "Incorrect IMDb ID." })
  })

  it("returns null for unusable payloads", () => {
    expect(mapOmdbToPoster({})).toBeNull()
    expect(mapOmdbToPoster({ Response: "False" })).toBeNull()
  })
})

describe("isPosterOk", () => {
  it("narrows PosterOk vs PosterErr", () => {
    expect(isPosterOk({ poster: "https://x", title: "Y" })).toBe(true)
    expect(isPosterOk({ error: "No poster found" })).toBe(false)
  })
})
