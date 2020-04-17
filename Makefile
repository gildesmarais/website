default: clean fix

fix:
	prettier --write "**/*.md" "*.scss" "*.rb" "*.js"  "**/*.mdx"
	yarn run stylelint --fix assets/**/*.scss

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

serve:
	bundle check || bundle
	open http://127.0.0.1:4000/blog/
	bundle exec jekyll s --drafts
