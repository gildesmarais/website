import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { isVisibleEnglishBlogPost } from "../content/blog"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", isVisibleEnglishBlogPost)
  return rss({
    title: "Gil Desmarais's Blog",
    description: "The latest posts from Gil Desmarais's blog.",
    site: context.site!,
    customData: `<copyright>© 2026 Gil Desmarais. All content is licensed under CC BY-ND 4.0.</copyright>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  })
}
