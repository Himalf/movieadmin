// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAdminAuthenticated =
    localStorage.getItem("isAdminAuthenticated") === "true"; // Check if admin is authenticated

  return isAdminAuthenticated ? children : <Navigate to="/login" />; // Redirect if not authenticated
};

export default PrivateRoute;
