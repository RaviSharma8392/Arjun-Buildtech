import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  limit,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import toast from "react-hot-toast";

const ClientReviews = ({ hideSeo = false }) => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    feedback: "",
    rating: 5,
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);



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
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc"),
          limit(20),
        );
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.feedback) return;
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        ...newReview,
        createdAt: serverTimestamp(),
      });
      const addedReview = {
        id: docRef.id,
        ...newReview,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([addedReview, ...reviews]);
      setIsModalOpen(false);
      setNewReview({ name: "", feedback: "", rating: 5, location: "" });
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (reviews.length === 0 && !isModalOpen) {
    return (
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">No reviews yet.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded">
            Write a Review
          </button>
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Left Content */}
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-6 mx-auto md:mx-0"></div>
            <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Real feedback from property buyers and sellers in Rohtak. We value
              transparency and take pride in the 100% genuine reviews from our
              verified clients.
            </p>
          </div>

          {/* Right Content - Write Review Box */}
          <div className="w-full md:w-[320px] bg-white border border-gray-200 rounded-lg p-6 shrink-0 flex flex-col items-center md:items-start hover:shadow-md transition-shadow duration-200">
            <div className="text-center md:text-left w-full">
              <h3 className="text-[22px] font-bold text-gray-900 mb-1 leading-none">{averageRating}/5</h3>
              <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-[13px] text-gray-500 font-medium">Based on {reviews.length} reviews</p>
            </div>
            <div className="w-full h-px bg-gray-200 my-4"></div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-bold shadow-sm transition-all text-[15px] uppercase tracking-wide">
              Write a Review
            </button>
          </div>
        </div>

        {/* Utilitarian Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews
            .filter((r) => r.isVisible !== false) // Only show visible reviews
            .slice(0, visibleCount)
            .map((review, index) => (
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

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-0 backdrop-blur-sm sm:p-4">
          <div className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-lg sm:rounded-xl">
            <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Write a Review
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  Share your experience with our team
                </p>
              </div>
              <button
                type="button"
                aria-label="Close review form"
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl font-light leading-none text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                &times;
              </button>
            </div>
            <form
              onSubmit={handleReviewSubmit}
              className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain bg-white px-5 py-5 sm:px-6 sm:py-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="min-h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-[16px] sm:text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={newReview.location}
                  onChange={(e) =>
                    setNewReview({ ...newReview, location: e.target.value })
                  }
                  className="min-h-12 w-full rounded-lg border border-gray-300 px-4 py-3 text-[16px] sm:text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="e.g., Sector 27, Rohtak"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="inline-flex max-w-full items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 p-2 sm:gap-2 sm:p-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`${star} star${star === 1 ? "" : "s"}`}
                      aria-pressed={newReview.rating === star}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className={`flex h-11 w-10 items-center justify-center text-3xl transition-colors sm:w-11 ${star <= newReview.rating ? "text-[#F5A623]" : "text-gray-300"}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="5"
                  value={newReview.feedback}
                  onChange={(e) =>
                    setNewReview({ ...newReview, feedback: e.target.value })
                  }
                  className="min-h-32 w-full flex-1 resize-y rounded-lg border border-gray-300 px-4 py-3 text-[16px] sm:min-h-36 sm:text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="Share your experience working with Arjun Buildtech..."></textarea>
              </div>
              <div className="sticky bottom-0 shrink-0 bg-white pt-1 pb-[max(env(safe-area-inset-bottom),0.25rem)] sm:static sm:pb-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-14 w-full rounded-lg bg-red-600 py-3.5 font-bold text-[15px] uppercase tracking-wide text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">
                  {isSubmitting ? "Submitting Review..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientReviews;
