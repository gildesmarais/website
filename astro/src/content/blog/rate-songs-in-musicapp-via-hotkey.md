---
title: "Rate songs in Music.app via Hotkey with Song Rating"
date: 2020-09-13
description: "Song Rating now supports rating with a specific amount of stars directly."
tags:
- macos
- programming
- software
- project
---

My new laptop came with macOS Catalina pre-installed. As described in my post about [managing music with iTunes]({% post_url 2020-04-05-managing_music %}), I rely on being able to rate the currently playing song with a specific amount of stars via Hotkey. Since the little app I used for that wasn't updated in a long time and is incompatible with Music.app (which replaces iTunes in Catalina), I searched for an alternative.

[Song Rating](https://github.com/MainasuK/Song-Rating) was the closest I could find, but it lacked the possibility to rate the amount of stars via Hotkey. But since it's open-source, I was able to add the feature myself. I've fired up XCode, implemented the feature and [opened a pull request](https://github.com/MainasuK/Song-Rating/pull/12) to have it included in the next release.

The maintainer, [@MainasuK](https://github.com/MainasuK), merged the pull request and already [released version 1.2.5](https://github.com/MainasuK/Song-Rating/releases/tag/1.2.5) this morning. Hooray!

In case you need such a rating utility which works with macOS Catalina (Big Sur is apparently supported, too), I recommend Song Rating.

{% slider %}
![Screenshot of Star-Rating](/assets/images/posts/2020-09-13-song-rating.jpg)
{% endslider %}
{{page.glide}}
