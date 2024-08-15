import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("now-showing");

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
      fetchMovies(activeCategory);
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie");
    }
  };

  const handleUpdate = (movieId) => {
    window.location.href = `/update-movie/${movieId}`;
  };

  return (
    <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row">
      <div className="w-full">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-gray-800">
          View Movies
        </h1>

        <div className="mb-4 lg:mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("now-showing")}
            className={`px-4 py-2 rounded-md ${
              activeCategory === "now-showing"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Now Showing
          </button>
          <button
            onClick={() => setActiveCategory("next-release")}
            className={`px-4 py-2 rounded-md ${
              activeCategory === "next-release"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Next Release
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Poster
                  </th>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Title
                  </th>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Description
                  </th>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Release Date
                  </th>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Duration
                  </th>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Category
                  </th>
                  <th className="py-2 lg:py-3 px-2 lg:px-4 border-b text-left text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.movieid} className="hover:bg-gray-50">
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b">
                      <img
                        src={`http://localhost:4000/${movie.poster}`}
                        alt={movie.title}
                        className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b text-gray-800">
                      {movie.title}
                    </td>
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b text-gray-800">
                      {movie.description}
                    </td>
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b text-gray-800">
                      {new Date(movie.releasedate).toLocaleDateString()}
                    </td>
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b text-gray-800">
                      {movie.duration} minutes
                    </td>
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b text-gray-800">
                      {movie.categoryname}
                    </td>
                    <td className="py-2 lg:py-3 px-2 lg:px-4 border-b">
                      <div className="flex space-x-1 lg:space-x-2">
                        <button
                          onClick={() => handleUpdate(movie.movieid)}
                          className="bg-green-600 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-md hover:bg-green-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(movie.movieid)}
                          className="bg-red-600 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ViewMovie;
