import { afterEach, describe, expect, it, vi } from "vitest"

type BlogDataStub = {
  draft?: boolean
  listed?: boolean
  showcaseOrder?: number
  language?: string
  date?: Date
}

type EntryStub = { data: BlogDataStub }

function entry(data: BlogDataStub): EntryStub {
  return { data }
}

async function loadBlog(dev: boolean) {
  vi.resetModules()
  vi.stubEnv("DEV", dev)
  return import("./blog")
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe("blog predicates", () => {
  it("filters draft / listed / showcaseOrder / language on plain stubs", async () => {
    const { isRenderableBlogPost, isVisibleBlogPost, isVisibleShowcasePost, isVisibleEnglishBlogPost } =
      await loadBlog(false)

    const matrix = [
      {
        name: "draft",
        stub: entry({ draft: true, listed: true, language: "en" }),
        expect: [false, false, false, false],
      },
      {
        name: "unlisted",
        stub: entry({ draft: false, listed: false, language: "en" }),
        expect: [true, false, false, false],
      },
      {
        name: "showcase",
        stub: entry({ draft: false, listed: true, showcaseOrder: 1, language: "en" }),
        expect: [true, true, true, true],
      },
      {
        name: "german",
        stub: entry({ draft: false, listed: true, language: "de" }),
        expect: [true, true, false, false],
      },
      {
        name: "english default language",
        stub: entry({ draft: false, listed: true }),
        expect: [true, true, false, true],
      },
    ] as const

    for (const row of matrix) {
      // Predicates only read the stubbed fields; cast keeps fixtures tiny.
      const stub = row.stub as Parameters<typeof isRenderableBlogPost>[0]
      expect(
        [
          isRenderableBlogPost(stub),
          isVisibleBlogPost(stub),
          isVisibleShowcasePost(stub),
          isVisibleEnglishBlogPost(stub),
        ],
        row.name,
      ).toEqual([...row.expect])
    }
  })

  it("includes drafts when DEV is true", async () => {
    const { isRenderableBlogPost, isVisibleBlogPost } = await loadBlog(true)
    const draft = entry({ draft: true, listed: true }) as Parameters<typeof isRenderableBlogPost>[0]

    expect(isRenderableBlogPost(draft)).toBe(true)
    expect(isVisibleBlogPost(draft)).toBe(true)
  })
})

describe("blog sorts", () => {
  it("orders by showcaseOrder ascending and date descending", async () => {
    const { byShowcaseOrder, byDateDesc } = await loadBlog(false)

    const showcase = [
      entry({ showcaseOrder: 3 }),
      entry({ showcaseOrder: 1 }),
      entry({ showcaseOrder: 2 }),
    ].sort(byShowcaseOrder)
    expect(showcase.map((e) => e.data.showcaseOrder)).toEqual([1, 2, 3])

    const dated = (
      [
        entry({ date: new Date("2024-01-01") }),
        entry({ date: new Date("2025-06-01") }),
        entry({ date: new Date("2023-12-31") }),
      ] as Parameters<typeof byDateDesc>[0][]
    ).sort(byDateDesc)
    expect(dated.map((e) => e.data.date.toISOString().slice(0, 10))).toEqual([
      "2025-06-01",
      "2024-01-01",
      "2023-12-31",
    ])
  })
})

describe("showcaseLead", () => {
  it("uses number words through twelve and digits above", async () => {
    const { showcaseLead } = await loadBlog(false)

    expect(showcaseLead(5)).toBe("Five")
    expect(showcaseLead(12)).toBe("Twelve")
    expect(showcaseLead(13)).toBe("13")
  })
})
