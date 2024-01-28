---
title: Picking and watching movies alphabetically
description: "Moving out of the comfortable filter bubble and explore art."
image: assets/images/tag-movie.jpg
tags:
  - movie
  - reference
---

The question <q>What do we watch?</q> is a tough one to answer.
We decided to break out of our self-established, comfortable, filter bubble and started watching movies alphabetically.

Moving out of the filter bubble has been a good experience:

- We saved a good amount of time with the chosen selection method.
- We've watched movies we would never have picked.
- We watched classics, B-movies, genres we'd usually skip, etc.
- We also lost some saved time by watching movies which weren't good — but is that a difference to any other selection method?
- We made an exception for the letter X and skipped it.[^1]

We started on 15th February 2020 and made it through the alphabet by end of March 2020. That's a pace of
<sup>26</sup>∕<sub>7</sub> = 3.714285714 movies per week.

Movies are a form of art. Let's keep it alive and diverse by watching movies which aren't edited to drive business metrics to new heights.

{% for rating in site.data.movie_ratings.round1 %}
{% assign imdb = site.data.ratings | where: "Const", rating['const'] | first %}
{% include movie-rating.html %}
{% endfor %}

I'm in for a repetition.

[^1]: We're not into superhero movies. I'm _d'accord_ with this opinion: [Martin Scorsese: I Said Marvel Movies Aren’t Cinema. Let Me Explain.](https://www.nytimes.com/2019/11/04/opinion/martin-scorsese-marvel.html), _The New York Times, 4th November 2019_
