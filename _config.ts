import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx.ts";
import liquid from "lume/plugins/liquid.ts";
import metas from "lume/plugins/metas.ts";
// import minify_html from "lume/plugins/minify_html.ts";
import picture from "lume/plugins/picture.ts";
import remark from "lume/plugins/remark.ts";
import sheets from "lume/plugins/sheets.ts";
import sitemap from "lume/plugins/sitemap.ts";
import transform_images from "lume/plugins/transform_images.ts";

const site = lume(
  {
    location: new URL("https://gil.desmarais.de/"),
  }
);

site.data("site", site);

site.use(code_highlight());
site.use(date(
  {
    formats: {
      "ISO_DATE": "yyyy-MM-dd",
    }
  }
));
site.use(favicon());
site.use(feed({
  output: ["/feed.json", "/feed.rss"],
  query: "type=posts",
  info: {
    title: "=site.title",
    description: "=site.description",
  },
  items: {
    title: "=title",
    content: "$.post-body",
  },
}));
site.use(inline());
site.use(liquid());
site.use(jsx());
site.use(metas());
// site.use(minify_html());
site.use(picture());
site.use(transform_images());
site.use(remark());
site.use(sheets());
site.use(sitemap());
site.use(esbuild(/* Options */));

site.copy("assets");

export default site;
