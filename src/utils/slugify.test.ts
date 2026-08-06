import { describe, expect, it } from "vitest"
import { projectSlug, projects } from "../data/projects"
import { slugify } from "./slugify"

describe("slugify", () => {
  it("lowercases and hyphenates whitespace", () => {
    expect(slugify("Hello World")).toBe("hello-world")
  })

  it("strips punctuation while preserving hyphens", () => {
    expect(slugify("moodbar.rs")).toBe("moodbarrs")
    expect(slugify("jekyll-loading-lazy")).toBe("jekyll-loading-lazy")
  })

  it("trims leading/trailing hyphens after punctuation removal", () => {
    expect(slugify(".dotfiles & Scripts")).toBe("dotfiles--scripts")
    expect(slugify("---Edge---")).toBe("edge")
  })
})

describe("projectSlug", () => {
  it("matches slugify for every catalog title", () => {
    for (const project of projects) {
      expect(projectSlug(project)).toBe(slugify(project.title))
    }
  })
})
