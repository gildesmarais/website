default: clean fix

fix:
	prettier --write --no-semi "**/*.yml" "**/*.md" "*.scss" "*.rb" "assets/javascript/main.js"  "**/*.mdx"
	yarn run stylelint --fix assets/**/*.scss

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

serve:
	bundle check || bundle
	open http://127.0.0.1:4000/blog/
	bundle exec jekyll s --drafts

pcp: | clean fix
	git add .
	git commit -m 'make pull-commit-push'
	git push
