import { isPosterOk, type PosterResponse } from "./poster"

const inFlight = new Map<string, Promise<void>>()

async function fetchPoster(imdbId: string, img: HTMLImageElement): Promise<void> {
  try {
    const response = await fetch(`/api/movie/${imdbId}`)
    const data = (await response.json()) as PosterResponse

    if (response.ok && isPosterOk(data) && data.poster !== "N/A") {
      img.src = data.poster
      img.alt = `${data.title} Poster`
    } else {
      const reason = !isPosterOk(data) ? data.error : "Unknown error"
      console.warn(`No poster found for IMDb ID: ${imdbId}. Reason: ${reason}`)
      img.src = "/poster-missing.svg"
      img.alt = "No poster available"
    }
  } catch (error) {
    console.error(`Error fetching poster for IMDb ID: ${imdbId}`, error)
    img.src = "/poster-error.svg"
    img.alt = "Error loading poster"
  }
}

function loadPoster(imdbId: string, img: HTMLImageElement): Promise<void> {
  const existing = inFlight.get(imdbId)
  if (existing) return existing

  const promise = fetchPoster(imdbId, img).finally(() => {
    inFlight.delete(imdbId)
  })
  inFlight.set(imdbId, promise)
  return promise
}

export function initPosterLoader(root: ParentNode = document): void {
  const posters = root.querySelectorAll<HTMLImageElement>("[data-poster-imdb]")
  if (posters.length === 0) return

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const img = entry.target as HTMLImageElement
      const imdbId = img.dataset.posterImdb
      if (imdbId) loadPoster(imdbId, img)
      obs.unobserve(entry.target)
    })
  })

  posters.forEach((poster) => observer.observe(poster))
}
