import type { APIRoute } from "astro";

export const prerender = false; // Ensure this API route is never pre-rendered

export const GET: APIRoute = async ({ params, request }) => {
  const imdbId = params.imdbId;
  const API_KEY = import.meta.env.OMDB_API_KEY; // Access the non-public key

  if (!imdbId) {
    return new Response(JSON.stringify({ error: "IMDb ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!API_KEY) {
    console.error("OMDB_API_KEY is not set in environment variables.");
    return new Response(
      JSON.stringify({ error: "Server configuration error: API key missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`,
    );
    const data = await response.json();

    if (data.Response === "True" && data.Poster && data.Poster !== "N/A") {
      return new Response(
        JSON.stringify({ poster: data.Poster, title: data.Title }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=86400", // Cache for 1 day
          },
        },
      );
    } else {
      console.warn(
        `OMDb API: No poster found for IMDb ID: ${imdbId}. Reason: ${data.Error || "Unknown error"}`,
      );
      return new Response(
        JSON.stringify({ error: data.Error || "No poster found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error(`Error fetching from OMDb API for IMDb ID: ${imdbId}`, error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch movie data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
