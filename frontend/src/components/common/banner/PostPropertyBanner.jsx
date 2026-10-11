import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import useSiteSettings from "../../../hooks/useSiteSettings";
import { useLanguage } from "../../../context/useLanguage";

const PostPropertyBanner = () => {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  return (
    <div className="bg-[#FFF9EA] rounded-lg md:rounded-xl px-6 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#F5E6CA] w-full mb-8">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-[22px] font-normal text-gray-800 mb-1">
          {t("postProperty.title", "Looking to Buy a Property?")}
        </h2>
        <p className="text-gray-500 text-sm md:text-[15px]">
          {t(
            "postProperty.copy",
            "Browse properties or contact {company} for help finding the right one.",
            { company: settings.companyName || "Arjun Buildtech" },
          )}
        </p>
      </div>

      <div className="flex w-full flex-col sm:flex-row flex-wrap items-center gap-2.5 sm:w-auto">
        <Link
          to="/properties"
          className="w-full sm:w-auto bg-white hover:bg-gray-50 transition-colors text-gray-800 font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 border border-gray-200 shadow-xs whitespace-nowrap text-[14px]">
          {t("postProperty.browse", "Browse Properties")}
        </Link>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-callback-modal"))
          }
          className="w-full sm:w-auto bg-[#d8232a] hover:bg-[#b71c1c] active:scale-[0.99] transition-all text-white font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 shadow-xs whitespace-nowrap text-[14px] cursor-pointer">
          <FaPhoneAlt className="w-3.5 h-3.5" />
          <span>Request a Callback</span>
        </button>
        <Link
          to="/contact"
          className="w-full sm:w-auto bg-[#FDB813] hover:bg-[#F2AD09] transition-colors text-gray-900 font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 shadow-xs whitespace-nowrap text-[14px]">
          {t("nav.contactUs", "Contact Us")}
        </Link>
      </div>
    </div>
  );
};

export default PostPropertyBanner;
