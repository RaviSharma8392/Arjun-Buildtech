import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SendEnquiry from "../form/SendEnquiry";
import MobileContactBar from "../bars/InquiryBar";
import { FaCheckCircle, FaMapMarkerAlt, FaRulerCombined, FaRupeeSign, FaLayerGroup, FaChevronRight } from "react-icons/fa";

/* ---------- Helpers ---------- */
const parseCommaList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(",").map((v) => v.trim()).filter(Boolean);
};

const formatPrice = (price) => {
  if (!price) return "Price on Request";
  return `₹ ${price.toLocaleString("en-IN")}`;
};

/* ---------- Reusable Section ---------- */
const BulletSection = ({ title, items, icon: Icon }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        {Icon && <Icon className="text-red-500" />} {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={14} />
            <span className="text-gray-700 font-medium">{item}</span>
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

  const images = property.images?.length > 0 ? property.images : ["https://via.placeholder.com/1200x600?text=No+Image+Available"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandParcel",
    name: property.name || `Plot in ${property.location}`,
    description: property.description || `Property available in ${property.location}`,
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
    <div className="min-h-screen bg-gray-50/50 pb-20 md:pb-8 font-sans">
      <Helmet>
        <title>{property.name || `Plot in ${property.location}`} | Arjun BuildTech</title>
        <meta name="description" content={property.description ? property.description.slice(0, 160) : `Explore plots for sale in ${property.location}.`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* --- Breadcrumb --- */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
        <span>Home</span> <FaChevronRight size={10} />
        <span>Properties</span> <FaChevronRight size={10} />
        <span className="text-gray-900 font-medium">{property.location}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- Top Title Section --- */}
        <div className="bg-white rounded-t-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                <FaCheckCircle /> Verified Listing
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                {property.status || "Ready to Move"}
              </span>
              {property.transactionType && (
                <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border border-red-100">
                  {property.transactionType}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
              {property.name}
            </h1>
            <p className="text-gray-500 flex items-center gap-2 text-sm md:text-base">
              <FaMapMarkerAlt className="text-gray-400" /> {property.location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">
              {formatPrice(property.price)}
            </h2>
            {property.pricePerSqft && (
              <p className="text-gray-500 font-medium text-sm md:text-base">
                ₹ {property.pricePerSqft.toLocaleString()} / sq.ft.
              </p>
            )}
          </div>
        </div>

        {/* --- Edge-to-Edge Image Gallery --- */}
        <div className="w-full h-[300px] md:h-[500px] flex gap-2 overflow-hidden bg-gray-900 mb-6 rounded-b-2xl shadow-sm">
          {/* Main Large Image */}
          <div className="w-full md:w-2/3 h-full relative cursor-pointer group">
            <img 
              src={images[activeImage]} 
              alt="Main Property" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>
          {/* Thumbnails (Desktop Only) */}
          <div className="hidden md:flex w-1/3 flex-col gap-2 h-full">
            {images.slice(0, 2).map((img, idx) => (
              <div 
                key={idx} 
                className="w-full h-1/2 relative cursor-pointer group overflow-hidden"
                onClick={() => setActiveImage(idx)}
              >
                <img 
                  src={img} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-colors ${activeImage === idx ? 'bg-black/0 border-4 border-red-500' : 'bg-black/20 group-hover:bg-black/0'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* --- Two Column Layout (Content & Sticky Sidebar) --- */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Quick Specs Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-wrap justify-start gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs uppercase font-bold flex items-center gap-1"><FaRulerCombined/> Land Area</span>
                <span className="text-gray-900 font-bold text-lg">{property.landArea || "-"}</span>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs uppercase font-bold flex items-center gap-1"><FaLayerGroup/> Property Type</span>
                <span className="text-gray-900 font-bold text-lg capitalize">{property.type || "Plot"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Property</h2>
              <div className="text-gray-700 leading-relaxed space-y-4 text-[15px]">
                {property.description ? (
                  property.description.split("\n").map((line, idx) => (
                    <p key={idx}>{line.trim()}</p>
                  ))
                ) : (
                  <p className="italic text-gray-500">A premium plot listed by Arjun Buildtech.</p>
                )}
              </div>
            </div>

            {/* Features & Amenities */}
            <BulletSection title="Key Features" items={features} icon={FaCheckCircle} />
            <BulletSection title="Amenities" items={amenities} icon={FaLayerGroup} />

          </div>

          {/* Right Sticky Sidebar (Enquiry Form) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 z-10">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-red-600 p-4 text-center">
                  <h3 className="text-white font-bold text-lg">Interested in this plot?</h3>
                  <p className="text-red-100 text-sm">Contact agent directly</p>
                </div>
                <div className="p-1">
                  <SendEnquiry property={property} />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-red-600 shadow-sm">
                     AB
                   </div>
                   <div>
                     <p className="text-gray-900 font-bold text-sm">Arjun Buildtech</p>
                     <p className="text-green-600 text-xs font-semibold flex items-center gap-1"><FaCheckCircle/> RERA Registered</p>
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
