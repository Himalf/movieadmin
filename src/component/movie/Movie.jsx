import React, { useState } from "react";
import AddMovie from "./AddMovie"; // Adjust the import path as needed
import ViewMovie from "./ViewMovie"; // Adjust the import path as needed

const Movie = () => {
  const [activeComponent, setActiveComponent] = useState("view");

  const handleAddClick = () => setActiveComponent("add");
  const handleViewClick = () => setActiveComponent("view");

  return (
    <main className="mx-auto p-4">
      <section className="flex space-x-4 justify-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleAddClick}
        >
          Add Movie
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={handleViewClick}
        >
          View Movie
        </button>
      </section>

      <div className="text-center">
        {activeComponent === "add" && <AddMovie />}
        {activeComponent === "view" && <ViewMovie />}
      </div>
    </main>
  );
};

export default Movie;
