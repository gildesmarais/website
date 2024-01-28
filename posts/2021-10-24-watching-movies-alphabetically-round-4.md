---
title: Watching movies alphabetically, round IV
description: The ratings of the fourth round are in.
image: assets/images/tag-movie.jpg
tags:
  - movie
  - reference
---

The question <q>What do we watch?</q> is a tough one to answer.
We decided to break out of our self-established, comfortable, filter bubble and started watching movies alphabetically.

Here are the previous rounds:

- [Round I]({% post_url 2020-04-01-picking-and-watching-movies-alphabetically %})
- [Round II]({% post_url 2020-10-26-watching-movies-alphabetically-round-2 %})
- [Round III]({% post_url 2021-04-06-watching-movies-alphabetically %})

The alphabetic selection strategy still works fine. However we watched several other
movies in the meantime.
Check the [recently rated movies page]({{ '/ratings/recent/' | relative_url }})
to see which other movies I've rated.

{% assign ratings = site.data.movie_ratings.round4 | reverse %}
{% for rating in ratings %}
{% assign imdb = site.data.ratings | where: "Const", rating['const'] | first %}
{% include movie-rating.html %}
{% endfor %}
