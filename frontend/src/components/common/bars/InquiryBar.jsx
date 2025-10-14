import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaTimes } from "react-icons/fa";
import SendEnquiry from "../form/SendEnquiry";

const MobileContactBar = ({ phone = "917617711003", property }) => {
  const [showEnquiry, setShowEnquiry] = useState(false);

  // Direct WhatsApp function
  const handleDirectWhatsApp = () => {
    const message = `Hi, I'm interested in ${property.name} at ${property.location}. Please share more details.`;
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <>
      {/* Mobile Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Phone Button */}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-red-600 font-semibold bg-red-50 px-4 py-3 rounded-lg active:scale-95 transition flex-1 mr-2 justify-center">
            <FaPhoneAlt className="w-5 h-5" />
            <span>Call</span>
          </a>

          {/* Direct WhatsApp Button */}
          <button
            onClick={handleDirectWhatsApp}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg active:scale-95 transition flex-1 ml-2 justify-center">
            <FaWhatsapp className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Full Page Enquiry Modal - Only shows if user wants detailed form */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 sticky top-0">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Send Inquiry</h2>
              <button
                onClick={() => setShowEnquiry(false)}
                className="p-2 text-gray-500 hover:text-gray-700">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
            <SendEnquiry property={property} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileContactBar;
