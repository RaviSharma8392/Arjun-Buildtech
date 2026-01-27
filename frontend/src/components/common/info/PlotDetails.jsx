import React from "react";
import { Helmet } from "react-helmet-async";
import ImageGallery from "../gallery/ImageGallery";
import SendEnquiry from "../form/SendEnquiry";
import MobileContactBar from "../bars/InquiryBar";

/* ---------- Helpers ---------- */
const parseCommaList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

/* ---------- Reusable Section ---------- */
const BulletSection = ({ title, items, emptyText }) => (
  <div className="bg-white md:rounded-lg md:shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    <ul className="list-disc list-inside space-y-2">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <li key={idx} className="text-gray-800 font-medium">
            {item}
          </li>
        ))
      ) : (
        <li className="text-gray-600 italic">{emptyText}</li>
      )}
    </ul>
  </div>
);

/* ---------- Detail Row ---------- */
const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-semibold text-gray-900">{value || "-"}</span>
  </div>
);

/* ---------- Main Component ---------- */
const PlotDetails = ({ property }) => {
  const features = parseCommaList(property.features || []);
  const amenities = parseCommaList(property.amenities || []);

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandParcel", // could also use SingleFamilyResidence if house/floor
    name: property.name || "Plot in " + property.location,
    description:
      property.description || "Property for sale in " + property.location,
    image: property.images?.[0] || "https://via.placeholder.com/1200x400",
    url: window.location.href,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      price: property.price || "Contact for price",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: window.location.href,
    },
    seller: {
      "@type": "RealEstateAgent",
      name: "Arjun BuildTech",
      url: "https://arjunbuildtech.com",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>
          {property.name || `Plot in ${property.location}`} | Arjun BuildTech
        </title>
        <meta
          name="description"
          content={
            property.description
              ? property.description.slice(0, 160)
              : `Explore properties for sale in ${property.location}. Contact Arjun BuildTech, your trusted property consultant and dealer.`
          }
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="max-w-full mx-auto md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Desktop Enquiry */}
          <div className="hidden lg:block lg:col-span-1">
            <SendEnquiry property={property} />
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            {property.images?.length > 0 ? (
              <ImageGallery images={property.images} />
            ) : (
              <div className="bg-white md:rounded-lg md:shadow-md overflow-hidden">
                <img
                  src="https://via.placeholder.com/1200x400"
                  alt="Property"
                  className="w-full h-72 object-cover"
                />
              </div>
            )}

            {/* Overview */}
            <div className="bg-white md:rounded-lg md:shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">
                <span className="text-red-600">Plot</span>{" "}
                <span className="text-gray-900">Overview</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Detail label="Land Area" value={property.landArea} />
                  <Detail
                    label="Transaction Type"
                    value={property.transactionType}
                  />
                  <Detail label="Price" value={property.price} />
                </div>

                <div className="space-y-2">
                  <Detail label="Location" value={property.location} />
                  <Detail
                    label="Status"
                    value={property.status || "Ready to Sell"}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white md:rounded-lg md:shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">
                <span className="text-red-600">Plot</span>{" "}
                <span className="text-gray-900">Description</span>
              </h2>

              {property.description ? (
                property.description.split("\n").map((line, idx) => (
                  <p key={idx} className="text-gray-800 leading-relaxed mb-2">
                    {line.trim()}
                  </p>
                ))
              ) : (
                <p className="text-gray-600 italic">
                  No description available.
                </p>
              )}
            </div>

            {/* Features */}
            <BulletSection
              title="Key Features"
              items={features}
              emptyText="No features listed"
            />

            {/* Amenities */}
            <BulletSection
              title="Amenities"
              items={amenities}
              emptyText="No amenities listed"
            />
          </div>
        </div>
      </div>

      {/* Mobile Contact Bar */}
      <MobileContactBar property={property} />
    </div>
  );
};

export default PlotDetails;
