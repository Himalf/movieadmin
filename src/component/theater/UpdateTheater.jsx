import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateTheater = () => {
  const { theaterId } = useParams();
  console.log(theaterId, "theater id");
  const location = useLocation();
  const navigate = useNavigate();
  const formData = [
    {
      name: "theater_name",
      label: "Theater Name",
      type: "text",
    },
    {
      name: "theater_location",
      label: "Theater Location",
      type: "text",
    },
  ];

  const initialValues = {
    theaterId: location.state.theaterId,
    theater_name: location.state.theater_name,
    theater_location: location.state.theater_location,
  };

  const validationSchema = yup.object().shape({
    theater_name: yup.string().required("Please enter theater name"),
    theater_location: yup.string().required("Please enter theater location"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log("Submitting values:", values); // Debug log
      const response = await axios.put(
        `http://localhost:4000/theater/${theaterId}`,
        values
      );
      console.log("Response status:", response.status); // Debug log
      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          navigate("/theaters");
        }, 1500);
        toast.success("Theater Updated successfully");
      }
    } catch (error) {
      toast.error("An error occurred while updating the theater");
      console.error("Error details:", error); // Debug log
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Update Theater
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.map((val, i) => (
              <div key={i} className="mb-6">
                <label
                  htmlFor={val.name}
                  className="block text-gray-700 font-medium mb-2"
                >
                  {val.label}
                </label>
                <Field
                  type={val.type}
                  name={val.name}
                  placeholder={`Enter ${val.label}`}
                  className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name={val.name}
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors mt-4"
          >
            Update Theater
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </main>
  );
};

export default UpdateTheater;
