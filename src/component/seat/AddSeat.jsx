import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaCalendarAlt, FaMoon, FaSun } from "react-icons/fa";

const AddSeat = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    const fetchOptions = async () => {
      try {
        const showtimeResponse = await axios.get(
          "http://localhost:4000/showtime"
        );
        setShowtimes(showtimeResponse.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        toast.error("Failed to fetch options");
      }
    };

    fetchOptions();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:4000/seat", values);
      toast.success("Seat added successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding seat:", error);
      toast.error("Failed to add seat");
    }
  };

  const formFields = [
    {
      name: "status",
      label: "Status",
      type: "select",
      icon: <FaCheckCircle className="text-green-400" />,
      options: [
        { value: "", label: "Select Status" },
        { value: "available", label: "Available" },
        { value: "booked", label: "Booked" },
        { value: "reserved", label: "Reserved" },
      ],
    },
    {
      name: "showtime_id",
      label: "Showtime",
      type: "select",
      icon: <FaCalendarAlt className="text-blue-400" />,
      options: [
        { value: "", label: "Choose Showtime" },
        ...showtimes.map((showtime) => ({
          value: showtime.showtimeid,
          label: `${showtime.show_time} || ${showtime.show_date} || ${showtime.title}`,
        })),
      ],
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } min-h-screen`}
    >
      <div className="container mx-auto p-8 max-w-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{darkMode ? "" : ""}</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-300 dark:bg-gray-600 p-2 rounded-full"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-900" />
            )}
          </button>
        </div>

        <Formik
          initialValues={{
            status: "",
            showtime_id: "",
          }}
          validationSchema={Yup.object({
            status: Yup.string().required("Status is required"),
            showtime_id: Yup.string().required("Showtime is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {formFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-lg font-medium mb-2"
                  >
                    {field.label}
                  </label>
                  <div className="flex items-center relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      {field.icon}
                    </span>
                    <Field
                      as={field.type === "select" ? "select" : "input"}
                      id={field.name}
                      name={field.name}
                      className={`block w-96 pl-10 pr-4 py-2 border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-gray-100 border-gray-300 text-gray-800"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                        darkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
                      } focus:border-transparent transition duration-300 ease-in-out`}
                    >
                      {field.type === "select" &&
                        field.options.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className={
                              darkMode
                                ? "bg-gray-700 text-white"
                                : "bg-white text-gray-800"
                            }
                          >
                            {option.label}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-lg text-lg font-semibold focus:outline-none transition duration-300 ease-in-out ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Add Seat
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AddSeat;
