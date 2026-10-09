import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SmartLeadPopup = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("smartLeadPhone") || "");
  const [name, setName] = useState(localStorage.getItem("smartLeadName") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already submitted an inquiry globally
    const hasInquired = localStorage.getItem("hasInquired");
    if (hasInquired === "true" || sessionStorage.getItem("smartLeadDismissed") === "true") return;

    // Show after 25 seconds of being on the site
    const timer = setTimeout(() => {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 50); // slight delay for CSS transition
    }, 25000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("smartLeadDismissed", "true");
    setTimeout(() => setIsRendered(false), 500); // wait for transition
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        name: name.trim() || "Smart Lead User",
        phone: phoneNumber,
        email: "",
        message: "Requested property recommendations via Smart Lead Popup",
        source: "Smart Lead Popup",
        status: "new",
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      localStorage.setItem("hasInquired", "true");
      localStorage.setItem("smartLeadName", name);
      localStorage.setItem("smartLeadPhone", phoneNumber);
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit smart lead", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed top-24 right-4 z-[999] w-[340px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-200 overflow-hidden transform transition-all duration-500 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
      }`}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
        <div className="flex items-center gap-2">
          <img src="/arjunBuildTechLogo.png" alt="Arjun Buildtech" className="h-6 object-contain" />
          <span className="text-xs text-gray-500 font-medium">Continue with Arjun</span>
        </div>
        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <FaTimes className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <div className="p-5">
        {!isSuccess ? (
          <>
            <h3 className="text-[16px] font-semibold text-gray-800 mb-1 leading-snug">
              Looking for a property in Rohtak?
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              Get personalized property recommendations on WhatsApp instantly.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="text-gray-400 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-9 pr-3 py-2 text-[14px] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-inner"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhoneAlt className="text-gray-400 w-3.5 h-3.5" />
                </div>
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter your mobile number"
                  className="w-full pl-9 pr-3 py-2 text-[14px] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-inner"
                  maxLength="10"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || phoneNumber.length < 10 || !name.trim()}
                className={`w-full py-2.5 rounded-lg text-[14px] font-semibold text-white transition-all ${
                  phoneNumber.length >= 10 && name.trim() && !isSubmitting
                    ? "bg-[#1a73e8] hover:bg-[#1557b0] shadow-md"
                    : "bg-[#1a73e8]/60 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </form>
            <p className="text-[11px] text-center text-gray-400 mt-3">
              By continuing, you agree to receive property updates via WhatsApp.
            </p>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-[16px] font-semibold text-gray-800 mb-1">Number Saved!</h3>
            <p className="text-[13px] text-gray-500">
              Our experts will send you details shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartLeadPopup;
