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
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const InquiryPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    message: "",
    location: "Website Popup",
  });

  const [submitted, setSubmitted] = useState(false);
  // NEW: State to prevent double submissions
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Prevent function from running if it's already submitting
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable button immediately

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
      setIsSubmitting(false); // Re-enable if you need to, though they see the success screen now
    }
  };

  const handleClose = () => {
    onClose();

    // Reset form after animation finishes
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
        @keyframes popupFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popupSlide { 
          from { opacity: 0; transform: translateY(20px) scale(0.98); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        .animate-fade { animation: popupFade 0.2s ease-out forwards; }
        .animate-slide { animation: popupSlide 0.25s ease-out forwards; }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade font-['Open_Sans',sans-serif]"
        onClick={handleClose}>
        {/* Card */}
        <div
          className="relative w-full max-w-[400px] bg-white rounded-lg overflow-hidden shadow-2xl animate-slide"
          onClick={(e) => e.stopPropagation()}>
          {/* Header - Justdial Style (Solid Blue, clean text) */}
          <div className="bg-[#0066cc] px-5 py-4 flex justify-between items-center text-white">
            <div>
              <h2 className="text-[18px] font-bold m-0 leading-tight">
                Arjun Buildtech
              </h2>
              <p className="text-[12px] text-blue-100 m-0 mt-0.5 font-medium flex items-center gap-1">
                <ShieldCheck size={12} />
                Verified Business • Rohtak
              </p>
            </div>
            <button
              className="bg-white/20 hover:bg-white/30 rounded-full w-[28px] h-[28px] flex items-center justify-center text-white transition-colors"
              onClick={handleClose}>
              <X size={16} />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6">
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle
                  size={60}
                  className="text-[#10b981] mb-4 mx-auto"
                />
                <h3 className="text-gray-800 text-xl font-bold mb-2">
                  Request Sent Successfully!
                </h3>
                <p className="text-gray-500 text-[14px] mb-6">
                  Arjun Buildtech has received your details and will contact you
                  shortly.
                </p>
                <button
                  className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white rounded p-3 font-semibold transition-colors"
                  onClick={handleClose}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="text-[14px] font-semibold text-gray-700 mb-4 border-b pb-2">
                  Get the Best Quotes Instantly
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full border border-gray-300 rounded p-2.5 pl-[38px] text-[14px] bg-white focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      className="w-full border border-gray-300 rounded p-2.5 pl-[38px] text-[14px] bg-white focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-[16px] h-[16px]" />
                    <select
                      name="propertyType"
                      required
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2.5 pl-[38px] text-[14px] bg-white focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all appearance-none cursor-pointer">
                      <option value="">Select Requirement</option>
                      <option value="Residential Plot">Residential Plot</option>
                      <option value="Commercial Plot">Commercial Plot</option>
                      <option value="HSVP Plot">HSVP Plot</option>
                    </select>
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3 text-gray-400 w-[16px] h-[16px]" />
                    <textarea
                      name="message"
                      rows="2"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific requirement?"
                      className="w-full border border-gray-300 rounded pt-2.5 pl-[38px] pr-3 text-[14px] bg-white focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all resize-none"
                    />
                  </div>

                  {/* Justdial style vibrant CTA button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-2 rounded p-3 font-bold text-white transition-all ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#f97316] hover:bg-[#ea580c] shadow-md hover:shadow-lg"
                    }`}>
                    {isSubmitting ? "Sending Details..." : "Get Best Price"}
                  </button>
                </form>

                <p className="text-[11px] text-gray-400 text-center mt-4">
                  By submitting, you agree to share your details with this
                  business.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryPopup;
