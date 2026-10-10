import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { companyInfo } from "../../data/companyInfo";
import { useLanguage } from "../../context/useLanguage";

const TrustedBrands = () => {
  const { t } = useLanguage();

  return (
    <section className="border-t border-gray-200 bg-white py-12 md:py-16">
      <div className="site-container grid items-center gap-8 md:grid-cols-[1fr_320px] md:gap-12">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
            <FaShieldAlt className="h-4 w-4" />
            <span>Local property guidance</span>
          </div>
          <h2 className="font-display mb-4 text-3xl leading-tight text-gray-900 md:text-4xl">
            Rohtak property, explained by a local team
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-gray-600">
            {t(
              "home.trustIntro",
              "Arjun Buildtech helps buyers and sellers explore property options in Rohtak, Haryana. Browse current listings, ask questions about the details, and make decisions at your own pace.",
            )}
          </p>
        </div>

        <div className="border-l-2 border-red-600 bg-gray-50 p-5 md:p-6">
          <p className="mb-3 text-sm font-semibold text-gray-900">
            Speak with Arjun Buildtech
          </p>
          <a
            href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
            className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-red-700">
            <FaPhoneAlt className="h-4 w-4 text-red-600" />
            {companyInfo.phone}
          </a>
          <p className="mb-4 flex items-start gap-2 text-sm leading-relaxed text-gray-600">
            <FaMapMarkerAlt className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            {companyInfo.address}
          </p>
          <Link
            to="/contact"
            className="text-sm font-semibold text-red-700 hover:text-red-800">
            Contact the team <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
