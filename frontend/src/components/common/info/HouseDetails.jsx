import React from "react";
import ImageGallery from "../gallery/ImageGallery";
import SendEnquiry from "../form/SendEnquiry";
import MobileContactBar from "../bars/InquiryBar";

const HouseDetails = ({ property }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inquiry Form (Visible on desktop) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-8">
              <SendEnquiry property={property} />
            </div>
          </div>

          {/* Right Column - Property Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {property.images && property.images.length > 0 ? (
              <ImageGallery images={property.images} />
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/1200x400"
                  alt={property.name || "Property"}
                  className="w-full h-72 object-cover"
                />
              </div>
            )}

            {/* Property Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">
                <span className="text-red-600">Property</span>{" "}
                <span className="text-gray-900">Overview</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Detail label="Bedrooms" value={property.bedrooms} />
                  <Detail label="Bathrooms" value={property.bathrooms} />
                  <Detail label="Price" value={`₹${property.price || "-"}`} />
                </div>

                <div className="space-y-3">
                  <Detail label="Location" value={property.location} />
                  <Detail
                    label="Status"
                    value={property.status || "Ready to Move"}
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">
                <span className="text-red-600">Property</span>{" "}
                <span className="text-gray-900">Description</span>
              </h2>
              <div className="space-y-3">
                {property.description ? (
                  property.description.split("\n").map((line, idx) => (
                    <p key={idx} className="text-gray-800 leading-relaxed">
                      {line.trim()}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600 italic">
                    No description available.
                  </p>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {property.features && property.features.length > 0 ? (
                  property.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-800 font-medium">
                      {feature}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-800 font-medium">
                    No features listed
                  </li>
                )}
              </ul>
            </div>

            {/* Additional Details
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                <span className="text-red-600">Additional</span>{" "}
                <span className="text-gray-900">Details</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Detail label="Property Type" value={property.type} />
                <Detail label="Furnishing" value={property.furnishing} />
                <Detail label="Facing" value={property.facing} />
                <Detail
                  label="Transaction Type"
                  value={property.transactionType}
                />
                <Detail label="Built Up Area" value={property.builtUpArea} />
                <Detail label="Age of Construction" value={property.age} />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile Contact Bar */}
      <MobileContactBar property={property} />
    </div>
  );
};

// Helper component for each detail item
const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-semibold text-gray-900">{value || "-"}</span>
  </div>
);

export default HouseDetails;
