default: clean fix

fix:
	prettier --write "**/*.md" "*.css" "*.rb" "*.js"  "**/*.mdx"

clean:
	find . -type d -empty -delete
	find . -type f -empty -delete

serve:
	open http://127.0.0.1:4000/blog/
	bundle exec jekyll s --drafts
