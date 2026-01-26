import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaTimes } from "react-icons/fa";
import SendEnquiry from "../form/SendEnquiry";

const MobileContactBar = ({ property }) => {
  const [showEnquiry, setShowEnquiry] = useState(false);

  // ✅ Shared Contact Number
  const contactNumber = "919350447531"; // +91 93504 47531

  // Direct WhatsApp Message
  const handleDirectWhatsApp = () => {
    const message = `Hi, I'm interested in ${property?.name} located at ${
      property?.location
    }. Please share more details.`;

    const whatsappLink = `https://wa.me/${contactNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <>
      {/* 📱 Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl md:hidden">
        <div className="flex gap-3 px-4 py-3">
          {/* 📞 Call Button */}
          <a
            href={`tel:+91${contactNumber.slice(2)}`}
            className="flex-1 flex items-center justify-center gap-2 
                       bg-red-600 hover:bg-red-700 
                       text-white font-bold py-3 rounded-xl 
                       active:scale-95 transition">
            <FaPhoneAlt className="w-5 h-5" />
            Call Now
          </a>

          {/* 💬 WhatsApp Button */}
          <button
            onClick={handleDirectWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 
                       bg-green-600 hover:bg-green-700 
                       text-white font-bold py-3 rounded-xl 
                       active:scale-95 transition">
            <FaWhatsapp className="w-5 h-5" />
            WhatsApp
          </button>
        </div>
      </div>

      {/* 🧾 Fullscreen Enquiry Form (Optional) */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Send Enquiry</h2>
            <button
              onClick={() => setShowEnquiry(false)}
              className="p-2 text-gray-600 hover:text-black">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
            <SendEnquiry property={property} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileContactBar;
