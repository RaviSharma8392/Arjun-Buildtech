import React from "react";
import StarRating from "../rating/StarRating";

const ReviewCard = ({ testimonial, isActive }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
        isActive ? "border-blue-500" : "border-transparent"
      }`}>
      {/* Header with Google-style layout */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">
            {testimonial.name.charAt(0)}
          </span>
        </div>

        {/* Client Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {testimonial.name}
            </h3>
            {/* Verified Badge */}
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-2">{testimonial.location}</p>

          {/* Star rating and date */}
          <div className="flex items-center gap-3">
            <StarRating rating={testimonial.rating} />
            <span className="text-sm text-gray-500">{testimonial.date}</span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="mt-4">
        <p className="text-gray-700 leading-relaxed line-clamp-4">
          "{testimonial.feedback}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.1 4h-12.2c-1.1 0-1.9.9-1.9 1.9v12.2c0 1.1.9 1.9 1.9 1.9h12.2c1.1 0 1.9-.9 1.9-1.9v-12.2c0-1.1-.9-1.9-1.9-1.9zm-6.1 14.6c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z" />
            <path d="M12 8.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" />
          </svg>
          <span>Google Review</span>
        </div>

        {/* Helpful Buttons */}
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            👍
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
