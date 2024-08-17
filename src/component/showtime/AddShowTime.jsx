import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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
    show_date: null,
    show_time: "",
  };

  const validationSchema = yup.object().shape({
    movie_id: yup.string().required("Movie is required"),
    theater_id: yup.string().required("Theater is required"),
    show_date: yup.date().required("Show date is required").nullable(),
    show_time: yup.string().required("Show time is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const combinedDateTime = moment(
      `${values.show_date} ${values.show_time}`,
      "YYYY-MM-DD HH:mm"
    );
    if (combinedDateTime.isBefore(moment())) {
      toast.error("Show date and time cannot be in the past");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/showtime",
        values
      );
      if (response.status === 201 || response.status === 200) {
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

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Showtime
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4">
              <div className="text-left">
                <label
                  htmlFor="movie_id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Movie
                </label>
                <Field
                  as="select"
                  name="movie_id"
                  className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Movie</option>
                  {movies.map((movie) => (
                    <option key={movie.movieid} value={movie.movieid}>
                      {movie.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="movie_id"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="theater_id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Theater
                </label>
                <Field
                  as="select"
                  name="theater_id"
                  className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Theater</option>
                  {theaters.map((theater) => (
                    <option key={theater.theaterid} value={theater.theaterid}>
                      {`${theater.theater_name} / ${theater.theater_location}`}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="theater_id"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="show_date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Show Date
                </label>
                <DatePicker
                  selected={values.show_date}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  onChange={(date) =>
                    setFieldValue(
                      "show_date",
                      moment(date).format("YYYY-MM-DD")
                    )
                  }
                  className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="show_date"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="show_time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Show Time
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from({ length: 24 }, (_, hour) => {
                    const timeString = moment({ hour }).format("HH:mm");
                    return (
                      <button
                        key={timeString}
                        type="button"
                        onClick={() => setFieldValue("show_time", timeString)}
                        className={`p-2 rounded-lg text-sm ${
                          values.show_time === timeString
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                        } focus:outline-none`}
                      >
                        {timeString}
                      </button>
                    );
                  })}
                </div>
                <ErrorMessage
                  name="show_time"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
