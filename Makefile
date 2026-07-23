default: clean lintfix

lint: lint-prettier lint-css

lint-prettier:
	npm exec prettier -- . --check

lint-css:
	npm exec stylelint -- "src/**/*.{css,astro}" --allow-empty-input

lintfix:
	npm exec prettier -- . --write

fix: lintfix

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

ci-install:
	npm ci

dev:
	make serve

serve:
	npm run dev

build:
	npm run build

check: build
	npm run check:visual
	npm run check

post-deploy:
	curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml;
	curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml;
