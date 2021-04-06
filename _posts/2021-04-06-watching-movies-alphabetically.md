---
layout: post
title: Watching movies alphabetically, round III
description: The ratings of the third round are in.
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

For just this third round, we've expanded the series to watch movies that start with the numbers 0 through 9. Overall, it was a better round than the previous one and some films left a lasting impression.

{% for rating in site.data.movie_ratings.round3 %}
{% include movie-rating.html %}
{% endfor %}
