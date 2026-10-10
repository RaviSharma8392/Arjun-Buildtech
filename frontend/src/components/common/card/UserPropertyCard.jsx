import React from "react";
import { Building, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { normalizePropertyData } from "../../../utils/propertySchema";
import { getLocalizedField } from "../../../utils/localizedField";
import { useLanguage } from "../../../context/useLanguage";

const UserPropertyCard = ({ property: propertyData, onContactAgent }) => {
  const { language, t } = useLanguage();
  const property = normalizePropertyData(propertyData);
  const propertyName =
    getLocalizedField(property, "name", language) ||
    getLocalizedField(property, "title", language) ||
    t("card.premiumProperty", "Premium Property");
  const propertySlugSource =
    getLocalizedField(property, "name", "en") ||
    getLocalizedField(property, "title", "en") ||
    "property";
  const propertyLink = `/property/${property.location?.toLowerCase().replace(/\s+/g, "-") || "rohtak"}/${propertySlugSource.toLowerCase().replace(/\s+/g, "-")}/${property.id}`;

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: propertyName,
        text: `${t("card.sharePrompt", "Check out this property:")} ${propertyName} ${t("common.in", "in")} ${property.location}`,
        url: window.location.origin + propertyLink,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + propertyLink);
      alert(t("card.copied", "Link copied to clipboard!"));
    }
  };

  const formatPrice = (price) => {
    if (!price) return t("common.contactForPrice", "Contact for Price");
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
            alt={propertyName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 font-medium group-hover:scale-105 transition-transform duration-300">
            <Building className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-sm">
              {t("card.noImage", "No Image Available")}
            </span>
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="flex flex-col flex-1 p-5 border-t border-gray-100">
        <div className="text-gray-500 text-[13px] mb-1.5 uppercase tracking-wider font-medium">
          {property.propertyType === "plot"
            ? t("card.plot", "Plot")
            : property.bedrooms
              ? `${property.bedrooms} BHK ${property.propertyType || "House"}`
              : property.propertyType || t("card.property", "Property")}
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
                ₹{property.pricePerSqft.toLocaleString("en-IN")}/
                {property.areaUnit || "sqft"}
              </span>
            </>
          )}
        </div>

        <Link
          to={propertyLink}
          className="hover:text-red-600 transition-colors inline-block mb-1">
          <h2 className="text-base font-bold text-gray-900 line-clamp-1">
            {propertyName}
          </h2>
        </Link>

        {property.location && (
          <p className="text-gray-500 text-sm line-clamp-1 mb-4">
            {property.location}
          </p>
        )}

        {/* Footer Actions */}
        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onContactAgent) onContactAgent(property);
            }}
            className="flex-1 text-center py-2 bg-white border border-[#d9534f] text-[#d9534f] text-sm font-semibold rounded hover:bg-red-50 transition-colors">
            {t("card.sendEnquiry", "Send Enquiry")}
          </button>
          <Link
            to={propertyLink}
            className="flex-1 text-center py-2 bg-[#d9534f] text-white text-sm font-semibold rounded hover:bg-[#c9302c] transition-colors">
            {t("card.viewDetails", "View Details")}
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            title={t("card.share", "Share")}>
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPropertyCard;
