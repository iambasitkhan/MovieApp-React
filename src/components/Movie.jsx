export default function Movie({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
      <h3>{movie.Title}</h3>
      <p>
        <span>🗓</span> {movie.Year}
      </p>
    </li>
  );
}
