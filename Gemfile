# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'jekyll', '~> 4.2'
gem 'sassc'
gem 'terser'

group :newsblur do
  gem 'faraday'
  gem 'faraday-cookie_jar'
end

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'jekyll-archives'
  gem 'jekyll-feed'
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
  gem 'jekyll-target-blank'
  gem 'jekyll-toc'

  gem 'jekyll-loading-lazy'
  # gem 'jekyll-loading-lazy', path: '/Users/gil/versioned/github-gill0r/jekyll-loading-lazy'
  # gem 'jekyll-loading-lazy', github: 'gildesmarais/jekyll-loading-lazy'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development do
  gem 'awesome_print'
  gem 'byebug'
  gem 'rubocop'
  gem 'webrick', '~> 1.7'
end
