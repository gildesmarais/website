import type { APIContext } from "astro"
import { generateLlmsSmallTxt } from "../content/llms"

export async function GET(context: APIContext) {
  const content = await generateLlmsSmallTxt({ siteUrl: context.site })
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
