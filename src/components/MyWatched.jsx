import { IoRemoveCircleSharp } from "react-icons/io5";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.jsx";
import { toast } from "react-toastify";

const onlineFallbackPoster =
  "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg";

const MyWatched = (movie) => {
  const { Title, Poster, Year, Type, imdbID } = movie;
  const { removeMovie, state } = useContext(GlobalContext);
  console.log(state.watched);

  const handleRemoveClick = () => {
    console.log("Removing movie with ID:", imdbID);
    removeMovie(imdbID);

    let watchedMovies = JSON.parse(localStorage.getItem("watchedMovie"));
    if (watchedMovies) {
      const imdbIDToRemove = imdbID;
      watchedMovies = watchedMovies.filter(
        (movie) => movie.imdbID !== imdbIDToRemove
      );
      localStorage.setItem("watchedMovie", JSON.stringify(watchedMovies));
    }

    toast.success(`Removed ${Title} from watched movies`);
  };

  return (
    <div className="max-w-xs w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 m-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
      <button type="button" onClick={handleRemoveClick}>
        <IoRemoveCircleSharp
          className="text-2xl inline-block text-red-500 hover:text-red-800"
          aria-label="Remove watched movie"
          title="Remove watched movie"
        />
      </button>
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={Poster || onlineFallbackPoster}
        alt={Title || "Movie Poster"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = onlineFallbackPoster;
        }}
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-2 truncate">{Title}</h3>
        <p className="text-sm text-gray-600">{Type}</p>
        <p className="text-sm text-gray-600">{Year}</p>
      </div>
    </div>
  );
};

export default MyWatched;
