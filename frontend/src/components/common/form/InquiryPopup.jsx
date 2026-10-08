import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  User,
  Home,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import { db } from "../../../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const InquiryPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    message: "",
    location: "Website Popup",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([
    "Residential Plot",
    "Commercial Plot",
    "HSVP Plot",
  ]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "properties"));
        const data = snapshot.docs.map((doc) => doc.data());
        const dynamicTypes = [
          ...new Set(
            data
              .map((p) => p.type)
              .filter(Boolean)
              .map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
          ),
        ];
        if (dynamicTypes.length > 0) setPropertyTypes(dynamicTypes);
      } catch (error) {
        console.error("Error fetching property types:", error);
      }
    };
    if (isOpen) fetchTypes();
  }, [isOpen]);

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
        propertyType: formData.propertyType,
        message: formData.message,
        location: formData.location,
        status: "new",
        read: false,
        source: "popup",
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
        propertyType: "",
        message: "",
        location: "Website Popup",
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes widgetFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes widgetSlide { 
          from { opacity: 0; transform: translateY(20px) scale(0.98); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        .animate-fade { animation: widgetFade 0.2s ease forwards; }
        .animate-slide { animation: widgetSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade"
        onClick={handleClose}>
        {/* Card Widget */}
        <div
          className="relative w-full max-w-[420px] bg-white rounded-lg overflow-hidden shadow-xl animate-slide border border-gray-200"
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="pt-5 pb-3 px-6 flex justify-between items-start border-b border-gray-100 bg-gray-50">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-7 h-7 bg-red-50 rounded flex items-center justify-center border border-red-100">
                  <ShieldCheck size={16} className="text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  Arjun Buildtech
                </h2>
              </div>
              <p className="text-[12px] text-gray-500 font-medium">
                Verified & Trusted Real Estate Experts
              </p>
            </div>
            <button
              className="bg-white hover:bg-gray-100 border border-gray-200 rounded w-7 h-7 flex items-center justify-center text-gray-500 transition-colors"
              onClick={handleClose}>
              <X size={16} />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {submitted ? (
              <div className="py-8 text-center animate-fade">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#00875A]" />
                </div>
                <h3 className="text-gray-900 text-xl font-bold mb-1 tracking-tight">
                  Request Received
                </h3>
                <p className="text-gray-500 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                  Our real estate experts will contact you shortly with
                  exclusive property details.
                </p>
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded py-2.5 font-semibold text-sm transition-colors shadow-sm"
                  onClick={handleClose}>
                  Done
                </button>
              </div>
            ) : (
              <div className="animate-fade">
                <p className="text-base font-bold text-gray-800 mb-4 tracking-tight">
                  Get the Best Quotes Instantly
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name Input */}
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name*"
                      className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm text-gray-900 bg-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number*"
                      className="w-full border border-gray-300 rounded p-2.5 pl-10 text-sm text-gray-900 bg-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  {/* Select Requirement */}
                  <div className="relative">
                    <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      name="propertyType"
                      required
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2.5 pl-10 pr-8 text-sm text-gray-900 bg-white focus:outline-none focus:border-red-600 appearance-none cursor-pointer transition-colors">
                      <option value="" className="text-gray-400">
                        Select Requirement*
                      </option>
                      {propertyTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-gray-900">
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      name="message"
                      rows="2"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific requirement? (Optional)"
                      className="w-full border border-gray-300 rounded pt-2.5 pl-10 pr-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-1 rounded py-3 font-semibold text-sm text-white transition-colors flex justify-center items-center gap-2 ${
                      isSubmitting
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 shadow-sm"
                    }`}>
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Get Exclusive Property Details"
                    )}
                  </button>
                </form>

                <p className="text-[11px] text-gray-500 text-center mt-4 leading-snug">
                  By submitting, you agree to share your details with Arjun
                  Buildtech.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryPopup;
