import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewShowTime = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/showtime");
      setShowtimes(response.data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      toast.error("Failed to fetch showtimes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (showtimeId) => {
    try {
      await axios.delete(`http://localhost:4000/showtime/${showtimeId}`);
      toast.success("Showtime deleted successfully");
      fetchShowtimes(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting showtime:", error);
      toast.error("Failed to delete showtime");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">View Showtimes</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Movie</th>
                <th className="py-2 px-4 border-b text-left">Theater</th>
                <th className="py-2 px-4 border-b text-left">Show Date</th>
                <th className="py-2 px-4 border-b text-left">Show Time</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((showtime) => (
                <tr key={showtime.showtimeid}>
                  <td className="py-2 px-4 border-b">{showtime.title}</td>
                  <td className="py-2 px-4 border-b">
                    {showtime.theater_name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(showtime.show_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{showtime.show_time}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(showtime.showtimeid)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ViewShowTime;
