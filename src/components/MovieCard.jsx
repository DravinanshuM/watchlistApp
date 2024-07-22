import unknown from "../assets/unnamed.avif";

function MovieCard(movie) {
  const { Title, Poster } = movie;
  return (
    <>
      <div className="max-w-36 m-2 flex-shrink-0">
        <img className="w-full" src={Poster || unknown} alt={Title || ""} />
        <div className="mt-2 text-center">
          <h3 className="text-lg font-semibold">{Title}</h3>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
