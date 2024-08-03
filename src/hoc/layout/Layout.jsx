import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../shared-component/Navbar";
import Sidebar from "../../shared-component/Sidebar";

const Layout = () => {
  return (
    <div className="flex justify-center ">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
