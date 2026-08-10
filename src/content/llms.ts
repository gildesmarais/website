import { getCollection } from "astro:content"
import { isVisibleBlogPost, byDateDesc } from "./blog"
import { site } from "../data/site"

export interface LlmsOptions {
  siteUrl?: string | URL
}

function resolveBaseUrl(siteUrl?: string | URL): string {
  if (siteUrl) {
    return siteUrl.toString().replace(/\/$/, "")
  }
  return "https://gil.desmarais.de"
}

export async function generateLlmsTxt(options: LlmsOptions = {}): Promise<string> {
  const baseUrl = resolveBaseUrl(options.siteUrl)
  const posts = (await getCollection("blog", isVisibleBlogPost)).sort(byDateDesc)

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.name} — software engineer, open-source projects, engineering blog, and movie catalog.`,
    "",
    "All written content (blog posts, articles) on this site is licensed under the **Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0)**.",
    "",
    "## Core Pages",
    "",
    `- [Home](${baseUrl}/): Main entry point and site overview.`,
    `- [About](${baseUrl}/about): Background, philosophy, personal systems, and connection options.`,
    `- [Projects](${baseUrl}/projects): Key open-source software, side projects, and tools.`,
    `- [Resume](${baseUrl}/resume): Professional experience, engineering stack, and background.`,
    `- [Movies](${baseUrl}/movies): Alphabetical movie watching project & ratings catalog.`,
    `- [Contact](${baseUrl}/contact): Methods to get in touch and connect.`,
    "",
    "## Articles & Blog Posts",
    "",
  ]

  for (const post of posts) {
    const postUrl = `${baseUrl}/blog/${post.id}`
    const desc = post.data.description ? `: ${post.data.description}` : ""
    lines.push(`- [${post.data.title}](${postUrl})${desc}`)
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Full Content Markdown](${baseUrl}/llms-full.txt): Complete text of all articles and pages in a single file.`,
    "",
  )

  return lines.join("\n")
}

export async function generateLlmsFullTxt(options: LlmsOptions = {}): Promise<string> {
  const baseUrl = resolveBaseUrl(options.siteUrl)
  const posts = (await getCollection("blog", isVisibleBlogPost)).sort(byDateDesc)

  const lines: string[] = [
    `# ${site.name} — Full Site Content`,
    "",
    `> Complete plain-text compilation of articles and core pages from ${baseUrl}`,
    "",
    "## License",
    "",
    "All articles, blog posts, and written content compiled in this file are licensed under the **Creative Commons Attribution-NoDerivatives 4.0 International License (CC BY-ND 4.0)**.",
    "To view a copy of this license, visit https://creativecommons.org/licenses/by-nd/4.0/",
    "",
    "---",
    "",
  ]

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
