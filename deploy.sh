#!/usr/bin/env bash
set -e
JEKYLL_ENV=production bundle exec jekyll build
npx html-minifier --case-sensitive --collapse-boolean-attributes --collapse-whitespace --minify-urls=true --minify-css=true --minify-js=true --remove-comments --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --use-short-doctype --input-dir _site --output-dir _site --file-ext html
rsync -avz --delete -e ssh _site/ website:/var/www/gil.desmarais.de
