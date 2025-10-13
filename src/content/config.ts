// src/content/config.ts
import { defineCollection, z } from "astro:content"

const blog = defineCollection({
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
