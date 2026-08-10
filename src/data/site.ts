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
}

export const corePages: readonly CorePage[] = [
  { title: "Home", path: "/", description: "Main entry point and site overview." },
  {
    title: "About",
    path: "/about",
    description: "Background, philosophy, personal systems, and connection options.",
  },
  {
    title: "Projects",
    path: "/projects",
    description: "Key open-source software, side projects, and tools.",
  },
  {
    title: "Resume",
    path: "/resume",
    description: "Professional experience, engineering stack, and background.",
  },
  { title: "Movies", path: "/movies", description: "Alphabetical movie watching project & ratings catalog." },
  { title: "Contact", path: "/contact", description: "Methods to get in touch and connect." },
] as const

/** Plain-text copyright for feeds and non-HTML surfaces. */
export function copyrightNotice(): string {
  return `© ${site.copyrightYear} ${site.name}. All content is licensed under ${site.licenseShort}.`
}
