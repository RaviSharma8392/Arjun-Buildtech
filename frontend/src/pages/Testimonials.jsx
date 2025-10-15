import React, { useEffect, useState } from "react";
import ReviewCard from "../components/common/card/ReviewCard";
import Button from "../components/common/button/Button";
import { db } from "../services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from Firestore
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold text-gray-700">
          Loading reviews...
        </h2>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 text-lg">
          Real stories from real clients — straight from Google Reviews
        </p>
      </div>

      {reviews.length > 0 ? (
        <>
          {/* Review Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} testimonial={review} />
            ))}
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <Button
              label="View All Reviews"
              to="/testimonials"
              variant="black"
            />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-8">
          No reviews available yet. Be the first to share your experience!
        </div>
      )}
    </section>
  );
};

export default Testimonials;
