import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as yup from "yup";

const AddCategory = () => {
  const formData = [
    {
      name: "categoryname",
      label: "Category Name",
      type: "text",
    },
  ];

  const initialValues = {
    categoryname: "",
  };

  const validationSchema = yup.object().shape({
    categoryname: yup.string().required("Please enter category name"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/movie_category`,
        values
      );
      if (response.status === 200) {
        toast.success("Category added successfully");
      }
    } catch (error) {
      toast.error("An error occurred while adding the category");
      console.error(error);
    }
  };

  return (
    <main className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Add New Category
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </main>
  );
};

export default AddCategory;
