import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gil.desmarais.de",
  integrations: [sitemap()],
  prefetch: true,
  trailingSlash: "always",
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
});
