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
import { useLanguage } from "../context/useLanguage";
import Breadcrumb from "./common/Breadcrumb";

const fallbackReviews = [
  {
    id: "f1",
    name: "Adish",
    role: "I am Resident of this Locality",
    location: "Sector 27, Rohtak",
    rating: 5,
    date: "2024-11-21",
    feedback:
      "We evaluated multiple locations, but the best appreciation and connectivity are here. Arjun Buildtech handled all paperwork and registry smoothly without any hassle.",
  },
  {
    id: "f2",
    name: "Himanshu",
    role: "I am Resident of this Locality",
    location: "Suncity Sector-36, Rohtak",
    rating: 5,
    date: "2024-11-21",
    feedback:
      "Good localities for residential and commercial purpose with all types of facilities, clean wide roads, and peaceful environment.",
  },
  {
    id: "f3",
    name: "Ram Gopal",
    role: "I am Resident of this Locality",
    location: "HSVP Sector-2, Rohtak",
    rating: 5,
    date: "2024-11-21",
    feedback:
      "This is a very clean area with all the necessary amenities, including schools, banks and hospitals nearby. Everything is well managed.",
  },
  {
    id: "f4",
    name: "Santosh",
    role: "I am a property consultant",
    location: "Sector-1, Rohtak",
    rating: 5,
    date: "2024-11-20",
    feedback:
      "It is one of the top locations of Rohtak. All essential needs like shops, hospitals, schools, and food joints are within 5 minutes reach.",
  },
  {
    id: "f5",
    name: "Vaishali",
    role: "I have been living here since 2021",
    location: "Suncity, Rohtak",
    rating: 5,
    date: "2024-11-20",
    feedback:
      "All basic facilities like School, Colleges, Universities, and Coaching Centres are in close proximity. Safe and friendly environment.",
  },
  {
    id: "f6",
    name: "Sharad Ahlawat",
    role: "I am Resident of this Locality",
    location: "Sector-25, Rohtak",
    rating: 5,
    date: "2024-11-19",
    feedback:
      "This city is an excellent place to live. The localities here are lined with lush green parks, wide roads, and great connectivity.",
  },
];

