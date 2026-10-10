import React, { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLanguage } from "../../../context/useLanguage";

const InquiryPopup = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
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

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        location: "Website Popup",
        status: "new",
        read: false,
        source: "popup",
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      localStorage.setItem("hasInquired", "true");
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
        message: "",
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
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade"
        onClick={handleClose}>
        
        {/* Container */}
        <div className="relative w-full max-w-[700px] flex">
          {/* Card Widget */}
          <div
            className="w-full bg-[#f8f9fa] shadow-2xl animate-slide border border-gray-300"
            onClick={(e) => e.stopPropagation()}>
            
            {/* Form Body */}
            <div className="p-6 md:p-8">
              {submitted ? (
                <div className="py-12 text-center animate-fade">
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#00875A]" />
                  </div>
                  <h3 className="text-gray-900 text-xl font-bold mb-1 tracking-tight">
                    {t("inquiryPopup.received", "Request Received")}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
                    {t("inquiryPopup.followup", "Our experts will contact you shortly.")}
                  </p>
                  <button
                    className="w-full max-w-[200px] bg-[#d9534f] hover:bg-[#c9302c] text-white rounded py-2.5 font-semibold text-sm transition-colors shadow-sm mx-auto"
                    onClick={handleClose}>
                    {t("inquiryPopup.done", "Done")}
                  </button>
                </div>
              ) : (
                <div className="animate-fade">
                  <h2 className="text-[22px] md:text-2xl font-normal text-gray-700 text-center mb-6">
                    {t("inquiryPopup.title", "Instant Inquiry to")} <span className="text-[#d9534f]">{t("inquiryPopup.company", "Arjun Buildtech")}</span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Top Row: Name, Phone, Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("inquiryPopup.name", "* Your Name")}
                        className="w-full border border-gray-300 rounded-sm p-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400 transition-colors"
                      />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("inquiryPopup.phone", "* Your Mobile No")}
                        className="w-full border border-gray-300 rounded-sm p-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400 transition-colors"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("inquiryPopup.email", "* Your Email Id")}
                        className="w-full border border-gray-300 rounded-sm p-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400 transition-colors"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <textarea
                        name="message"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("inquiryPopup.query", "Your Query")}
                        className="w-full border border-gray-300 rounded-sm p-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-2 pb-6 border-b border-gray-300">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-2.5 font-semibold text-sm md:text-base text-white rounded transition-colors ${
                          isSubmitting
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-[#d9534f] hover:bg-[#c9302c]"
                        }`}>
                        {isSubmitting ? t("common.loading", "Loading...") : t("inquiryPopup.send", "Send Inquiry")}
                      </button>
                    </div>
                  </form>

                  {/* Contact Details Footer */}
                  <div className="pt-6 space-y-3 text-[14px] md:text-[15px] text-gray-600">
                     <div className="flex">
                        <span className="w-32 md:w-40 flex-shrink-0">{t("inquiryPopup.contactPerson", "Contact Person")}</span>
                        <span className="mr-2">:</span>
                        <span className="text-gray-700">{t("inquiryPopup.contactName", "Parveen Gehlawat")}</span>
                     </div>
                     <div className="flex">
                        <span className="w-32 md:w-40 flex-shrink-0">{t("inquiryPopup.addressLabel", "Address")}</span>
                        <span className="mr-2">:</span>
                        <span className="text-gray-700">{t("inquiryPopup.address", "G74P, Sector-27, Rohtak, Haryana")}</span>
                     </div>
                     <div className="flex">
                        <span className="w-32 md:w-40 flex-shrink-0">{t("inquiryPopup.mobileLabel", "Mobile No.")}</span>
                        <span className="mr-2">:</span>
                        <span className="text-gray-700">{t("inquiryPopup.mobile", "+91 93504 47531")}</span>
                     </div>
                     <div className="flex">
                        <span className="w-32 md:w-40 flex-shrink-0">{t("inquiryPopup.emailLabel", "Email ID")}</span>
                        <span className="mr-2">:</span>
                        <span className="text-[#d9534f]">{t("inquiryPopup.emailId", "arjun.buildtech27@gmail.com")}</span>
                     </div>
                  </div>

                </div>
              )}
            </div>
          </div>
          
          {/* Close X (outside the modal body) */}
          <button 
            className="absolute -top-1 -right-8 md:-right-10 text-white hover:text-gray-300 transition-colors z-[1001]"
            onClick={handleClose}
          >
            <X size={28} />
          </button>
        </div>
      </div>
    </>
  );
};

export default InquiryPopup;
