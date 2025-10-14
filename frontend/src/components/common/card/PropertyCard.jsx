import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../button/Button";

const PropertyCard = ({ property, isAdmin = false, onEdit, onDelete }) => {
  console.log(property);
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const locationSlug = property.location
    ? slugify(property.location)
    : "unknown";
  const nameSlug = property.name ? slugify(property.name) : "property";

  return (
    <div className="group block bg-white rounded-xl shadow-lg  duration-300 overflow-hidden border border-gray-100 relative">
      {/* Image */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        {property.images?.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm font-medium">
              No Image Available
            </span>
          </div>
        )}

        {property.propertyType && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {property.propertyType}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 md:p-5">
        <h3 className="text-xl font-[Lora] text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
          {property.name}
        </h3>

        {property.location && (
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
            <FaMapMarkerAlt className="text-gray-500 w-4 h-4" />
            <span className="font-medium">{property.location}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-y-2 mb-4 text-sm font-medium">
          {property.bedrooms && (
            <div className="flex items-center gap-1 text-gray-800">
              <FaBed className="text-gray-600 w-4 h-4" />
              {property.bedrooms} Beds
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1 text-gray-800">
              <FaBath className="text-gray-600 w-4 h-4" />
              {property.bathrooms} Baths
            </div>
          )}
          {property.builtUpArea && (
            <div className="flex items-center gap-1 text-gray-800">
              <FaRulerCombined className="text-gray-600 w-4 h-4" />
              {property.builtUpArea}
            </div>
          )}
        </div>

        {property.features?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs mb-4 pt-3 border-t border-gray-100">
            {property.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-300 font-medium">
                {feat}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-300 font-medium">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Admin Buttons */}
        {isAdmin ? (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(property.docId)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(property.docId)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              to={`/property/${locationSlug}/${nameSlug}/${property.id}`}
              className="w-full text-center bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-xl">
              View Details
            </Link>

            <button className="w-full text-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm">
              Send Inquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
