import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SendEnquiry from "../form/SendEnquiry";
import MobileContactBar from "../bars/InquiryBar";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaLayerGroup,
  FaChevronRight,
} from "react-icons/fa";

/* ---------- Helpers ---------- */
const parseCommaList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

const formatPrice = (price) => {
  if (!price) return "Price on Request";
  return `₹ ${price.toLocaleString("en-IN")}`;
};

/* ---------- Reusable Section ---------- */
const BulletSection = ({ title, items, icon: Icon }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
      <h2 className="text-xl font-normal text-gray-800 mb-4 flex items-center gap-2">
        {Icon && <Icon className="text-red-600" />} {title}
      </h2>
      <div className="w-12 h-1 bg-red-600 mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 bg-gray-50/50 p-3 rounded border border-gray-100">
            <FaCheckCircle
              className="text-green-600 mt-0.5 flex-shrink-0"
              size={15}
            />
            <span className="text-gray-700 font-medium text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Main Component ---------- */
const PlotDetails = ({ property }) => {
  const features = parseCommaList(property.features);
  const amenities = parseCommaList(property.amenities);
  const [activeImage, setActiveImage] = useState(0);

  const images =
    property.images?.length > 0
      ? property.images
      : ["https://via.placeholder.com/1200x600?text=No+Image+Available"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandParcel",
    name: property.name || `Plot in ${property.location}`,
    description:
      property.description || `Property available in ${property.location}`,
    image: images[0],
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
    <div className="min-h-screen bg-[#F9F9F9] pb-24 md:pb-12 font-sans selection:bg-red-100 selection:text-red-900">
      <Helmet>
        <title>
          {property.name || `Plot in ${property.location}`} | Arjun BuildTech
        </title>
        <meta
          name="description"
          content={
            property.description
              ? property.description.slice(0, 160)
              : `Explore plots for sale in ${property.location}.`
          }
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* --- Breadcrumb --- */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-xs text-gray-500 flex items-center gap-1.5">
          <span className="hover:text-red-600 cursor-pointer">Home</span>{" "}
          <ChevronRight size={12} className="text-gray-400" />
          <span className="hover:text-red-600 cursor-pointer">
            Properties
          </span>{" "}
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-semibold">
            {property.location}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* --- Top Title Section --- */}
        <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-green-50 text-green-700 border border-green-200 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1.5">
                <FaCheckCircle /> Verified Listing
              </span>
              <span className="bg-gray-100 text-gray-700 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                {property.status || "Ready to Move"}
              </span>
              {property.transactionType && (
                <span className="bg-red-50 text-red-600 border border-red-100 text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {property.transactionType}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-normal text-gray-800 leading-tight mb-2">
              {property.name}
            </h1>
            <p className="text-gray-500 flex items-center gap-2 text-sm md:text-base font-light">
              <FaMapMarkerAlt className="text-red-600" /> {property.location}
            </p>
          </div>
          <div className="text-left md:text-right bg-gray-50 p-4 rounded-lg border border-gray-100 w-full md:w-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
              {formatPrice(property.price)}
            </h2>
            {property.pricePerSqft && (
              <p className="text-gray-500 font-medium text-xs md:text-sm">
                ₹ {property.pricePerSqft.toLocaleString()} / sq.ft.
              </p>
            )}
          </div>
        </div>

        {/* --- Image Gallery --- */}
        <div className="w-full h-[320px] md:h-[520px] flex flex-col md:flex-row gap-2 bg-gray-900 mb-8 rounded-b-xl shadow-sm overflow-hidden p-2 border-x border-b border-gray-200 bg-white">
          {/* Main Large Image */}
          <div className="w-full md:w-2/3 h-full relative cursor-pointer group rounded-lg overflow-hidden bg-gray-100">
            <img
              src={images[activeImage]}
              alt="Main Property"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Thumbnails (Desktop Only) */}
          <div className="hidden md:flex w-1/3 flex-col gap-2 h-full">
            {images.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                className="w-full h-1/2 relative cursor-pointer group overflow-hidden rounded-lg bg-gray-100"
                onClick={() => setActiveImage(idx)}>
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 transition-all ${activeImage === idx ? "border-2 border-red-600 bg-transparent" : "bg-black/20 group-hover:bg-black/0"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Two Column Layout --- */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left Content Area */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Quick Specs Grid */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 flex flex-wrap justify-around items-center gap-6">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <FaRulerCombined className="text-red-600" /> Land Area
                </span>
                <span className="text-gray-900 font-extrabold text-lg">
                  {property.landArea || "-"}
                </span>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span className="text-gray-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <FaLayerGroup className="text-red-600" /> Property Type
                </span>
                <span className="text-gray-900 font-extrabold text-lg capitalize">
                  {property.type || "Plot"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-normal text-gray-800 mb-4">
                About Property
              </h2>
              <div className="w-12 h-1 bg-red-600 mb-6"></div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-[15px] font-light">
                {property.description ? (
                  property.description
                    .split("\n")
                    .map((line, idx) => <p key={idx}>{line.trim()}</p>)
                ) : (
                  <p className="italic text-gray-500">
                    A premium plot listed exclusively by Arjun Buildtech in
                    Rohtak.
                  </p>
                )}
              </div>
            </div>

            {/* Features & Amenities */}
            <BulletSection
              title="Key Features"
              items={features}
              icon={FaCheckCircle}
            />
            <BulletSection
              title="Amenities"
              items={amenities}
              icon={FaLayerGroup}
            />
          </div>

          {/* Right Sticky Sidebar (Enquiry Form) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 z-10">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-900 p-5 text-center relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                  <h3 className="text-white font-normal text-lg">
                    Interested in this property?
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 font-light">
                    Connect directly with our Rohtak experts
                  </p>
                </div>
                <div className="p-2">
                  <SendEnquiry property={property} />
                </div>
                <div className="p-5 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-red-600 shadow-sm shrink-0">
                    AB
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">
                      Arjun Buildtech
                    </p>
                    <p className="text-green-600 text-xs font-semibold flex items-center gap-1">
                      <FaCheckCircle /> Verified Local Consultant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Contact Bar */}
      <MobileContactBar property={property} />
    </div>
  );
};

export default PlotDetails;