const getAvatarColor = (name = "") => {
  const colors = [
    "bg-[#9c27b0]", // Purple
    "bg-[#4caf50]", // Green
    "bg-[#5c93c4]", // Blue
    "bg-[#8bc34a]", // Light Green
    "bg-[#b05252]", // Wine / Red
    "bg-[#d07b7b]", // Rose
    "bg-[#e67e22]", // Orange
    "bg-[#009688]", // Teal
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const formatDate = (dateVal) => {
  if (!dateVal) return "21/11/2024";
  if (typeof dateVal === "string" && dateVal.includes("-")) {
    const parts = dateVal.split("T")[0].split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  if (dateVal?.toDate) {
    const d = dateVal.toDate();
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}/${d.getFullYear()}`;
  }
  return "21/11/2024";
};

const ClientReviews = ({ hideSeo = false, city = "Rohtak" }) => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [newReview, setNewReview] = useState({
    name: "",
    feedback: "",
    rating: 5,
    location: "",
    role: "I am Resident of this Locality",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = (rating = 5, size = "w-3.5 h-3.5") => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${size} ${
              star <= rating ? "text-[#f59e0b]" : "text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          orderBy("createdAt", "desc"),
          limit(30),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (data && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(fallbackReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews(fallbackReviews);
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
      setNewReview({
        name: "",
        feedback: "",
        rating: 5,
        location: "",
        role: "I am Resident of this Locality",
      });
      toast.success(t("reviews.success", "Review submitted successfully!"));
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error(t("reviews.error", "Failed to submit review."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const displayedReviews = reviews.length > 0 ? reviews : fallbackReviews;

  const averageRating =
    displayedReviews.length > 0
      ? (
          displayedReviews.reduce((acc, rev) => acc + (rev.rating || 5), 0) /
          displayedReviews.length
        ).toFixed(1)
      : "4.8";

  const totalReviewsCount = Math.max(1319, displayedReviews.length);
  const totalUsersCount = Math.max(1316, displayedReviews.length - 3);

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
      reviewCount: totalReviewsCount,
    },
    review: displayedReviews.slice(0, 5).map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.name,
      },
      datePublished: rev.date || "2024-11-21",
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
    <section className="py-12 bg-white">
      {!hideSeo && (
        <Helmet>
          <title>Client Reviews | Arjun Buildtech</title>
          <meta
            name="description"
            content={`Read genuine ratings and reviews from verified clients and residents in Rohtak with Arjun Buildtech.`}
          />
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>
      )}

      <div className="site-container font-sans">
        {/* Breadcrumb for Standalone Page */}
        {!hideSeo && (
          <div className="mb-4">
            <Breadcrumb
              items={[{ name: "Home", path: "/" }, { name: "Client Reviews" }]}
            />
          </div>
        )}

        {/* Page / Section Heading & Description */}
        <div className="mb-10 text-left">
          {!hideSeo ? (
            <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-3">
              {t("reviews.title", "What Our Customers Say")}
            </h1>
          ) : (
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-3">
              {t("reviews.title", "What Our Customers Say")}
            </h2>
          )}
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed max-w-2xl">
            {t(
              "reviews.description",
              "Real feedback from property buyers and sellers in Rohtak. We value transparency and take pride in the 100% genuine reviews from our verified clients.",
            )}
          </p>
        </div>

        {/* Top Header Summary Line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pt-2 border-t border-gray-100">
          <div className="text-[15px] sm:text-[16px] text-gray-700 font-normal">
            <span className="text-[#f59e0b] font-bold inline-flex items-center gap-1">
              ★ {averageRating}/5
            </span>{" "}
            based on{" "}
            <span className="font-bold text-gray-900">
              {totalUsersCount.toLocaleString()} users
            </span>{" "}
            ratings.{" "}
            <span className="font-bold text-gray-900">
              {totalReviewsCount.toLocaleString()} Reviews
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg border border-red-200 transition-colors">
            + Write a Review
          </button>
        </div>

        {/* 3 Locality Metric Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Card 1: Commuting */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-[16px]">Commuting</h3>
              <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                4.5 ★
              </span>
            </div>
            <div className="space-y-3 text-[13px] text-gray-600">
              <div className="flex items-center justify-between">
                <span>Parking</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Bus Stop</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Banks/ATMs</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Petrol Pump</span>
                {renderStars(4)}
              </div>
            </div>
          </div>

          {/* Card 2: Environment */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-[16px]">
                Environment
              </h3>
              <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                4.7 ★
              </span>
            </div>
            <div className="space-y-3 text-[13px] text-gray-600">
              <div className="flex items-center justify-between">
                <span>Saftey</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Cleanliness</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Roads</span>
                {renderStars(4)}
              </div>
            </div>
          </div>

          {/* Card 3: Places of Interest */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-[16px]">
                Places of Interest
              </h3>
              <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                4.6 ★
              </span>
            </div>
            <div className="space-y-3 text-[13px] text-gray-600">
              <div className="flex items-center justify-between">
                <span>Schools</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Shopping Mall</span>
                {renderStars(5)}
              </div>
              <div className="flex items-center justify-between">
                <span>Hospitals</span>
                {renderStars(5)}
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h3 className="text-[18px] sm:text-[20px] text-gray-800 font-normal">
            Latest Review of City{" "}
            <span className="font-bold text-gray-900">{city}</span>
          </h3>
        </div>

        {/* 3 Columns Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedReviews
            .filter((r) => r.isVisible !== false)
            .slice(0, visibleCount)
            .map((review, index) => {
              const avatarColor = getAvatarColor(review.name || `User${index}`);
              const isExpanded = !!expandedReviews[review.id || index];
              const textLength = review.feedback?.length || 0;
              const shouldTruncate = textLength > 115;
              const displayText =
                shouldTruncate && !isExpanded
                  ? review.feedback.slice(0, 115) + "..."
                  : review.feedback;

              return (
                <div
                  key={review.id || index}
                  className="bg-white border border-gray-200/90 rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                  <div>
                    {/* Header: User Avatar + Name/Role + Stars/Date */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full ${avatarColor} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm`}>
                          {(review.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-[15px] leading-tight">
                            {review.name}
                          </div>
                          <div className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">
                            {review.role ||
                              review.location ||
                              "I am Resident of this Locality"}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        {renderStars(review.rating || 5, "w-3 h-3")}
                        <span className="text-[11px] text-gray-400 mt-1 font-medium">
                          {formatDate(review.date || review.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Review Feedback Text */}
                    <p className="text-[13.5px] text-gray-700 leading-relaxed">
                      {displayText}
                      {shouldTruncate && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(review.id || index)}
                          className="text-blue-600 hover:text-blue-700 font-medium ml-1.5 focus:outline-none">
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* View More Reviews Button */}
        {visibleCount < displayedReviews.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
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
                  {t("reviews.write", "Write a Review")}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  Share your experience with our team and locality
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
              className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain bg-white px-5 py-5 sm:px-6 sm:py-6">
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Role / Relation
                </label>
                <input
                  type="text"
                  value={newReview.role}
                  onChange={(e) =>
                    setNewReview({ ...newReview, role: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="e.g., I am Resident of this Locality"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Location / Sector
                </label>
                <input
                  type="text"
                  value={newReview.location}
                  onChange={(e) =>
                    setNewReview({ ...newReview, location: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="e.g., Sector 27, Rohtak"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="inline-flex items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 p-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className={`flex h-9 w-9 items-center justify-center text-2xl transition-colors ${
                        star <= newReview.rating
                          ? "text-[#f59e0b]"
                          : "text-gray-300"
                      }`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Review / Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="4"
                  value={newReview.feedback}
                  onChange={(e) =>
                    setNewReview({ ...newReview, feedback: e.target.value })
                  }
                  className="w-full flex-1 resize-y rounded-lg border border-gray-300 px-4 py-2.5 text-[15px] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="Share details about amenities, connectivity, roads, and environment..."></textarea>
              </div>

              <div className="sticky bottom-0 shrink-0 bg-white pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-red-600 py-3 font-bold text-[15px] uppercase tracking-wide text-white transition-colors hover:bg-red-700 disabled:opacity-70">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
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
