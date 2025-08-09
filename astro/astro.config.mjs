import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gil.desmarais.de",
  integrations: [sitemap()],
});
