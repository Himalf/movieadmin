import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarData = [
    {
      name: "movie category",
      path: "/moviecategory",
    },
    {
      name: "movie",
      path: "/movie",
    },
    {
      name: "seat",
      path: "/seat",
    },
    {
      name: "show time",
      path: "/showtime",
    },
    {
      name: "theaters",
      path: "/theaters",
    },
    {
      name: "bookings",
      path: "/bookings",
    },
  ];

  return (
    <aside className="w-64  bg-gray-800 text-white min-h-screen fixed top-0 left-0">
      <nav className="flex flex-col p-4">
        {sidebarData.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="capitalize p-2 my-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
