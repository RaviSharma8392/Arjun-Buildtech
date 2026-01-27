import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { Link } from "react-router-dom";
import { Home, Search, MapPin } from "lucide-react"; // Assuming you might want icons, or remove if not using lucide-react

// Components
import PropertyCard from "../components/common/card/PropertyCard";
import UserPropertyCard from "./common/card/UserPropertyCard";

// --- Helper: URL Slug Generator ---
const createPropertySlug = (property) => {
  if (!property) return "#";
  const locationSlug =
    property.location?.toLowerCase().replace(/\s+/g, "-") || "location";
  const nameSlug =
    property.name?.toLowerCase().replace(/\s+/g, "-") || "property";
  return `/property/${locationSlug}/${nameSlug}/${property.id}`;
};

// --- Sub-Component: Skeleton Loader ---
const PropertySkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse h-full">
    <div className="h-48 bg-gray-200 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-gray-200 rounded w-16" />
        <div className="h-8 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
);

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // We keep the isMobile state to switch card types as per your requirement
  // However, usually, a single responsive card component is better for maintenance.
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
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(data);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            Featured Properties
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore our handpicked selection of premium properties, including
            HSVP plots, Suncity floors, and investment-ready homes.
          </p>
        </div>

        {/* --- Content Section --- */}
        <main>
          {loading ? (
            // Loading State: Grid of Skeletons
            <div
              className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
              {[...Array(8)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : properties.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No featured properties found
              </h3>
              <p className="text-gray-500 max-w-sm">
                We couldn't find any featured listings at the moment. Please
                check back later or explore other categories.
              </p>
            </div>
          ) : (
            // Data Loaded State
            <div
              className={
                isMobile
                  ? "flex flex-col gap-4" // Mobile: Vertical stack
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" // Desktop: Responsive Grid
              }>
              {properties.map((property) => (
                <Link
                  key={property.id}
                  to={createPropertySlug(property)}
                  className={`group block transition-all duration-300 ${
                    !isMobile &&
                    "hover:-translate-y-1 hover:shadow-xl rounded-xl"
                  }`}>
                  {isMobile ? (
                    <UserPropertyCard property={property} />
                  ) : (
                    <PropertyCard property={property} />
                  )}
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default FeaturedProperties;
