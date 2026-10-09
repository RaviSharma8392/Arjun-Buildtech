import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import HomeHeader from "../../components/common/banner/HomeHeader";
import TrustedBrands from "../../components/common/TrustedBrands";
import RealEstateServices from "../../components/RealEstateServices";
import WhyChooseArjunBuiltech from "../../components/common/WhyChooseArjunBuiltech";
import FAQSection from "../../components/FAQSection";
import FeaturedProperties from "../../components/FeaturedProperties";
import MapSection from "../../components/MapSection";
import MarketInsights from "../../components/MarketInsights";
import PopularLocalities from "../../components/common/PopularLocalities";
import SocialEmbeds from "../../components/common/SocialEmbeds";
import EmiCalculator from "../../components/common/EmiCalculator";
import PostPropertyBanner from "../../components/common/banner/PostPropertyBanner";

// --- Popup Inquiry Form ---

// --- Lazy-loaded (below the fold) sections ---
const ClientReviews = lazy(() => import("../../components/ClientReviews"));
const ContactUs = lazy(() => import("./ContactUs"));

// --- Reusable fallback component for lazy loading (Clean Portal Style) ---
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center py-24 bg-white text-center px-4 border-t border-gray-100">
    <div className="relative mb-4">
      {/* Clean, thin red spinner */}
      <div className="w-10 h-10 border-[3px] border-gray-100 border-t-red-600 rounded-full animate-spin mx-auto"></div>
    </div>
    <h2 className="text-[15px] font-medium text-gray-600">
      Loading content...
    </h2>
  </div>
);

const Home = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://arjunbuildtech.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://arjunbuildtech.com/properties?location={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <Helmet>
        <title>Arjun Buildtech | Real Estate, Plots & Villas in Rohtak</title>
        <meta
          name="description"
          content="Looking for property in Rohtak? Arjun Buildtech is your trusted real estate partner for residential plots, luxury villas, and commercial properties."
        />
        <meta
          name="keywords"
          content="real estate Rohtak, plots in Rohtak, buy villa Rohtak, property for sale Rohtak, Arjun Buildtech"
        />
        <link rel="canonical" href="https://arjunbuildtech.com" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* 1️⃣ Hero Header */}
      <HomeHeader />

      {/* 2.5 Trusted Brands & Rating */}
      <TrustedBrands />

      {/* 3️⃣ Featured Properties */}
      <FeaturedProperties />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12">
        <PostPropertyBanner />
      </div>

      {/* Popular Localities Section */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-4">
        <PopularLocalities />
      </div>

      {/* 4️⃣ Real Estate Services */}
      <RealEstateServices />

      {/* 4.5️⃣ EMI Calculator (Uncomment if needed) */}
      {/* <EmiCalculator /> */}

      {/* 5️⃣ Why Choose Section */}
      <WhyChooseArjunBuiltech />

      {/* 6️⃣ Testimonials — Lazy load */}
      <Suspense fallback={<LoadingFallback />}>
        <ClientReviews hideSeo={true} />
      </Suspense>

      {/* 6.5 Market Insights */}
      <MarketInsights />

      {/* 7️⃣ Social Media Embeds */}
      <SocialEmbeds />

      {/* 8️⃣ Quick Links / Sitelinks */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Quick Links</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <Link to="/properties" className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">All Properties</Link>
            <Link to="/services" className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">Our Services</Link>
            <Link to="/testimonials" className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">Client Reviews</Link>
            <Link to="/blogs" className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">Real Estate Blog</Link>
            <Link to="/properties/Rohtak" className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">Properties in Rohtak</Link>
            <Link to="/contact-us" className="p-4 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-gray-700 shadow-sm border border-gray-100">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* 9️⃣ FAQ + Contact */}
      <Suspense fallback={<LoadingFallback />}>
        <FAQSection />
        <ContactUs />
      </Suspense>

      {/* 9️⃣ Inquiry Popup */}

    </div>
  );
};

export default Home;
