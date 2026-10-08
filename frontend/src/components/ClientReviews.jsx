import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import { db } from "../services/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

const ClientReviews = ({ hideSeo = false }) => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleGridReviews = reviews.slice(0, visibleCount);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-3.5 h-3.5 ${
          index < rating ? "text-[#F5A623]" : "text-gray-300"
        }`}
      />
    ));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), limit(12));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews from Firebase:", error);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </section>
    );
  }

  // Generate JSON-LD Schema
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, rev) => acc + (rev.rating || 5), 0) /
          reviews.length
        ).toFixed(1)
      : 5.0;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Arjun Buildtech",
    image: "https://arjunbuildtech.com/arjunBuildTechLogo.png",
    "@id": "https://arjunbuildtech.com",
    url: "https://arjunbuildtech.com",
    telephone: "+91-9350447531",
    address: {
      "@type": "PostalAddress",
      streetAddress: "G74P, Sector-27",
      addressLocality: "Rohtak",
      addressRegion: "Haryana",
      postalCode: "124001",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviews.length > 0 ? reviews.length : 1,
    },
    review: reviews.slice(0, 5).map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.name,
      },
      datePublished: rev.date || new Date().toISOString().split("T")[0],
      reviewBody: rev.feedback,
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: rev.rating || "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <section className="py-12 bg-[#F9F9F9]">
      {!hideSeo && (
        <Helmet>
          <title>Client Reviews | Arjun Buildtech</title>
          <meta
            name="description"
            content={`Read ${reviews.length}+ reviews from satisfied clients who bought, sold, or invested in properties with Arjun Buildtech in Rohtak.`}
          />
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Updated Heading Design (Matching image_dfe724.png) */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-sm md:text-base text-gray-600">
            Real feedback from property buyers and sellers in Rohtak.
          </p>
        </div>

        {/* Utilitarian Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleGridReviews.map((review, index) => (
            <div
              key={review.id || index}
              className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow duration-200">
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-lg border border-gray-200 shrink-0">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-[15px] leading-tight">
                    {review.name}
                  </div>
                  <div className="text-[12px] text-gray-500 mt-0.5">
                    {review.location || "Verified Client"}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {renderStars(review.rating || 5)}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-[14px] leading-relaxed flex-grow">
                {review.feedback}
              </p>
            </div>
          ))}
        </div>

        {/* Standard Load More Button */}
        {visibleCount < reviews.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-white border border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 rounded-md font-semibold text-sm transition-colors">
              View More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientReviews;
