---
title: Watching movies alphabetically, round II
date: 2020-10-26
description: The ratings of the second round are in.
toc: false
tags:
  - movie
  - reference
---

This is a sequel of the first post: [Picking and watching movies alphabetically](/blog/picking-and-watching-movies-alphabetically).

The question <q>What do we watch?</q> is a tough one to answer.
We decided to break out of our self-established, comfortable, filter bubble and started watching movies alphabetically.

We made an exception, again, for the letter X and skipped it.[^1]  
Q is another letter we had to skip. We couldn't find a movie starting with Q.

Only few movies in this round left a lasting impression.

{% for rating in site.data.movie_ratings.round2 %}
{% assign imdb = site.data.ratings | where: "Const", rating['const'] | first %}
{% include movie-rating.html %}
{% endfor %}

[^1]: We're not into superhero movies.
