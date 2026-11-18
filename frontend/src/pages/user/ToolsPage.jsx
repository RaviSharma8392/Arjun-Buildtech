import React from "react";
import { Helmet } from "react-helmet-async";
import AdviceAndTools from "../../components/common/AdviceAndTools";
import EmiCalculatorBanner from "../../components/common/banner/EmiCalculatorBanner";
import { useLanguage } from "../../context/useLanguage";
import Breadcrumb from "../../components/common/Breadcrumb";

const ToolsPage = () => {
  const { t } = useLanguage();
  const pageUrl = "https://arjunbuildtech.com/tools";
  const pageTitle = t("tools.pageTitle", "Important Property Tools & Calculators | Arjun Buildtech");
  const pageDescription = t("tools.pageMetaDesc", "Access property calculators and guidance tools from Arjun Buildtech.");
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection-page`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    about: { "@id": "https://arjunbuildtech.com/#organization" },
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-10">
      <Helmet>
        <title>{pageTitle}</title>
        <meta 
          name="description" 
          content={pageDescription}
        />
        <meta 
          name="keywords" 
          content="real estate tools, EMI calculator, home loan offers, property rates, interior budget estimator, Rohtak real estate, Arjun Buildtech" 
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Property Tools" }]} />
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
