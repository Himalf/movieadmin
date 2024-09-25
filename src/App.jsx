import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/layout/Layout";
import MovieCategory from "./app/movie_category";
import Theaters from "./app/theaters";
import Movies from "./app/movies";
import ShowTime from "./app/show_time";
import Seat from "./app/seats";
import Booking from "./app/booking";
import UpdateCategory from "./component/moviecategory/UpdateCategory";
import UpdateMovie from "./component/movie/UpdateMovie";
import UpdateTheater from "./component/theater/UpdateTheater";
import DashBoard from "./app/dashboard";
import Users from "./app/users";
import AdminLogin from "./app/login/AdminLogin";
import PrivateRoute from "./shared-component/PrivateRoute";
function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              element={
                <PrivateRoute>
                  <MovieCategory />
                </PrivateRoute>
              }
              path="/moviecategory"
            />
            <Route
              element={<UpdateCategory />}
              path="/editcategory/:categoryId"
            />
            <Route
              element={
                <PrivateRoute>
                  <Theaters />
                </PrivateRoute>
              }
              path="/theaters"
            />
            <Route
              element={<UpdateTheater />}
              path="theaters/edittheater/:theaterId"
            />
            <Route
              element={
                <PrivateRoute>
                  <Movies />
                </PrivateRoute>
              }
              path="/movie"
            />
            <Route
              element={<UpdateMovie />}
              path="/movie/updatemovie/:movieId"
            />
            <Route
              element={
                <PrivateRoute>
                  <ShowTime />
                </PrivateRoute>
              }
              path="/showtime"
            />
            <Route
              element={
                <PrivateRoute>
                  <Seat />
                </PrivateRoute>
              }
              path="/seat"
            />
            <Route
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
              path="/bookings"
            />
            <Route
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
              path="/users"
            />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
