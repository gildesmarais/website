---
title: An automated blogroll with Jekyll, Newsblur and Github Actions
date: 2020-09-22
description: This blog's blogroll is updated automatically and this post explains how it works.
listed: false
tags:
  - programming
  - ruby
---

A Blogroll is a list of links to blogs and their RSS feed. It was popular in the early 2000s, the time when many people had a blog. Nowadays most people just dump their thoughts into a handful of social networks and writing a blog seems outdated.

Anyway, I've automated the updating of my [blogroll](/blogroll) to link to blogs I subscribe to and recommend others to do the same.

Every night a Github Action workflow builds and deploys this website.
Before building the website, a ruby script fetches all my blog subscriptions from Newsblur (my feed reader).
The script then outputs a YAML file which Jekyll reads as a data.
The blogroll itself is then build as a regular HTML page in Jekyll.

This post explain how it works.

## The Ruby script

Save this script in `bin/blogroll` and afterwards `chmod +x bin/blogroll`.

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

require 'bundler/inline'

gemfile(true) do
  source 'https://rubygems.org'

  gem 'faraday'
  gem 'faraday-cookie_jar'
end

require 'json'
require 'fileutils'
require 'yaml'

class Newsblur
  def initialize(username, password)
    conn.post 'api/login', "username=#{username}&password=#{password}"
  end

  def logout
    conn.post 'api/logout'
  end

  def reader_feeds(include_favicons: false, flat: true, update_counts: false)
    JSON.parse conn.get(
                 'reader/feeds',
                 {
                   include_favicons: include_favicons,
                   flat: flat,
                   update_counts: update_counts
                 }
               )
                 .body
  end

  private

  def conn
    @conn ||=
      Faraday.new(
        url: 'https://newsblur.com/', headers: { accept: 'application/json' }
      ) do |builder|
        builder.use :cookie_jar
        builder.adapter Faraday.default_adapter
      end
  end
end

# 1. signin to get newsblur_sessionid cookie and set it with all following requests
newsblur = Newsblur.new(ARGV[0], ARGV[1])

# 2. find all feeds in desired folder
reader_feeds = newsblur.reader_feeds
feeds_in_folder = reader_feeds.dig('flat_folders', ARGV[2])
feeds = feeds_in_folder.map { |feed| reader_feeds.dig('feeds', feed.to_s) }

# 3. write the feeds to _data/blogroll.yml
FileUtils.mkdir_p File.join(__dir__, '..', '_data')
file = File.join(__dir__, '..', '_data', 'blogroll.yml')
File.write(file, feeds.to_yaml)

# final step: logout
newsblur.logout
```

Test run the script:

```shell
bin/blogroll USERNAME PASSWORD FOLDER
```

For `USERNAME` and `PASSWORD` write your Newsblur credentials. `FOLDER` is the name of the folder containing your blog subscriptions, e.g. <q>Cool Blogs</q>. If any of these strings contain a space or special characters, you must wrap them in quotes.

The script creates a `blogroll.yml` file in `_data`. The `_data` directory is the place where Jekyll looks for [data files](https://jekyllrb.com/docs/datafiles/). Jekyll automatically reads and populates the contents of the files there to the global site variable. `site.data.blogroll`.

Finally, exclude the `bin/` folder from the build in the `_config.yml`

```yml
exclude:
  - bin/
```

… and `echo _data/blogroll.yml > .gitignore`

## Render the blogroll page

Create the `blogroll/index.html` file.

```shell
mkdir -p blogroll
touch blogroll/index.html
```

Add your HTML. Here's what I'm using:

```liquid
---
layout: default
---
{% raw %}<ul>
{% assign blogroll = site.data.blogroll | sort_natural: "feed_title" %}
{% for blog in blogroll %}
  <li>
    <a href="{{blog.feed_link}}" target="_blank" rel="noopener">{{ blog.feed_title }}</a>
    <a href="{{blog.feed_address}}" target="_blank"
       rel="noopener">Feed</a>
  </li>
{% endfor %}
</ul>{% endraw %}
```

## The Github Actions workflow

To automatically update the blogroll, [schedule](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onschedule) a run of your deployment workflow.

Example:

```yml
{% raw %}name: jekyll build and publish artifact with rsync

on:
  push:
    branches:
      - main
  schedule:
    - cron: "15 3 * * *"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # clipped: the usual setup stuff
      - name: update blogroll
        env:
          NB_USERNAME: ${{secrets.NB_USERNAME}}
          NB_PASSWORD: ${{secrets.NB_PASSWORD}}
          NB_FOLDER: ${{secrets.NB_FOLDER}}
        run: bin/blogroll "$NB_USERNAME" "$NB_PASSWORD" "$NB_FOLDER"
      # clipped: the usual build and deploy stuff{% endraw %}
```

And lastly, add the required secrets (`NB_*`) to your website's repository settings.

## Conclusion

Blogrolls are valuable to the independent world wide web. Let's not forget them.
There are still plenty of blogs out there. It just hard to find them… a blogroll can mitigate the problematic discovery. If you write a blog, why not add a blogroll to your blog? It doesn't have to be automated; you can update the blogroll manually…

Jekyll's support for data files is super powerful. In conjunction with scheduled deployments you can even display _not so static_ content easily.

If you're familiar with Ruby, the script is straightforward. But don't worry, the data exchange format is YAML which probably every programming language can create. Use whatever language you like and runs on your continuous deployment service.
