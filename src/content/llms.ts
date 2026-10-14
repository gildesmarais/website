import { getCollection } from "astro:content"
import { isVisibleBlogPost, byDateDesc, getShowcasePosts } from "./blog"
import { site, corePages } from "../data/site"
import { projects } from "../data/projects"
import { getMovieCache, listRecommendedMovies } from "../movies"

export interface LlmsOptions {
  siteUrl?: string | URL
}

function resolveBaseUrl(siteUrl?: string | URL): string {
  if (siteUrl) {
    return siteUrl.toString().replace(/\/$/, "")
  }
  return "https://gil.desmarais.de"
}

/** Canonical site path: trailing slash except root. */
function canonicalPath(path: string): string {
  if (path === "/") return "/"
  const bare = path.replace(/\/$/, "")
  return `${bare}/`
}

function absoluteUrl(baseUrl: string, path: string): string {
  return `${baseUrl}${canonicalPath(path)}`
}

function formatRecommendedTitle(movie: { title: string; year: number }): string {
  return `${movie.title} (${movie.year})`
}

/**
 * Rewrite Markdown links in post bodies for llms-full:
 * - relative asset images → alt text only
 * - root-relative links → absolute canonical URLs
 */
export function rewriteMarkdownLinks(body: string, baseUrl: string): string {
  let text = body.replace(/!\[([^\]]*)\]\((?:\.\.?\/)[^)]+\)/g, "$1")
  text = text.replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g, (_match, label: string, path: string) => {
    const suffixMatch = path.match(/[?#].*$/)
    const pathname = suffixMatch ? path.slice(0, suffixMatch.index) : path
    const suffix = suffixMatch ? suffixMatch[0] : ""
    return `[${label}](${absoluteUrl(baseUrl, pathname)}${suffix})`
  })
  return text
}

function projectLinkHref(baseUrl: string, url: string): string {
  // Single leading slash is a site path; protocol-relative // stays absolute.
  if (url.startsWith("/") && !url.startsWith("//")) {
    return absoluteUrl(baseUrl, url)
  }
  return url
}

/** Short project index for llms.txt. */
function appendProjectsIndex(lines: string[], baseUrl: string): void {
  lines.push("", "## Projects", "")

  for (const project of projects) {
    lines.push(`### ${project.title}`, "", `Status: ${project.status}`, "", project.description, "")

    if (project.links?.length) {
      for (const link of project.links) {
        lines.push(`- [${link.text}](${projectLinkHref(baseUrl, link.url)})`)
      }
      lines.push("")
    }

    if (project.supplyChain) {
      lines.push(`Supply chain: ${project.supplyChain}`, "")
    }
  }
}

/** Full project projection for llms-full.txt. */
function appendProjectsFull(lines: string[], baseUrl: string): void {
  lines.push("", "## Projects", "")

  for (const project of projects) {
    lines.push(`### ${project.title}`, "", `Status: ${project.status}`, "", project.description, "")

    for (const paragraph of project.bodyHtml) {
      const plain = paragraph.replace(/<[^>]+>/g, "").trim()
      if (plain) lines.push(plain, "")
    }

    if (project.highlights?.length) {
      for (const highlight of project.highlights) {
        if (highlight.href) {
          const href = projectLinkHref(baseUrl, highlight.href)
          lines.push(`- **${highlight.term}**: ${highlight.definition} ([link](${href}))`)
        } else {
          lines.push(`- **${highlight.term}**: ${highlight.definition}`)
        }
      }
      lines.push("")
    }

    if (project.links?.length) {
      for (const link of project.links) {
        lines.push(`- [${link.text}](${projectLinkHref(baseUrl, link.url)})`)
      }
      lines.push("")
    }

    if (project.supplyChain) {
      lines.push(`Supply chain: ${project.supplyChain}`, "")
    }
  }
}

export async function generateLlmsTxt(options: LlmsOptions = {}): Promise<string> {
  const baseUrl = resolveBaseUrl(options.siteUrl)
  const showcase = await getShowcasePosts()
  const topRecommended = listRecommendedMovies(getMovieCache(), { limit: 10 })

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.name} — ${site.description}`,
    "",
    `All written content (blog posts, articles) on this site is licensed under the **${site.licenseName} (${site.licenseShort})**.`,
    "",
    "## Core Pages",
    "",
  ]

  for (const page of corePages) {
    lines.push(`- [${page.title}](${absoluteUrl(baseUrl, page.path)}): ${page.description}`)
  }

  appendProjectsIndex(lines, baseUrl)

  lines.push("", "## Showcase Posts", "")

  for (const post of showcase) {
    const postUrl = absoluteUrl(baseUrl, `/blog/${post.id}`)
    const desc = post.data.description ? `: ${post.data.description}` : ""
    lines.push(`- [${post.data.title}](${postUrl})${desc}`)
  }

  lines.push(
    "",
    "## Recommended Films",
    "",
    `Full ranked list with notes: [${absoluteUrl(baseUrl, "/movies/recommendations")}](${absoluteUrl(baseUrl, "/movies/recommendations")})`,
    "",
    "Top 10 by personal rating (then IMDb rating, then title):",
    "",
  )

  for (const { movie } of topRecommended) {
    lines.push(`- ${formatRecommendedTitle(movie)}`)
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Full Content Markdown](${baseUrl}/llms-full.txt): Complete text of articles, core page excerpts, and top recommended films with notes.`,
    "",
  )

  return lines.join("\n")
}

export async function generateLlmsFullTxt(options: LlmsOptions = {}): Promise<string> {
  const baseUrl = resolveBaseUrl(options.siteUrl)
  const posts = (await getCollection("blog", isVisibleBlogPost)).sort(byDateDesc)
  const topRecommended = listRecommendedMovies(getMovieCache(), { limit: 10 })

  const lines: string[] = [
    `# ${site.name} — Full Site Content`,
    "",
    `> Complete plain-text compilation of articles and core pages from ${baseUrl}`,
    "",
    "## License",
    "",
    `All articles, blog posts, and written content compiled in this file are licensed under the **${site.licenseName} (${site.licenseShort})**.`,
    `To view a copy of this license, visit ${site.licenseUrl}`,
    "",
    "---",
    "",
    "## Core Pages",
    "",
  ]

  for (const page of corePages) {
    lines.push(
      `### ${page.title}`,
      `URL: ${absoluteUrl(baseUrl, page.path)}`,
      "",
      page.excerpt.trim(),
      "",
      "---",
      "",
    )
  }

  appendProjectsFull(lines, baseUrl)
  lines.push("---", "")

  lines.push(
    "## Recommended Films (Top 10)",
    "",
    `Full ranked list: ${absoluteUrl(baseUrl, "/movies/recommendations")}`,
    "",
  )

  for (const { movie, note } of topRecommended) {
    lines.push(`### ${formatRecommendedTitle(movie)}`)
    if (note) {
      lines.push("", note.trim(), "")
    } else {
      lines.push("")
    }
  }

  lines.push("---", "")

  for (const post of posts) {
    const postUrl = absoluteUrl(baseUrl, `/blog/${post.id}`)
    const dateStr = post.data.date.toISOString().split("T")[0]
    const body = rewriteMarkdownLinks((post.body ?? "").trim(), baseUrl)
    lines.push(
      `### Article: ${post.data.title}`,
      `URL: ${postUrl}`,
      `Date: ${dateStr}`,
      ...(post.data.description ? [`Description: ${post.data.description}`] : []),
      "",
      body,
      "",
      "---",
      "",
    )
  }

  return lines.join("\n")
}
