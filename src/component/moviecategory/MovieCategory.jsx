import React, { useState } from "react";
import AddCategory from "./AddCategory"; // Adjust the import path as needed
import ViewCategory from "./ViewCategoey"; // Adjust the import path as needed

const MovieCategory = () => {
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
          Add Category
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={handleViewClick}
        >
          View Category
        </button>
      </section>

      <div className="text-center">
        {activeComponent === "add" && <AddCategory />}
        {activeComponent === "view" && <ViewCategory />}
      </div>
    </main>
  );
};

export default MovieCategory;
