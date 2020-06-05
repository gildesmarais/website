---
layout: post
title: The html2rss project
description: Do you also notice RSS feeds disappear? With html2rss we can fight back.
tags:
  - project
  - software
toc: true
---

Do you remember RSS feeds? Some websites still have them ([like this one](/feed.xml)!)
You can subscribe to that website in your RSS reader. Everytime some new is published on that website, your RSS reader pulls the update and displays it to you.[^1] Every article, independent of the publisher, appears in the same style and typography. No "we care about your privacy", cookies, no annoying modal dialogs.

I see my RSS reader as the main entry to the Internet. It's where my daily browsing session begins.

## The problem

RSS feeds disappear. For publishers other content distribution channels became more popular and have business advantages. Content distribution shifted to mobile apps, social networks, email newsletters or click-bait articles which are ruminated on other platforms.[^2]
Gone is the good old RSS feed for the regulars.

The lack of feeds - and thus fresh reading content - started to become a problem. Instead of accepting the [Disintermediation](https://en.m.wikipedia.org/wiki/Disintermediation), I started scraping websites to generate RSS feeds.

## One scraping script for each website? 😱

I thought having one script which scrapes one website to generate a feed would be a suitable approach.
It worked, it felt alright ... until, a few days later: I had a second script for another website at hand. That script could have reused some code from the previous one, but didn't. Even worse, both scripts contained code which mixed CSS selectors and the XML building together.

Creating a mess of scripts isn't a viable long-term strategy IMHO. I wasn't happy adding yet another script for that other interesting website.[^3]

I decided not to go down that chaos path. It didn't feel good.

## A organized solution

In the last years I've created a organized way of generating RSS feeds.
The idea was to create a config file per site which contains CSS selectors and build a valid RSS feed from that. It looks basically like this YAML:

```yml
channel:
  url: https://example.com
selectors:
  items:
    selector: "ul > li"
  title:
    selector: "h2"
  link:
    selector: "a"
    extractor: "href"
```

This is what emerged:

1. A **Ruby gem**[^4] which takes a config, scrapes the site and builds the RSS feed.
2. A repository with **feed configs**. It also contains tests to identify broken configs and provides utilities for feed config creation.
3. A **web** application which handles caching (providing RSS feeds to clients with properly setup HTTP cache headers and prevents hammering the site's server)

The web application should be deployed automatically, always contain all feed configs from the repository.

I don't want to monetize this project. Quite the opposite is the case: I want others to be able to run their own instances, without the need to know Ruby or another programming language.

### The html2rss gem

The [html2rss gem](https://rubygems.org/gems/html2rss) generates a Ruby RSS object from the feed config. It does so by scraping and extracting the website.

Scraping involves a tad more than just selecting an HTML element's text contents.

- You want to sanitize HTML.
- You might find useful information in a `data` attribute in the page's source.
- You need to convert relative URLs to absolute ones.
- You want to parse dates & times in the publishers' time zone.
- Maybe the website is a JSON API and you want that response converted to a RSS feed?
- You might need to send requests with Authorization or Cookie HTTP headers.
- You want to scrape several syntactically equal pages on one website without duplicating the configs.
- You want to create a custom item description from other attributes.

Over a short time the gem's functionality grew and several _item extractors_ and _post processors_ came to life.

In a few nightly session I've brushed up the documentation to cover everything the gem is capable of. I won't repeat what the gem is capable of in detail. If you want to dive deeper, I suggest reading the [gem's README](https://github.com/gildesmarais/html2rss/blob/master/README.md).

The gem's code is automatically tested. There's also code documentation for the API, usually with examples. However, I'd recommend looking inside the test suite to find more complex examples.

### A repository of configs

The [html2rss-config](https://github.com/gildesmarais/html2rss-configs)'s repository contains feed configs. Each feed config contains the instructions for the html2rss gem on how to build the RSS feed. Thus, to create a config, you need write CSS selectors and express them in YAML.[^5]
The feed config must reside in a folder named after the fully qualified domain name[^6] of the website.
The config repository has its own test suite. It automatically tests each config and requires them to adhere to the conventions.

The generator scaffolds a config and a test for a new config. It gets you started in a breeze and let's you focus on writing the selectors.

### An application serving feeds via HTTP

A RSS feed is not complete when my feed reader can't consume it via HTTP. The [html2rss-web](https://github.com/gildesmarais/html2rss-web) app is a small Sinatra-based application which does exactly that. It uses the configs from _html2rss-configs_ and expose the _html2rss_ generated feeds via HTTP.

It's deployable without much hassle via Docker. It has a file-based application cache to prevent _hammering_ websites and deals with client-side HTTP cache headers.

## Continuous Integration and Deployment

Aside to having tests suite runs and automatic builds on any code changes, there's some more _magic_ going on: the CI/CD orchestrates the three components to build nicely together.

A change in `html2rss-config`'s `master` branch triggers a test run. If it is successful, it updates `html2rss-web` to contain the latest configs from `html2rss-config`. This in turn triggers a rebuild of `html2rss-web`. A successful build is pushed as new docker image to Docker Hub.

The server running a `html2rss-web` instance can then update the docker image.[^7]

## Get started and setup your instance

If you have Docker installed:

`docker run -p 3000:3000 gilcreator/html2rss-web`

Here's a [list of available feed configs](https://github.com/gildesmarais/html2rss-configs/tree/master/lib/html2rss/configs). Now build the URL like this:

The _feed config_ you'd like to use:  
`lib/html2rss/configs/domainname.tld/whatever.yml`  
`‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌^^^^^^^^^^^^^^^^^^^^^^^^^^^`

The corresponding URL:  
`http://localhost:3000/domainname.tld/whatever.rss`  
`‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ^^^^^^^^^^^^^^^^^^^^^^^^^^^`

In case you do not have a Docker installed: check [`html2rss-web`'s README](https://github.com/gildesmarais/html2rss-web/blob/master/README.md) for other deployment options.

**Contributions to all projects are welcome.**

Do you have site in mind and want to write a own config for it? Check [`html2rss-config`'s README](https://github.com/gildesmarais/html2rss-configs/blob/master/README.md). If you have your own instance running, you can keep your config private.
Do you need to extend the gem's capabilities? Check [`html2rss`'s README](https://github.com/gildesmarais/html2rss/blob/master/README.md).

## Further reading

Luckily I'm not alone in thinking [RSS is still alive](https://jlelse.blog/thoughts/2019/rss-still-alive/).
If you're a developer, [please support RSS on your sites](https://kevq.uk/please-add-rss-support-to-your-site)!

> Don’t you want people to read your stuff?  
> Having an RSS feed is saying, <q>I’m happy to meet you where you are. If you like reading stuff over there, then great, read it over there. I just like it when you read my stuff.</q>
>
> -- [Chris Coyier](https://css-tricks.com/is-having-an-rss-feed-just-giving-content-away-for-free/)


Anton wrote a thorough post about building your personal news inbox. I recommend to [check it out](https://blog.mironov.live/how-to-build-your-personal-news-inbox/).


[^1]: In case you have no clue what I'm talking about, I recommend _Laura Kalbag's <q>[How to read RSS in 2020](https://laurakalbag.com/how-to-read-rss-in-2020/)</q>_.
[^2]: And not uncommonly, you will be tracked and analyzed by a multitude of services in doing so.
[^3]: That's the approach I've seen quite often in the RSS-building open source world: bundle a bunch of almost independent scripts in a repository and the job is done.
[^4]: A gem is distributable package of Ruby scripts. More in the [Wikipedia](https://en.wikipedia.org/wiki/RubyGems).
[^5]: I'm open for any other object representation notation. YAML is build in to the Ruby language and I think it's well-enough human readable.
[^6]: [Wikipedia: Fully qualified domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)
[^7]: Even automatically. Via cron-based `docker pull` or smarter tools like [Watchtower](https://github.com/containrrr/watchtower) or [DockerTools](https://github.com/binfalse/docker-tools). There are a few of options.
