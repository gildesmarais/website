import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    language: z.string().default("en"),
    draft: z.boolean().default(false),
    showcase: z.boolean().default(false),
    listed: z.boolean().default(true),
    description: z.string().optional(),
    toc: z.boolean().default(true),
  }),
})

export const collections = { blog }
