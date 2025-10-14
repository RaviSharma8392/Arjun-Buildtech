import React from "react";
import ImageGallery from "../gallery/ImageGallery";

const PlotDetails = ({ property }) => {
  return (
    <>
      {property.images && <ImageGallery images={property.images} />}

      <div className="md:bg-white md:rounded-2xl md:shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Plot Description
        </h2>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>

      <div className="md:bg-white md:rounded-2xl md:shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Plot Details</h2>
        <p>
          <strong>Land Area:</strong> {property.landArea}
        </p>
        <p>
          <strong>Transaction Type:</strong> {property.transactionType}
        </p>
      </div>

      <div className="md:bg-white md:rounded-2xl md:shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="space-y-2">
          {property.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlotDetails;
