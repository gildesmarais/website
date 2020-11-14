default: clean fix

fix:
	yarn run prettier --write --no-semi --print-width 110 "**/*.yml" "**/*.md" "assets/**/*.scss" "assets/javascript/main.js"
	yarn run stylelint --fix "assets/**/*.scss"

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
	bundle exec jekyll build
