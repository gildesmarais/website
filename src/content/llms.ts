import { getCollection } from "astro:content"
import { isVisibleBlogPost, byDateDesc, getShowcasePosts } from "./blog"
import { site, corePages } from "../data/site"
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

function formatRecommendedTitle(movie: { title: string; year: number }): string {
  return `${movie.title} (${movie.year})`
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
    lines.push(`- [${page.title}](${baseUrl}${page.path}): ${page.description}`)
  }

  lines.push("", "## Showcase Posts", "")

  for (const post of showcase) {
    const postUrl = `${baseUrl}/blog/${post.id}`
    const desc = post.data.description ? `: ${post.data.description}` : ""
    lines.push(`- [${post.data.title}](${postUrl})${desc}`)
  }

  lines.push("", "## Recommended Films", "", "Top 10 by personal rating (then IMDb rating, then title):", "")

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
    lines.push(`# ${page.title}`, `URL: ${baseUrl}${page.path}`, "", page.excerpt.trim(), "", "---", "")
  }

  lines.push("## Recommended Films (Top 10)", "")

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
    const postUrl = `${baseUrl}/blog/${post.id}`
    const dateStr = post.data.date.toISOString().split("T")[0]
    lines.push(
      `# Article: ${post.data.title}`,
      `URL: ${postUrl}`,
      `Date: ${dateStr}`,
      ...(post.data.description ? [`Description: ${post.data.description}`] : []),
      "",
      (post.body ?? "").trim(),
      "",
      "---",
      "",
    )
  }

  return lines.join("\n")
}
