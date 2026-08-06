/** Site identity — single source for name, theme chrome, and copyright copy. */
export const site = {
  name: "Gil Desmarais",
  shortName: "Desmarais",
  themeColor: "#1d1f21",
  backgroundColor: "#1d1f21",
  accentColor: "#ff8800",
  copyrightYear: 2026,
  licenseShort: "CC BY-ND 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/",
  licenseName: "Creative Commons Attribution-NoDerivatives 4.0 International License",
} as const

export type Site = typeof site

/** Plain-text copyright for feeds and non-HTML surfaces. */
export function copyrightNotice(): string {
  return `© ${site.copyrightYear} ${site.name}. All content is licensed under ${site.licenseShort}.`
}
