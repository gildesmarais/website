---
layout: post
title: html2rss
tags:
  - rss
  - project
  - software
  - selfdogfood
---

Do you remember RSS feeds? Some websites still have them (like this one!)
and you can subscribe to that website in your RSS reader and pull updates from it.[^1]

Sadly RSS feeds seem to disappear. Other content distribution ways seem more popular for publishers and seem to have business advantages. RSS is a feature often scraped on relaunches.
Many publishers nowadays distribute their content via their own mobile apps, on social networks, or newsletters. Gone is the good old RSS feed.

But I'm not alone in thinking [RSS is still alive](https://jlelse.blog/thoughts/2019/rss-still-alive/). 

## the problem

Instead of accepting the lack of availability of RSS feeds, I started
writing scripts for to make up the loss. That approach was repetitive and error-prone,
however I got a RSS feed generated from a website and I was quite happy.

## the motivation

I see my RSS reader as the door to the Internet. It's where my daily browsing session starts.
Every article, independent of the publishing source, appears in there in the same style. It's like a newspaper, where every piece is set in the same font, etc.

The increasing lack of feeds became a problem.


I thought having a script which scrapes for one website that generates feed would be enough... like we all know `640k` of memory ought to be.  
It was enough, for a short amount of time.
A few days later I had a second script for another website at hand. That script could have reused some code from the previous one, but didn't.

Even worse, both scripts contained code which mixed CSS selectors and the XML building together. Creating a mess of scripts obviously isn't a viable long-term strategy. I wasn't happy adding a third script for another interesting website.

## the solution

In the last years I've created a way of keeping RSS alive for sites I'd like to read.

To create a new feed a just wanted to create config with some CSS selectors and let the gem do the rest.
I wanted to separate the generation from the serving via HTTP.
And maybe I wanted to setup a CI / CD to auto release gems, build docker images, also. ;)

1. Building a **gem** which takes a config for each site and returns a RSS document.
2. A repository with **configs** which has tests to identify broken configs and has utilities for simple config creation.
3. A **web** application which handles caching (like not hammering the site's server and provide RSS clients with properly setup HTTP cache headers)

### The html2rss gem

The html2rss gem takes the config and scrapes, extracts and generates the RSS feed.

That involves a bit more than just selecting an HTML element's innerText.

- You want to sanitize the HTML you will use as description.
- You might find useful information in a `data` attribute in a page's source.
- You want to parse dates & times in the publishers' time zone.
- Maybe the website is a JSON API and you want that response as a feed?
- What about sending an Authorization or Cookie HTTP header?
- What if you want to scrape several syntactically equal pages on one website without duplicating the configs?

Over a short time the gem's functionality grew and several *item extractors* and *post processors* came to life. In a few nightly session I've brushed up the gem's [README](https://github.com/gildesmarais/html2rss/blob/master/README.md) to cover everything the gem is capable of. And there's also code documentation for the straightforward API, usually with examples. However, I'd recommend looking inside the test suite to find more interesting examples.

### The repository of configs

A repository of configs which contain the instructions for the gem how to build the feed.
With the possibility to test each config automatically and have them adhere to conventions.

Being able to write CSS selectors and YAML is sufficient to create a config for generating a RSS feed.

### The web application

A web app which uses the gem and the configs, to expose the generated feeds via HTTP. Deployable without much hassle.
It has a file-based application cache to prevent *hammering* websites and deal with client-side HTTP cache headers.

## Continuous Integration and Deployment

Orchestrating these three components to play nicely together.

git push in config rebuilds web with the latest configs. The web app is pushed to Docker Hub.
The server running a html2rss-web instance can then update the image.

automatize what's possible and let others use and participate in all of it.

## Conclusion

i'm happy with that tooling. it started as a bunch of scripts and evolved. you still find traces of the early days in the three repos.
i continue to focus on reducing superfluous work needed to efficiently use it.

i'm not so happy these 3 components are required to provide me a desirable web browsing experience. the idea of an international network was to enable the exchange of information. if you're a developer, [please add RSS support to your site](https://kevq.uk/please-add-rss-support-to-your-site).

> Don’t you want people to read your stuff?  
> Having an RSS feed is saying, <q>I’m happy to meet you where you are. If you like reading stuff over there, then great, read it over there. I just like it when you read my stuff.</q>
-- [Chris Coyier](https://css-tricks.com/is-having-an-rss-feed-just-giving-content-away-for-free/)


[^1]: In case you have no clue what I'm talking about, I recommend *Laura Kalbag's <q>[How to read RSS in 2020](https://laurakalbag.com/how-to-read-rss-in-2020/)</q>*.
