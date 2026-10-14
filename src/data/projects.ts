import { slugify } from "../utils/slugify"

export type ProjectStatus = "maintained" | "evergreen" | "legacy"

/** Public status glossary — one map, rendered once on /projects and used by tests. */
export const projectStatusGlossary: Record<ProjectStatus, string> = {
  maintained: "accepting issues/PRs, releases ongoing",
  evergreen: "feature-complete, fixes on request",
  legacy: "kept for reference, no new work",
}

export type ProjectLink = {
  text: string
  url: string
  external?: boolean
}

export type ProjectHighlight = {
  term: string
  definition: string
  href?: string
  external?: boolean
}

export type HomepageHighlight = {
  term: string
  href: string
  definition: string
  external?: boolean
}

export type Project = {
  id: string
  title: string
  status: ProjectStatus
  description: string
  highlights?: readonly ProjectHighlight[]
  links?: readonly ProjectLink[]
  /** How the project is published and verified — not a highlight term. */
  supplyChain?: string
  /** Trusted static HTML paragraphs for the projects page body. */
  bodyHtml: readonly string[]
  /** When set, included in the homepage open-source strip. */
  homepage?: HomepageHighlight
}

const HTML2RSS_MCP_URL = "https://html2rss.github.io/ruby-gem/reference/mcp-server/"

