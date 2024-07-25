import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WatchList, Watched, NotFound } from "./pages/index.js";
import UserSignIn from "./Auth/UserSignIn.jsx";
import UserSignUp from "./Auth/UserSignUp.jsx";

// Import css for Styling.
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
