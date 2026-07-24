import type { CollectionEntry } from "astro:content"

type BlogEntry = CollectionEntry<"blog">
type BlogEntryLike = Pick<BlogEntry, "data">

const includeDrafts = import.meta.env.DEV

export function isRenderableBlogPost({ data }: BlogEntryLike) {
  return includeDrafts || !data.draft
}

export function isVisibleBlogPost({ data }: BlogEntryLike) {
  return isRenderableBlogPost({ data }) && data.listed !== false
}

export function isVisibleShowcasePost({ data }: BlogEntryLike) {
  return isVisibleBlogPost({ data }) && data.showcaseOrder !== undefined
}

export function isVisibleEnglishBlogPost({ data }: BlogEntryLike) {
  return isVisibleBlogPost({ data }) && (data.language ?? "en") === "en"
}
