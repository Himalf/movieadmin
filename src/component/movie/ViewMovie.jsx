import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("now-showing"); // Default category

  useEffect(() => {
    fetchMovies(activeCategory);
  }, [activeCategory]);

  const fetchMovies = async (category) => {
    setLoading(true);
    try {
      const url =
        category === "now-showing"
          ? "http://localhost:4000/movie/now-showing"
          : "http://localhost:4000/movie/next-release";

      const response = await axios.get(url);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`http://localhost:4000/movie/${movieId}`);
      toast.success("Movie deleted successfully");
      fetchMovies(activeCategory); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie");
    }
  };

  const handleUpdate = (movieId) => {
    // Redirect to update page or show update form
    window.location.href = `/update-movie/${movieId}`;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">View Movies</h1>

      {/* Buttons to switch categories */}
      <div className="mb-6">
        <button
          onClick={() => setActiveCategory("now-showing")}
          className={`px-4 py-2 rounded-md mr-2 ${
            activeCategory === "now-showing"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Now Showing
        </button>
        <button
          onClick={() => setActiveCategory("next-release")}
          className={`px-4 py-2 rounded-md ${
            activeCategory === "next-release"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Next Release
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Release Date</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.movieid}>
                <td className="py-2 px-4 border-b">{movie.title}</td>
                <td className="py-2 px-4 border-b">{movie.description}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(movie.releasedate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{movie.duration} minutes</td>
                <td className="py-2 px-4 border-b">{movie.categoryname}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdate(movie.movieid)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(movie.movieid)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewMovie;
