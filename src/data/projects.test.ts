import { describe, expect, it } from "vitest"
import { projects, type ProjectStatus } from "./projects"

const VALID_STATUSES = new Set<ProjectStatus>(["maintained", "evergreen", "legacy"])

const REGISTRY_HOST_RE =
  /^(?:https:\/\/)?(?:www\.)?(?:rubygems\.org|npmjs\.com|crates\.io|hub\.docker\.com)\b/i

function isHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:"
  } catch {
    return false
  }
}

function linksRegistry(url: string): boolean {
  return REGISTRY_HOST_RE.test(url)
}

describe("projects catalog", () => {
  it("gives every project a valid status", () => {
    for (const project of projects) {
      expect(VALID_STATUSES.has(project.status), `${project.id} status`).toBe(true)
    }
  })

  it("uses https for every absolute project link and highlight href", () => {
    for (const project of projects) {
      for (const link of project.links ?? []) {
        if (link.url.startsWith("/")) continue
        expect(isHttpsUrl(link.url), `${project.id} link ${link.text}`).toBe(true)
      }
      for (const highlight of project.highlights ?? []) {
        if (!("href" in highlight) || !highlight.href || highlight.href.startsWith("/")) continue
        expect(isHttpsUrl(highlight.href), `${project.id} highlight ${highlight.term}`).toBe(true)
      }
    }
  })

  it("requires a Supply chain highlight when a project links a registry", () => {
    for (const project of projects) {
      const hasRegistryLink = (project.links ?? []).some((link) => linksRegistry(link.url))
      if (!hasRegistryLink) continue

      const supplyChain = project.highlights?.find((h) => h.term === "Supply chain")
      expect(supplyChain, `${project.id} missing Supply chain highlight`).toBeDefined()
      expect(supplyChain?.definition.trim().length ?? 0).toBeGreaterThan(0)
    }
  })
})
