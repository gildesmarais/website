#!/usr/bin/env bash
set -e
JEKYLL_ENV=production bundle exec jekyll build
rsync -avz --delete -e ssh _site/ gil-drop1:/var/www/gil.desmarais.de/html
