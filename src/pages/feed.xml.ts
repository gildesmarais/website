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
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  })
}
