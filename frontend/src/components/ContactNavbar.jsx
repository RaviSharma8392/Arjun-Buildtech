import React from "react";
import { FaMapMarkerAlt, FaPhone, FaSms, FaEnvelope } from "react-icons/fa";
import { companyInfo } from "../data/companyInfo";

const ContactNavbar = () => {
  const location = companyInfo.address;
  const mobile = companyInfo.phone.replace(/\s/g, "");
  const email = companyInfo.email;

  const handleCall = () => (window.location.href = `tel:${mobile}`);
  const handleSMS = () => (window.location.href = `sms:${mobile}`);
  const handleEmail = () => (window.location.href = `mailto:${email}`);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center py-3 px-4 md:px-6">
        {/* Location */}
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <FaMapMarkerAlt className="w-5 h-5" />
          <span className="text-sm md:text-base">{location}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCall}
            className="flex items-center gap-1 bg-white text-red-600 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition">
            <FaPhone /> Call Arjun Buildtech
          </button>
          <button
            onClick={handleSMS}
            className="flex items-center gap-1 bg-white text-red-600 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition">
            <FaSms /> Send SMS
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center gap-1 bg-white text-red-600 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition">
            <FaEnvelope /> Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactNavbar;
