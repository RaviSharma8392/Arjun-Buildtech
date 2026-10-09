import React from "react";
import { Building, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { normalizePropertyData } from "../../../utils/propertySchema";

const UserPropertyCard = ({ property: propertyData }) => {
  const property = normalizePropertyData(propertyData);
  const propertyLink = `/property/${property.location?.toLowerCase().replace(/\s+/g, "-") || "rohtak"}/${property.name?.toLowerCase().replace(/\s+/g, "-") || "property"}/${property.id}`;

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out this property: ${property.name} in ${property.location}`,
        url: window.location.origin + propertyLink,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + propertyLink);
      alert("Link copied to clipboard!");
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    const numPrice = Number(price);
    if (numPrice >= 10000000) return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    if (numPrice >= 100000) return `₹${(numPrice / 100000).toFixed(2)} Lac`;
    return `₹${numPrice.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full h-full relative group">
      {/* Image Section */}
      <Link
        to={propertyLink}
        className="relative w-full h-[200px] flex-shrink-0 bg-pink-50 overflow-hidden block">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 font-medium group-hover:scale-105 transition-transform duration-300">
            <Building className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-sm">No Image Available</span>
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="flex flex-col flex-1 p-5 border-t border-gray-100">
        <div className="text-gray-500 text-[13px] mb-1.5 uppercase tracking-wider font-medium">
          {property.propertyType === "plot"
            ? "Plot"
            : property.bedrooms
              ? `${property.bedrooms} BHK ${property.propertyType || "House"}`
              : property.propertyType || "Property"}
        </div>

        <div className="flex flex-wrap items-baseline gap-2 mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {formatPrice(property.price)}
          </h3>
          {(property.area || property.builtUpArea || property.landArea) && (
            <>
              <span className="text-gray-400 font-medium">|</span>
              <span className="text-base font-semibold text-gray-800">
                {property.area || property.builtUpArea || property.landArea}{" "}
                {property.areaUnit || "sqft"}
              </span>
            </>
          )}
          {property.pricePerSqft && (
            <>
              <span className="text-gray-400 font-medium">|</span>
              <span className="text-sm text-gray-500 font-medium">
                ₹{property.pricePerSqft.toLocaleString("en-IN")}/{property.areaUnit || "sqft"}
              </span>
            </>
          )}
        </div>

        <Link
          to={propertyLink}
          className="hover:text-red-600 transition-colors inline-block mb-1">
          <h2 className="text-base font-bold text-gray-900 line-clamp-1">
            {property.name || "Premium Property"}
          </h2>
        </Link>

        {property.location && (
          <p className="text-gray-500 text-sm line-clamp-1 mb-4">
            {property.location}
          </p>
        )}

        {/* Footer Actions */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <Link
            to={propertyLink}
            className="flex-1 text-center py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors">
            View Details
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            title="Share">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPropertyCard;
