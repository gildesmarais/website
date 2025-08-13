default: clean fix

fix:
	npm exec prettier -- . --write

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

ci-install:
	npm ci

serve:
	npm run dev

build:
	npm run build

post-deploy:
	curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml;
	curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml;
