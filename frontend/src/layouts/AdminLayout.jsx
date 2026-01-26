import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/common/bars/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Page Content */}
      <main
        className="
          flex-1
          w-full
          pt-16           
          sm:px-4
          md:px-6
          lg:px-8
          xl:px-10
        ">
        {/* Content wrapper for large screens */}
        <div className="md:max-w-7xl md:mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
