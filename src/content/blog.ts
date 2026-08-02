import { getCollection, type CollectionEntry } from "astro:content"

type BlogEntry = CollectionEntry<"blog">
type BlogEntryLike = Pick<BlogEntry, "data">
type ShowcaseSortable = { data: Pick<BlogEntry["data"], "showcaseOrder"> }
type DateSortable = { data: Pick<BlogEntry["data"], "date"> }

const includeDrafts = import.meta.env.DEV

const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
] as const

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

export function byShowcaseOrder(a: ShowcaseSortable, b: ShowcaseSortable) {
  return (a.data.showcaseOrder ?? 0) - (b.data.showcaseOrder ?? 0)
}

export function byDateDesc(a: DateSortable, b: DateSortable) {
  return b.data.date.getTime() - a.data.date.getTime()
}

export function showcaseLead(count: number) {
  if (Number.isInteger(count) && count >= 0 && count <= 12) {
    return NUMBER_WORDS[count]
  }
  return String(count)
}

export async function getShowcasePosts() {
  return (await getCollection("blog", isVisibleShowcasePost)).sort(byShowcaseOrder)
}

export async function getArchivePosts() {
  return (await getCollection("blog", isVisibleBlogPost)).sort(byDateDesc)
}

export async function getFeedPosts() {
  return (await getCollection("blog", isVisibleEnglishBlogPost)).sort(byDateDesc)
}
