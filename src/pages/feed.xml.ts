import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && data.showcase && data.listed !== false,
  )
  return rss({
    title: "Gil Desmarais's Blog",
    description: "The latest posts from Gil Desmarais's blog.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
    })),
  })
}
