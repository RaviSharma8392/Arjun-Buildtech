import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCompass,
  FaHome,
  FaShieldAlt,
} from "react-icons/fa";
import propertiesData from "../data/properties.json";
import ShareButton from "../components/common/button/ShareButton";
import SendEnquiry from "../components/common/form/SendEnquiry";
import RelatedProperties from "../components/common/RelatedProperties";
import Breadcrumb from "../components/common/Breadcrumb";
import MobileContactBar from "../components/common/bars/InquiryBar";
import ImageGallery from "../components/common/gallery/ImageGallery";

const PropertyDetails = () => {
  const { id, location, name } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const selectedProperty = propertiesData.find((p) => p.id.toString() === id);
    if (selectedProperty) setProperty(selectedProperty);
  }, [id]);

  if (!property) return <p className="text-center mt-10">Property not found</p>;

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );

  const specifications = [
    { icon: FaBed, label: "Bedrooms", value: property.bedrooms },
    { icon: FaBath, label: "Bathrooms", value: property.bathrooms },
    { icon: FaCompass, label: "Facing", value: property.facing },
    { icon: FaHome, label: "Furnishing", value: property.furnishing },
    {
      icon: FaRulerCombined,
      label: "Built Up Area",
      value: property.builtUpArea,
    },
    {
      icon: FaShieldAlt,
      label: "Transaction Type",
      value: property.transactionType,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className=" mt-5 md:shadow-sm  ">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="md:text-xl  font-[Lora] text-gray-900">
              {property.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full border transition-all duration-200 ${
                isFavorite
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:text-red-500"
              }`}>
              <FaHeart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <ShareButton property={property} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images & Description */}
        <div className="lg:col-span-2 md:space-y-6">
          {/* Image Gallery */}
          <ImageGallery images={property.images} />

          {/* Property Description */}
          <div className="md:bg-white md:rounded-2xl md:shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Property Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Specifications */}
          {property.bedrooms && (
            <div className="md:bg-white md:rounded-2xl md:shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-blue-50 p-4 rounded-xl mb-2 inline-block">
                      <spec.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">
                        {spec.label}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="md:bg-white md:rounded-2xl md:shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <ul className="space-y-2">
              {property.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Enquiry Form */}
        <div id="inquiry" className="space-y-6">
          <SendEnquiry property={property} />
        </div>
      </div>

      {/* Related Properties */}
      <RelatedProperties />
      <MobileContactBar phone="08047019229" property={property} />
    </div>
  );
};

export default PropertyDetails;
