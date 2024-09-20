import React from "react";
import { FaUsers, FaTicketAlt, FaFilm, FaTheaterMasks } from "react-icons/fa";

const DashBoard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Bookings Overview */}
        <div className="bg-blue-600 text-white p-4 rounded-md">
          <FaTicketAlt className="text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-2xl">1,245</p>
        </div>

        {/* Movies Overview */}
        <div className="bg-green-600 text-white p-4 rounded-md">
          <FaFilm className="text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Movies</h2>
          <p className="text-2xl">85</p>
        </div>

        {/* Theaters Overview */}
        <div className="bg-purple-600 text-white p-4 rounded-md">
          <FaTheaterMasks className="text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Theaters</h2>
          <p className="text-2xl">12</p>
        </div>

        {/* Users Overview */}
        <div className="bg-red-600 text-white p-4 rounded-md">
          <FaUsers className="text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl">3,562</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Manage Bookings</h2>
          <p>View and manage all bookings made by customers.</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md">
            Go to Bookings
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Manage Movies</h2>
          <p>Add, edit, or remove movies from the system.</p>
          <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md">
            Go to Movies
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Manage Theaters</h2>
          <p>View and update theater information.</p>
          <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md">
            Go to Theaters
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Manage Users</h2>
          <p>View and manage registered users.</p>
          <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md">
            Go to Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
