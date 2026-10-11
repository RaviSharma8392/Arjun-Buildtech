import React from "react";
import { ShieldCheck, MapPin, PhoneCall, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { companyInfo } from "../../data/companyInfo";
import { useLanguage } from "../../context/useLanguage";

const TrustedBrands = () => {
  const { t } = useLanguage();

  return (
    <section className="border-t border-gray-200 bg-[#F9F9F9] py-12 md:py-16">
      <div className="site-container">
        {/* --- Standard Portal-Style Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
              {t("home.trustBannerTitle", "Property Guidance You Can Trust")}
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-4"></div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl">
              {t(
                "home.trustIntro",
                "Arjun Buildtech helps buyers and sellers explore property options in Rohtak, Haryana. Browse current listings, ask questions about the details, and make decisions at your own pace.",
              )}
            </p>
          </div>

          <Link
            to="/contact"
            className="hidden md:flex items-center gap-1.5 text-[15px] font-medium text-red-600 hover:text-red-700 transition-colors pb-1">
            {t("common.contactUs", "Get in touch")}{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* --- 3-Column Trust Benefits (Matching the Image Layout) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Benefit 1: Local Expertise */}
          <div className="flex items-start gap-4 md:gap-5">
            <div className="w-16 h-16 shrink-0 rounded-full border-2 border-gray-100 bg-white shadow-sm flex items-center justify-center text-red-600 transition-transform duration-300 hover:scale-105">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1.5">
                Local Property Experts
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Navigate the Rohtak real estate market safely with our verified
                listings and transparent documentation support.
              </p>
            </div>
          </div>

          {/* Benefit 2: Office Location (Dynamic Content) */}
          <div className="flex items-start gap-4 md:gap-5">
            <div className="w-16 h-16 shrink-0 rounded-full border-2 border-gray-100 bg-white shadow-sm flex items-center justify-center text-red-600 transition-transform duration-300 hover:scale-105">
              <MapPin className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1.5">
                Visit Our Office
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                {companyInfo.address}
              </p>
            </div>
          </div>

          {/* Benefit 3: Contact/Relationship Manager (Dynamic Content) */}
          <div className="flex items-start gap-4 md:gap-5">
            <div className="w-16 h-16 shrink-0 rounded-full border-2 border-gray-100 bg-white shadow-sm flex items-center justify-center text-red-600 transition-transform duration-300 hover:scale-105">
              <PhoneCall className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="pt-1">
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1.5">
                Direct Assistance
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-2">
                Speak directly with our team for comprehensive buying, selling,
                or renting assistance.
              </p>
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="inline-block text-[15px] font-semibold text-red-600 hover:text-red-700">
                {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile View All / Contact Button */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 w-full bg-white border border-red-600 text-red-600 py-2.5 rounded text-[15px] font-semibold hover:bg-red-50 transition-colors">
            {t("common.contactUs", "Get in touch")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
