import type { CollectionEntry } from "astro:content"

type BlogEntry = CollectionEntry<"blog">
type BlogEntryLike = Pick<BlogEntry, "data">

const includeDrafts = import.meta.env.DEV

export function isVisibleBlogPost({ data }: BlogEntryLike) {
  return (includeDrafts || !data.draft) && data.listed !== false
}

export function isVisibleShowcasePost({ data }: BlogEntryLike) {
  return isVisibleBlogPost({ data }) && data.showcase
}

export function isVisibleEnglishBlogPost({ data }: BlogEntryLike) {
  return isVisibleBlogPost({ data }) && (data.language ?? "en") === "en"
}
