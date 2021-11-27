default: clean fix

fix:
	npx prettier --write --no-semi --print-width 110 "**/*.(yml|md)" "(assets|_includes)/**/*.scss" "assets/javascript/*/**.ts"
	bundle exec rubocop -A

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

serve:
	bundle check || bundle
	yarn check || yarn
	yarn build
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
	yarn check || yarn install

build: | assets
	echo "Fleamarket: pulling from discogs"
	bin/discogs
	echo "Blogroll: pulling from Newsblur"
	bin/blogroll "${NB_USERNAME}" "${NB_PASSWORD}" "${NB_FOLDER}"
	echo "yarn: run build"
	yarn run build
	echo "Jekyll: build"
	bundle exec jekyll build

post-deploy:
	curl -fsS http://www.google.com/webmasters/sitemaps/ping?sitemap=https://gil.desmarais.de/sitemap.xml
	curl -fsS http://www.bing.com/webmaster/ping.aspx?siteMap=https://gil.desmarais.de/sitemap.xml
