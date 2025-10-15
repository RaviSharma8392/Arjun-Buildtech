import React, { useEffect, useState } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import ReviewCard from "./common/card/ReviewCard";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const ClientReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? reviews.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-amber-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const snapshot = await getDocs(reviewsRef);
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Reviews
          </h2>
          <p className="text-gray-600 text-lg">No reviews available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <span>⭐</span>
            TRUSTED BY HUNDREDS OF CLIENTS
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover why hundreds of clients trust us with their real estate
            journey. Their success stories speak volumes about our commitment.
          </p>
        </div>

        {/* Main Review Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaQuoteLeft className="text-white w-6 h-6" />
                </div>
              </div>

              {/* Review Content */}
              <div className="text-center mb-8">
                <p className="text-2xl text-gray-700 leading-relaxed mb-6 italic">
                  "{reviews[currentIndex].feedback}"
                </p>

                {/* Star Rating */}
                <div className="flex justify-center items-center gap-1 mb-6">
                  {renderStars(reviews[currentIndex].rating || 5)}
                </div>

                {/* Client Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {reviews[currentIndex].name}
                  </h3>
                  {reviews[currentIndex].location && (
                    <p className="text-gray-600 mb-2">
                      {reviews[currentIndex].location}
                    </p>
                  )}
                  {reviews[currentIndex].date && (
                    <p className="text-gray-500 text-sm">
                      {reviews[currentIndex].date}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300">
                  <FaChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-blue-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Next
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Mini Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.id || index}
              testimonial={review}
              isActive={index === currentIndex}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-200">
          {[
            { number: "4.9/5", label: "Average Rating" },
            { number: "500+", label: "Happy Clients" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24h", label: "Response Time" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
