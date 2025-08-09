Low-maintenance workflow

- Posts:
  1. Create a file at src/content/blog/your-slug.md
  2. Add frontmatter:
     ***
     title: Your Title
     date: YYYY-MM-DD
     description: Optional short summary
     draft: true|false (optional)
     ***
  3. Commit and push; deploy builds automatically.

- Ratings:
  - Edit src/data/ratings.json (array of { title, rating, year } objects).
  - Commit and push.

- No custom CSS or JS by default. When ready, drop a classless CSS into public/ and link it in BaseLayout. No markup changes needed.
