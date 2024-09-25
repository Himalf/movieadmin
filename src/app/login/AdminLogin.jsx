import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginLogo from "/TheaterIma.jpg";
const AdminLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Access environment variables using import.meta.env
  const adminUsername = import.meta.env.VITE_USERNAME;
  const adminPassword = import.meta.env.VITE_PASSWORD;

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      if (
        values.username === adminUsername &&
        values.password === adminPassword
      ) {
        localStorage.setItem("isAdminAuthenticated", "true"); // Store authentication status
        navigate("/"); // Redirect to dashboard
      } else {
        setError("Invalid username or password"); // Display error for incorrect credentials
      }
    },
  });

  return (
    <div className="flex w-full h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 h-full bg-gray-900 flex justify-center items-center">
        <img
          src={loginLogo}
          alt="Cinema"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gray-100 p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">Admin Login</h2>
        <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <input
              id="username"
              type="text"
              placeholder="Username"
              className={`w-full p-4 border ${
                formik.errors.username && formik.touched.username
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 mt-2">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={`w-full p-4 border ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mt-2">{formik.errors.password}</div>
            ) : null}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
