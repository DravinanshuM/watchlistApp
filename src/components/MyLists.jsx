import { FaCircleCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

// context.
import { GlobalContext } from "../context/GlobalState.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";

const onlineFallbackPoster =
  "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg";

const MyLists = (movie) => {
  const { Title, Poster, Year, Type, imdbID } = movie;
  const [isAdding, setIsAdding] = useState(false);
  const { watched } = useContext(GlobalContext);

  // useEffect to check if movie is already added on page load
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("watchedMovie")) || [];
    const isAlreadyAdded = existingData.some((item) => item.imdbID === imdbID);
    setIsAdding(isAlreadyAdded);
  }, [imdbID]);

  // notify message
  const Toastify = (message, type) => {
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
    if (isAdding) {
      Toastify("Movie already added", "error");
      return;
    }

    watched({ Title, Poster, Year, Type, imdbID });

    // update localStorage
    const existingData = JSON.parse(localStorage.getItem("watchedMovie")) || [];
    const newData = { Title, Poster, Year, Type, imdbID };
    const updatedData = [...existingData, newData];
    localStorage.setItem("watchedMovie", JSON.stringify(updatedData));

    setIsAdding(true);
    Toastify("Movie added to watched list", "success");
  };

  return (
    <>
      <div className="max-w-xs w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 m-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
        <button
          type="button"
          onClick={() => handleAddClick(Title, Poster, Year, Type, imdbID)}
          disabled={isAdding}
        >
          {isAdding ? (
            <FaCheck
              className="text-2xl inline-block text-green-500 hover:text-green-800"
              aria-label="watched Movie"
              title="watched movie"
            />
          ) : (
            <FaCircleCheck
              className="text-2xl inline-block text-red-500 hover:text-red-800"
              aria-label="Add to watched"
              title="Add to watched"
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
    </>
  );
};

export default MyLists;
