import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Star, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";

const PopularLocalities = () => {
  const { t } = useLanguage();
  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        // Only fetch localities that are marked as visible
        const q = query(
          collection(db, "localities"),
          where("isVisible", "==", true),
        );
        const querySnapshot = await getDocs(q);

        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort by order, fallback to propertyCount
        data.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return (b.propertyCount || 0) - (a.propertyCount || 0);
        });

        setLocalities(data);
      } catch (error) {
        console.error("Error fetching localities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalities();
  }, []);

  if (loading || localities.length === 0) return null;

  return (
    <div className="py-8 w-full overflow-hidden">
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 hidden-scrollbar snap-x snap-mandatory">
        {/* Intro Card */}
        <div className="min-w-[240px] md:min-w-[280px] h-[280px] bg-[#E8F8F9] rounded-xl p-6 flex flex-col justify-center snap-start flex-shrink-0">
          <h2 className="font-script text-4xl md:text-5xl font-bold text-gray-800 mb-4 transform -rotate-2">
            {t("localities.explore", "Explore")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-snug">
            {t("localities.popular", "Popular Localities")}
            <br />
            {t("localities.inRohtak", "in Rohtak")}
          </p>
          <div className="w-12 h-1 bg-[#00B4D8] mt-4"></div>
        </div>

        {/* Locality Cards */}
        {localities.map((loc) => (
          <div
            key={loc.id}
            className="min-w-[260px] md:min-w-[280px] h-[280px] bg-white rounded-xl border border-gray-200 flex flex-col relative snap-start flex-shrink-0 hover:shadow-md transition-shadow">
            {/* Top Content */}
            <div className="p-5 flex-1">
              <div className="flex items-center gap-2 mb-1 cursor-pointer hover:text-red-600 transition-colors">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                  {loc.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-gray-500 text-[13px] mb-4 h-5 line-clamp-1">
                {loc.priceRange}
              </p>

              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <span className="font-bold text-gray-800">{loc.rating}</span>
                <Star className="w-3.5 h-3.5 fill-[#FDB813] text-[#FDB813]" />
                <span>
                  {loc.reviewsCount} {t("localities.reviews", "Reviews")}
                </span>
              </div>
            </div>

            {/* Bottom Banner Area */}
            <div className="h-[90px] bg-[#E8F8F9] rounded-b-xl relative mt-auto p-4 flex items-end">
              {/* Circular Image protruding up */}
              <div className="absolute -top-6 left-4 w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-200 flex items-center justify-center">
                {loc.image ? (
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 font-bold">
                    {loc.name?.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <Link
                to={`/properties?location=${encodeURIComponent(loc.name)}`}
                className="text-red-600 font-medium text-[14px] hover:text-red-700 flex items-center gap-1 transition-colors">
                {loc.propertyCount}{" "}
                {t("localities.propertiesForSale", "Properties for Sale")}{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularLocalities;
