import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

const AddShowTime = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchTheaters();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/movie/now-showing"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies");
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await axios.get("http://localhost:4000/theater");
      setTheaters(response.data);
    } catch (error) {
      console.error("Error fetching theaters:", error);
      toast.error("Failed to fetch theaters");
    }
  };

  const initialValues = {
    movie_id: "",
    theater_id: "",
    show_date: "",
    show_time: "",
  };

  const validationSchema = yup.object().shape({
    movie_id: yup.string().required("Movie is required"),
    theater_id: yup.string().required("Theater is required"),
    show_date: yup.date().required("Show date is required"),
    show_time: yup.string().required("Show time is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/showtime",
        values
      );
      if (response.status === 201) {
        toast.success("Showtime added successfully");
      } else {
        toast.error("Failed to add showtime");
      }
    } catch (error) {
      console.error("Error adding showtime:", error);
      toast.error("An error occurred while adding the showtime");
    } finally {
      setSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "movie_id",
      label: "Movie",
      type: "select",
      options: movies.map((movie) => ({
        value: movie.movieid,
        label: movie.title,
      })),
    },
    {
      name: "theater_id",
      label: "Theater",
      type: "select",
      options: theaters.map((theater) => ({
        value: theater.theaterid,
        label: `${theater.theater_name} / ${theater.theater_location}`,
      })),
    },
    {
      name: "show_date",
      label: "Show Date",
      type: "date",
    },
    {
      name: "show_time",
      label: "Show Time",
      type: "time",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Showtime</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4">
              {formFields.map(({ name, label, type, options }) => (
                <div key={name} className="text-left">
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  {type === "select" ? (
                    <Field
                      as="select"
                      name={name}
                      className="border-2 p-2 rounded-lg w-full shadow-sm outline-none"
                    >
                      <option value="">Choose {label}</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      type={type}
                      name={name}
                      className="border-2 p-2 rounded-lg w-full shadow-sm outline-none"
                    />
                  )}
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Showtime
              </button>
            </div>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddShowTime;
