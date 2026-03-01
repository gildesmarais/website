import fs from "node:fs"

const cssPath = new URL("../src/styles/global.css", import.meta.url)
const globalCss = fs.readFileSync(cssPath, "utf8")

const importPaths = [...globalCss.matchAll(/@import\s+"([^"]+)";/g)].map((m) => m[1])
if (importPaths.length !== 6) {
  console.error(`Expected 6 global CSS imports, found ${importPaths.length}`)
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
  "@media (min-width: 576px)",
  "--ui-font-size: 106.25%",
  "@media (min-width: 1536px)",
  "--ui-font-size: 131.25%",
  "a:visited",
  "color: var(--ui-primary)",
  "a:hover",
  "color: var(--ui-primary-hover)",
  "main a",
  "text-decoration-thickness: 3px",
  "h1 {",
  "font-size: 2rem",
  "h2 {",
  "font-size: 1.75rem",
]

const missing = requiredSnippets.filter((snippet) => !css.includes(snippet))
if (missing.length > 0) {
  console.error("Visual guardrail check failed. Missing CSS primitives:")
  missing.forEach((snippet) => console.error(`- ${snippet}`))
  process.exit(1)
}

console.log("Visual guardrails passed: typography/link primitives are present.")
