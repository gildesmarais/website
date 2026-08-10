import { defineConfig, envField } from "astro/config"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"

export default defineConfig({
  env: {
    schema: {
      OMDB_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  site: "https://gil.desmarais.de",
  integrations: [sitemap()],
  output: "static",
  adapter: vercel(),
  prefetch: true,
  redirects: {
    "/sitemap.xml": "/sitemap-index.xml",
    "/.well-known/llms.txt": "/llms.txt",
    "/posts/watching-movies-alphabetically/": "/blog/watching-movies-alphabetically",
    "/posts/watching-movies-alphabetically-round-2/": "/blog/watching-movies-alphabetically",
    "/posts/watching-movies-alphabetically-round-4/": "/blog/watching-movies-alphabetically",
    "/blog/picking-and-watching-movies-alphabetically": "/blog/watching-movies-alphabetically",
    "/posts/:slug": {
      status: 301,
      destination: "/blog/:slug",
    },
    "/posts/:slug/index.html": {
      status: 301,
      destination: "/blog/:slug",
    },
    "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/": {
      status: 301,
      destination: "/blog/:slug",
    },
    "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug.html": {
      status: 301,
      destination: "/blog/:slug",
    },
    "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/index.html": {
      status: 301,
      destination: "/blog/:slug",
    },
    "/feed.json": {
      status: 301,
      destination: "/feed.xml",
    },
    "/blogroll/:path*": {
      status: 301,
      destination: "/",
    },
    "/fleamarket/:path*": {
      status: 301,
      destination: "/",
    },
    "/sets/:path*": {
      status: 301,
      destination: "/",
    },
    "/tag/:path*": {
      status: 301,
      destination: "/blog",
    },
    "/index.html": {
      status: 301,
      destination: "/",
    },
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
