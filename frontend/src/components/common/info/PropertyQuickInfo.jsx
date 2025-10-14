import React from "react";
import { FaBed, FaBath, FaRulerCombined, FaCar } from "react-icons/fa";

const PropertyQuickInfo = ({ property }) => {
  const quickStats = [
    { icon: FaBed, label: "Bedrooms", value: property.bedrooms },
    { icon: FaBath, label: "Bathrooms", value: property.bathrooms },
    { icon: FaRulerCombined, label: "Area", value: property.builtUpArea },
    { icon: FaCar, label: "Parking", value: property.parking },
  ].filter((stat) => stat.value);

  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyQuickInfo;
