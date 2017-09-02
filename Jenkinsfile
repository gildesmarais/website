#!/usr/bin/env groovy

pipeline {
  agent any
  environment {
    JEKYLL_ENV = 'production'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'source ~/.bashrc && \
          rvm install `cat .ruby-version` && \
          rvm `cat .ruby-version` do gem install bundler --no-doc && \
          rvm `cat .ruby-version` do bundle install --jobs=4 && \
          nvm install `cat .nvmrc` && \
          npm install -g yarn && \
          yarn'
      }
    }

    stage('Build') {
      steps {
        sh 'source ~/.bashrc && \
          rvm `cat .ruby-version` do jekyll build && \
          yarn run html-minifier --case-sensitive --collapse-boolean-attributes --collapse-whitespace --minify-ur-ls=true --minify-css=true --minify-js=true --remove-comments --remove-script-type-attributes --remove-style-link-type-attributes --remove-tag-whitespace --use-short-doctype --html5 --input-dir _site --output-dir _site --file-ext html'
      }
    }

    stage('Deployment') {
      steps {
        sh 'rsync -avz --delete -e ssh _site/ gil-drop1:/var/www/gil.desmarais.de/html'
      }
    }
  }
}
