const AppReducer = (state, action) => {
  switch (action.type) {
    case "Login_Auth":
      return {
        ...state,
        LoginAuth: [action.payload, ...state.LoginAuth],
      };

    case "user_watchlists":
      return {
        ...state,
        watchlists: [action.payload, ...state.watchlists],
      };

    case "user_watched":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };

    case "REMOVE_MOVIE":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.imdbID !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default AppReducer;
