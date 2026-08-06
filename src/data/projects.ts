import { slugify } from "../utils/slugify"

export type ProjectStatus = "maintained" | "evergreen" | "legacy"

export type ProjectLink = {
  text: string
  url: string
  external?: boolean
}

export type ProjectHighlight = {
  term: string
  definition: string
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
  /** Trusted static HTML paragraphs for the projects page body. */
  bodyHtml: readonly string[]
  /** When set, included in the homepage open-source strip. */
  homepage?: HomepageHighlight
}

export const projects = [
  {
    id: "html2rss",
    title: "html2rss",
    status: "maintained",
    description:
      "The html2rss open-source organization — a production-ready toolkit that turns arbitrary HTML into clean, structured RSS 2.0 feeds.",
    highlights: [
      { term: "Discovery", definition: "Extracts article lists declaratively; minimal brittle selectors." },
      { term: "Dynamic sites", definition: "Optional headless rendering for SPA and JS-heavy pages." },
      { term: "Normalization", definition: "Consistent titles, authors, dates, and images across sources." },
      { term: "Ops", definition: "Error handling, monitoring hooks, and rolling releases for stability." },
      { term: "Delivery", definition: "Lightweight HTTP service with caching and health checks." },
      { term: "Stack", definition: "Ruby + Roda, RSpec/VCR, Docker; portable and easy to self-host." },
    ],
    links: [
      { text: "Project website", url: "https://html2rss.github.io/", external: true },
      { text: "GitHub Organization", url: "https://github.com/html2rss", external: true },
      { text: "RubyGems", url: "https://rubygems.org/gems/html2rss/", external: true },
      { text: "Docker Hub", url: "https://hub.docker.com/r/html2rss/web", external: true },
      { text: "Kanban Board", url: "https://github.com/orgs/html2rss/projects/3/views/1", external: true },
    ],
    bodyHtml: [
      "html2rss restores open web syndication by converting any website (static or dynamic) into a reliable feed. It uses declarative extractors in YAML, supports optional headless rendering, and outputs standards-compliant XML ready for any reader or aggregator. Built for maintainers who prefer simplicity over scraping frameworks, it runs well in cron jobs or containers and brings RSS back to sites that never had it (or quietly killed it).",
      'The <a href="https://github.com/html2rss" target="_blank" rel="noopener noreferrer">html2rss organization</a> spans the Ruby gem, web app, config library, docs site, and scrape API bridge.',
    ],
    homepage: {
      term: "html2rss",
      href: "https://github.com/html2rss",
      external: true,
      definition: "Open-source org — syndication ecosystem (gem, web app, configs, tooling)",
    },
  },
  {
    id: "moodbar-rs",
    title: "moodbar.rs",
    status: "maintained",
    description: "Cross-platform Rust toolkit — CLI, native iOS/Android, WASM.",
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
    links: [
      {
        text: "Project site + demo",
        url: "https://gildesmarais.github.io/moodbar.rs/",
        external: true,
      },
      { text: "GitHub Repository", url: "https://github.com/gildesmarais/moodbar.rs", external: true },
      { text: "crates.io", url: "https://crates.io/crates/moodbar", external: true },
    ],
    bodyHtml: [
      "moodbar.rs turns audio into visual fingerprints by combining signal processing with practical developer tooling. It is built for DJs and audio broadcasters who need to scan large libraries quickly and choose tracks with more confidence.",
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
    title: ".dotfiles & Scripts",
    status: "evergreen",
    description: "My personal macOS & CLI setup. A living repository of the tools I use daily.",
    links: [{ text: "GitHub Repo", url: "https://github.com/gildesmarais/dotfiles", external: true }],
    highlights: [
      {
        term: "Guided setup",
        definition: "Applying opinionated macOS defaults with prompts for manual tweaks.",
      },
      { term: "Curated package", definition: "Bundle ensuring shell aliases and tools just work." },
      { term: "Reusable", definition: "Zsh and editor configs so every new environment feels like home." },
      { term: "AI skills", definition: "Developer environment skills synced across machines." },
    ],
    bodyHtml: [
      "A production-grade macOS and CLI toolkit that rebuilds a familiar workstation from scratch in minutes. It automates Homebrew setup, dotfile linking, and editor preparation, while offering a guided macOS defaults wizard and practical scripts. From a local fuzzy-searchable wiki to a media normaliser for audio workflows.<br />Beyond automation, it documents the unscriptable bits, i.e. Touch ID sudo or Apple Watch unlock, and includes a Zsh setup for a consistent shell experience across machines.",
    ],
    homepage: {
      term: "dotfiles",
      href: "https://github.com/gildesmarais/dotfiles",
      external: true,
      definition: "macOS/CLI infrastructure — syncable, actively maintained",
    },
  },
  {
    id: "jekyll-loading-lazy",
    title: "jekyll-loading-lazy",
    status: "legacy",
    description: "Drop-in lazy loading for Jekyll (img/iframe). Zero JS. Instant performance wins.",
    highlights: [
      { term: "Automatic", definition: "Injects loading attributes into images/iframes at build time." },
      { term: "Low-touch", definition: "Works without editing content files or templates." },
      {
        term: "No JS",
        definition: "Native lazy-load via the loading attribute; removes third-party scripts.",
      },
      { term: "Adoption", definition: "59k+ RubyGems downloads; more than 420 GitHub repos depend on it." },
    ],
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

export type ProjectEntry = (typeof projects)[number]

export function projectSlug(project: Pick<Project, "title">): string {
  return slugify(project.title)
}

/** Homepage open-source strip — derived from the projects catalog. */
export const homepageOpenSource: HomepageHighlight[] = projects.flatMap((p) =>
  "homepage" in p && p.homepage ? [p.homepage] : [],
)
