import { describe, expect, it, vi } from "vitest"
import { generateLlmsTxt, generateLlmsFullTxt } from "./llms"

vi.mock("astro:content", () => {
  const posts = [
    {
      id: "first-post",
      body: "First post content body text.",
      data: {
        title: "First Post Title",
        description: "First post summary description.",
        date: new Date("2025-01-01"),
        listed: true,
        draft: false,
        showcaseOrder: 2,
      },
    },
    {
      id: "second-post",
      body: "Second post content body text.",
      data: {
        title: "Second Post Title",
        description: "Second post summary description.",
        date: new Date("2025-02-01"),
        listed: true,
        draft: false,
        showcaseOrder: 1,
      },
    },
    {
      id: "archive-only",
      body: "Archive-only body.",
      data: {
        title: "Archive Only",
        description: "Not in showcase.",
        date: new Date("2024-06-01"),
        listed: true,
        draft: false,
      },
    },
  ]

  return {
    getCollection: vi.fn(async (_name: string, filter?: (entry: (typeof posts)[number]) => boolean) =>
      filter ? posts.filter(filter) : posts,
    ),
  }
})

vi.mock("../movies", () => ({
  getMovieCache: vi.fn(() => ({
    movies: [],
    moviesMap: new Map(),
    recommendationsSet: new Set(),
    recommendationNotes: new Map(),
  })),
  listRecommendedMovies: vi.fn(() => [
    {
      movie: { title: "Inception", year: 2010, const: "tt1375666" },
      note: "Mind-bending.",
    },
    {
      movie: { title: "Heat", year: 1995, const: "tt0113277" },
    },
  ]),
}))

describe("llms content generation", () => {
  it("generates curated llms.txt with showcase, reccs, and full link only", async () => {
    const text = await generateLlmsTxt({ siteUrl: "https://gil.desmarais.de" })

    expect(text).toContain("# Gil Desmarais")
    expect(text).toContain(
      "Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0)",
    )
    expect(text).toContain("## Core Pages")
    expect(text).toContain("- [Home](https://gil.desmarais.de/): Main entry point and site overview.")
    expect(text).toContain("- [Blog](https://gil.desmarais.de/blog)")
    expect(text).toContain("- [Resume](https://gil.desmarais.de/resume)")
    expect(text).toContain("## Showcase Posts")
    expect(text).toContain(
      "- [Second Post Title](https://gil.desmarais.de/blog/second-post): Second post summary description.",
    )
    expect(text).toContain(
      "- [First Post Title](https://gil.desmarais.de/blog/first-post): First post summary description.",
    )
    expect(text).not.toContain("Archive Only")
    expect(text).toContain("## Recommended Films")
    expect(text).not.toContain("/movies/recommendations")
    expect(text).toContain("- Inception (2010)")
    expect(text).toContain("- Heat (1995)")
    expect(text).not.toContain("Mind-bending")
    expect(text).toContain("- [Full Content Markdown](https://gil.desmarais.de/llms-full.txt)")
    expect(text).not.toContain("llms-small.txt")
  })

  it("generates llms-full.txt with excerpts, notes, and article bodies", async () => {
    const text = await generateLlmsFullTxt({ siteUrl: "https://gil.desmarais.de" })

    expect(text).toContain("# Gil Desmarais — Full Site Content")
    expect(text).toContain("## License")
    expect(text).toContain(
      "Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0)",
    )
    expect(text).toContain("## Core Pages")
    expect(text).toContain("# About")
    expect(text).toContain("URL: https://gil.desmarais.de/about")
    expect(text).toContain("Background and how curiosity")
    expect(text).toContain("## Recommended Films (Top 10)")
    expect(text).toContain("### Inception (2010)")
    expect(text).toContain("Mind-bending.")
    expect(text).toContain("### Heat (1995)")
    expect(text).toContain("# Article: Second Post Title")
    expect(text).toContain("URL: https://gil.desmarais.de/blog/second-post")
    expect(text).toContain("Date: 2025-02-01")
    expect(text).toContain("Second post content body text.")
    expect(text).toContain("Archive-only body.")
  })
})
