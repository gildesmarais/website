// src/content/config.ts
import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    language: z.string().default("en"),
    draft: z.boolean().default(false),
    showcase: z.boolean().default(false),
    description: z.string().optional(),
  }),
})

export const collections = { blog }
