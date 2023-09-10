import { useEffect, useState } from "react";
import Button from "./common/Button";
import ErrorMessage from "./common/ErrorMessage";
import Loader from "./common/Loader";
import StarRating from "./common/StarRating";

const BASE_API_KEY = "e4a13659";

export default function MovieDetails({
  selectedId,
  onCloseDetails,
  onAddWatchedMovie,
  watchedMovies,
}) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const isRated = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const currentMovieUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actor: actor,
    Genre: genre,
    Director: director,
  } = details;

  useEffect(function () {
    const callback = function (e) {
      if (e.code === "Escape") onCloseDetails();
    };
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  useEffect(
    function () {
      if (title === undefined) return;
      document.title = `Movie | ${title}`;

      return () => (document.title = "usePopcorn");
    },
    [title]
  );

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const resp = await fetch(
            `http://www.omdbapi.com/?apikey=${BASE_API_KEY}&i=${selectedId}`
          );
          if (!resp.ok) throw new Error("Failed to fetch Details");
          const data = await resp.json();

          setDetails(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [selectedId]
  );

  const handleSetRating = function (rating) {
    setUserRating(rating);
  };

  const handleAddMovie = function () {
    if (!userRating) return;

    const newWatchedMovie = {
      title,
      poster,
      year,
      imdbID: selectedId,
      imdbRating,
      runtime: parseInt(runtime),
      userRating,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseDetails();
  };

  return (
    <div className="details">
      {error && <ErrorMessage message={error} />}
      {isLoading && !error && <Loader />}
      {!error && !isLoading && (
        <>
          <header>
            <Button className="btn-back" onClick={onCloseDetails}>
              &larr;
            </Button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isRated ? (
                <>
                  <StarRating
                    size={26}
                    maxRating={10}
                    onSetRate={handleSetRating}
                  />
                  {userRating > 0 && (
                    <Button className="btn-add" onClick={handleAddMovie}>
                      + Add to List
                    </Button>
                  )}
                </>
              ) : (
                <p>
                  You already rated by {currentMovieUserRating} <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
