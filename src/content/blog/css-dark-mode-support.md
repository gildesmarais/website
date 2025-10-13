---
title: "Dark mode support on this website"
date: 2018-11-03
description: "This website now supports dark mode, if your browser supports 'prefers-color-scheme: dark'."
listed: false
tags:
  - programming
  - project
---

Quick info: this website now supports a dark color scheme, more commonly called
'dark mode'.

To try it, use Safari Technology Preview Release 68 (or later), since at this
time it's the only browser supporting the media query. The media query is so
fresh that even [caniuse.com](https://caniuse.com/#search=color-scheme) does not
list it yet.

The migration was straightforward: I changed a few colors, and in most places a
simple `filter: invert(100%);` delivered a solid result.

I'd love to see your website support dark mode, too.

**Update 2018-11-10:**
On OLED displays, black pixels save energy because the pixels are turned off. I
changed the dark colors to true black to benefit from that.
