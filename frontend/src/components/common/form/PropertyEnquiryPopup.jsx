import React, { useState, useEffect } from "react";
import { X, CheckCircle, Phone, MapPin } from "lucide-react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLanguage } from "../../../context/useLanguage";
import { getLocalizedField } from "../../../utils/localizedField";

const PropertyEnquiryPopup = ({ isOpen, onClose, property }) => {
  const { language, t } = useLanguage();
  
  // Setup default description based on property
  const propertyName = property ? (
    getLocalizedField(property, "title", language) ||
    getLocalizedField(property, "name", language) ||
    "Property"
  ) : "";
  
  const locationText = property ? (
    typeof property.location === "string"
      ? property.location
      : property.location?.locality || property.location?.city || ""
  ) : "";

  const defaultDescription = propertyName 
    ? `Looking to purchase/inquire about ${propertyName}${locationText ? ` in ${locationText}` : ''}`
    : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: defaultDescription,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update description if property changes
  useEffect(() => {
    if (isOpen && property) {
      setFormData(prev => ({ ...prev, description: defaultDescription }));
    }
  }, [isOpen, property, defaultDescription]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.description,
        propertyId: property?.id || property?.docId || null,
        propertyName: propertyName,
        location: "Property Enquiry Popup",
        status: "new",
        read: false,
        source: "property_enquiry",
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error saving inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitting(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        description: defaultDescription,
      });
    }, 300);
  };

  if (!isOpen || !property) return null;

  return (
    <>
      <style>{`
        @keyframes popupFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popupSlide { 
          from { opacity: 0; transform: translateY(20px) scale(0.98); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        .animate-fade { animation: popupFade 0.2s ease forwards; }
        .animate-slide { animation: popupSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade p-0 sm:p-4"
        onClick={handleClose}>
        
        {/* Container */}
        <div className="relative w-full h-full sm:h-auto sm:max-w-[850px] bg-white sm:rounded-lg shadow-2xl animate-slide overflow-hidden flex flex-col md:flex-row"
             onClick={(e) => e.stopPropagation()}>
          
          {/* Close Button - Desktop (Outside left/right on some designs, but top right here) */}
          <button 
            className="absolute top-3 right-3 sm:-right-10 sm:-top-10 text-gray-500 sm:text-white hover:text-gray-800 sm:hover:text-gray-300 transition-colors z-[1001] bg-white sm:bg-transparent rounded-full p-1"
            onClick={handleClose}
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>

          {/* Left Side: Property Details (Hidden on very small screens, or modified) */}
          <div className="hidden md:block w-1/2 bg-gray-50 p-6 border-r border-gray-200">
             <div className="relative h-48 mb-4 rounded overflow-hidden shadow-sm">
                <img 
                  src={property.images?.[0] || "/placeholder-property.jpg"} 
                  alt={propertyName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                   ID: {property.id?.substring(0, 8).toUpperCase() || "N/A"}
                </div>
             </div>
             
             <h3 className="text-[#d9534f] text-lg font-bold leading-snug mb-2">
                {propertyName}
             </h3>
             
             {locationText && (
               <div className="flex items-start gap-1.5 text-gray-700 font-semibold text-sm mb-4">
                 <MapPin className="w-4 h-4 mt-0.5 text-gray-800" />
                 <span>{locationText}</span>
               </div>
             )}

             <div className="space-y-1.5 text-sm text-gray-600 mb-4">
               {property.builtUpArea && (
                 <div>Area : <span className="font-medium text-gray-800">{property.builtUpArea} {property.areaUnit || 'Sq.Ft.'}</span></div>
               )}
               {property.type && (
                 <div>Property Type : <span className="font-medium text-gray-800 capitalize">{property.type}</span></div>
               )}
             </div>

             <div className="text-2xl font-bold text-gray-900 mt-2">
                {property.price ? `₹ ${property.price.toLocaleString("en-IN")}` : "Price on Request"}
             </div>
          </div>

          {/* Right Side / Mobile Full: Form */}
          <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
            
            {/* Desktop Header */}
            <div className="hidden md:block bg-[#d9534f] text-white text-center py-3 px-4 font-semibold text-lg relative">
               {t("enquiry.fillForm", "Fill Enquiry Form Below")}
               <button onClick={handleClose} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100">
                 <X size={20} />
               </button>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden pt-8 px-6 pb-2 border-b border-gray-100">
               <h2 className="text-xl font-bold text-gray-800 mb-1">
                 {t("enquiry.sendForThis", "Send an enquiry for this property?")}
               </h2>
               <p className="text-sm text-gray-500 mb-4">
                 Contact Person : <span className="font-medium text-gray-700">Parveen Gehlawat</span>
               </p>
               
               <div className="flex items-center gap-3 border border-gray-200 rounded p-3 mb-2 shadow-sm">
                 <Phone className="w-5 h-5 text-gray-600" />
                 <span className="text-[#d9534f] font-semibold text-lg">+91 93504 47531</span>
               </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {submitted ? (
                <div className="py-12 text-center h-full flex flex-col justify-center">
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#00875A]" />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-1">
                    {t("inquiryPopup.received", "Request Received")}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {t("inquiryPopup.followup", "Our experts will contact you shortly.")}
                  </p>
                  <button
                    className="w-full bg-[#d9534f] hover:bg-[#c9302c] text-white rounded py-2.5 font-semibold text-sm transition-colors"
                    onClick={handleClose}>
                    {t("inquiryPopup.done", "Done")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="hidden md:block text-right text-xs text-gray-500 mb-2">
                    <span className="text-red-500">*</span> fields are mandatory
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t("enquiry.nameLabel", "Name")}<span className="text-red-500 hidden md:inline">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("enquiry.nameLabel", "Name")}
                      className="w-full border border-gray-300 rounded-sm p-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t("enquiry.emailLabel", "Email")}<span className="text-red-500 hidden md:inline">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("enquiry.emailLabel", "Email")}
                      className="w-full border border-gray-300 rounded-sm p-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t("enquiry.phoneLabel", "Phone / Mobile")} <span className="text-red-500 hidden md:inline">*</span>
                    </label>
                    <div className="flex border border-gray-300 rounded-sm bg-white overflow-hidden focus-within:border-gray-400">
                      <div className="bg-gray-50 border-r border-gray-300 px-3 py-2.5 text-sm text-gray-600 flex items-center justify-center">
                        +91
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("enquiry.phonePlaceholder", "Mobile No")}
                        className="w-full p-2.5 text-sm focus:outline-none bg-transparent text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t("enquiry.descLabel", "Description")} <span className="text-red-500 hidden md:inline">*</span>
                    </label>
                    <textarea
                      name="description"
                      rows="3"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-sm p-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white text-gray-800 resize-y min-h-[80px]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 font-bold text-sm text-white rounded transition-colors uppercase tracking-wide ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#d9534f] hover:bg-[#c9302c]"
                      }`}>
                      {isSubmitting ? t("common.loading", "Loading...") : t("enquiry.submit", "Submit")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyEnquiryPopup;
