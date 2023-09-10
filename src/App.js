import { useEffect, useRef, useState } from "react";
import { getMovies, getWatchedMovie } from "./data/TempMovieData";

import MainContainer from "./components/MainContainer";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import SearchInput from "./components/common/SearchInput";
import NumMovies from "./components/NumMovies";
import Box from "./components/common/Box";
import MovieList from "./components/MovieList";
import MovieSummary from "./components/MovieSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";
import { useMovie } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

const BASE_API_KEY = "e4a13659";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("inception");

  // Custom Hook to get Movies Logic
  const { movies, isLoading, error } = useMovie(searchQuery);
  const [watchedMovies, setWatchedMovies] = useLocalStorage(
    [],
    "watchedMovies"
  );

  const handleSelectedId = function (id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovieDetails = function () {
    setSelectedId(null);
  };

  const handleAddWatchedMovie = function (movie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
  };

  const handleDeleteWatched = function (id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  };

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
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
