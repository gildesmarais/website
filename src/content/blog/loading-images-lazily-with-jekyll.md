---
title: Loading images lazily with Jekyll (natively & automatically)
date: 2020-05-03
description: My plugin improves your Jekyll website's performance.
listed: false
toc: false
tags:
  - project
  - programming
  - ruby
---

An important metric in today's websites is performance. Loading images lazily — meaning they load only when they become visible — is one of the big wins to implement.

Over time the methods to achieve it changed.
Traditionally it involved JavaScript to detect the right moment when the user scrolls to set the `src` attribute of an image. The browser then requested and rendered it.
Scroll listeners, when set up without an IntersectionObserver, are bad for perceived performance. Sure, there's a library for doing things correctly, but it adds to the website's weight.

But rejoice, browsers support this out of the box now.[^1] No more JavaScript. `\o/`
You just need to add the `loading` attribute to all your `<img>` and `<iframe>` tags. The browser then natively loads them lazily.

As a Jekyll user your website probably contains plenty of images. You could start changing the code and add the required attributes to all images. Let's just hope you do not forget to add them when you write content in a few days…

## Introducing `jekyll-loading-lazy`

The `jekyll-loading-lazy` plugin sets the needed attributes automatically.
It has zero configuration options.
Your Jekyll website directly profits from native lazy loading.  
A quick change for an instant and long-lasting win.

Find its README and the source on [Github](https://github.com/gildesmarais/jekyll-loading-lazy). The gem is published on [RubyGems](https://rubygems.org/gems/jekyll-loading-lazy).

[^1]: [caniuse.com: Lazy loading via attribute for images & iframes](https://caniuse.com/#feat=loading-lazy-attr)
