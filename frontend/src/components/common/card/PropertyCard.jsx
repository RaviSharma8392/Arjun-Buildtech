import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import Button from "../button/Button";

const PropertyCard = ({ property }) => {
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
    <div className="group block bg-white rounded-xl shadow-lg  duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        {property.images?.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-in-out"
          />
        ) : (
          // **Text:** Light gray background with medium gray text.
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm font-medium">
              No Image Available
            </span>
          </div>
        )}

        {/* Type Badge */}
        {property.propertyType && (
          // **Badge:** White text on a near-black background for maximum contrast.
          <span className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {property.propertyType}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 md:p-5">
        {/* **Title:** High-contrast dark gray text. Hover uses a slightly lighter gray. */}
        <h3 className="text-xl font-[Lora] text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
          {property.name}
        </h3>

        {/* Location */}
        {property.location && (
          // **Location Text:** Medium gray for secondary information.
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
            {/* Keeping the map pin red is a common convention, but changing to a dark gray for pure monochrome */}
            <FaMapMarkerAlt className="text-gray-500 w-4 h-4" />
            <span className="font-medium">{property.location}</span>
          </div>
        )}

        {/* Property Info Icons */}
        <div className="grid grid-cols-3 gap-y-2 mb-4 text-sm font-medium">
          {property.bedrooms && (
            // **Icon Text & Icon:** Dark gray text and icons.
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

        {/* Price */}
        {/* **Price:** Bold, high-contrast text. */}
        {/* <div className="text-gray-900 font-[Playfair Display] md:text-2xl mb-4">
          {isCallForPrice
            ? "Call for Price"
            : `₹${property.price.toLocaleString()}`}
        </div> */}

        {/* Features */}
        {property.features?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs mb-4 pt-3 border-t border-gray-100">
            {property.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                // **Features:** Light gray background and border for subtle chips.
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            to={`/property/${locationSlug}/${nameSlug}/${property.id}`}
            // **Primary Button:** Solid Black background with White text (highest contrast).
            className="w-full text-center bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-xl">
            View Details
          </Link>
          <button
            // onClick={handleInquiry}
            // **Secondary Button:** White/Outline style (light gray border and text) to de-emphasize.
            className="w-full text-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm">
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
