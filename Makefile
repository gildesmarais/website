default: clean fix

fix:
	yarn run prettier --write --no-semi --print-width 110 "**/*.html" "**/*.yml" "**/*.md" "(assets|_includes)/**/*.scss" "assets/javascript/main.js"
	yarn run stylelint --fix "(assets|_includes)/**/*.scss"
	bundle exec rubocop -A

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

serve:
	bundle check || bundle
	open http://127.0.0.1:4000/blog/
	bundle exec jekyll s --drafts --trace

pcp: | clean fix
	git add .
	git commit -m 'make pull-commit-push'
	git push

ci-install:
	gem install bundler
	bundle config --global frozen 1
	bundle install --jobs 4 --retry 3

build:
	bin/discogs
	bin/blogroll "${NB_USERNAME}" "${NB_PASSWORD}" "${NB_FOLDER}"
	bundle install --jobs 4 --retry 3
	bundle exec jekyll build

post-deploy:
	curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml
	curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml

