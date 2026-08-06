export type PosterOk = { poster: string; title: string }
export type PosterErr = { error: string }
export type PosterResponse = PosterOk | PosterErr

export type OmdbPosterPayload = {
  Response?: string
  Poster?: string
  Title?: string
  Error?: string
}

/**
 * Maps an OMDb JSON payload to a typed poster response.
 * Returns null when the payload is unusable (missing/empty fields).
 * Caller treats null and PosterErr as not-found (404).
 */
export function mapOmdbToPoster(data: OmdbPosterPayload): PosterResponse | null {
  if (data.Response === "True") {
    if (data.Poster && data.Poster !== "N/A") {
      return {
        poster: data.Poster,
        title: data.Title || "",
      }
    }
    return { error: "No poster found" }
  }

  if (data.Error) {
    return { error: data.Error }
  }

  return null
}

export function isPosterOk(data: PosterResponse): data is PosterOk {
  return "poster" in data
}
