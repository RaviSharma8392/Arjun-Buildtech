import React, { useState } from "react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Send } from "lucide-react";
import Notification from "../notification/Notification";
import { useLanguage } from "../../../context/useLanguage";

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    location: "",
    gdprAgreement: false,
  });
  const [loading, setLoading] = useState(false);

  // Notification state
  const [notification, setNotification] = useState({
    message: "",
    type: "success", // success | error | warning | info
    visible: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp(),
        read: false,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        location: "",
        gdprAgreement: false,
      });

      // Show success notification
      setNotification({
        message: t(
          "contact.success",
          "Message sent successfully! We'll get back to you within 24 hours.",
        ),
        type: "success",
        visible: true,
      });
    } catch (error) {
      console.error("Error saving contact:", error);
      setNotification({
        message: t(
          "contact.error",
          "Error submitting the form. Please try again.",
        ),
        type: "error",
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 w-full relative">
      {/* Notification */}
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={4000}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}

      {/* Standard Portal Heading Design */}
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-normal text-gray-800 mb-4">
          {t("contact.formTitle", "Get Expert Property Advice")}
        </h2>
        <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
        <p className="text-sm md:text-[15px] text-gray-600">
          {t(
            "contact.formDescription",
            "Speak with Rohtak's top real estate consultants today. We'll help you secure the best deal on your dream property.",
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contact.name", "Your Name*")}
            required
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-red-600 transition-colors"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.email", "Your Email*")}
            required
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("contact.phone", "Phone Number*")}
            required
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-red-600 transition-colors"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={t("contact.location", "Your Location*")}
            required
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-red-600 transition-colors"
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("contact.message", "Your Message*")}
          required
          rows="4"
          className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-red-600 transition-colors resize-none"
        />

        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            name="gdprAgreement"
            checked={formData.gdprAgreement}
            onChange={handleChange}
            required
            className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-600 shrink-0 cursor-pointer"
          />
          <span className="text-[13px] text-gray-600 leading-snug">
            {t(
              "contact.consent",
              "I consent to storing my information to respond to my inquiry and agree to be contacted by Arjun Buildtech experts.",
            )}
          </span>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || !formData.gdprAgreement}
            className="w-full bg-[#d9534f] hover:bg-[#c9302c] text-white py-3.5 px-6 rounded font-semibold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              t("common.submitting", "Submitting...")
            ) : (
              <>
                <Send size={18} />
                <span>
                  {t("contact.getConsultation", "Get Free Consultation")}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
