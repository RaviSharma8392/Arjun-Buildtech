import React from "react";
import { Helmet } from "react-helmet-async";
import AdviceAndTools from "../../components/common/AdviceAndTools";
import EmiCalculatorBanner from "../../components/common/banner/EmiCalculatorBanner";
import { useLanguage } from "../../context/useLanguage";

const ToolsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-10">
      <Helmet>
        <title>{t("tools.pageTitle", "Important Property Tools & Calculators | Arjun Buildtech")}</title>
        <meta 
          name="description" 
          content={t("tools.pageMetaDesc", "Access important real estate tools including EMI Calculator, Home Loan Offers, Interiors Budget Estimator, and Property Rates & Trends with Arjun Buildtech.")}
        />
        <meta 
          name="keywords" 
          content="real estate tools, EMI calculator, home loan offers, property rates, interior budget estimator, Rohtak real estate, Arjun Buildtech" 
        />
        <meta property="og:title" content={t("tools.pageTitle", "Important Property Tools & Calculators | Arjun Buildtech")} />
        <meta property="og:description" content={t("tools.pageMetaDesc", "Access important real estate tools including EMI Calculator, Home Loan Offers, Interiors Budget Estimator, and Property Rates & Trends with Arjun Buildtech.")} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("tools.pageHeading", "Real Estate Advice & Tools")}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            {t("tools.pageSubheading", "Make informed property decisions with our suite of free real estate tools. Calculate your EMI, check home loan offers, estimate interior costs, and track property rates and trends.")}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          <AdviceAndTools />
        </div>
        
        <div className="mt-8">
          <EmiCalculatorBanner />
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
