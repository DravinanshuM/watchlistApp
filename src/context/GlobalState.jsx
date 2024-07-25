import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer.js";

const storedData = localStorage.getItem("Login");
const storedWatchlists = localStorage.getItem("movie");
const storedWatchedMovies = localStorage.getItem("watchedMovie");

console.log(storedData, storedWatchlists, storedWatchedMovies);
const initialState = {
  watchlists: storedWatchlists ? JSON.parse(storedWatchlists) : [],
  watched: storedWatchedMovies ? JSON.parse(storedWatchedMovies) : [],
  LoginAuth: storedData ? JSON.parse(storedData) : [],
};

// step:1. create globalContext and provide initialState.
export const GlobalContext = createContext(initialState);

// step: 3. create GlobalProvider.
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for LoginAuth.
  const LoginAuth = (userLogin) => {
    dispatch({ type: "Login_Auth", payload: userLogin });
  };

  // actions for watchlists.
  const watchlists = (userWatchlists) => {
    dispatch({ type: "user_watchlists", payload: userWatchlists });
  };

  // actions for watched.
  const watched = (userWatched) => {
    dispatch({ type: "user_watched", payload: userWatched });
  };

  // actions for remove.
  const removeMovie = (imdbID) => {
    dispatch({ type: "REMOVE_MOVIE", payload: imdbID });
  };

  return (
    <GlobalContext.Provider
      value={{ state, LoginAuth, watchlists, watched, removeMovie }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
