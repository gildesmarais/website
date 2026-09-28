import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const distClient = path.join(root, "dist", "client")
const vercelConfigPath = path.join(root, ".vercel", "output", "config.json")
const siteOrigin = "https://gil.desmarais.de"

const errors = []

function fail(message) {
  errors.push(message)
}

function read(relOrAbs) {
  const abs = path.isAbsolute(relOrAbs) ? relOrAbs : path.join(distClient, relOrAbs)
  if (!fs.existsSync(abs)) {
    fail(`Missing file: ${path.relative(root, abs)}`)
    return null
  }
  return fs.readFileSync(abs, "utf8")
}

function stripToText(html) {
  let text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  text = text.replace(/<[^>]+>/g, " ")
  return text.replace(/\s+/g, " ").trim()
}

function urlToDistFile(urlString) {
  let pathname
  try {
    const url = new URL(urlString, siteOrigin)
    if (url.origin !== siteOrigin) return null
    pathname = url.pathname
  } catch {
    return null
  }

  if (pathname.endsWith("/")) {
    return pathname === "/" ? "index.html" : `${pathname.slice(1)}index.html`
  }

  const bare = pathname.replace(/^\//, "")
  if (!bare) return "index.html"
  if (path.extname(bare)) return bare
  return `${bare}/index.html`
}

function extractMarkdownHrefs(markdown) {
  const hrefs = []
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    hrefs.push(match[1])
  }
  return hrefs
}

// --- Endpoint checks ---

if (!fs.existsSync(distClient)) {
  console.error(`Expected build output at ${path.relative(root, distClient)}. Run npm run build first.`)
  process.exit(1)
}

const feed = read("feed.xml")
if (feed) {
  const withoutDecl = feed.replace(/^<\?xml[^?]*\?>\s*/i, "").replace(/^<\?xml-stylesheet[^?]*\?>\s*/i, "")
  if (!/^<rss\b/i.test(withoutDecl.trimStart())) {
    fail("feed.xml root element is not <rss>")
  }
}

const homeHtml = read("index.html")
if (homeHtml && !/type=["']application\/rss\+xml["']/.test(homeHtml)) {
  fail("index.html head does not advertise application/rss+xml")
}

const llmsTxt = read("llms.txt")
if (llmsTxt) {
  for (const href of extractMarkdownHrefs(llmsTxt)) {
    const rel = urlToDistFile(href)
    if (rel === null) continue
    const abs = path.join(distClient, rel)
    if (!fs.existsSync(abs)) {
      fail(`llms.txt internal link missing in dist: ${href} → ${rel}`)
    }
  }
}

const sitemap = read("sitemap-0.xml")
if (sitemap) {
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  for (const loc of locs) {
    const rel = urlToDistFile(loc)
    if (rel === null) {
      fail(`sitemap URL outside site origin: ${loc}`)
      continue
    }
    const html = read(rel)
    if (html && /\bnoindex\b/i.test(html)) {
      fail(`sitemap URL HTML carries noindex: ${loc}`)
    }
  }
}

const robots = read("robots.txt")
if (robots && !/sitemap:\s*https:\/\/gil\.desmarais\.de\/sitemap/i.test(robots)) {
  fail("robots.txt does not reference the sitemap")
}

if (fs.existsSync(vercelConfigPath)) {
  const config = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8"))
  const routes = Array.isArray(config.routes) ? config.routes : []
  const wellKnown = routes.find(
    (route) =>
      typeof route.src === "string" &&
      /well-known\/llms\\.txt/.test(route.src) &&
      Number(route.status) === 301,
  )
  if (!wellKnown) {
    fail(".vercel/output/config.json missing 301 for /.well-known/llms.txt")
  }
} else {
  fail("Missing .vercel/output/config.json (adapter redirect output)")
}

if (!fs.existsSync(path.join(distClient, "404.html"))) {
  fail("404.html does not exist in dist/client")
}

// --- Narrative checks ---

const bannedPatterns = [
  { label: "translat", regex: /translat/i },
  { label: "roadmap", regex: /roadmap/i },
  { label: "Staff-level", regex: /Staff-level/ },
  { label: "incremental delivery", regex: /incremental delivery/i },
  { label: "guide teams", regex: /guide teams/i },
  { label: "(hands-on)", regex: /\(hands-on\)/ },
  { label: String.raw`\bleading\b`, regex: /\bleading\b/ },
  {
    label: String.raw`\blead(s)? (teams|engineers|people)\b`,
    regex: /\bleads? (teams|engineers|people)\b/i,
  },
]

/** Case-sensitive product names banned on hiring surfaces. */
const bannedAiToolNames = [
  "ChatGPT",
  "Claude",
  "Copilot",
  "Cursor",
  "Gemini",
  "OpenAI",
  "Anthropic",
  "Perplexity",
  "Midjourney",
  "GPT-4",
  "GPT-5",
]

const narrativeTargets = [
  { label: "/", file: "index.html", kind: "html" },
  { label: "/resume/", file: "resume/index.html", kind: "html" },
  { label: "/contact/", file: "contact/index.html", kind: "html" },
  { label: "/about/", file: "about/index.html", kind: "html" },
  { label: "/projects/", file: "projects/index.html", kind: "html" },
  { label: "llms.txt", file: "llms.txt", kind: "text" },
  { label: "llms-full.txt", file: "llms-full.txt", kind: "text" },
]

for (const target of narrativeTargets) {
  const raw = read(target.file)
  if (raw === null) continue
  const text = target.kind === "html" ? stripToText(raw) : raw

  for (const { label, regex } of bannedPatterns) {
    if (regex.test(text)) {
      fail(`narrative banned term "${label}" found in ${target.label}`)
    }
  }

  for (const name of bannedAiToolNames) {
    if (text.includes(name)) {
      fail(`narrative banned AI tool name "${name}" found in ${target.label}`)
    }
  }
}

if (homeHtml) {
  const heroMatch = homeHtml.match(/class="[^"]*\bhero-subtitle\b[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
  if (!heroMatch) {
    fail("homepage missing .hero-subtitle")
  } else {
    const heroText = stripToText(heroMatch[1])
    const hasCapitalI = /\b(I|I'm|I've|I'd)\b/.test(heroText)
    const hasOtherFirstPerson = /\b(me|my|mine|we|our|ours|myself)\b/i.test(heroText)
    if (hasCapitalI || hasOtherFirstPerson) {
      fail(".hero-subtitle on / contains a first-person pronoun")
    }
  }
}

if (errors.length > 0) {
  console.error("Dist guardrail check failed:")
  for (const message of errors) {
    console.error(`- ${message}`)
  }
  process.exit(1)
}

console.log("Dist guardrails passed: endpoints and hiring narrative checks OK.")
