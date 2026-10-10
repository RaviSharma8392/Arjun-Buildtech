import React, { useState } from "react";
import { Phone, CheckCircle, Send } from "lucide-react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLanguage } from "../../../context/useLanguage";
import { getLocalizedField } from "../../../utils/localizedField";

const InlineEnquiryForm = ({ property }) => {
  const { language, t } = useLanguage();
  
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
        location: "Inline Property Enquiry",
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

  return (
    <div className="bg-white border border-gray-200 shadow-sm w-full">
      <div className="p-5 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {t("enquiry.sendForThis", "Send an enquiry for this property?")}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Contact Person : <span className="font-medium text-gray-700">Parveen Gehlawat</span>
        </p>
        
        <div className="flex items-center gap-3 border border-gray-200 rounded p-3 mb-6 bg-gray-50 shadow-sm">
          <Phone className="w-5 h-5 text-gray-600" />
          <span className="text-[#d9534f] font-semibold text-lg">+91 93504 47531</span>
        </div>

        {submitted ? (
          <div className="py-8 text-center bg-gray-50 rounded border border-gray-100">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-[#00875A]" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-1">
              {t("inquiryPopup.received", "Request Received")}
            </h3>
            <p className="text-gray-500 text-sm mb-0">
              {t("inquiryPopup.followup", "Our experts will contact you shortly.")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t("enquiry.nameLabel", "Name")}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-red-400 bg-white text-gray-800 transition-colors"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t("enquiry.emailLabel", "Email")}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-red-400 bg-white text-gray-800 transition-colors"
              />
            </div>

            <div className="flex border border-gray-300 bg-white focus-within:border-red-400 transition-colors">
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

            <div>
              <textarea
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-red-400 bg-gray-50 text-gray-600 resize-y min-h-[80px] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 font-bold text-sm text-white transition-colors uppercase tracking-wide flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#d9534f] hover:bg-[#c9302c]"
              }`}>
              {isSubmitting ? (
                t("common.loading", "Loading...")
              ) : (
                <>
                  {t("enquiry.submit", "SEND ENQUIRY")}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InlineEnquiryForm;
