import { useState, useEffect } from "react";

const KEY = "7383bbeb";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      //browser API for aborting every keystroke request and only send the last one
      const controller = new AbortController();

      async function getMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data.Response === "False") {
            setError("Movie not found");
            setMovies([]);
            return;
          }

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (!err.name === "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //   handleCloseMovie();
      getMovies();

      //cleanup function
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
