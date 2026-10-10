import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { Link } from "react-router-dom";
import { ArrowRight, Building } from "lucide-react";

import { normalizePropertyData } from "../utils/propertySchema";

// Components
import PropertyCard from "../components/common/card/PropertyCard";
import UserPropertyCard from "./common/card/UserPropertyCard";
import PropertyEnquiryPopup from "./common/form/PropertyEnquiryPopup";
import { useLanguage } from "../context/useLanguage";

// --- Sub-Component: Clean Skeleton Loader ---
const PropertySkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse h-full">
    <div className="h-48 bg-gray-200 w-full" />
    <div className="p-4 space-y-4">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="pt-2 border-t border-gray-100 flex justify-between">
        <div className="h-6 bg-gray-200 rounded w-20" />
        <div className="h-6 bg-gray-100 rounded w-16" />
      </div>
    </div>
  </div>
);

const FeaturedProperties = () => {
  const { t } = useLanguage();
  const [properties, setProperties] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);
  const [enquiryProperty, setEnquiryProperty] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "featuredproperties"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) =>
          normalizePropertyData({ id: doc.id, ...doc.data() }),
        );
        setProperties(data);

        const recentSnapshot = await getDocs(collection(db, "properties"));
        const recentData = recentSnapshot.docs.map((doc) =>
          normalizePropertyData({ id: doc.id, ...doc.data() }),
        );

        const sortedRecent = [...recentData].sort((a, b) => {
          const aTime = a.createdAt?.seconds
            ? a.createdAt.seconds * 1000
            : a.createdAt?.toDate
              ? a.createdAt.toDate().getTime()
              : 0;
          const bTime = b.createdAt?.seconds
            ? b.createdAt.seconds * 1000
            : b.createdAt?.toDate
              ? b.createdAt.toDate().getTime()
              : 0;
          return bTime - aTime;
        });

        setRecentProperties(sortedRecent.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);

  return (
    <section className="border-t border-gray-200 bg-[#F9F9F9] py-12 md:py-16">
      <div className="site-container">
        {/* --- Standard Portal-Style Header 1 --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
              {t("home.featuredTitle", "Featured Properties")}
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-4"></div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl">
              {t(
                "home.featuredDescription",
                "Explore our handpicked selection of premium HSVP plots, luxury villas, and investment-ready commercial spaces.",
              )}
            </p>
          </div>

          {/* View All Button */}
          <Link
            to="/properties"
            className="hidden md:flex items-center gap-1.5 text-[15px] font-medium text-red-600 hover:text-red-700 transition-colors pb-1">
            {t("home.seeAllProperties", "See all properties")}{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* --- Content Section --- */}
        <main>
          {loading ? (
            // Loading State
            <div
              className={`grid gap-5 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
              {[...Array(8)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : properties.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-gray-200">
              <div className="bg-gray-50 p-4 rounded-full mb-4 border border-gray-100">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-1">
                {t("home.noFeatured", "No featured properties right now")}
              </h3>
              <p className="text-gray-500 text-[14px] max-w-sm">
                {t(
                  "home.updatingListings",
                  "We are currently updating our premium listings. Please check back later.",
                )}
              </p>
            </div>
          ) : (
            // Data Loaded State
            <div
              className={
                isMobile
                  ? "flex flex-col gap-4"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              }>
              {properties.map((property) => (
                <div key={property.id} className="group block">
                  {isMobile ? (
                    <UserPropertyCard
                      property={property}
                      onContactAgent={(prop) => {
                        setEnquiryProperty(prop);
                        setIsEnquiryPopupOpen(true);
                      }}
                    />
                  ) : (
                    // Subtle hover effect suitable for professional portals
                    <div className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 rounded-lg bg-white h-full border border-gray-200">
                      <PropertyCard
                        property={property}
                        onContactAgent={(prop) => {
                          setEnquiryProperty(prop);
                          setIsEnquiryPopupOpen(true);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Mobile View All Button */}
        <div className="mt-6 md:hidden flex justify-center">
          <Link
            to="/properties"
            className="flex items-center justify-center gap-2 w-full bg-white border border-red-600 text-red-600 py-2.5 rounded text-[15px] font-semibold hover:bg-red-50 transition-colors">
            {t("common.allProperties", "View all properties")}
          </Link>
        </div>

        {recentProperties.length > 0 && (
          <div className="mt-16 md:mt-20">
            {/* --- Standard Portal-Style Header 2 --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
                  {t("home.newProperties", "New Properties in Rohtak")}
                </h2>
                <div className="w-16 h-1 bg-red-600 mb-4"></div>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl">
                  {t(
                    "home.newPropertiesDescription",
                    "Discover our most recently added property listings and exclusive real estate opportunities.",
                  )}
                </p>
              </div>

              <Link
                to="/properties"
                className="hidden md:flex items-center gap-1.5 text-[15px] font-medium text-red-600 hover:text-red-700 transition-colors pb-1">
                {t("home.allListings", "View all listings")}{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div
              className={
                isMobile
                  ? "flex flex-col gap-4"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              }>
              {recentProperties.map((property) => (
                <div key={property.id} className="group block">
                  {isMobile ? (
                    <UserPropertyCard
                      property={property}
                      onContactAgent={(prop) => {
                        setEnquiryProperty(prop);
                        setIsEnquiryPopupOpen(true);
                      }}
                    />
                  ) : (
                    <div className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 rounded-lg bg-white h-full border border-gray-200">
                      <PropertyCard
                        property={property}
                        onContactAgent={(prop) => {
                          setEnquiryProperty(prop);
                          setIsEnquiryPopupOpen(true);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile View All Button for Recent */}
            <div className="mt-6 md:hidden flex justify-center">
              <Link
                to="/properties"
                className="flex items-center justify-center gap-2 w-full bg-white border border-red-600 text-red-600 py-2.5 rounded text-[15px] font-semibold hover:bg-red-50 transition-colors">
                {t("home.allListings", "View all listings")}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Popup */}
      <PropertyEnquiryPopup
        isOpen={isEnquiryPopupOpen}
        onClose={() => {
          setIsEnquiryPopupOpen(false);
          setEnquiryProperty(null);
        }}
        property={enquiryProperty}
      />
    </section>
  );
};

export default FeaturedProperties;
