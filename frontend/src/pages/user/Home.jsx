import React, { Suspense, lazy } from "react";

// --- Always-loaded (above the fold) sections ---
import HomeHeader from "../../components/common/banner/HomeHeader";
import HomeBanner from "../../components/common/banner/HomeBanner";
import FeaturedProperties from "../../components/FeaturedProperties";
import RealEstateServices from "../../components/RealEstateServices";
import WhyChooseArjunBuiltech from "../../components/common/WhyChooseArjunBuiltech";
import FAQSection from "../../components/FAQSection";

// --- Lazy-loaded (below the fold) sections ---
const Testimonials = lazy(() => import("../Testimonials"));
const ContactUs = lazy(() => import("./ContactUs"));

// --- Reusable fallback component for lazy loading ---
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 text-center px-4">
    <img
      src="/arjunBuildTechLogo.png"
      alt="Arjun BuildTech"
      className="w-28 h-28 object-contain animate-pulse mb-6 drop-shadow-md"
    />
    <div className="relative mb-5">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Loading Your Dream Property...
    </h2>
    <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
      Please wait a moment while we prepare your personalized real estate
      experience.
    </p>
  </div>
);

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* 1️⃣ Header Section — Navigation & Branding */}
      <HomeHeader />

      {/* 2️⃣ Hero Banner — Eye-catching intro or featured promotion */}
      <HomeBanner />

      {/* 3️⃣ Featured Properties — Showcase top listings */}
      <FeaturedProperties />

      {/* 4️⃣ Real Estate Services — Explain your core offerings */}
      <RealEstateServices />

      {/* 5️⃣ Why Choose Arjun BuildTech — Trust and credibility */}
      <WhyChooseArjunBuiltech />

      {/* 6️⃣ Testimonials — Lazy load (user trust section) */}
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>

      {/* 7️⃣ Blog / Insights — Lazy load for SEO content */}
      <Suspense fallback={<LoadingFallback />}></Suspense>

      {/* 8️⃣ Contact Section — Lazy load inquiry form */}
      <Suspense fallback={<LoadingFallback />}>
        <FAQSection />

        <ContactUs />
      </Suspense>
    </div>
  );
};

export default Home;
