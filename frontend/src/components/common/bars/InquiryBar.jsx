import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const MobileContactBar = ({ phone = "08047019229", property }) => {
  const currentPath = useLocation().pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Phone Button */}
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-50 px-4 py-2 rounded-xl shadow-sm active:scale-95 transition">
          <FaPhoneAlt className="w-5 h-5" />
          <span>{phone}</span>
        </a>

        {/* Inquiry Button */}

        <Link
          to={`${currentPath}#inquiry`}
          onClick={() => {
            const el = document.getElementById("inquiry");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md active:scale-95 transition">
          <FaWhatsapp className="w-5 h-5" />
          Inquiry Now
        </Link>
      </div>
    </div>
  );
};

export default MobileContactBar;
