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

/* ---------- Detail Row ---------- */
const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-none">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="font-semibold text-gray-900 text-sm sm:text-base">
      {value || "-"}
    </span>
  </div>
);

/* ---------- Bullet Section ---------- */
const BulletSection = ({ title, items, emptyText }) => (
  <div className="bg-white md:rounded-xl md:shadow-sm p-5 md:p-6">
    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{title}</h2>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <li key={idx} className="text-gray-700 text-sm sm:text-base">
            {item}
          </li>
        ))
      ) : (
        <li className="text-gray-500 italic">{emptyText}</li>
      )}
    </ul>
  </div>
);

/* ---------- Main Component ---------- */
const PlotDetails = ({ property }) => {
  const features = parseCommaList(property.features);
  const amenities = parseCommaList(property.amenities);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandParcel",
    name: property.name || `Plot in ${property.location}`,
    description:
      property.description || `Property available in ${property.location}`,
    image: property.images?.[0],
    url: window.location.href,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <Helmet>
        <title>
          {property.name || `Plot in ${property.location}`} | Arjun BuildTech
        </title>
        <meta
          name="description"
          content={
            property.description
              ? property.description.slice(0, 160)
              : `Best property deals in ${property.location}`
          }
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-20 py-6 space-y-6">
        {/* Images on Top */}
        <div className="bg-white shadow-sm overflow-hidden">
          {property.images?.length ? (
            <ImageGallery images={property.images} />
          ) : (
            <img
              src="https://via.placeholder.com/1200x500"
              alt="Property"
              className="w-full h-72 object-cover"
            />
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {property.transactionType && (
            <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold px-4 py-1.5">
              {property.transactionType}
            </span>
          )}
          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-4 py-1.5">
            {property.status || "Ready to Sell"}
          </span>
        </div>

        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left – Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white md:rounded-xl md:shadow-sm p-5 md:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                <span className="text-red-600">Plot</span>{" "}
                <span className="text-gray-900">Overview</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Detail label="Land Area" value={property.landArea} />
                  <Detail label="Price" value={property.price} />
                </div>
                <div>
                  <Detail label="Location" value={property.location} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white md:rounded-xl md:shadow-sm p-5 md:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                <span className="text-gray-900">Property Description</span>
              </h2>

              {property.description ? (
                property.description.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="text-gray-700 leading-relaxed mb-2 text-sm sm:text-base">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 italic">
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

          {/* Right – Enquiry */}
          <div className="hidden lg:block">
            <SendEnquiry property={property} />
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <MobileContactBar property={property} />
    </div>
  );
};

export default PlotDetails;
