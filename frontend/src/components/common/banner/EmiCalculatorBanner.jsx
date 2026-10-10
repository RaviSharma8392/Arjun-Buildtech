import React from "react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage";

const EmiCalculatorBanner = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 my-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="bg-[#d9534f] p-3 rounded-full">
          <Calculator size={28} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold">
            {t("emiBanner.title", "Plan Your Property Investment")}
          </h3>
          <p className="text-gray-300 text-sm md:text-base mt-1">
            {t(
              "emiBanner.subtitle",
              "Use our easy EMI Calculator to estimate your monthly installments instantly.",
            )}
          </p>
        </div>
      </div>
      <Link
        to="/emi-calculator"
        className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-6 py-2.5 rounded font-semibold transition-colors flex-shrink-0"
      >
        {t("emiBanner.button", "Calculate EMI Now")}
      </Link>
    </div>
  );
};

export default EmiCalculatorBanner;
