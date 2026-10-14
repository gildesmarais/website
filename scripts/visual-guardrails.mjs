import fs from "node:fs"

const cssPath = new URL("../src/styles/global.css", import.meta.url)
const globalCss = fs.readFileSync(cssPath, "utf8")

const importPaths = [...globalCss.matchAll(/@import\s+(?:url\()?["']([^"']+)["']\)?;/g)].map((m) => m[1])
if (importPaths.length !== 7) {
  console.error(`Expected 7 global CSS imports, found ${importPaths.length}`)
  process.exit(1)
}

const css = importPaths
  .map((relativePath) => {
    const path = new URL(`../src/styles/${relativePath.replace(/^\.\//, "")}`, import.meta.url)
    if (!fs.existsSync(path)) {
      console.error(`Missing imported stylesheet: ${relativePath}`)
      process.exit(1)
    }
    return fs.readFileSync(path, "utf8")
  })
  .join("\n")

const requiredSnippets = [
  "--ui-font-size: 100%",
  "@media (width >= 576px)",
  "--font-size-root-sm: 106.25%",
  "@media (width >= 1536px)",
  "--font-size-root-2xl: 131.25%",
  "a:visited",
  "color: var(--ui-primary)",
  "a:hover",
  "color: var(--ui-primary-hover)",
  "main a",
  "--underline-thick: 3px",
  "text-decoration-thickness: var(--underline-thick)",
  "h1 {",
  "--text-3xl: 2rem",
  "font-size: var(--text-3xl)",
  "h2 {",
  "--text-2xl: 1.75rem",
  "font-size: var(--text-2xl)",
]

const missing = requiredSnippets.filter((snippet) => {
  if (Array.isArray(snippet)) {
    return !snippet.some((option) => css.includes(option))
  }
  return !css.includes(snippet)
})
if (missing.length > 0) {
  console.error("Visual guardrail check failed. Missing CSS primitives:")
  missing.forEach((snippet) => {
    const label = Array.isArray(snippet) ? snippet.join(" | ") : snippet
    console.error(`- ${label}`)
  })
  process.exit(1)
}

console.log("Visual guardrails passed: typography/link primitives are present.")
