import { describe, expect, it } from "vitest"
import {
  projects,
  projectStatusGlossary,
  type ProjectStatus,
} from "./projects"

const REGISTRY_HOSTS = new Set(["rubygems.org", "npmjs.com", "crates.io", "hub.docker.com"])

function hostnameOf(url: string): string | null {
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, "")
  } catch {
    return null
  }
}

function isRegistryUrl(url: string): boolean {
  // Site paths stay relative; protocol-relative // is absolute.
  if (url.startsWith("/") && !url.startsWith("//")) return false
  const host = hostnameOf(url)
  return host !== null && REGISTRY_HOSTS.has(host)
}

describe("projects catalog", () => {
  it("gives every project a glossary status", () => {
    for (const project of projects) {
      expect(projectStatusGlossary[project.status], `${project.id} status`).toBeTruthy()
    }
  })

  it("exposes a glossary entry for each ProjectStatus", () => {
    const statuses = Object.keys(projectStatusGlossary) as ProjectStatus[]
    expect(statuses.sort()).toEqual(["evergreen", "legacy", "maintained"].sort())
    for (const status of statuses) {
      expect(projectStatusGlossary[status].trim().length).toBeGreaterThan(0)
    }
  })

  it("uses https for every absolute project link and highlight href", () => {
    for (const project of projects) {
      for (const link of project.links ?? []) {
        if (link.url.startsWith("/") && !link.url.startsWith("//")) continue
        const host = hostnameOf(link.url)
        expect(host, `${project.id} link ${link.text}`).toBeTruthy()
        expect(new URL(link.url).protocol, `${project.id} link ${link.text}`).toBe("https:")
      }
      for (const highlight of project.highlights ?? []) {
        if (!highlight.href) continue
        if (highlight.href.startsWith("/") && !highlight.href.startsWith("//")) continue
        expect(new URL(highlight.href).protocol, `${project.id} highlight ${highlight.term}`).toBe(
          "https:",
        )
      }
    }
  })

  it("requires supplyChain when a project links a registry", () => {
    for (const project of projects) {
      const hasRegistryLink = (project.links ?? []).some((link) => isRegistryUrl(link.url))
      if (!hasRegistryLink) continue

      expect(project.supplyChain?.trim().length ?? 0, `${project.id} missing supplyChain`).toBeGreaterThan(
        0,
      )
    }
  })

  it("keeps a single MCP URL for html2rss", () => {
    const html2rss = projects.find((p) => p.id === "html2rss")
    expect(html2rss).toBeDefined()
    const urls = [
      ...(html2rss!.links ?? []).map((l) => l.url),
      ...(html2rss!.highlights ?? []).flatMap((h) => (h.href ? [h.href] : [])),
    ].filter((url) => url.includes("mcp-server"))
    expect(urls).toHaveLength(1)
  })
})
