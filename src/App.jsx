import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout/Layout";
import MovieCategory from "./app/movie_category";
import Theaters from "./app/theaters";
import Movies from "./app/movies";
import ShowTime from "./app/show_time";
import Seat from "./app/seats";
import Booking from "./app/booking";
function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<MovieCategory />} path="/moviecategory" />
            <Route element={<Theaters />} path="/theaters" />
            <Route element={<Movies />} path="/movie" />
            <Route element={<ShowTime />} path="/showtime" />
            <Route element={<Seat />} path="/seat" />
            <Route element={<Booking />} path="/bookings" />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
