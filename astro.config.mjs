import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"

export default defineConfig({
  site: "https://gil.desmarais.de",
  integrations: [sitemap()],
  output: "static",
  adapter: vercel(),
  prefetch: true,
  redirects: {
    "/blog/watching-movies-alphabetically-round-2": "/blog/watching-movies-alphabetically",
    "/blog/watching-movies-alphabetically-round-4": "/blog/watching-movies-alphabetically",
    "/blog/picking-and-watching-movies-alphabetically": "/blog/watching-movies-alphabetically"
  },
  markdown: {
    rehypePlugins: [
      [
        "rehype-add-classes",
        {
          h2: "accent",
          h3: "accent",
          h4: "accent",
          h5: "accent",
          h6: "accent",
        },
      ],
    ],
  },
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
