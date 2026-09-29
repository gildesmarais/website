import { describe, expect, it } from "vitest"
import { defaultRobots, isIndexable } from "./seo"

describe("isIndexable", () => {
  it("excludes contact, imprint, 404, and movie detail paths", () => {
    expect(isIndexable("/contact")).toBe(false)
    expect(isIndexable("/contact/")).toBe(false)
    expect(isIndexable("/imprint")).toBe(false)
    expect(isIndexable("/imprint/")).toBe(false)
    expect(isIndexable("/404")).toBe(false)
    expect(isIndexable("/404/")).toBe(false)
    expect(isIndexable("/movies/tt1375666")).toBe(false)
    expect(isIndexable("/movies/tt1375666/")).toBe(false)
  })

  it("includes the homepage, résumé, and movie index surfaces", () => {
    expect(isIndexable("/")).toBe(true)
    expect(isIndexable("/resume")).toBe(true)
    expect(isIndexable("/resume/")).toBe(true)
    expect(isIndexable("/movies")).toBe(true)
    expect(isIndexable("/movies/recommendations")).toBe(true)
  })
})

describe("defaultRobots", () => {
  it("noindexes the four excluded rules", () => {
    const noindex = "noindex, noarchive, follow"
    expect(defaultRobots("/contact")).toBe(noindex)
    expect(defaultRobots("/imprint/")).toBe(noindex)
    expect(defaultRobots("/404")).toBe(noindex)
    expect(defaultRobots("/movies/tt0111161")).toBe(noindex)
  })

  it("indexes every other path", () => {
    expect(defaultRobots("/")).toBe("index, follow")
    expect(defaultRobots("/about")).toBe("index, follow")
    expect(defaultRobots("/resume")).toBe("index, follow")
  })
})
