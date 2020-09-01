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
You can subscribe to that website in your RSS reader. Everytime some new content is published on that website, your RSS reader will find it out on its next update and displays it to you.[^1] Every article, independent of the publisher, appears in the same style and typography. No "we care about your privacy", cookies, no annoying modal dialogs.

I see my RSS reader as the main entry to the Internet. It's where my daily browsing session begins.

## The problem

RSS feeds disappear from the web. For publishers other content distribution channels became more popular and have business advantages. Content distribution shifted to mobile apps, social networks, email newsletters or click-bait articles which are ruminated on other platforms.[^2]
Gone is the good old RSS feed for the regulars.

The lack of feeds - and thus fresh reading content - started to become a problem. Instead of accepting the [Disintermediation](https://en.m.wikipedia.org/wiki/Disintermediation), I started scraping websites to generate RSS feeds for myself.

## One scraping script for each website? 😱

I thought having a script which scrapes one website to generate a feed would be a suitable approach.
It worked, it felt alright ... until, a few days later: I had a second script at hand for another website. That script could have reused some code from the previous one, but didn't. Even worse, both scripts contained code which mixed CSS selectors and the XML building together.

Creating a mess of scripts isn't a viable long-term strategy IMHO. I wasn't happy adding yet another script for that other interesting website.[^3]

I decided not to go down that chaos path. It didn't feel good.

## An organized solution

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

The web application is deployed automatically and always contains all feed configs from the repository.

I don't want to monetize this project. Quite the opposite is the case: I want others to be able to run their own instances, without them needing to know Ruby or another programming language.

Checkout [the project's website](https://html2rss.github.io) which describes all three components in more detail.

### The html2rss gem

The [html2rss gem](https://rubygems.org/gems/html2rss) generates a Ruby RSS object from the feed config.

Over a short time frame the gem's functionality grew and several _item extractors_ and _post processors_ came to life.

In a few nightly session I've brushed up the [gem's README](https://github.com/gildesmarais/html2rss/blob/master/README.md). to cover everything its capable of. The README is still not perfect.

The gem's code is automatically tested. There's also an [automatically generated code documentation](https://www.rubydoc.info/gems/html2rss) for the API, usually with examples. The test suite to reveals more complex usage examples.

### A repository of feed configs

The [html2rss-config](https://github.com/gildesmarais/html2rss-configs)'s repository contains feed configs. Each feed config contains the instructions for the html2rss gem on how to build the RSS feed.

### An application serving feeds via HTTP

A RSS feed is not complete when my feed reader can't consume it. The [html2rss-web](https://github.com/gildesmarais/html2rss-web) app is a small Sinatra-based application which servers the RSS feeds via HTTP(s). It bundles all _html2rss-configs_ and expose the _html2rss_ generated feeds via HTTP.

It's deployable without much hassle via Docker. It has a file-based application cache to prevent _hammering_ websites and deals with client-side HTTP cache headers.

## Continuous Integration and Deployment

Updating these three components manually would be a maintenance night mare. In the early days I had a build triggering an update in another repository which updated everything. By now, luckily, there are integrations which update outdated dependencies half-automatically by opening a pull request.

A change in `html2rss-config`'s `master` branch triggers a test run. If it is successful, it updates `html2rss-web` to contain the latest configs from `html2rss-config`. This in turn triggers a rebuild of `html2rss-web`. A successful build is pushed as new docker image to Docker Hub.

The server running a `html2rss-web` instance can then update the docker image.[^7]

## Get started and setup your html2rss-web instance

If you have Docker installed:

`docker run -p 3000:3000 gilcreator/html2rss-web`

Here's a [list of available feed configs](https://github.com/gildesmarais/html2rss-configs/tree/master/lib/html2rss/configs). Now build the URL like this:

The _feed config_ you'd like to use:  
`lib/html2rss/configs/domainname.tld/whatever.yml`  
`‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌^^^^^^^^^^^^^^^^^^^^^^^^^^^`

The corresponding URL:  
`http://localhost:3000/domainname.tld/whatever.rss`  
`‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ^^^^^^^^^^^^^^^^^^^^^^^^^^^`

In case you don't need HTTPs: there's a CLI coming up for the html2rss gem.

**Contributions to all projects are welcome.**

Do you have site in mind and want to write a own config for it? Check [`html2rss-config`'s README](https://github.com/gildesmarais/html2rss-configs/blob/master/README.md). If you have your own instance running, you can keep your config private.
Do you need to extend the gem's capabilities? Check [`html2rss`'s README](https://github.com/gildesmarais/html2rss/blob/master/README.md).

## RSS is not dead.

Although RSS feeds seem to fade out of the Internet, I think RSS is alive.

I'm not alone in thinking [RSS is still alive](https://jlelse.blog/thoughts/2019/rss-still-alive/).
If you're a developer, [please support RSS on your sites](https://kevq.uk/please-add-rss-support-to-your-site)!

> Don’t you want people to read your stuff?  
> Having an RSS feed is saying, <q>I’m happy to meet you where you are. If you like reading stuff over there, then great, read it over there. I just like it when you read my stuff.</q>
>
> -- [Chris Coyier](https://css-tricks.com/is-having-an-rss-feed-just-giving-content-away-for-free/)

Anton wrote a thorough post about building your personal news inbox. I recommend to [check it out](https://blog.mironov.live/how-to-build-your-personal-news-inbox/).

<!-- TODO: https://github.com/AboutRSS/ALL-about-RSS -->
<!-- TODO: shorten and refer to the website -->

[^1]: In case you have no clue what I'm talking about, I recommend _Laura Kalbag's <q>[How to read RSS in 2020](https://laurakalbag.com/how-to-read-rss-in-2020/)</q>_.
[^2]: And not uncommonly, you will be tracked and analyzed by a multitude of services in doing so.
[^3]: That's the approach I've seen quite often in the RSS-building open source world: bundle a bunch of almost independent scripts in a repository and the job is done.
[^4]: A gem is distributable package of Ruby scripts. More in the [Wikipedia](https://en.wikipedia.org/wiki/RubyGems).
[^5]: I'm open for any other object representation notation. YAML is build in to the Ruby language and I think it's well-enough human readable.
[^6]: [Wikipedia: Fully qualified domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)
[^7]: Even automatically. Via cron-based `docker pull` or smarter tools like [Watchtower](https://github.com/containrrr/watchtower) or [DockerTools](https://github.com/binfalse/docker-tools). There are a few of options.
