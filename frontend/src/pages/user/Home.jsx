import React, { Suspense, lazy, useState, useEffect } from "react";

// --- Always-loaded (above the fold) sections ---
import HomeHeader from "../../components/common/banner/HomeHeader";
import HomeBanner from "../../components/common/banner/HomeBanner";
import RealEstateServices from "../../components/RealEstateServices";
import WhyChooseArjunBuiltech from "../../components/common/WhyChooseArjunBuiltech";
import FAQSection from "../../components/FAQSection";
import FeaturedProperties from "../../components/FeaturedProperties";
import MapSection from "../../components/MapSection";

// --- Popup Inquiry Form ---
import InquiryPopup from "../../components/common/form/InquiryPopup";

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
  // --- Popup State ---
  const [popupOpen, setPopupOpen] = useState(false);

  // --- Auto show popup after 5 seconds ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* 1️⃣ Header Section — Navigation & Branding */}
      <HomeHeader />

      {/* 2️⃣ Hero Banner — Eye-catching intro */}
      <HomeBanner />

      {/* 3️⃣ Featured Properties */}
      <FeaturedProperties />

      {/* 4️⃣ Real Estate Services */}
      <RealEstateServices />

      {/* 5️⃣ Why Choose Section */}
      <WhyChooseArjunBuiltech />

      {/* 6️⃣ Testimonials — Lazy load */}
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>

      {/* 7️⃣ Map Section */}
      <MapSection />

      {/* 8️⃣ FAQ + Contact */}
      <Suspense fallback={<LoadingFallback />}>
        <FAQSection />
        <ContactUs />
      </Suspense>

      {/* 9️⃣ Inquiry Popup */}
      <InquiryPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default Home;
