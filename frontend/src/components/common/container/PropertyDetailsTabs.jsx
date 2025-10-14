import React from "react";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";

const PropertyDetailsTabs = ({ property, activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Property Type", value: property.propertyType },
                  { label: "Furnishing", value: property.furnishing },
                  { label: "Facing", value: property.facing },
                  {
                    label: "Transaction Type",
                    value: property.transactionType,
                  },
                  { label: "Age of Construction", value: property.age },
                ].map(
                  (item, index) =>
                    item.value && (
                      <div
                        key={index}
                        className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold text-gray-900">
                          {item.value}
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3">
                  <FaCheck className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "location":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Location
            </h3>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <FaMapMarkerAlt className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {property.location}
                  </p>
                  {property.landmark && (
                    <p className="text-gray-600 mt-1">
                      Near {property.landmark}
                    </p>
                  )}
                </div>
              </div>
              {/* Map placeholder */}
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Map view would be displayed here
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">{renderContent()}</div>
  );
};

export default PropertyDetailsTabs;