export const projects = [
  {
    id: "html2rss",
    title: "html2rss",
    status: "maintained",
    description: "Open-source org — turns any website into RSS 2.0 or JSON Feed.",
    highlights: [
      {
        term: "Extraction",
        definition: "Feeds from sites that never offered one, without writing selectors.",
      },
      {
        term: "Dynamic sites",
        definition: "JavaScript-heavy pages work too; a browser starts only when needed.",
      },
      {
        term: "Discovery",
        definition: "Finds the right listing page when the homepage says too little.",
      },
      {
        term: "MCP",
        definition: "Agents build and ship feeds with the same tools people use.",
        href: HTML2RSS_MCP_URL,
        external: true,
      },
      {
        term: "Safety",
        definition: "Safe to self-host: it stays out of your private network by default.",
      },
      {
        term: "Approach",
        definition: "Root causes over workarounds, loud failures, performance measured before tuned.",
      },
      {
        term: "Self-hosted",
        definition: "Ruby gem plus a Docker web app that runs on your own hardware.",
      },
      {
        term: "RubyGems",
        definition: "58k+ downloads",
        href: "https://rubygems.org/gems/html2rss/",
        external: true,
      },
      {
        term: "Docker Hub",
        definition: "16k+ pulls",
        href: "https://hub.docker.com/r/html2rss/web",
        external: true,
      },
    ],
    supplyChain:
      "Every release traceable to its source: RubyGems trusted publishing, Docker images with provenance and SBOM.",
    links: [
      { text: "Project website", url: "https://html2rss.github.io/", external: true },
      { text: "GitHub Organization", url: "https://github.com/html2rss", external: true },
      { text: "RubyGems", url: "https://rubygems.org/gems/html2rss/", external: true },
      { text: "Docker Hub", url: "https://hub.docker.com/r/html2rss/web", external: true },
      { text: "Kanban Board", url: "https://github.com/orgs/html2rss/projects/3/views/1", external: true },
    ],
    bodyHtml: [
      "html2rss brings RSS back to sites that never had it (or quietly killed it). It reads what a page already says about itself before guessing, and starts a browser only when a page needs one. YAML selectors stay available when you know the markup.",
      'The <a href="https://github.com/html2rss" target="_blank" rel="noopener noreferrer">html2rss organization</a> spans the Ruby gem, a self-hostable web app (paste a URL, get a feed), 220 ready-made site feeds, the docs site, and a headless scrape API.',
    ],
    homepage: {
      term: "html2rss",
      href: "https://github.com/html2rss",
      external: true,
      definition: "Open-source org — any site to RSS or JSON Feed; self-hosted, MCP server",
    },
  },
  {
    id: "moodbar-rs",
    title: "moodbar.rs",
    status: "maintained",
    description: "Cross-platform Rust toolkit for audio moodbars.",
    highlights: [
      { term: "Rust core", definition: "Pure-Rust stack powered by Symphonia + RustFFT." },
      { term: "WASM", definition: "Browser-ready WebAssembly bindings with a live demo." },
      { term: "Native", definition: "iOS and Android bindings alongside CLI releases." },
      { term: "Platforms", definition: "Linux and macOS are first-class release targets." },
      { term: "Legacy output", definition: "Supports legacy-compatible raw moodbar byte generation." },
      {
        term: "Batch workflows",
        definition: "Batch generation pipeline for processing whole music folders.",
      },
    ],
    supplyChain:
      "Every artifact traceable to its source commit: npm provenance, attested GitHub release builds; crates.io via API token.",
    links: [
      {
        text: "Project site + demo",
        url: "https://gildesmarais.github.io/moodbar.rs/",
        external: true,
      },
      { text: "GitHub Repository", url: "https://github.com/gildesmarais/moodbar.rs", external: true },
      { text: "crates.io", url: "https://crates.io/crates/moodbar", external: true },
      { text: "@moodbar/wasm", url: "https://www.npmjs.com/package/@moodbar/wasm", external: true },
      { text: "@moodbar/native", url: "https://www.npmjs.com/package/@moodbar/native", external: true },
    ],
    bodyHtml: [
      'moodbar.rs turns audio into visual fingerprints by combining signal processing with practical developer tooling. It is built for DJs and audio broadcasters who need to scan large libraries quickly and choose tracks with more confidence. Rust ships on crates.io; WASM and native packages ship on npm — including <a href="https://github.com/gildesmarais/moodbar.rs/blob/v0.7.1/packages/moodbar-native/ios/MoodbarNativeModule.swift" target="_blank" rel="noopener noreferrer">released Swift iOS bindings</a>.',
    ],
    homepage: {
      term: "moodbar.rs",
      href: "https://gildesmarais.github.io/moodbar.rs/",
      external: true,
      definition: "Rust audio toolkit — CLI, native, WASM; live demo",
    },
  },
  {
    id: "dotfiles",
    title: ".dotfiles",
    status: "evergreen",
    description: "My macOS and CLI config in ~/.dotfiles, linked with rcup.",
    links: [{ text: "GitHub Repo", url: "https://github.com/gildesmarais/dotfiles", external: true }],
    highlights: [
      {
        term: "Workstation",
        definition: "Same Brewfile, zsh, and editor config on each Mac.",
      },
      {
        term: "Agent skills",
        definition: "Planning, review, and delivery. Install with npx skills, or rcup.",
      },
      {
        term: "Guided defaults",
        definition:
          "macos-defaults-apply prompts, then applies macOS defaults. Touch ID sudo and Apple Watch unlock stay manual.",
      },
    ],
    bodyHtml: ["brew bundle installs the Brewfile."],
    homepage: {
      term: "dotfiles",
      href: "https://github.com/gildesmarais/dotfiles",
      external: true,
      definition: "macOS/CLI infrastructure — agent skills and syncable workstation setup",
    },
  },
  {
    id: "jekyll-loading-lazy",
    title: "jekyll-loading-lazy",
    status: "legacy",
    description: "Drop-in lazy loading for Jekyll (img/iframe). Instant performance wins.",
    highlights: [
      { term: "Automatic", definition: "Injects loading attributes into images/iframes at build time." },
      { term: "Low-touch", definition: "Works without editing content files or templates." },
      {
        term: "No JS",
        definition: "Native lazy-load via the loading attribute; removes third-party scripts.",
      },
      {
        term: "Adoption",
        definition: "69k+ RubyGems downloads.",
        href: "https://rubygems.org/gems/jekyll-loading-lazy",
        external: true,
      },
    ],
    supplyChain: "Published via API token; no provenance attestation.",
    links: [
      { text: "RubyGems", url: "https://rubygems.org/gems/jekyll-loading-lazy", external: true },
      {
        text: "GitHub Repository",
        url: "https://github.com/gildesmarais/jekyll-loading-lazy",
        external: true,
      },
      { text: "Introduction blog post", url: "/blog/loading-images-lazily-with-jekyll/" },
    ],
    bodyHtml: [
      'Static sites deserve to be fast without extra chores. This plugin adds the native <code>loading="lazy"</code> attribute to images and iframes during the build, no template changes needed. Maintainers get Core Web Vitals improvements and one less script to ship.',
    ],
  },
] as const satisfies readonly Project[]

export function projectSlug(project: Pick<Project, "title">): string {
  return slugify(project.title)
}

/** Homepage open-source strip — derived from the projects catalog. */
export const homepageOpenSource: HomepageHighlight[] = projects.flatMap((p) =>
  "homepage" in p && p.homepage ? [p.homepage] : [],
)
