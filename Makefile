default: check

lint: lint-prettier lint-css

lint-prettier:
	npm exec prettier -- . --check

lint-css:
	npm exec stylelint -- "src/**/*.{css,astro}" --allow-empty-input

lintfix: lintfix-prettier lintfix-css

lintfix-prettier:
	npm exec prettier -- . --write

lintfix-css:
	npm exec stylelint -- "src/**/*.{css,astro}" --fix --allow-empty-input

fix: lintfix

test:
	npm test

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

# Quick local gate: build + visual guardrails + astro check.
check: build
	npm run check:visual
	npm run check

# Pre-PR gate: matches CI lint/test/build/check surfaces.
ready: lint test check

post-deploy:
	curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml;
	curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml;
