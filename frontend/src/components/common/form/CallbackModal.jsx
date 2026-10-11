import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaTimes, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { companyInfo } from "../../../data/companyInfo";
import { getUserProfile, saveUserProfile } from "../../../utils/userProfile";

const CallbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Residential Plot");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Listen for global "open-callback-modal" event
  useEffect(() => {
    const handleOpen = () => {
      // Auto-fill from centralized userProfile
      const profile = getUserProfile();
      if (profile.name) setName(profile.name);
      if (profile.phone) setPhone(profile.phone);
      setIsSuccess(false);
      setIsOpen(true);
    };

    window.addEventListener("open-callback-modal", handleOpen);
    return () => window.removeEventListener("open-callback-modal", handleOpen);
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        name: name.trim() || "Callback Visitor",
        phone: cleanPhone,
        email: "",
        propertyType: propertyType,
        message: `Requested callback for ${propertyType} in Rohtak`,
        source: "Centered Callback Modal",
        status: "new",
        createdAt: serverTimestamp(),
      });

      // Save user details to centralized storage
      saveUserProfile({
        name: name.trim() || "Visitor",
        phone: cleanPhone,
      });

      setIsSuccess(true);
      toast.success(
        "Callback request submitted! Our specialist will call you shortly.",
      );

      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting callback:", err);
      toast.error("Could not submit request. Please call directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const text =
      `*Namaste Arjun Buildtech!* 🙏\n\n` +
      `I want to request a callback / discuss properties:\n` +
      `👤 *Name:* ${name || "Website Visitor"}\n` +
      `📱 *Phone:* ${phone || ""}\n` +
      `🏡 *Interested In:* ${propertyType}\n\n` +
      `Please contact me at the earliest.`;
    window.open(
      `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}>
      {/* Modal Container: Full height/width on mobile, auto height & fixed width on desktop. Sharp corners. */}
      <div
        className="w-full h-[100dvh] md:h-auto md:max-w-[440px] bg-white rounded-none shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        {/* Header (Solid clean red) */}
        <div className="bg-red-600 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-white text-red-600 flex items-center justify-center rounded-none shadow-sm">
              <FaPhoneAlt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-[17px] tracking-wide leading-tight text-white">
                Request a Callback
              </h3>
              <p className="text-[13px] text-red-100 font-medium mt-0.5">
                Our Rohtak specialist will call you shortly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            className="p-2 text-white/80 hover:text-white hover:bg-black/10 transition-colors cursor-pointer rounded-none">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable on mobile if needed) */}
        <div className="p-6 md:p-7 flex-1 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <FaCheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-semibold text-2xl text-gray-900">
                Callback Confirmed!
              </h4>
              <p className="text-[15px] text-gray-600 max-w-xs mx-auto leading-relaxed">
                Thank you <strong>{name || "Sir/Madam"}</strong>. Our property
                specialist will call you shortly on <strong>{phone}</strong>.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 h-full flex flex-col">
              <p className="text-[14px] text-gray-600 leading-relaxed mb-2">
                Leave your mobile number and our senior real estate advisor will
                call you directly with verified listings and site visit details.
              </p>

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-[15px] font-medium border-r border-gray-300 pr-3">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-none text-[15px] text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none text-[15px] text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Interested Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none text-[15px] text-gray-900 bg-gray-50/50 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all cursor-pointer">
                  <option value="Residential Plot">
                    Residential Plot (Sector 27 / Sector 1 / Sun City)
                  </option>
                  <option value="Commercial Property">
                    Commercial Space / SCO / Shop
                  </option>
                  <option value="House / Villa">
                    Independent House / Villa
                  </option>
                  <option value="Agricultural Land">
                    Agricultural / Farm Land
                  </option>
                  <option value="Sell Property">
                    I want to Sell my Property
                  </option>
                </select>
              </div>

              {/* Action Buttons (Pushed to bottom on mobile if short on space) */}
              <div className="pt-4 mt-auto space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white rounded-none font-semibold text-[15px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-70">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? "Submitting Request..."
                      : "Request a Call Back Now"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-none font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                  <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                  <span>Or Chat Instantly on WhatsApp</span>
                </button>
              </div>

              <div className="pt-2 text-center text-[12px] text-gray-500 font-medium">
                🔒 Direct call from Arjun Buildtech team ({companyInfo.phone})
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;
