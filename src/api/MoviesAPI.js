import axios from "axios";

// console.log(import.meta.env.VITE_SOME_KEY);

async function getAllMovies(search) {
  let api_key = import.meta.env.VITE_MOVIE_API_KEY;
  const url = `https://www.omdbapi.com/?s=${search}&y=2022&apikey=${api_key}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

export { getAllMovies };
