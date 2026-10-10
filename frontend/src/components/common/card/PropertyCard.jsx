import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { Pencil, Trash2, Phone } from "lucide-react";
import { createSlug } from "../../../utils/slugify";
import { normalizePropertyData } from "../../../utils/propertySchema";
import { getLocalizedField } from "../../../utils/localizedField";
import { useLanguage } from "../../../context/useLanguage";

const PropertyCard = ({
  property: propertyData,
  isAdmin = false,
  onEdit,
  onDelete,
  onContactAgent,
}) => {
  const { language, t } = useLanguage();
  const property = normalizePropertyData(propertyData);
  const locationText =
    typeof property?.location === "string"
      ? property.location
      : property?.location?.locality ||
        property?.location?.address ||
        property?.location?.city ||
        "Rohtak";
  const locationSlug = createSlug(locationText) || "location";
  const propertyName =
    getLocalizedField(property, "title", language) ||
    getLocalizedField(property, "name", language) ||
    t("card.property", "Property");
  const propertySlugSource =
    getLocalizedField(property, "title", "en") ||
    getLocalizedField(property, "name", "en") ||
    "property";
  const nameSlug = createSlug(propertySlugSource) || "property";
  const normalizedFeatures = Array.isArray(property?.features)
    ? property.features
    : typeof property?.features === "string"
      ? property.features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full group">
      {/* Property Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={propertyName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-xs">
            {t("card.noImage", "No Image Available")}
          </div>
        )}

        {/* Property Type Badge */}
        {property.type && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white px-2.5 py-0.5 rounded text-[10px] font-bold shadow-sm uppercase tracking-wider">
            {property.type === "house"
              ? t("card.houseVilla", "House/Villa")
              : property.type}
          </span>
        )}
        {property.cornerProperty && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm uppercase tracking-wider">
            {t("card.corner", "Corner")}
          </span>
        )}
        {property.reraNumber && (
          <span className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
            RERA ✓
          </span>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Price */}
          <div className="mb-1">
            {property.price ? (
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹ {property.price.toLocaleString("en-IN")}
              </div>
            ) : (
              <div className="text-lg font-bold text-gray-900">
                {t("card.priceOnRequest", "Price on Request")}
              </div>
            )}
          </div>
          {property.pricePerSqft && (
            <div className="text-xs text-gray-500 font-medium">
              ₹{property.pricePerSqft.toLocaleString("en-IN")}/
              {property.areaUnit || "sqft"}
            </div>
          )}

          {/* Name/Title */}
          <h3 className="text-base font-semibold text-gray-800 line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
            {propertyName}
          </h3>

          {/* Location */}
          {locationText && (
            <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm mb-3">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{locationText}</span>
            </div>
          )}

          {/* Specs Row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-xs sm:text-sm font-medium mb-3 border-y border-gray-100 py-2.5">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <FaBed className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {property.bedrooms} {t("card.beds", "Beds")}
                </span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <FaBath className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {property.bathrooms} {t("card.baths", "Baths")}
                </span>
              </div>
            )}
            {property.builtUpArea && (
              <div className="flex items-center gap-1">
                <FaRulerCombined className="w-3.5 h-3.5 text-gray-400" />
                <span>{property.builtUpArea} sqft</span>
              </div>
            )}
          </div>

          {/* Features */}
          {normalizedFeatures.length > 0 && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">
              {t("card.features", "Features:")}{" "}
              {normalizedFeatures.slice(0, 3).join(", ")}
              {normalizedFeatures.length > 3
                ? ` +${normalizedFeatures.length - 3} ${t("card.more", "more")}`
                : ""}
            </p>
          )}
        </div>

        {/* Action Buttons (Like 3rd Image) */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(property.docId)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Pencil size={14} /> {t("common.edit", "Edit")}
              </button>
              <button
                onClick={() => onDelete(property.docId)}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Trash2 size={14} /> {t("common.delete", "Delete")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onContactAgent) onContactAgent(property);
                }}
                className="flex-1 bg-white border border-[#d9534f] text-[#d9534f] hover:bg-red-50 py-1.5 rounded text-[13px] font-medium flex items-center justify-center transition-colors">
                {t("card.sendEnquiry", "Send Enquiry")}
              </button>
              <Link
                to={`/property/${locationSlug}/${nameSlug}/${property.id}`}
                className="flex-1 bg-[#d9534f] hover:bg-[#c9302c] text-white py-1.5 rounded text-[13px] font-medium flex items-center justify-center transition-colors">
                {t("card.viewDetails", "View Details")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
