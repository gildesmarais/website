---
layout: post.vto
title: "Dark mode support on this website"
date: 2018-11-03T17:30:00+0200
description: "This website now supports dark mode, if your browser supports 'prefers-color-scheme: dark'."
image: /assets/images/social.png
tags:
  - programming
  - project
---

Quick info: this website now supports a dark color scheme, more commonly called
'dark mode'.

To use it, you need to use Safari Technology Preview Release 68 (or later),
since at this time it's the only browser supporting the media query. The media
query is so fresh, even [caniuse.com](https://caniuse.com/#search=color-scheme)
does not know of it, yet.

The migration was straightforward: changing some colors here and there,
but most of the time a `filter: invert(100%);` yielded a perfect result.

I'd love to see your website supporting dark mode, too!

**Update 2018-11-10:**
On OLED displays black pixels save energy, because the pixels are turned off.
I changed the dark colors to true black to profit from that.
