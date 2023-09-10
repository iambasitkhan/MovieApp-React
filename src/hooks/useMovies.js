import { useState, useEffect } from "react";

const BASE_API_KEY = "e4a13659";

export function useMovie(searchQuery, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const resp = await fetch(
            `http://www.omdbapi.com/?apikey=${BASE_API_KEY}&s=${searchQuery}`,
            { signal: controller.signal }
          );

          if (!resp.ok) throw new Error("Failed to fetch Movies 🔥");

          const data = await resp.json();
          if (data.Response === "False")
            throw new Error("Movie Not Found For your Search Query ⚡️");

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (!searchQuery.length) {
        setError("");
        return;
      }

      //   handleCloseMovieDetails();
      fetchMovies();

      return () => controller.abort();
    },
    [searchQuery]
  );

  return { movies, isLoading, error };
}
