import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaFilm,
  FaTheaterMasks,
  FaChair,
  FaClock,
  FaTicketAlt,
  FaLayerGroup,
  FaUser,
} from "react-icons/fa";

const sidebarData = [
  {
    name: "movie category",
    path: "/moviecategory",
    icon: <FaLayerGroup />,
  },
  {
    name: "movie",
    path: "/movie",
    icon: <FaFilm />,
  },
  {
    name: "seat",
    path: "/seat",
    icon: <FaChair />,
  },
  {
    name: "show time",
    path: "/showtime",
    icon: <FaClock />,
  },
  {
    name: "theaters",
    path: "/theaters",
    icon: <FaTheaterMasks />,
  },
  {
    name: "bookings",
    path: "/bookings",
    icon: <FaTicketAlt />,
  },
  {
    name: "users",
    path: "/users",
    icon: <FaUser />,
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-30 text-white"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-20 transform ${
          isSidebarOpen || isExpanded ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
        style={{ width: isExpanded ? "auto" : "fit-content" }}
      >
        <nav className="flex flex-col p-4">
          {/* Hamburger inside sidebar */}
          <button
            onClick={toggleExpand}
            className="flex items-center p-2 mb-4 text-white hover:bg-gray-700 transition-colors"
          >
            <FaBars size={24} />
          </button>

          {sidebarData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center capitalize p-2 my-2 rounded-md hover:bg-gray-700 transition-colors ${
                isExpanded ? "justify-start" : "justify-center"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {isExpanded && (
                <span className="hidden lg:inline">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
