import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSeat = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // Fetch showtimes and theaters when the component mounts
    const fetchOptions = async () => {
      try {
        const [showtimeResponse, theaterResponse] = await Promise.all([
          axios.get("http://localhost:4000/showtime"),
          axios.get("http://localhost:4000/theater"),
        ]);
        setShowtimes(showtimeResponse.data);
        setTheaters(theaterResponse.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        toast.error("Failed to fetch options");
      }
    };

    fetchOptions();
  }, []);

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

  // Define form fields configuration
  const formFields = [
    {
      name: "status",
      label: "Status",
      type: "select",
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
      options: showtimes.map((showtime) => ({
        value: showtime.showtimeid,
        label: `${showtime.show_time}||${showtime.show_date}`,
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
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Seat</h1>

      <Formik
        initialValues={{
          status: "",
          showtime_id: "",
          theater_id: "",
        }}
        validationSchema={Yup.object({
          status: Yup.string().required("Status is required"),
          showtime_id: Yup.string().required("Showtime is required"),
          theater_id: Yup.string().required("Theater is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label htmlFor={field.name} className="block text-gray-700">
                  {field.label}
                </label>
                <Field
                  as={field.type === "select" ? "select" : "input"}
                  id={field.name}
                  name={field.name}
                  className="block w-full mt-1 border border-gray-300 rounded-md"
                >
                  {field.type === "select" &&
                    field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Seat
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default AddSeat;
