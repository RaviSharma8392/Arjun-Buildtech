import React, { useState } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Star,
  Save,
  Plus,
  User,
  MapPin,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import Notification from "../../components/common/notification/Notification";

const AdminReviews = () => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const reviewsRef = collection(db, "reviews");

  const resetForm = () => {
    setName("");
    setFeedback("");
    setRating(5);
    setLocation("");
    setDate("");
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) {
      alert("Client name and feedback are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(reviewsRef, {
        name: name.trim(),
        feedback: feedback.trim(),
        rating: rating,
        location: location.trim(),
        date: date || new Date().toISOString().split("T")[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      resetForm();
      setSubmitSuccess(true);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Error adding review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 transition-transform hover:scale-110 ${
              star <= value ? "text-amber-400" : "text-gray-300"
            }`}>
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Add Client Review
          </h1>
          <p className="text-gray-600 text-lg">
            Share your client's positive experience with others
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <Notification
            message="Review added successfully! The review has been published to the website."
            type="success"
            onClose={() => setSubmitSuccess(false)}
            duration={3000}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    New Client Review
                  </h2>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Client Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <User className="w-4 h-4" />
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter client's full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Client Rating
                  </label>
                  <StarRating value={rating} onChange={setRating} />
                  <p className="text-sm text-gray-500 mt-2">
                    {rating === 5
                      ? "Excellent - 5 stars"
                      : rating === 4
                      ? "Very Good - 4 stars"
                      : rating === 3
                      ? "Good - 3 stars"
                      : rating === 2
                      ? "Fair - 2 stars"
                      : "Poor - 1 star"}
                  </p>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Client Feedback *
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share what your client said about their experience..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical min-h-[120px]"
                    rows="4"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City or area"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <Calendar className="w-4 h-4" />
                      Review Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      max={getCurrentDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding Review...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Publish Review</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting}
                    className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-400" />
                Preview
              </h3>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  This is how the review will appear to visitors:
                </p>

                {/* Preview Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rating
                            ? "text-amber-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {feedback || "Client feedback will appear here..."}
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {name ? name.charAt(0).toUpperCase() : "C"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {name || "Client Name"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {location && <span>{location}</span>}
                        {location && date && <span>•</span>}
                        {date && (
                          <span>{new Date(date).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-medium text-blue-800 text-sm mb-2">
                    💡 Tips for great reviews
                  </h4>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• Keep feedback genuine and specific</li>
                    <li>• Mention specific services used</li>
                    <li>• Highlight positive outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Review Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Real Clients</h4>
              <p className="text-gray-600 text-sm">
                Only add reviews from genuine clients
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Honest Ratings
              </h4>
              <p className="text-gray-600 text-sm">
                Accurate ratings build trust
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Recent Experiences
              </h4>
              <p className="text-gray-600 text-sm">
                Current reviews are more relevant
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminReviews;
