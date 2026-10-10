import React, { useState, useEffect } from "react";
import Navbar from "../components/common/bars/Navbar";
import Footer from "../components/Footer";

import ChatBot from "../components/ChatBot";
import InquiryPopup from "../components/common/form/InquiryPopup";
import SmartLeadPopup from "../components/common/form/SmartLeadPopup";
import ScrollButtons from "../components/common/ScrollButtons";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const handleOpenInquiry = () => {
      setIsInquiryOpen(true);
    };

    window.addEventListener("open-inquiry", handleOpenInquiry);
    return () => {
      window.removeEventListener("open-inquiry", handleOpenInquiry);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Navbar always visible */}
      <Navbar />
      <ChatBot />
      <ScrollButtons />

      {/* Global Popups */}
      <InquiryPopup isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
      <SmartLeadPopup />

      {/* Page Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer can go here later */}
      <Footer />
    </div>
  );
};

export default UserLayout;
