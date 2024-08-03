import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

const AddMovie = () => {
  const [newImg, setNewImg] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/movie_category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    setNewImg(e.target.files[0]);
  };

  const FormItems = [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
    },
    {
      name: "releasedate",
      type: "date",
      label: "Release Date",
    },
    {
      name: "duration",
      type: "number",
      label: "Duration (minutes)",
    },
    {
      name: "moviecategoryid",
      type: "select",
      label: "Movie Category",
      option: [],
    },
  ];

  const initialValues = {
    movieid: "",
    title: "",
    description: "",
    releasedate: "",
    duration: "",
    moviecategoryid: "",
    poster: "",
  };

  const validationSchema = yup.object().shape({
    // movieid: yup.string().required("Movie ID is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    releasedate: yup.date().required("Release date is required"),
    duration: yup.number().required("Duration is required").positive(),
    moviecategoryid: yup.string().required("Movie category is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("movieid", values.movieid);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("releasedate", values.releasedate);
      formData.append("duration", values.duration);
      formData.append("moviecategoryid", values.moviecategoryid);
      formData.append("poster", newImg);

      const response = await axios.post(
        "http://localhost:4000/movie",
        formData
      );

      if (response.status === 200) {
        toast.success("Movie added successfully");
      } else {
        toast.error("Cannot post data");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the movie");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex mb-10">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form encType="multipart/form-data">
                <div className="grid grid-cols-1 gap-3">
                  {FormItems.map((val, i) => (
                    <div key={i} className="text-left">
                      <label htmlFor={val.name}>{val.label}</label>
                      {val.type === "select" ? (
                        <Field
                          as={val.type}
                          name={val.name}
                          className="border-2 p-2 rounded-lg w-[400px] shadow-sm outline-none"
                          onChange={(e) =>
                            setFieldValue(val.name, e.target.value)
                          }
                        >
                          <option value="">Choose {val.label}</option>
                          {categories.map((category) => (
                            <option
                              key={category.categoryid}
                              value={category.categoryid}
                            >
                              {category.categoryname}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          type={val.type}
                          name={val.name}
                          placeholder={`Enter ${val.label}`}
                          className="border-2 p-2 rounded-lg w-full shadow-sm outline-none"
                        />
                      )}
                      <ErrorMessage
                        name={val.name}
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  ))}
                </div>

                <label htmlFor="poster" className="w-fit h-fit">
                  <img
                    src={
                      newImg
                        ? URL.createObjectURL(newImg)
                        : "https://via.placeholder.com/150"
                    }
                    className="w-fit h-72 mx-auto p-10"
                    alt="preview"
                  />
                </label>
                <input
                  id="poster"
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif"
                  required
                  onChange={handleImageChange}
                />
                <div className="mx-auto border-2 rounded-md text-lg w-32 h-10 text-center bg-black flex justify-center mt-3 hover:bg-white hover:border-2 px-2 hover:text-black bg-mainColor text-white font-bold">
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
                <ToastContainer />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
