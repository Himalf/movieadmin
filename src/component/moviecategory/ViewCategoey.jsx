import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(() => {
    try {
      axios
        .get(`http://localhost:4000/movie_category`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, toggle]);

  const handleDelete = (id) => {
    const deleteConfirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (deleteConfirm) {
      try {
        axios
          .delete(`http://localhost:4000/movie_category/${id}`)
          .then((res) => {
            console.log(res.data);
            setToggle(!toggle);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="search"
          className="border-2 border-gray-600 px-2 py-1 outline-none rounded-sm"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="w-fit border border-gray-500 rounded-sm px-4 mb-1">
          <label htmlFor="limitSelect">Show</label>
          <select
            id="limitSelect"
            value={limit}
            onChange={handleLimitChange}
            className="outline-none ml-1"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <label htmlFor="limitSelect">entries</label>
        </div>
      </div>
      <ul className="space-y-4">
        {categories
          .filter((val) => {
            return (
              search.toLowerCase() === "" ||
              val.categoryname.toLowerCase().includes(search.toLowerCase())
            );
          })
          .slice(0, limit)
          .map((val, i) => (
            <li
              key={i}
              className="bg-blue-50 border border-gray-200 rounded-md p-4 flex justify-between items-center"
            >
              <span>{val.categoryname}</span>
              <div className="flex items-center gap-2">
                <div
                  className="cursor-pointer text-red-700"
                  onClick={() => handleDelete(val.categoryid)}
                >
                  <AiFillDelete />
                </div>
                <div className="cursor-pointer text-blue-500">
                  <Link state={val} to={`/editcategory/${val.categoryid}`}>
                    <RxUpdate />
                  </Link>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewCategory;
