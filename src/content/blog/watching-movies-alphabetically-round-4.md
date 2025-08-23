---
title: Watching movies alphabetically, round IV
date: 2021-10-24
description: The ratings of the fourth round are in.
tags:
  - movie
  - reference
---

The question <q>What do we watch?</q> is a tough one to answer.
We decided to break out of our self-established, comfortable, filter bubble and started watching movies alphabetically.

Here are the previous rounds:

- [Round I](/blog/picking-and-watching-movies-alphabetically)
- [Round II](/blog/watching-movies-alphabetically-round-2)
- [Round III](/blog/watching-movies-alphabetically)

The alphabetic selection strategy still works fine. However we watched several other
movies in the meantime.  
Check the [recently rated movies page]({{ '/ratings/recent/' | relative_url }})
to see which other movies I've rated.

{% assign ratings = site.data.movie_ratings.round4 | reverse %}
{% for rating in ratings %}
{% assign imdb = site.data.ratings | where: "Const", rating['const'] | first %}
{% include movie-rating.html %}
{% endfor %}
