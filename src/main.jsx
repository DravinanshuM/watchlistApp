import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// tostified.
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Global context.
import { GlobalProvider } from "./context/GlobalState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
      <ToastContainer />
    </GlobalProvider>
  </React.StrictMode>
);
