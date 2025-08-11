import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"

export default defineConfig({
  site: "https://gil.desmarais.de",
  integrations: [sitemap()],
  output: "static",
  adapter: vercel(),
  prefetch: true,
  image: {
    formats: ["avif", "webp", "jpg", "jpeg", "png", "gif"],
    layout: "constrained",
    responsiveStyles: true,
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        loading: "lazy",
      },
    },
  },
})
