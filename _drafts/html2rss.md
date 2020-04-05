---
layout: post
title: html2rss
---

TODO:

- Laura Kalbag's [How to read RSS in 2020](https://laurakalbag.com/how-to-read-rss-in-2020/)
- > Don’t you want people to read your stuff? Having an RSS feed is saying, “I’m happy to meet you where you are. If you like reading stuff over there, then great, read it over there. I just like it when you read my stuff.”
  > -- [Chris Coyier ](https://css-tricks.com/is-having-an-rss-feed-just-giving-content-away-for-free/)
- [Please Add RSS Support To Your Site](https://kevq.uk/please-add-rss-support-to-your-site)
- [RSS is still alive](https://jlelse.blog/thoughts/2019/rss-still-alive/)

Do you remember RSS feeds? Some websites still have them (like this one!)
and you can subscribe to that website in your RSS reader and pull updates from it, when you're in your RSS client.

Sadly RSS feeds seem to disappear. Other content distribution ways seem more popular for publishers and seem to have business advantages. RSS is a feature often scraped on relaunches.

many publishers distribute their content on their own apps, social networks, "user generated content portals".
the time you stay on their site or app is also an important metric. they use all kind of tricks to increase the time and make the metric look good. oh and they really want you to read another algorithmically chosen content piece.

i feel rss feeds are still very popular in tech-savvy groups.
back in the days even browsers supported subscribing to those feeds.

## the problem

Instead of accepting the lack of availability of RSS feeds, I started
writing scripts for those. That approach was repetitive and error-prone,
however I got a RSS feed and I was quite happy.

## the motivation

i see my rss reader as the door to the Internet. it's where my daily browsing session starts.
every article, independent of the publishing source, appears in there in the same style. it's like a newspaper, where every piece is set in the same font, etc.

the apparently increasing fatigue due to the lack of feeds became a problem.

i always enjoy fiddling some cool stuff together in my spare time.
i thought having that one script which scrapes that one website and generates the feed would be enough, like we all know 640k of memory ought to be. it was, for a short amount of time.

A few days later i had a second script for another website at hand. that script could have reused some code from the previous one.

both scripts contained code mixing CSS selectors and XML building together.
it worked sufficiently; my problem was solved. but obviously, creating a mess wasn't a viable long-term strategy. i wasn't happy adding a third script for another interesting website.

## the solution

In the last years I've created a way of keeping RSS alive for sites I'd like to read.

- easier creation of scraping configs
- clear separation of tasks lead to multiple components
- I wanted to setup a CI / CD to auto release gems, build docker images, etc

1. Building a gem which takes a config for each site and returns a RSS document.
2. A repository with configs which has tests to identify broken configs and has utilities for simple config creation.
3. A web application which handles caching (like not hammering the site's server and provide RSS clients with properly setup http cache headers)

### the html2rss gem

The html2rss gem does the scraping, extraction and generates the RSS feed.

That involves a bit more than just selecting an HTML element's innerText.

You want to sanitize that HTML you will use as description.
You might find more useful information in a `data` attribute in a page's source.
You want to parse dates & times in the correct time zone.
Maybe the website is a JSON API and you want that response as a feed?
What about sending an Authorization or Cookie HTTP header?
What if you want to scrape several syntactically equal pages on one website without duplicating the configs?

Over a short time the gem's functionality grew and several item extractors and post processors came to life.

### the config repository

A repository of configs which contain the instructions for the gem how to build the feed.
With the possibility to test each config automatically and have them adhere to conventions.

Being able to write CSS selectors and YAML is sufficient to create a config for generating a RSS feed.

### the web application

A web app which uses the gem and the configs, to expose the generated feeds via HTTP. Deployable without much hassle.
It has a file-based application cache to prevent 'hammering' websites and utilizing client-side HTTP caching.

## continuous integration and deployment

Orchestrating these three components to play nicely together.

git push in config rebuilds web with the latest configs. The web app is pushed to Docker Hub.
The server running a html2rss-web instance can then update the image.

automatize what's possible and let others use and participate in all of it.

## closing

i'm happy with that tooling. it started as a bunch of scripts and evolved. you still find traces of the early days in the three repos.
i continue to focus on reducing superfluous work needed to efficiently use it.

i'm not so happy these 3 components are required to provide me a desirable web browsing experience. the idea of an international network was to enable information exchange. if you're a developer, please provide machine-readable information.
