import React from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaRegHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const UserPropertyCard = ({ property }) => {
  const propertyLink = `/property/${property.location?.toLowerCase().replace(/\s+/g, "-") || "rohtak"}/${property.name?.toLowerCase().replace(/\s+/g, "-") || "property"}/${property.id}`;

  return (
    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden mb-4 group relative">
      {/* Favorite Button */}
      <button className="absolute top-3 right-3 sm:top-3 sm:right-3 z-10 w-8 h-8 bg-white/90 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-white transition-colors shadow-sm">
        <FaRegHeart size={14} />
      </button>

      {/* Image Section */}
      <Link
        to={propertyLink}
        className="relative w-full sm:w-[260px] h-[200px] sm:h-auto flex-shrink-0 bg-gray-100 overflow-hidden block">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-xs">
            No Image Available
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider w-max">
            {property.type || "Property"}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 bg-[#00875A] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-max">
          <FaCheckCircle size={10} /> Verified
        </div>
      </Link>

      {/* Details Section */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
        {/* Price & Location */}
        <div className="flex flex-col mb-1.5">
          {property.price ? (
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              ₹ {property.price.toLocaleString("en-IN")}
            </h3>
          ) : (
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              Price on Request
            </h3>
          )}

          {property.pricePerSqft && (
            <p className="text-gray-500 text-xs mt-0.5">
              ₹ {property.pricePerSqft.toLocaleString("en-IN")} / sqft
            </p>
          )}
        </div>

        {/* Title */}
        <Link
          to={propertyLink}
          className="hover:text-red-600 transition-colors inline-block mb-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
            {property.name}
          </h2>
        </Link>

        {/* Location */}
        {property.location && (
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5 mb-3">
            <FaMapMarkerAlt className="text-gray-400 shrink-0" size={12} />
            <span className="truncate">{property.location}</span>
          </p>
        )}

        {/* Minimal Specs Row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-xs sm:text-sm font-medium text-gray-600">
          {property.builtUpArea && (
            <div className="flex items-center gap-1">
              <FaRulerCombined className="text-gray-400" size={13} />
              <span>{property.builtUpArea} sqft</span>
            </div>
          )}

          {property.builtUpArea && property.bedrooms && (
            <span className="text-gray-300">|</span>
          )}

          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <FaBed className="text-gray-400" size={13} />
              <span>{property.bedrooms} BHK</span>
            </div>
          )}

          {property.bedrooms && property.bathrooms && (
            <span className="text-gray-300">|</span>
          )}

          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <FaBath className="text-gray-400" size={13} />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
        </div>

        {/* Description Snippet */}
        <p className="hidden sm:block text-gray-500 text-[13px] line-clamp-2 mb-4 leading-relaxed flex-1">
          {property.description ||
            `Beautiful ${property.type} available for sale in ${property.location}. Features premium amenities, excellent connectivity, and a safe neighborhood.`}
        </p>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between mt-auto pt-3 border-t border-gray-100 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-[11px] border border-gray-200">
              AB
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">
                Agent
              </span>
              <span className="text-xs font-semibold text-gray-800 leading-none">
                Arjun Buildtech
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              to={propertyLink}
              className="flex-1 sm:flex-none text-center px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded hover:border-red-600 hover:text-red-600 transition-colors">
              Details
            </Link>
            <Link
              to="/contact"
              className="flex-1 sm:flex-none text-center px-4 py-1.5 bg-red-600 text-white text-xs sm:text-sm font-semibold rounded hover:bg-red-700 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPropertyCard;
