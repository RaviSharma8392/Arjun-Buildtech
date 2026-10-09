import React from "react";
import { Link } from "react-router-dom";
import useSiteSettings from "../../../hooks/useSiteSettings";

const PostPropertyBanner = () => {
  const { settings } = useSiteSettings();

  return (
    <div className="bg-[#FFF9EA] rounded-lg md:rounded-xl px-6 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#F5E6CA] w-full mb-8">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-[22px] font-normal text-gray-800 mb-1">
          Looking to Buy a Property?
        </h2>
        <p className="text-gray-500 text-sm md:text-[15px]">
          Browse properties or contact{" "}
          {settings.companyName || "Arjun Buildtech"} for help finding the right
          one.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <Link
          to="/properties"
          className="bg-white hover:bg-gray-50 transition-colors text-gray-800 font-medium px-6 py-2.5 rounded-full flex items-center justify-center gap-2 border border-gray-200 shadow-sm whitespace-nowrap text-[15px]">
          Browse Properties
        </Link>
        <Link
          to="/contact"
          className="bg-[#FDB813] hover:bg-[#F2AD09] transition-colors text-gray-900 font-medium px-6 py-2.5 rounded-full flex items-center gap-2 shadow-sm whitespace-nowrap text-[15px]">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default PostPropertyBanner;
