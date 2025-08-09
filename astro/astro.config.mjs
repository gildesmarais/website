import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://v3.desmarais.de",
  integrations: [sitemap()]
});
