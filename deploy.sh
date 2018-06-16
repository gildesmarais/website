#!/usr/bin/env bash
set -e
JEKYLL_ENV=production bundle exec jekyll build
html-minifier --case-sensitive --collapse-boolean-attributes --collapse-whitespace --minify-ur-ls=true --minify-css=true --minify-js=true --remove-comments --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --use-short-doctype --input-dir _site --output-dir _site --file-ext html
rsync -avz --delete -e ssh _site/ gil-drop1:/var/www/gil.desmarais.de/html
