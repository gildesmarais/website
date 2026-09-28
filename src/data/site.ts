/** Site identity — single source for name, theme chrome, and copyright copy. */
export const site = {
  name: "Gil Desmarais",
  shortName: "Desmarais",
  description:
    "software engineer who builds and runs systems end-to-end, with agents in the loop; open-source tools, engineering notes, and a movie catalog.",
  themeColor: "#1d1f21",
  backgroundColor: "#1d1f21",
  accentColor: "#ff8800",
  copyrightYear: 2026,
  licenseShort: "CC BY-ND 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/",
  licenseName: "Creative Commons Attribution-NoDerivatives 4.0 International License",
} as const

export type Site = typeof site

export interface CorePage {
  title: string
  path: string
  description: string
  /** Plain-text blurb for llms-full and similar extracts. */
  excerpt: string
}

export const corePages = [
  {
    title: "Home",
    path: "/",
    description: "I build and run systems that move business numbers. Agents are part of how I ship.",
    excerpt:
      "Gil Desmarais is a software engineer who builds and runs systems that move business numbers, with agents as part of how he ships. The homepage states that stance and points to résumé, contact, projects, and the blog.",
  },
  {
    title: "About",
    path: "/about",
    description: "Background, systems thinking, and how Gil builds.",
    excerpt:
      "Background and how curiosity, systems thinking, and experience shape how Gil builds. Interests span music and vinyl DJing, film recommendations, open-source tools, and movement. The page covers early web tinkering through vocational training, Air Force IT work, and Business Computer Science — ending in a way of building that balances architecture with outcomes and treats agents as part of the toolchain.",
  },
  {
    title: "Projects",
    path: "/projects",
    description: "Key open-source software, side projects, and tools.",
    excerpt:
      "Selective open-source experiments built to remove friction. Prefer purposeful tools with small footprints; everything listed is open source, with more on GitHub. Each project states its actual publish mechanism — no blanket supply-chain claims.",
  },
  {
    title: "Resume",
    path: "/resume",
    description:
      "Software engineer in Berlin who designs, ships, and operates core systems end-to-end. Evidence over assumption; agents in the loop; ISO 27001/C5 compliance delivered alongside product work.",
    excerpt:
      "Software engineer in Berlin who designs, ships, and operates core systems end-to-end, with agents as part of the workflow. Executive summary, current and earlier work, capabilities, skills matrix, education, and service history.",
  },
  {
    title: "Movies",
    path: "/movies",
    description: "Alphabetical movie watching project & ratings catalog.",
    excerpt:
      "Personal movie ratings and recommendations. The interactive catalog filters and sorts watched films; a separate ranked recommendations page lists every film Gil recommends, with short notes when present.",
  },
  {
    title: "Blog",
    path: "/blog",
    description: "Engineering notes, systems thinking, and personal essays.",
    excerpt:
      "Engineering notes, systems thinking, and personal essays. Showcase posts surface on the blog index; the full archive lists every published piece. Written content is licensed CC BY-ND 4.0.",
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Reach Gil Desmarais for hands-on software engineering with direct ownership of outcomes.",
    excerpt:
      "Reach Gil for hands-on software engineering with direct ownership of outcomes. Prefer crisp async notes: the problem, who's involved, and the decision on the table. Professional socials and email are listed on the page.",
  },
] as const satisfies readonly CorePage[]

type CorePageEntry = (typeof corePages)[number]

export function corePage(path: CorePageEntry["path"]): CorePageEntry {
  for (const entry of corePages) {
    if (entry.path === path) return entry
  }
  throw new Error(`Unknown core page path: ${path}`)
}

/** Plain-text copyright for feeds and non-HTML surfaces. */
export function copyrightNotice(): string {
  return `© ${site.copyrightYear} ${site.name}. All content is licensed under ${site.licenseShort}.`
}
