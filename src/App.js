import { useEffect, useState } from "react";
import { getMovies, getWatchedMovie } from "./data/TempMovieData";

import MainContainer from "./components/MainContainer";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Input from "./components/common/Input";
import NumMovies from "./components/NumMovies";
import Box from "./components/common/Box";
import MovieList from "./components/MovieList";
import MovieSummary from "./components/MovieSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";

const BASE_API_KEY = "e4a13659";

export default function App() {
  const [movies, setMovies] = useState([]);

  const [watchedMovies, setWatchedMovies] = useState(function () {
    const storageData = localStorage.getItem("watchedMovies");
    return JSON.parse(storageData);
  });

  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("inception");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectedId = function (id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovieDetails = function () {
    setSelectedId(null);
  };

  const handleAddWatchedMovie = function (movie) {
    console.log(movie);
    setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
  };

  const handleDeleteWatched = function (id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  };

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
    },
    [watchedMovies]
  );

  useEffect(
    function () {
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

      handleCloseMovieDetails();
      fetchMovies();

      return () => controller.abort();
    },
    [searchQuery]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Input
          type="search"
          className="search"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <NumMovies movies={movies} />
      </NavBar>
      <MainContainer>
        <Box>
          {error && <ErrorMessage message={error} />}
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedId={handleSelectedId} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watchedMovies={watchedMovies}
              selectedId={selectedId}
              onCloseDetails={handleCloseMovieDetails}
              onAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <MovieSummary watchedMovies={watchedMovies} />
              <WatchedMovieList
                watchedMovies={watchedMovies}
                onDeletewatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </MainContainer>
    </>
  );
}
