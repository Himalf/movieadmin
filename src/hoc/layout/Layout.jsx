import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../shared-component/Navbar";
import Sidebar from "../../shared-component/Sidebar";
import PrivateRoute from "../../shared-component/PrivateRoute";

const Layout = () => {
  return (
    <div className="flex justify-center ">
      <Sidebar />

      <Outlet />
    </div>
  );
};

export default Layout;
