import React from "react";
import { Link } from "react-router-dom";
import { Heart, Image as ImageIcon, Phone } from "lucide-react";
import { createSlug } from "../../../utils/slugify";
import { normalizePropertyData } from "../../../utils/propertySchema";
import { getLocalizedField } from "../../../utils/localizedField";
import { useLanguage } from "../../../context/useLanguage";

const HorizontalPropertyCard = ({ property: propertyData, onContactAgent }) => {
  const { language, t } = useLanguage();
  const property = normalizePropertyData(propertyData);
  
  const locationText = typeof property?.location === "string" ? property.location : property?.location?.locality || property?.location?.city || "Rohtak";
  const locationSlug = createSlug(locationText) || "location";
  
  const propertyName = getLocalizedField(property, "title", language) || getLocalizedField(property, "name", language) || t("card.property", "Property");
  const nameSlug = createSlug(getLocalizedField(property, "title", "en") || getLocalizedField(property, "name", "en") || "property") || "property";
  
  const normalizedFeatures = Array.isArray(property?.features)
    ? property.features
    : typeof property?.features === "string"
      ? property.features.split(",").map((feature) => feature.trim()).filter(Boolean)
      : [];

  const propertyLink = `/property/${locationSlug}/${nameSlug}/${property.id}`;

  const formatPrice = (price) => {
    if (!price) return t("common.contactForPrice", "Price on Request");
    const numPrice = Number(price);
    if (numPrice >= 10000000) return `₹ ${(numPrice / 10000000).toFixed(2)} Cr.`;
    if (numPrice >= 100000) return `₹ ${(numPrice / 100000).toFixed(2)} Lac`;
    return `₹ ${numPrice.toLocaleString()}`;
  };

  // Mock post date for UI
  const postedDate = property.createdAt 
    ? new Date(property.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : "Recently";

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col w-full mb-4">
      {/* Top Section: Image & Details */}
      <div className="flex flex-col md:flex-row">
        
        {/* Left: Image Block */}
        <Link to={propertyLink} className="relative w-full md:w-[35%] h-56 md:h-auto min-h-[220px] bg-gray-100 flex-shrink-0 block group">
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

          {/* Overlays */}
          <div className="absolute top-3 left-3 bg-black/50 p-1.5 rounded-full text-white hover:bg-red-500 cursor-pointer transition-colors z-10">
            <Heart size={16} />
          </div>
          
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 z-10">
            {property.images?.length || 1} <ImageIcon size={12} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[11px] font-medium z-10">
            Posted on : {postedDate}
          </div>
        </Link>

        {/* Right: Details Block */}
        <div className="p-4 flex flex-col flex-grow w-full md:w-[65%]">
          <div className="text-gray-500 text-xs font-medium mb-1 truncate">
            {property.projectName || "Arjun Buildtech Assured"}
          </div>
          <Link to={propertyLink} className="hover:text-red-600 transition-colors">
            <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-4">
              {propertyName}
            </h3>
          </Link>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Price</div>
              <div className="font-bold text-gray-900 text-[15px]">{formatPrice(property.price)}</div>
            </div>
            
            {(property.builtUpArea || property.landArea || property.area) && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Area</div>
                <div className="font-semibold text-gray-800 text-[13px]">
                  {property.builtUpArea || property.landArea || property.area} {property.areaUnit || 'sq.ft'}
                </div>
              </div>
            )}
            
            {property.propertyType && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Type</div>
                <div className="font-semibold text-gray-800 text-[13px] capitalize">{property.propertyType}</div>
              </div>
            )}

            {property.bedrooms && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Bedrooms</div>
                <div className="font-semibold text-gray-800 text-[13px]">{property.bedrooms}</div>
              </div>
            )}

            {property.furnishing && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Furnishing</div>
                <div className="font-semibold text-gray-800 text-[13px] capitalize">{property.furnishing}</div>
              </div>
            )}

            {property.facing && (
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Facing</div>
                <div className="font-semibold text-gray-800 text-[13px] capitalize">{property.facing}</div>
              </div>
            )}
          </div>

          <p className="text-[13px] text-gray-600 line-clamp-1 mb-3">
            {property.description || "Beautiful property located in a prime area with all basic amenities."} 
            <Link to={propertyLink} className="text-blue-600 hover:underline">..more</Link>
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {normalizedFeatures.slice(0, 4).map((feature, i) => (
              <span key={i} className="bg-gray-100 border border-gray-200 text-gray-600 text-[11px] px-2 py-0.5 rounded-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-gray-50 border-t border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-0.5 overflow-hidden">
             <img src="/arjunBuildTechLogo.png" alt="Arjun Buildtech" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Arjun Buildtech</div>
            <div className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-600 rounded-full inline-block"></span> Agent
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onContactAgent) onContactAgent(property);
            }}
            className="bg-white border border-[#d9534f] text-[#d9534f] hover:bg-red-50 px-4 py-1.5 rounded text-[13px] font-medium flex items-center justify-center transition-colors">
            {t("card.sendEnquiry", "Send Enquiry")}
          </button>
          <Link
            to={propertyLink}
            className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-4 py-1.5 rounded text-[13px] font-medium flex items-center justify-center transition-colors">
            {t("card.viewDetails", "View Details")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPropertyCard;
