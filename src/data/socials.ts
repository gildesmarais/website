export type SocialCategory = "professional" | "personal"

export type Social = {
  name: string
  url: string
  rel: string
  category: SocialCategory
}

const socialList = [
  {
    name: "GitHub",
    url: "https://github.com/gildesmarais/",
    rel: "me",
    category: "professional",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gildesmarais/",
    rel: "me",
    category: "professional",
  },
  {
    name: "Soundcloud",
    url: "https://soundcloud.com/gildesmarais",
    rel: "me",
    category: "personal",
  },
] as const satisfies readonly Social[]

export const socials: readonly Social[] = [...socialList].sort((a, b) => a.name.localeCompare(b.name))

export const professionalSocials = socials.filter((s) => s.category === "professional")
export const personalSocials = socials.filter((s) => s.category === "personal")
export const allSocials = socials

/** Canonical GitHub profile URL from the socials catalog. */
export const githubProfileUrl = socials.find((s) => s.name === "GitHub")!.url
