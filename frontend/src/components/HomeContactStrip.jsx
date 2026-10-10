import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLanguage } from "../context/useLanguage";
import { companyInfo } from "../data/companyInfo";

const HomeContactStrip = () => {
  const { t } = useLanguage();

  return (
    <section className="border-t border-gray-100 bg-white py-12 md:py-16">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Call Us */}
          <a
            href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-red-300 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <FaPhoneAlt size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-[15px]">
                {t("home.callUs", "Call Us Now")}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {companyInfo.phone}
              </p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20property`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-green-300 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <FaWhatsapp size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-[15px]">
                {t("home.whatsapp", "WhatsApp Us")}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {t("home.instantReply", "Get Instant Reply")}
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${companyInfo.email}`}
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FaEnvelope size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-[15px]">
                {t("home.emailUs", "Email Us")}
              </p>
              <p className="text-sm text-gray-500 mt-0.5 truncate">
                {companyInfo.email}
              </p>
            </div>
          </a>

          {/* Visit Office */}
          <Link
            to="/contact"
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-red-300 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <FaMapMarkerAlt size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-[15px]">
                {t("home.visitOffice", "Visit Our Office")}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {companyInfo.address}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeContactStrip;
