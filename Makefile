default: clean fix

fix:
	npm run lintfix

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

serve:
	deno task lume -s
	open http://127.0.0.1:3000

ci-install:
	curl -fsSL https://deno.land/install.sh | sh
	export DENO_INSTALL="/vercel/.deno"
	export PATH="$DENO_INSTALL/bin:$PATH"
	deno install --allow-run --allow-env --allow-read --name lume --force --reload https://deno.land/x/lume_cli/mod.ts

build:
	deno task lume

post-deploy:
	# curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml
	# curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml
