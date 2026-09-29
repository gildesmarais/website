const NOINDEX_PATHS = new Set(["/contact", "/imprint", "/404"])

function barePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1)
  return pathname
}

/** False for contact, imprint, the 404 page, and movie detail URLs. */
export function isIndexable(pathname: string): boolean {
  const path = barePath(pathname)
  if (NOINDEX_PATHS.has(path)) return false
  if (path.startsWith("/movies/tt")) return false
  return true
}

export function defaultRobots(pathname: string): string {
  return isIndexable(pathname) ? "index, follow" : "noindex, noarchive, follow"
}
