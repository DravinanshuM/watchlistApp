import { useEffect, useState } from "react";
import SideHeader from "../components/SideHeader";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Spiner from "../components/Spiner.jsx";
import { toast } from "react-toastify";

// import API.
import { getAllMovies } from "../api/MoviesAPI.js";
import MovieCard from "../components/MovieCard.jsx";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  // Validations.
  const formValidation = (input) => {
    if (input.trim() === "") {
      setError("Search input cannot be empty.");
      toast.error("Search input cannot be empty.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleFormChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAPISearch = (e) => {
    e.preventDefault();
    if (!formValidation(search)) {
      return;
    }
    if (search !== query) {
      setQuery(search);
      setLoading(true);
      setSearched(true);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies(query);
        if (response?.status === 200) {
          setMovies(response.data.Search || []);
          toast.success("response");
        } else {
          setError("Something went wrong.");
          console.error("Something went wrong.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      const timeoutId = setTimeout(() => {
        fetchMovies();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [query]);

  return (
    <>
      <div className="w-full h-auto flex flex-row ">
        <div className="w-1/4 fixed z-40">
          <SideHeader />
        </div>
        <div className="w-2/3 ml-20 sm:ml-44 md:ml-60 lg:ml-[396px] mt-7">
          <div>{loading && <Spiner text="Loading..." />}</div>
          {/* welcome section */}
          <section className="border-2 border-red-500 p-7 rounded-md">
            <header
              className="text-4xl font-normal capitalize mb-7 leading-7"
              id="welcomeText"
            >
              Welcome to <span className="text-red-500">Watchlists</span>
            </header>
            <p className="text-[17px] leading-7">
              Browse movies, add them to watchlists, and share them with
              friends. <br />
              Just click the
              <BiSolidBookmarkPlus
                className="text-3xl inline-block text-gray-600"
                aria-label="Bookmark Icon"
              />
              to add a movie, click on the poster to see more details, and mark
              movies as watched.
            </p>
          </section>
          {/* search box section */}
          <form onSubmit={handleAPISearch}>
            <section className="mt-11 relative z-0">
              <div className="w-full flex flex-row items-center justify-center z-0">
                <FaSearch className="absolute top-3.5 left-3 text-gray-500" />
                <input
                  type="search"
                  className="w-full z-0 px-2 py-2 pl-10 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search"
                  value={search}
                  onChange={handleFormChange}
                />
                <button
                  type="submit"
                  className="z-0 absolute right-0 border-2 border-red-700 rounded-lg p-2 text-white bg-red-500 hover:bg-red-700"
                >
                  Search
                </button>
              </div>
            </section>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
          {/* show here card like movie Data */}
          <section className="mt-7">
            {!searched ? (
              <div className="flex flex-row items-center justify-center">
                <p className="text-gray-500 md:text-xl text-base">
                  Please search for a movie.
                </p>
              </div>
            ) : loading ? (
              <div className="flex flex-row items-center justify-center">
                searching...
              </div>
            ) : movies && movies.length > 0 ? (
              <div className="flex flex-row justify-around flex-wrap">
                {movies.map((movie, index) => (
                  <MovieCard key={index} {...movie} />
                ))}
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center">
                <p className="text-red-500 md:text-xl text-base">
                  Searched movie not found.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
