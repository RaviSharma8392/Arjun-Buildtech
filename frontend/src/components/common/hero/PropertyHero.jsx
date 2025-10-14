import React from "react";
import { FaMapMarkerAlt, FaShare, FaHeart } from "react-icons/fa";

const PropertyHero = ({ property, activeSection, onSectionChange }) => {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "location", label: "Location" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="relativ bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Property Info */}
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {property.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-red-600" />
                <span>{property.location}</span>
              </div>
              {property.price && (
                <div className="flex items-center gap-1 font-semibold text-red-600">
                  <span>₹</span>
                  <span className="text-lg">{property.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="p-3 text-gray-400 hover:text-red-600 transition-colors">
              <FaHeart className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-400 hover:text-red-600 transition-colors">
              <FaShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-8 min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`py-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHero;
