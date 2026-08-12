/** Site identity — single source for name, theme chrome, and copyright copy. */
export const site = {
  name: "Gil Desmarais",
  shortName: "Desmarais",
  description: "software engineer, open-source projects, engineering blog, and movie catalog.",
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
  /** Plain-text blurb for llms-full and similar extracts. Keep aligned with the live page. */
  excerpt: string
}

export const corePages: readonly CorePage[] = [
  {
    title: "Home",
    path: "/",
    description: "Main entry point and site overview.",
    excerpt:
      "Gil Desmarais is an Engineering Team Lead who turns ambiguous systems into clear delivery. The homepage introduces that stance — translating between strategy and technical limits — and points to résumé, contact, projects, and the blog.",
  },
  {
    title: "About",
    path: "/about",
    description: "Background, philosophy, personal systems, and connection options.",
    excerpt:
      "Background and how curiosity, systems thinking, and experience shape how Gil builds and leads. Interests span music and vinyl DJing, film recommendations, open-source tools, and movement. The page covers early web tinkering through vocational training, Air Force IT work, and Business Computer Science — ending in leadership that balances architecture with outcomes.",
  },
  {
    title: "Projects",
    path: "/projects",
    description: "Key open-source software, side projects, and tools.",
    excerpt:
      "Selective open-source experiments built to remove friction. Prefer purposeful tools with small footprints; everything listed is open source, with more on GitHub. Releases use trusted publishing — supply-chain security is part of how work ships.",
  },
  {
    title: "Resume",
    path: "/resume",
    description: "Professional experience, engineering stack, and background.",
    excerpt:
      "Engineering leader and full-stack product partner in Berlin. Translates business goals into calm, incremental delivery: executive summary, current and earlier work, capabilities, skills matrix, education, and service history.",
  },
  {
    title: "Movies",
    path: "/movies",
    description: "Alphabetical movie watching project & ratings catalog.",
    excerpt:
      "Personal movie ratings and recommendations. The interactive catalog filters and sorts watched films; curated top recommendations also appear on the llms.txt surfaces with notes when present.",
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
    description: "Methods to get in touch and connect.",
    excerpt:
      "Reach Gil for focused engineering leadership and platform support. Prefer crisp async notes: the problem, who’s involved, and the decision on the table. Professional socials and email are listed on the page.",
  },
] as const

/** Plain-text copyright for feeds and non-HTML surfaces. */
export function copyrightNotice(): string {
  return `© ${site.copyrightYear} ${site.name}. All content is licensed under ${site.licenseShort}.`
}
