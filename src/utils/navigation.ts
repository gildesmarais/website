export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  const base = href.endsWith("/") ? href : `${href}/`
  return pathname === href || pathname.startsWith(base)
}
