import type { APIContext } from "astro"
import { generateLlmsTxt } from "../content/llms"

export async function GET(context: APIContext) {
  const content = await generateLlmsTxt({ siteUrl: context.site })
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
