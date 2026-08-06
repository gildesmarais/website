import type { APIRoute } from "astro"
import { OMDB_API_KEY } from "astro:env/server"
import { subtle } from "crypto"
import { isPosterOk, mapOmdbToPoster } from "../../../movies"

export const prerender = false

async function generateETag(data: string): Promise<string> {
  const hashBuffer = await subtle.digest("SHA-1", new TextEncoder().encode(data))
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return `"${hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")}"`
}

export const GET: APIRoute = async ({ params, request }) => {
  const imdbId = params.imdbId
  const API_KEY = OMDB_API_KEY

  if (!imdbId) {
    return new Response(JSON.stringify({ error: "IMDb ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!API_KEY) {
    console.error("OMDB_API_KEY is not set in environment variables.")
    return new Response(JSON.stringify({ error: "Server configuration error: API key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`)
    const data = await response.json()
    const mapped = mapOmdbToPoster(data)

    if (mapped && isPosterOk(mapped)) {
      const payload = JSON.stringify({
        poster: mapped.poster,
        title: mapped.title,
      })
      const etag = await generateETag(payload)

      const ifNoneMatch = request.headers.get("if-none-match")
      if (ifNoneMatch === etag) {
        return new Response(null, { status: 304 })
      }

      return new Response(payload, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=86400",
          ETag: etag,
        },
      })
    }

    const reason = mapped && !isPosterOk(mapped) ? mapped.error : "Unknown error"
    console.warn(`OMDb API: No poster found for IMDb ID: ${imdbId}. Reason: ${reason}`)
    return new Response(JSON.stringify({ error: reason === "Unknown error" ? "No poster found" : reason }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(`Error fetching from OMDb API for IMDb ID: ${imdbId}`, error)
    return new Response(JSON.stringify({ error: "Failed to fetch movie data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
