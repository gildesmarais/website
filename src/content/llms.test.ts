import { describe, expect, it, vi } from "vitest"
import { generateLlmsTxt, generateLlmsSmallTxt, generateLlmsFullTxt } from "./llms"

vi.mock("astro:content", () => ({
  getCollection: vi.fn(async () => [
    {
      id: "first-post",
      body: "First post content body text.",
      data: {
        title: "First Post Title",
        description: "First post summary description.",
        date: new Date("2025-01-01"),
        listed: true,
        draft: false,
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
      },
    },
  ]),
}))

describe("llms content generation", () => {
  it("generates structured llms.txt index markdown", async () => {
    const text = await generateLlmsTxt({ siteUrl: "https://gil.desmarais.de" })

    expect(text).toContain("# Gil Desmarais")
    expect(text).toContain(
      "Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0)",
    )
    expect(text).toContain("## Core Pages")
    expect(text).toContain("- [Home](https://gil.desmarais.de/): Main entry point and site overview.")
    expect(text).toContain("- [Resume](https://gil.desmarais.de/resume)")
    expect(text).toContain("## Articles & Blog Posts")
    expect(text).toContain(
      "- [Second Post Title](https://gil.desmarais.de/blog/second-post): Second post summary description.",
    )
    expect(text).toContain(
      "- [First Post Title](https://gil.desmarais.de/blog/first-post): First post summary description.",
    )
    expect(text).toContain("- [Small Content Markdown](https://gil.desmarais.de/llms-small.txt)")
    expect(text).toContain("- [Full Content Markdown](https://gil.desmarais.de/llms-full.txt)")
  })

  it("generates curated llms-small.txt markdown", async () => {
    const text = await generateLlmsSmallTxt({ siteUrl: "https://gil.desmarais.de" })

    expect(text).toContain("# Gil Desmarais")
    expect(text).toContain("A curated low-token version for IDE assistants and for smaller context windows")
    expect(text).toContain("## Core Pages")
    expect(text).toContain("- [Home](https://gil.desmarais.de/)")
    expect(text).toContain("## Articles & Blog Posts")
  })

  it("generates detailed llms-full.txt markdown", async () => {
    const text = await generateLlmsFullTxt({ siteUrl: "https://gil.desmarais.de" })

    expect(text).toContain("# Gil Desmarais — Full Site Content")
    expect(text).toContain("## License")
    expect(text).toContain(
      "Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0)",
    )
    expect(text).toContain("# Article: Second Post Title")
    expect(text).toContain("URL: https://gil.desmarais.de/blog/second-post")
    expect(text).toContain("Date: 2025-02-01")
    expect(text).toContain("Second post content body text.")
  })
})
