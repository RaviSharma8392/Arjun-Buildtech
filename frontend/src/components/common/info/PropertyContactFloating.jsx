import React from "react";
import { FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const PropertyContactFloating = ({ property }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">{property.name}</p>
          <p className="text-red-600 font-semibold text-lg">
            ₹{property.price}
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="tel:+917617711003"
            className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <FaPhone className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/917617711003"
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyContactFloating;
