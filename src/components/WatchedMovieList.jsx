import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watchedMovies, onDeletewatched }) {
  return (
    <ul className=" list list-watched">
      {watchedMovies.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeletewatched={onDeletewatched}
        />
      ))}
    </ul>
  );
}
