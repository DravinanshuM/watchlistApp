import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, WatchList, Watched, NotFound } from "./pages/index.js";

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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
