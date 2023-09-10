import Button from "./common/Button";
import LabeledBadge from "./common/LabeledBadge";

export default function WatchedMovie({ movie, onDeletewatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`Poster of ${movie.title}`} />
      <h3>{movie.title}</h3>
      <div>
        <LabeledBadge emoji="⭐️">{movie.imdbRating}</LabeledBadge>
        <LabeledBadge emoji="🌟">{movie.userRating}</LabeledBadge>
        <LabeledBadge emoji="🖥">{movie.runtime} min</LabeledBadge>
      </div>
      <Button
        className="btn-delete"
        onClick={() => onDeletewatched(movie.imdbID)}
      >
        &times;
      </Button>
    </li>
  );
}
