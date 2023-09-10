import Movie from "./Movie";

export default function MovieList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie movie={movie} onSelectedId={onSelectedId} key={movie.imdbID} />
      ))}
    </ul>
  );
}
