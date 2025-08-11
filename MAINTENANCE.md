# Maintenance Guide

This document outlines key maintenance procedures for the Astro website.

## Movie Ratings and Recommendations Data Migration

The movie ratings and recommendations data displayed on the website are generated from two source files:

- `_data/ratings.csv`: Contains the primary movie data, including titles, ratings, and IMDb IDs.
- `_data/movie_ratings.yml`: Contains additional information, specifically which movies are recommended and their associated notes.

To update the `astro/src/data/movies.json` and `astro/src/data/recommendations.json` files (which are consumed by the Astro site), you must run the migration script located at `bin/migrate-ratings`.

**Steps to update movie data:**

1.  Ensure you have the latest versions of `_data/ratings.csv` and `_data/movie_ratings.yml`.
2.  Open your terminal in the project root directory (`/Users/gil/versioned/gildesmarais/website`).
3.  Execute the migration script:
    ```bash
    bin/migrate-ratings
    ```
4.  This script will regenerate `astro/src/data/movies.json` and `astro/src/data/recommendations.json` based on the latest source data.
5.  You may need to restart your Astro development server (`cd astro && npm run dev`) to see the changes reflected on the website.
