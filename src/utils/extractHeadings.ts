import { remark } from "remark"
import remarkToc from "remark-toc"
import { visit } from "unist-util-visit"
import type { Heading } from "mdast"

export interface HeadingData {
  depth: number
  slug: string
  text: string
}

export function extractHeadings(content: string): HeadingData[] {
  const headings: HeadingData[] = []

  try {
    // Process the markdown to extract headings
    const processor = remark()
    const tree = processor.parse(content)

    // Visit all heading nodes
    visit(tree, "heading", (node: Heading) => {
      if (node.depth > 1) {
        // Skip h1 headings
        const text = extractTextFromNode(node)
        const slug = generateSlug(text)

        headings.push({
          depth: node.depth,
          slug,
          text,
        })
      }
    })
  } catch (error) {
    console.warn("Failed to extract headings:", error)
  }

  return headings
}

function extractTextFromNode(node: any): string {
  if (node.type === "text") {
    return node.value
  }

  if (node.children) {
    return node.children.map(extractTextFromNode).join("")
  }

  return ""
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}
