import { describe, expect, it } from "vitest"
import { resolveMoviesModalReturn } from "./modalReturn"

const origin = "https://gil.desmarais.de"

describe("resolveMoviesModalReturn", () => {
  it("defaults to catalog when referrer is empty", () => {
    expect(resolveMoviesModalReturn("", origin)).toEqual({
      fromList: false,
      href: "/movies/",
    })
  })

  it("treats /movies as a list referrer", () => {
    expect(resolveMoviesModalReturn(`${origin}/movies/`, origin)).toEqual({
      fromList: true,
      href: "/movies/",
    })
    expect(resolveMoviesModalReturn(`${origin}/movies`, origin)).toEqual({
      fromList: true,
      href: "/movies/",
    })
  })

  it("treats /movies/recommendations as a list referrer", () => {
    expect(resolveMoviesModalReturn(`${origin}/movies/recommendations`, origin)).toEqual({
      fromList: true,
      href: "/movies/recommendations",
    })
    expect(resolveMoviesModalReturn(`${origin}/movies/recommendations/`, origin)).toEqual({
      fromList: true,
      href: "/movies/recommendations",
    })
  })

  it("ignores cross-origin and unrelated paths", () => {
    expect(resolveMoviesModalReturn("https://other.example/movies/", origin)).toEqual({
      fromList: false,
      href: "/movies/",
    })
    expect(resolveMoviesModalReturn(`${origin}/about`, origin)).toEqual({
      fromList: false,
      href: "/movies/",
    })
  })

  it("defaults when referrer is not a valid URL", () => {
    expect(resolveMoviesModalReturn("not a url", origin)).toEqual({
      fromList: false,
      href: "/movies/",
    })
  })
})
