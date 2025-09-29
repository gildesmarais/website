export const socials = [
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
    name: "Bluesky",
    url: "https://bsky.app/profile/gil.desmarais.de",
    rel: "me",
    category: "personal",
  },
  {
    name: "Soundcloud",
    url: "https://soundcloud.com/admiralgiesse",
    rel: "me",
    category: "personal",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/der_gil",
    rel: "me",
    category: "personal",
  },
].sort((a, b) => a.name.localeCompare(b.name))

// Helper functions for filtering
export const professionalSocials = socials.filter((s) => s.category === "professional")
export const personalSocials = socials.filter((s) => s.category === "personal")
export const allSocials = socials
