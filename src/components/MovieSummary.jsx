import LabeledBadge from "./common/LabeledBadge";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function MovieSummary({ watchedMovies }) {
  const numMovies = watchedMovies.length;
  const averageImdbRating = average(
    watchedMovies.map((movie) => movie.imdbRating)
  );
  const averageUserRating = average(
    watchedMovies.map((movie) => movie.userRating)
  );

  const averageRuntime = average(watchedMovies.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <LabeledBadge emoji="#️⃣">{numMovies}</LabeledBadge>
        <LabeledBadge emoji="⭐️">{averageImdbRating.toFixed(1)}</LabeledBadge>
        <LabeledBadge emoji="🌟">{averageUserRating.toFixed(1)}</LabeledBadge>
        <LabeledBadge emoji="🖥">{averageRuntime.toFixed(1)} min</LabeledBadge>
      </div>
    </div>
  );
}
