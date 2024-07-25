import { BiSolidBookmarkPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

// context.
import { GlobalContext } from "../context/GlobalState.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";

const onlineFallbackPoster =
  "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg";

function MovieCard(movie) {
  const { Title, Poster, Year, Type, imdbID } = movie;
  const [isAdding, setIsAdding] = useState(false);
  const { watchlists, state } = useContext(GlobalContext);

  // useEffect to check if movie is already added on page load
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("movie")) || [];
    const isAlreadyAdded = existingData.some((item) => item.imdbID === imdbID);
    setIsAdding(isAlreadyAdded);
  }, [imdbID]);

  // notify message.
  const Tostify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  const handleAddClick = (Title, Poster, Year, Type, imdbID) => {
    if (state.LoginAuth.length > 0) {
      if (isAdding) {
        Tostify("Movie already added", "error");
        return;
      }

      watchlists({ Title, Poster, Year, Type, imdbID });

      // Update localStorage
      const existingData = JSON.parse(localStorage.getItem("movie")) || [];
      const newData = { Title, Poster, Year, Type, imdbID };
      const updatedData = [...existingData, newData];
      localStorage.setItem("movie", JSON.stringify(updatedData));

      setIsAdding(true);
      Tostify("Movie added", "success");
    } else {
      Tostify("Please first login then add a movie", "error");
    }
  };

  return (
    <div className="max-w-xs w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 m-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
      <button
        type="button"
        onClick={() => handleAddClick(Title, Poster, Year, Type, imdbID)}
        disabled={isAdding}
      >
        {isAdding ? (
          <FaCheck
            className="text-2xl inline-block text-green-500 hover:text-green-800"
            aria-label="Added Movie"
            title="Added Movie"
          />
        ) : (
          <BiSolidBookmarkPlus
            className="text-3xl inline-block text-red-500 hover:text-red-800"
            aria-label="Adding Movie"
            title="Adding Movie"
          />
        )}
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
}

export default MovieCard;
