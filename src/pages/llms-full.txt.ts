import type { APIContext } from "astro"
import { generateLlmsFullTxt } from "../content/llms"

export async function GET(context: APIContext) {
  const content = await generateLlmsFullTxt({ siteUrl: context.site })
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
