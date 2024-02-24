default: clean fix

fix:
	npx prettier --write --no-semi --print-width 110 "**/*.html" "**/*.yml" "**/*.md" "(assets|_includes)/**/*.scss" "assets/javascript/main.js"
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
	bundle install

build:
	echo "Fleamarket: pulling from discogs"
	bin/discogs
	echo "Blogroll: pulling from Newsblur"
	bin/blogroll
	echo "Jekyll: build"
	JEKYLL_ENV=production bundle exec jekyll build

post-deploy:
	curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml
	curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml
