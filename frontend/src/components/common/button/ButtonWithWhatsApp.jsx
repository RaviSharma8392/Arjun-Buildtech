import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({
  phone = "1234567890",
  message = "Hello, I’d like to know more!",
  position = "bottom-right", // options: bottom-right, bottom-left, top-right, top-left
}) => {
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  // Dynamic position classes
  const positionClass = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`hidden md:flex fixed ${positionClass[position]} z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition-all transform hover:scale-105`}>
      <FaWhatsapp className="text-2xl" />
      Contact Us
    </a>
  );
};

export default WhatsAppButton;
