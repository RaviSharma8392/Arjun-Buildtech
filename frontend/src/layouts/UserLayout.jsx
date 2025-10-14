import React from "react";
import Navbar from "../components/common/bars/Navbar";
import Footer from "../components/Footer";

import BottomNavbar from "../components/common/bars/BottomNavbar";
import ChatBot from "../components/ChatBot";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />
      <ChatBot />

      {/* Page Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer can go here later */}
      <Footer />

      <BottomNavbar />
    </div>
  );
};

export default UserLayout;
