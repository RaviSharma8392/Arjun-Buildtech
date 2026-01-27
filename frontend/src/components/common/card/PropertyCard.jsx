import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";

const PropertyCard = ({ property, isAdmin = false, onEdit, onDelete }) => {
  // Slugify function for URL
  const slugify = (text) =>
    text
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const locationSlug = slugify(property.location) || "unknown";
  const nameSlug = slugify(property.name) || "property";

  return (
    <div className="bg-white  hover:shadow-xl transition  overflow-hidden border border-gray-100 flex flex-col h-full group">
      {/* Property Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-medium">
            No Image
          </div>
        )}

        {/* Property Type Badge */}
        {property.type && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md uppercase">
            {property.type === "house" ? "House/Villa" : "Plot/Land"}
          </span>
        )}

        {/* Price Badge */}
        {property.price && (
          <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            ₹ {property.price.toLocaleString()}
          </span>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
            {property.name}
          </h3>

          {property.location && (
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
              <FaMapMarkerAlt className="w-3 h-3" />
              {property.location}
            </div>
          )}

          <div className="flex gap-3 text-gray-700 text-sm font-medium mb-2">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <FaBed className="w-3 h-3" /> {property.bedrooms} Beds
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <FaBath className="w-3 h-3" /> {property.bathrooms} Baths
              </div>
            )}
            {property.builtUpArea && (
              <div className="flex items-center gap-1">
                <FaRulerCombined className="w-3 h-3" /> {property.builtUpArea}
              </div>
            )}
          </div>

          {property.features?.length > 0 && (
            <p className="text-xs text-gray-500">
              Features: {property.features.slice(0, 3).join(", ")}
              {property.features.length > 3
                ? ` +${property.features.length - 3} more`
                : ""}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {isAdmin ? (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(property.docId)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(property.docId)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ) : (
          <Link
            to={`/property/${locationSlug}/${nameSlug}/${property.id}`}
            className="mt-4 w-full text-center bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-200">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
