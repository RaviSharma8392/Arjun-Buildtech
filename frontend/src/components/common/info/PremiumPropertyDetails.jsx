import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MobileContactBar from "../bars/InquiryBar";
import Breadcrumb from "../Breadcrumb";
import UserPropertyCard from "../card/UserPropertyCard";
import useSiteSettings from "../../../hooks/useSiteSettings";
import PostPropertyBanner from "../banner/PostPropertyBanner";
import {
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaShareAlt,
  FaBed,
  FaBath,
} from "react-icons/fa";
import { ChevronRight, Home, Building } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage";
import InlineEnquiryForm from "../form/InlineEnquiryForm";

const formatPrice = (price) => {
  if (!price) return "Price on Request";
  const n = Number(price);
  if (isNaN(n)) return "Price on Request";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} Lac`;
  return `₹ ${n.toLocaleString("en-IN")}`;
};

const formatPricePerSqft = (price, area) => {
  const p = Number(price);
  const a = parseFloat(area);
  if (!p || !a || isNaN(p) || isNaN(a) || a === 0) return null;
  return `₹${Math.floor(p / a).toLocaleString("en-IN")}/sqft`;
};

const parseCommaList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

const PremiumPropertyDetails = ({ property, similarProperties = [] }) => {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { settings } = useSiteSettings();
  const images =
    property.images?.length > 0 ? property.images : ["/placeholder.jpg"];
  const isPlot = property.type === "plot";

  const features = parseCommaList(property.features);
  const amenities = parseCommaList(property.amenities);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    {
      name: property.location,
      path: `/properties?location=${encodeURIComponent(property.location)}`,
    },
    { name: property.name },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* MagicBricks Style Header (Title & Price) */}
      <div className="bg-white rounded-t-xl border-t border-x border-gray-200 p-4 md:p-5 mb-0 border-b-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </h1>
            <span className="text-gray-500 text-sm hidden md:inline-block border-l border-gray-300 pl-4">
              {t(
                "detail.emi",
                "EMI - Calculate | Get Loan offers from 34+ banks",
              )}
            </span>
            {property.pricePerSqft && (
              <span className="text-sm font-medium text-gray-500 hidden md:inline-block border-l border-gray-300 pl-4">
                ₹{property.pricePerSqft.toLocaleString("en-IN")}/
                {property.areaUnit || "sqft"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold rounded mt-2 md:mt-0 tracking-widest uppercase">
              ID: #{property.id?.slice(-6).toUpperCase() || "10234"}
            </span>
            {property.reraNumber && (
              <span className="bg-green-50 text-green-700 px-3 py-1 text-xs font-semibold rounded mt-2 md:mt-0 border border-green-200 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> RERA:{" "}
                {property.reraNumber}
              </span>
            )}
          </div>
        </div>
        <h2 className="text-base md:text-lg text-gray-700 font-medium">
          {property.shortTitle || property.name}{" "}
          {property.location && `in ${property.location}`}
        </h2>
      </div>

      {/* Hero Section (Gallery + Quick Summary Grid) */}
      <div className="bg-white rounded-b-xl border border-gray-200 overflow-hidden mb-6 flex flex-col lg:flex-row">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-[45%] h-[300px] md:h-[400px] relative bg-gray-100 p-4 flex flex-col gap-2">
          <div className="w-full h-3/4 rounded-lg overflow-hidden relative cursor-pointer group">
            <img
              src={images[activeImage]}
              alt={`${property.name} for sale in ${property.location} - Premium Real Estate`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-white/90 text-gray-900 px-2.5 py-1 text-xs font-semibold rounded shadow-sm uppercase tracking-wide">
                {["rent", "lease"].includes(
                  String(property.transactionType || "").toLowerCase(),
                )
                  ? t("detail.forRent", "For Rent")
                  : t("detail.forSale", "For Sale")}
              </span>
            </div>
            {/* Fake Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-t-transparent border-b-transparent border-l-red-600 ml-1"></div>
              </div>
            </div>
          </div>
          <div className="flex h-1/4 gap-2 overflow-x-auto hidden-scrollbar">
            {images.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-1 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === idx ? "border-red-600 opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img
                  src={img}
                  alt={`${property.name} in ${property.location} - View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {images.length > 3 && (
              <div
                onClick={() => setActiveImage(3)}
                className="flex-1 rounded-lg overflow-hidden cursor-pointer bg-black relative">
                <img
                  src={images[3]}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  +{images.length - 3}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary Grid */}
        <div className="w-full lg:w-[55%] p-5 flex flex-col justify-between">
          <div>
            {/* Top Row Icons */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 pb-6 border-b border-gray-100 text-gray-700">
              {!isPlot && property.bedrooms && (
                <div className="flex items-center gap-2 font-medium">
                  <FaBed className="text-gray-400 text-lg" />{" "}
                  {property.bedrooms} {t("detail.beds", "Beds")}
                </div>
              )}
              {!isPlot && property.bathrooms && (
                <div className="flex items-center gap-2 font-medium">
                  <FaBath className="text-gray-400 text-lg" />{" "}
                  {property.bathrooms} {t("detail.baths", "Baths")}
                </div>
              )}
              {!isPlot && property.balconies && (
                <div className="flex items-center gap-2 font-medium">
                  <Home className="text-gray-400 w-5 h-5" />{" "}
                  {property.balconies} {t("detail.balconies", "Balconies")}
                </div>
              )}
              {!isPlot && property.parking && (
                <div className="flex items-center gap-2 font-medium">
                  <Building className="text-gray-400 w-5 h-5" />{" "}
                  {property.parking}
                </div>
              )}
              {property.cornerProperty && (
                <div className="flex items-center gap-2 font-medium text-amber-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v18h14V3H5z"
                    />
                  </svg>
                  {t("detail.cornerPlot", "Corner Plot")}
                </div>
              )}
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5">
              {(property.area || property.builtUpArea || property.landArea) && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {isPlot
                      ? t("detail.plotArea", "Plot Area")
                      : t("detail.superArea", "Super Area")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.area || property.builtUpArea || property.landArea}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {property.areaUnit || "Sq.Ft."}
                    </span>
                  </span>
                </div>
              )}
              {!isPlot && (property.floor || property.totalFloor) && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.floor", "Floor")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.floor || property.totalFloor}
                  </span>
                </div>
              )}
              {property.transactionType && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.transactionType", "Transaction Type")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.transactionType}
                  </span>
                </div>
              )}
              {property.status && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.status", "Status")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.status}
                  </span>
                </div>
              )}
              {!isPlot && property.additionalRooms && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.additionalRooms", "Additional Rooms")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.additionalRooms}
                  </span>
                </div>
              )}
              {property.facing && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.facing", "Facing")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.facing}
                  </span>
                </div>
              )}
              {!isPlot && property.lift && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.lift", "Lift")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.lift}
                  </span>
                </div>
              )}
              {!isPlot && property.furnishing && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.furnished", "Furnished Status")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.furnishing}
                  </span>
                </div>
              )}
              {!isPlot && property.parking && (
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    {t("detail.carParking", "Car Parking")}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {property.parking}
                  </span>
                </div>
              )}
            </div>

            {/* Landmarks Bottom Row */}
            <div className="pt-4 border-t border-gray-100 flex items-start gap-2 text-gray-600 text-sm">
              <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>{property.landmarks || property.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4 justify-between border-t border-gray-100 pt-6">
            <div className="flex gap-3">
              <a
                href={`tel:${settings.phoneRaw}`}
                className="bg-red-600 text-white px-6 py-2.5 rounded shadow-sm font-semibold hover:bg-red-700 transition flex items-center gap-2">
                <FaPhoneAlt /> Call {settings.companyName}
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: property.name,
                      text: `Check out this property: ${property.name} in ${property.location}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded font-semibold flex items-center gap-2 hover:bg-gray-50 transition">
                <FaShareAlt /> Share
              </button>
            </div>
            <span className="text-gray-400 text-sm">
              Verified by {settings.companyName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Left Column (Details) */}
        <div className="flex-1 space-y-6">
          {/* More Details Grid */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("detail.moreDetails", "More Details")}
            </h2>
            <div className="grid grid-cols-1 gap-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                <div className="text-gray-500 font-medium text-sm">
                  {t("detail.priceBreakup", "Price Breakup")}
                </div>
                <div className="text-gray-900 font-bold text-sm">
                  {formatPrice(property.price)}
                </div>
              </div>
              {property.bookingAmount && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.bookingAmount", "Booking Amount")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.bookingAmount}
                  </div>
                </div>
              )}
              {property.carpetArea && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.carpetArea", "Carpet Area")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.carpetArea} {property.areaUnit || "Sq.Ft."}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                <div className="text-gray-500 font-medium text-sm">
                  {t("detail.address", "Address")}
                </div>
                <div className="text-gray-900 font-bold text-sm">
                  {property.location}
                </div>
              </div>
              {property.landmarks && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.landmarks", "Landmarks")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.landmarks}
                  </div>
                </div>
              )}
              {!isPlot && property.furnishing && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.furnishing", "Furnishing")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.furnishing}
                  </div>
                </div>
              )}
              {!isPlot && property.flooring && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.flooring", "Flooring")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.flooring}
                  </div>
                </div>
              )}
              {!isPlot && property.propertyAge && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.propertyAge", "Property Age")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.propertyAge}
                  </div>
                </div>
              )}
              {property.constructionStatus && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.construction", "Construction Status")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.constructionStatus}
                  </div>
                </div>
              )}
              {property.priceNegotiable && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.priceTerms", "Price Terms")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {t("detail.negotiable", "Negotiable")}
                  </div>
                </div>
              )}
              {!isPlot && Number(property.parkingOpen) > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.openParking", "Open Parking")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.parkingOpen} {t("detail.spaces", "spaces")}
                  </div>
                </div>
              )}
              {property.ownershipType && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.ownership", "Type of Ownership")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.ownershipType}
                  </div>
                </div>
              )}
              {property.societyName && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.project", "Society / Project")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.societyName}
                  </div>
                </div>
              )}
              {property.reraNumber && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.rera", "RERA Number")}
                  </div>
                  <div className="text-green-700 font-bold text-sm flex items-center gap-1.5">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    {property.reraNumber}
                  </div>
                </div>
              )}
              {property.waterSupply && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.water", "Water Supply")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.waterSupply}
                  </div>
                </div>
              )}
              {property.powerBackup && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.power", "Power Backup")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.powerBackup}
                  </div>
                </div>
              )}
              {property.gasConnection && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.gas", "Gas Connection")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.gasConnection}
                  </div>
                </div>
              )}
              {property.gatedCommunity && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.gated", "Gated Community")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.gatedCommunity}
                  </div>
                </div>
              )}
              {property.approvalAuthority && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.approval", "Approval Authority")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.approvalAuthority}
                  </div>
                </div>
              )}
              {property.cornerProperty && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.cornerProperty", "Corner Property")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {t("detail.yes", "Yes")}
                  </div>
                </div>
              )}
              {property.roadWidth && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.roadWidth", "Road Width")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.roadWidth} {property.roadWidthUnit || "ft"}
                  </div>
                </div>
              )}
              {property.plotDimensions && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.dimensions", "Plot Dimensions")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.plotDimensions}
                  </div>
                </div>
              )}
              {property.boundaryWall && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.boundaryWall", "Boundary Wall")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.boundaryWall}
                  </div>
                </div>
              )}
              {property.maintenanceCharges && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.maintenance", "Maintenance Charges")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    ₹{property.maintenanceCharges}/month
                  </div>
                </div>
              )}
              {property.possessionDate && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.possession", "Possession Date")}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    {property.possessionDate}
                  </div>
                </div>
              )}
              {property.pricePerSqft && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <div className="text-gray-500 font-medium text-sm">
                    {t("detail.pricePer", "Price per {unit}", {
                      unit: property.areaUnit || "Sq.Ft.",
                    })}
                  </div>
                  <div className="text-gray-900 font-bold text-sm">
                    ₹{property.pricePerSqft.toLocaleString("en-IN")}
                  </div>
                </div>
              )}
            </div>

            {showAllDetails && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                {property.propertyType && (
                  <div>
                    <div className="text-gray-500 text-[13px] mb-1">
                      {t("detail.propertyType", "Property Type")}
                    </div>
                    <div className="text-gray-900 font-semibold text-sm capitalize">
                      {property.propertyType}
                    </div>
                  </div>
                )}
                {property.furnishing && (
                  <div>
                    <div className="text-gray-500 text-[13px] mb-1">
                      {t("detail.furnishing", "Furnishing")}
                    </div>
                    <div className="text-gray-900 font-semibold text-sm capitalize">
                      {property.furnishing}
                    </div>
                  </div>
                )}
                {property.facing && (
                  <div>
                    <div className="text-gray-500 text-[13px] mb-1">
                      {t("detail.facing", "Facing")}
                    </div>
                    <div className="text-gray-900 font-semibold text-sm capitalize">
                      {property.facing}
                    </div>
                  </div>
                )}
                {property.ownership && (
                  <div>
                    <div className="text-gray-500 text-[13px] mb-1">
                      {t("detail.ownership", "Ownership")}
                    </div>
                    <div className="text-gray-900 font-semibold text-sm capitalize">
                      {property.ownership}
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div>
                    <div className="text-gray-500 text-[13px] mb-1">
                      {t("detail.bathrooms", "Bathrooms")}
                    </div>
                    <div className="text-gray-900 font-semibold text-sm">
                      {property.bathrooms}
                    </div>
                  </div>
                )}
                {property.balcony && (
                  <div>
                    <div className="text-gray-500 text-[13px] mb-1">
                      {t("detail.balconies", "Balconies")}
                    </div>
                    <div className="text-gray-900 font-semibold text-sm">
                      {property.balcony}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 mb-6">
              <button 
                onClick={() => setShowAllDetails(!showAllDetails)}
                className="text-[#d92228] font-bold text-sm underline hover:no-underline flex items-center gap-1">
                {showAllDetails ? t("detail.hideAll", "Hide details") : t("detail.viewAll", "View all details")}{" "}
                <ChevronRight className={`w-4 h-4 transition-transform ${showAllDetails ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>

            <div className="text-gray-500 leading-relaxed text-[15px]">
              <strong className="text-gray-900 font-bold">
                {t("detail.description", "Description:")}{" "}
              </strong>
              {property.description ? (
                <>
                  {!showFullDesc && property.description.length > 200
                    ? property.description.substring(0, 200) + "... "
                    : property.description + " "}
                  {property.description.length > 200 && (
                    <button 
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="text-gray-900 font-bold underline hover:text-[#d92228] ml-1">
                      {showFullDesc ? t("detail.readLess", "Read less") : t("detail.readMore", "Read more")}
                    </button>
                  )}
                </>
              ) : (
                t(
                  "detail.defaultDescription",
                  "A premium property available for you.",
                )
              )}
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 opacity-50"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <Home className="text-red-600 w-6 h-6" />{" "}
                {t("detail.highlights", "Property Highlights")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <Building className="text-red-600 w-6 h-6" />{" "}
                {t("detail.amenities", "Lifestyle Amenities")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (Sticky Inquiry Form) */}
        <div className="w-full lg:w-[380px]">
          <div className="sticky top-24 space-y-6">
            <InlineEnquiryForm property={property} />
          </div>
        </div>
      </div>

      {/* Post Property Banner */}
      <div className="mt-8">
        <PostPropertyBanner />
      </div>

      {/* Properties in Similar Projects */}
      {similarProperties.length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 md:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            {t("detail.similarProjects", "Properties in Similar Projects")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProperties.map((simProp) => (
              <div key={simProp.id} className="w-full">
                <UserPropertyCard property={simProp} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Trends */}
      {(() => {
        const pricePerSqft = formatPricePerSqft(
          property.price,
          property.area || property.builtUpArea || property.landArea,
        );
        if (!pricePerSqft) return null;
        const nearbyRate = (() => {
          const p = Number(property.price);
          const a = parseFloat(
            property.area || property.builtUpArea || property.landArea,
          );
          if (!p || !a || isNaN(p) || isNaN(a)) return null;
          return `₹${Math.floor((p * 1.1) / a).toLocaleString("en-IN")}/sqft`;
        })();
        return (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 md:p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("detail.priceTrends", "Price Trends in {location}", {
                location: property.location.split(",")[0],
              })}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {t(
                "detail.comparableRate",
                "Comparable rate analysis for this area",
              )}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 font-semibold text-gray-700 text-sm w-1/3">
                      {t("detail.projectName", "Project Name")}
                    </th>
                    <th className="py-3 font-semibold text-gray-700 text-sm w-1/3">
                      {t("detail.avgRate", "Avg Rate per sqft")}
                    </th>
                    <th className="py-3 font-semibold text-gray-700 text-sm w-1/3">
                      {t("detail.rentalYield", "Rental Yield")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-4 text-gray-800 text-sm font-medium">
                      {property.name || "Current Project"}
                    </td>
                    <td className="py-4 text-gray-600 text-sm">
                      {pricePerSqft}
                    </td>
                    <td className="py-4 text-gray-600 text-sm">4.2%</td>
                  </tr>
                  {nearbyRate && (
                    <tr className="border-b border-gray-50">
                      <td className="py-4 text-gray-800 text-sm font-medium">
                        {t("detail.nearbyResidential", "Nearby Residential")}
                      </td>
                      <td className="py-4 text-gray-600 text-sm">
                        {nearbyRate}
                      </td>
                      <td className="py-4 text-gray-600 text-sm">4.5%</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* Closer to Your Search */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 md:p-6 mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          {t("detail.closerSearch", "Closer to Your Search")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t("detail.similarSearches", "Similar Searches")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={`/properties?search=${encodeURIComponent(property.location.split(",")[0])}&type=Buy`}
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.flatsIn", "Flats in {location}", {
                    location: property.location.split(",")[0],
                  })}
                </Link>
              </li>
              <li>
                <Link
                  to={`/properties?search=${encodeURIComponent(property.location.split(",")[0])}&type=Buy`}
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.houseSaleIn", "House for Sale in {location}", {
                    location: property.location.split(",")[0],
                  })}
                </Link>
              </li>
              <li>
                <Link
                  to={`/properties?search=${encodeURIComponent(property.location.split(",")[0])}&type=Buy`}
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.plotsIn", "Plots in {location}", {
                    location: property.location.split(",")[0],
                  })}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t("detail.propertyIn", "Property in {location}", {
                location: property.location.split(",")[0],
              })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={`/properties?search=${encodeURIComponent(property.location.split(",")[0])}`}
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.newProjectsIn", "New Projects in {location}", {
                    location: property.location.split(",")[0],
                  })}
                </Link>
              </li>
              <li>
                <Link
                  to={`/properties?search=${encodeURIComponent(property.location.split(",")[0])}`}
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.readyMoveIn", "Ready to Move in {location}", {
                    location: property.location.split(",")[0],
                  })}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t("detail.propertyRohtak", "Property in Rohtak")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/properties?search=Rohtak&type=Buy"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.flatsRohtak", "Flats in Rohtak")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?search=Rohtak&type=Buy"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.houseRohtak", "House for Sale in Rohtak")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?search=Rohtak&type=Buy"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.villaRohtak", "Villa in Rohtak")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?search=Rohtak"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t(
                    "detail.readyFlatsRohtak",
                    "Ready to Move Flats in Rohtak",
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?search=Rohtak"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  {t("detail.resaleFlatsRohtak", "Resale Flats in Rohtak")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t("detail.nearbyProjects", "Nearby Projects")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/properties?search=Srs"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  Srs Signature Farms
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?search=Silicon"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  Silicon Valley
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?search=City"
                  className="text-gray-500 hover:text-red-600 text-sm transition">
                  City Plaza
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">
            {t("detail.disclaimer", "Disclaimer:")}
          </strong>{" "}
          {t(
            "detail.disclaimerCopy",
            "Arjun Buildtech has endeavoured to ascertain the requirement of RERA registration. However, the advertiser claims that there is no requirement for such registration. Users are cautioned accordingly...",
          )}{" "}
          <Link
            to="/terms-of-service"
            className="text-gray-900 font-semibold underline">
            {t("detail.readMore", "Read more")}
          </Link>
        </div>
      </div>

      <MobileContactBar property={property} />
    </>
  );
};

export default PremiumPropertyDetails;
