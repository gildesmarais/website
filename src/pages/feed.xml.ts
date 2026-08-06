import rss from "@astrojs/rss"
import { getFeedPosts } from "../content/blog"
import { copyrightNotice, site } from "../data/site"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const posts = await getFeedPosts()
  return rss({
    stylesheet: "/rss-styles.xsl",
    title: `${site.name}'s Blog`,
    description: `The latest posts from ${site.name}'s blog.`,
    site: context.site!,
    customData: `<copyright>${copyrightNotice()}</copyright>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  })
}
