import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import liquid from "lume/plugins/liquid.ts";
import metas from "lume/plugins/metas.ts";
import minify_html from "lume/plugins/minify_html.ts";
import picture from "lume/plugins/picture.ts";
import remark from "lume/plugins/remark.ts";
import sheets from "lume/plugins/sheets.ts";
import sitemap from "lume/plugins/sitemap.ts";
import transform_images from "lume/plugins/transform_images.ts";

// custom plugins
import star_rating from "./plugins/star_rating.ts";

// markdown plugins (for remark)
import remarkCapitalize from 'https://esm.sh/remark-capitalize';
import remarkSlug from 'https://esm.sh/remark-slug';
import remarkToc from 'https://esm.sh/remark-toc@9';

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
      "HUMAN_DATE": "dd MMMM yyyy"
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
  }
}));
site.use(inline());
site.use(lightningCss({
  includes: "assets/css",
}));
site.use(liquid());
site.use(jsx());
site.use(metas());
site.use(minify_html());
site.use(picture());
site.use(transform_images());
site.use(remark({
  remarkPlugins: [
    remarkToc, remarkCapitalize, remarkSlug
  ],
}));
site.use(sheets());
site.use(sitemap());
site.use(esbuild(/* Options */));

site.helper('star_rating', (rating) => star_rating.star_rating(rating) , { type: "tag" });
site.ignore("plugins", "README.md");

site.copy("assets");

const processPages = function processPages(page: Page): Promise<unknown> {
  return new Promise((resolve) => {
    const as = Array.from(
      page.document?.querySelectorAll<HTMLAnchorElement>("a[href^='http']") ||
        [],
    );

    as.forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });

    const is = Array.from(
      page.document?.querySelectorAll<(HTMLImageElement | HTMLIFrameElement)>(
        "img[src], iframe[src]",
      ) || [],
    );

    is.forEach((i) => {
      if (i.getAttribute("loading") === null) {
        i.setAttribute("loading", "lazy");
      }
    });

    resolve(true);
  });
};

site.process([".html"], (pages) => {
  Promise.all(pages.map(processPages));
});

export default site;
