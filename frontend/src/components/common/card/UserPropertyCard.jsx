import React from "react";
import { FaBed, FaBath, FaRulerCombined, FaHome } from "react-icons/fa";

const UserPropertyCard = ({ property }) => {
  return (
    <div className="flex items-start sm:items-center bg-white border border-gray-200 md:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-3 gap-3 sm:gap-4">
      {/* Image */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
          {property.name}
        </h3>

        {/* Location */}
        {property.location && (
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            {property.location}
          </p>
        )}

        {/* Price */}
        {property.price && (
          <div className="text-black/80 font-semibold text-sm sm:text-base mt-1">
            ₹ {Number(property.price).toLocaleString()}
            {property.pricePerSqft && (
              <span className="text-gray-500 text-xs block">
                ₹ {Number(property.pricePerSqft).toLocaleString()} / sqft
              </span>
            )}
          </div>
        )}

        {/* Specs */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-600 text-xs sm:text-sm mt-1">
          {property.builtUpArea && (
            <div className="flex items-center gap-1">
              <FaRulerCombined className="text-gray-400" />
              {property.builtUpArea} sqft
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <FaBed className="text-gray-400" />
              {property.bedrooms} Beds
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <FaBath className="text-gray-400" />
              {property.bathrooms} Baths
            </div>
          )}
          {property.transactionType && (
            <div className="flex items-center gap-1">
              <FaHome className="text-gray-400" />
              {property.transactionType}
            </div>
          )}
        </div>

        {/* Features */}
        {property.features?.length > 0 && (
          <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-1">
            Features: {property.features.slice(0, 3).join(", ")}
            {property.features.length > 3 &&
              ` +${property.features.length - 3} more`}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPropertyCard;
