import React, { useState } from "react";
import AddTime from "./AddShowTime"; // Adjust the import path as needed
import ViewTime from "./ViewShowTime"; // Adjust the import path as needed

const ShowTime = () => {
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
          Add ShowTime
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={handleViewClick}
        >
          View ShowTime
        </button>
      </section>

      <div className="text-center">
        {activeComponent === "add" && <AddTime />}
        {activeComponent === "view" && <ViewTime />}
      </div>
    </main>
  );
};

export default ShowTime;
