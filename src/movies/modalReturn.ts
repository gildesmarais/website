export type MoviesModalReturn = {
  fromList: boolean
  href: string
}

const DEFAULT_RETURN: MoviesModalReturn = { fromList: false, href: "/movies/" }

/**
 * Resolve where the movie detail modal should return when closing without history.back.
 * Same-origin /movies and /movies/recommendations count as list referrers.
 */
export function resolveMoviesModalReturn(referrer: string, pageOrigin: string): MoviesModalReturn {
  if (!referrer) return DEFAULT_RETURN

  try {
    const refUrl = new URL(referrer)
    if (refUrl.origin !== pageOrigin) return DEFAULT_RETURN

    const path = refUrl.pathname.replace(/\/$/, "") || "/"
    if (path === "/movies") {
      return { fromList: true, href: "/movies/" }
    }
    if (path === "/movies/recommendations") {
      return { fromList: true, href: "/movies/recommendations" }
    }
  } catch {
    return DEFAULT_RETURN
  }

  return DEFAULT_RETURN
}
