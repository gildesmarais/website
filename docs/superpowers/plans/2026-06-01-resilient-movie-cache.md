# Resilient Movie Cache Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize movie and recommendation data loading into a resilient cache utility to fix stale data issues.

**Architecture:** Refactor `src/utils/movieCache.ts` to manage both `movies.json` and `recommendations.json`. Use a robust singleton pattern that ensures data freshness while maintaining performance.

**Tech Stack:** TypeScript, Astro

---

### Task 1: Refactor `src/utils/movieCache.ts`

**Files:**
- Modify: `src/utils/movieCache.ts`

- [ ] **Step 1: Update the cache utility to handle both movies and recommendations**

```typescript
import moviesData from "../data/movies.json"
import recommendationsData from "../data/recommendations.json"
import type { Movie } from "./movieUtils"

export interface MovieCache {
  movies: Movie[]
  recommendationsSet: Set<string>
  recommendationNotes: Map<string, string>
}

let movieCache: MovieCache | null = null

/**
 * Returns the centralized movie and recommendation data.
 * The cache is initialized once and persists in memory for the lifetime of the process/lambda.
 * This ensures high performance while centralizing the data source of truth.
 */
export function getMovieCache(): MovieCache {
  if (!movieCache) {
    movieCache = {
      movies: moviesData as Movie[],
      recommendationsSet: new Set(recommendationsData.map((r) => r.const).filter(Boolean)),
      recommendationNotes: new Map(
        recommendationsData
          .map((r) => [r.const, r.note])
          .filter(([constId, note]) => constId && note)
          .map(([constId, note]) => [constId, note as string]),
      ),
    }
  }
  return movieCache
}

/**
 * Legacy wrapper for backward compatibility with existing code.
 */
export function getRecommendationsCache() {
  const cache = getMovieCache()
  return {
    set: cache.recommendationsSet,
    notes: cache.recommendationNotes,
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/movieCache.ts
git commit -m "refactor: centralize movie and recommendation data in movieCache"
```

---

### Task 2: Update `src/pages/movies/index.astro`

**Files:**
- Modify: `src/pages/movies/index.astro`

- [ ] **Step 1: Update imports and use `getMovieCache`**

```astro
---
export const prerender = false

import MovieLayout from "../../layouts/MovieLayout.astro"
import Hero from "../../components/Hero.astro"
import MovieCard from "../../components/MovieCard.astro"
import MovieFilters from "../../components/MovieFilters.astro"
// REMOVE: import movies from "../../data/movies.json"
import MoviePoster from "../../components/MoviePoster.astro"
import { processMovies, parseUrlParams, type Movie } from "../../utils/movieUtils"
import { getMovieCache } from "../../utils/movieCache"
import { externalRel } from "../../utils/linkRel"

// Get centralized movie data
const { movies, recommendationsSet, recommendationNotes } = getMovieCache()

// Validate data integrity
if (!Array.isArray(movies) || movies.length === 0) {
  throw new Error("Invalid or empty movies data")
}

const title = "Movie Ratings"
const description = "Personal movie ratings and recommendations. Explore films worth watching."

// Parse URL parameters using utility function
const url = new URL(Astro.request.url)
const { filters, sortOptions } = parseUrlParams(url)

// Process movies using utility functions
const { movies: processedMovies } = processMovies(movies, recommendationsSet, filters, sortOptions)
---
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/movies/index.astro
git commit -m "feat: use centralized movie cache in index page"
```

---

### Task 3: Update `src/pages/movies/[imdbId].astro`

**Files:**
- Modify: `src/pages/movies/[imdbId].astro`

- [ ] **Step 1: Update imports and use `getMovieCache`**

```astro
---
export const prerender = false

import MovieLayout from "../../layouts/MovieLayout.astro"
import MovieModalContent from "../../components/MovieModalContent.astro"
import MoviePoster from "../../components/MoviePoster.astro"
// REMOVE: import movies from "../../data/movies.json"
import type { Movie } from "../../utils/movieUtils"
import { getMovieCache } from "../../utils/movieCache"

// Get centralized movie data
const { movies, recommendationsSet, recommendationNotes } = getMovieCache()

// Validate data integrity
if (!Array.isArray(movies) || movies.length === 0) {
  throw new Error("Invalid or empty movies data")
}

const { imdbId } = Astro.params

// Find the specific movie directly
const movie = movies.find((m) => m.const === imdbId)

if (!movie) {
  return Astro.redirect("/movies/")
}

const isRecommendation = recommendationsSet.has(movie.const)
const note = recommendationNotes.get(movie.const)
---
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/movies/[imdbId].astro
git commit -m "feat: use centralized movie cache in movie details page"
```

---

### Task 4: Verification

- [ ] **Step 1: Verify build passes**

Run: `npm run build`

- [ ] **Step 2: Verify movie pages still work (requires local dev server)**

Run: `npm run dev` and check `http://localhost:4321/movies/`

- [ ] **Step 3: Commit final changes if any**
