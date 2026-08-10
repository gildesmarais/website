import { getCollection } from "astro:content"
import { isVisibleBlogPost, byDateDesc } from "./blog"
import { site, corePages } from "../data/site"

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

  lines.push("", "## Articles & Blog Posts", "")

  for (const post of posts) {
    const postUrl = `${baseUrl}/blog/${post.id}`
    const desc = post.data.description ? `: ${post.data.description}` : ""
    lines.push(`- [${post.data.title}](${postUrl})${desc}`)
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Small Content Markdown](${baseUrl}/llms-small.txt): A curated low-token version for IDE assistants and for smaller context windows.`,
    `- [Full Content Markdown](${baseUrl}/llms-full.txt): Complete text of all articles and pages in a single file.`,
    "",
  )

  return lines.join("\n")
}

export async function generateLlmsSmallTxt(options: LlmsOptions = {}): Promise<string> {
  const baseUrl = resolveBaseUrl(options.siteUrl)
  const posts = (await getCollection("blog", isVisibleBlogPost)).sort(byDateDesc)

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.name} — A curated low-token version for IDE assistants and for smaller context windows.`,
    "",
    `All written content (blog posts, articles) on this site is licensed under the **${site.licenseName} (${site.licenseShort})**.`,
    "",
    "## Core Pages",
    "",
  ]

  for (const page of corePages) {
    lines.push(`- [${page.title}](${baseUrl}${page.path}): ${page.description}`)
  }

  lines.push("", "## Articles & Blog Posts", "")

  for (const post of posts) {
    const postUrl = `${baseUrl}/blog/${post.id}`
    const desc = post.data.description ? `: ${post.data.description}` : ""
    lines.push(`- [${post.data.title}](${postUrl})${desc}`)
  }

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
    `All articles, blog posts, and written content compiled in this file are licensed under the **${site.licenseName} (${site.licenseShort})**.`,
    `To view a copy of this license, visit ${site.licenseUrl}`,
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
