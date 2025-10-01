import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/common/button/ButtonWithWhatsApp";
import ContactNavbar from "../components/ContactNavbar";
import BottomNavbar from "../components/common/bars/BottomNavbar";
import ChatBot from "../components/ChatBot";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      {/* <ContactNavbar /> */}
      <Navbar />
      <ChatBot />
      {/* <WhatsAppButton
        phone="919876543210"
        message="Hi, I'm interested in your properties."
        position="bottom-right"
      /> */}

      {/* Page Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer can go here later */}
      <Footer />

      <BottomNavbar />
    </div>
  );
};

export default UserLayout;
