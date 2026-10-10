import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { companyInfo } from "../../data/companyInfo";

import HomeHeader from "../../components/common/banner/HomeHeader";
import TrustedBrands from "../../components/common/TrustedBrands";
import RealEstateServices from "../../components/RealEstateServices";
import WhyChooseArjunBuiltech from "../../components/common/WhyChooseArjunBuiltech";
import FAQSection from "../../components/FAQSection";
import FeaturedProperties from "../../components/FeaturedProperties";
import MarketInsights from "../../components/MarketInsights";
import PopularLocalities from "../../components/common/PopularLocalities";
import SocialEmbeds from "../../components/common/SocialEmbeds";
import AdviceAndTools from "../../components/common/AdviceAndTools";
import HomeContactStrip from "../../components/HomeContactStrip";
import PostPropertyBanner from "../../components/common/banner/PostPropertyBanner";
import RohtakMarketOverview from "../../components/common/RohtakMarketOverview";
import { useLanguage } from "../../context/useLanguage";

// --- Popup Inquiry Form ---

// --- Lazy-loaded (below the fold) sections ---
const ClientReviews = lazy(() => import("../../components/ClientReviews"));
const ContactUs = lazy(() => import("./ContactUs"));

// --- Reusable fallback component for lazy loading (Clean Portal Style) ---
const LoadingFallback = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white text-center px-4 border-t border-gray-100">
      <div className="relative mb-4">
        <div className="w-10 h-10 border-[3px] border-gray-100 border-t-red-600 rounded-full animate-spin mx-auto"></div>
      </div>
      <h2 className="text-[15px] font-medium text-gray-600">
        {t("common.loadingContent", "Loading content...")}
      </h2>
    </div>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: companyInfo.name,
        url: "https://arjunbuildtech.com/",
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://arjunbuildtech.com/properties?location={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "RealEstateAgent",
        name: companyInfo.name,
        url: "https://arjunbuildtech.com/",
        telephone: companyInfo.phone,
        email: companyInfo.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sector 27 & Sector 1",
          addressLocality: "Rohtak",
          addressRegion: "Haryana",
          postalCode: "124001",
          addressCountry: "IN",
        },
        areaServed: { "@type": "City", name: "Rohtak" },
        sameAs: Object.values(companyInfo.socials),
      },
    ],
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <Helmet>
        <title>
          Property Dealer in Rohtak | Plots, Homes & Commercial | Arjun
          Buildtech
        </title>
        <link rel="canonical" href="https://arjunbuildtech.com/" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* 1️⃣ Hero Header */}
      <HomeHeader />

      {/* 2.5 Trusted Brands & Rating */}
      <TrustedBrands />

      {/* 3️⃣ Featured Properties */}
      <FeaturedProperties />

      {/* 3.1 Contact Info Strip */}
      <HomeContactStrip />

      <div className="border-t border-gray-100 bg-white py-12 md:py-16">
        <div className="site-container">
          <PostPropertyBanner />
        </div>
      </div>

      {/* Popular Localities Section */}
      <div className="bg-[#F9F9F9] py-12 md:py-16">
        <div className="site-container">
          <PopularLocalities />
        </div>
      </div>

      {/* 4️⃣ Real Estate Services */}
      <RealEstateServices />

      {/* 4.5️⃣ Advice & Tools Section */}
      <div className="border-t border-gray-100 bg-white py-12 md:py-16">
        <div className="site-container">
          <AdviceAndTools />
        </div>
      </div>

      {/* 5️⃣ Why Choose Section */}
      <WhyChooseArjunBuiltech />

      {/* 6️⃣ Testimonials — Lazy load */}
      <Suspense fallback={<LoadingFallback />}>
        <ClientReviews hideSeo={true} />
      </Suspense>

      {/* 6.5 Market Insights */}
      <MarketInsights />

      {/* 6.6 Rohtak Real Estate Market SEO Overview */}
      <RohtakMarketOverview />

      {/* 7️⃣ Social Media Embeds */}
      <SocialEmbeds />

      {/* 8️⃣ Quick Links / Sitelinks */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="site-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("home.quickLinksTitle", "Quick Links")}
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <Link
              to="/properties"
              className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">
              {t("common.allProperties", "All Properties")}
            </Link>
            <Link
              to="/services"
              className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">
              {t("common.ourServices", "Our Services")}
            </Link>
            <Link
              to="/testimonials"
              className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">
              {t("common.clientReviews", "Client Reviews")}
            </Link>
            <Link
              to="/blogs"
              className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">
              {t("common.blog", "Real Estate Blog")}
            </Link>
            <Link
              to="/properties/Rohtak"
              className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">
              {t("home.propertiesRohtak", "Properties in Rohtak")}
            </Link>
            <Link
              to="/contact"
              className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">
              {t("nav.contactUs", "Contact Us")}
            </Link>
          </div>
        </div>
      </div>

      {/* 9️⃣ FAQ + Contact */}
      <Suspense fallback={<LoadingFallback />}>
        <FAQSection />
        <ContactUs isStandalone={false} />
      </Suspense>

      {/* 9️⃣ Inquiry Popup */}
    </div>
  );
};

export default Home;
