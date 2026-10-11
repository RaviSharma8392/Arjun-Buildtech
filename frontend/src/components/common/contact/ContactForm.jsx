import React, { useState, useEffect } from "react";
import Checkbox from "../Checkbox";
import Notification from "../notification/Notification";
import { getUserProfile, saveUserProfile } from "../../../utils/userProfile";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactForm = () => {
  const [formData, setFormData] = useState(() => {
    const p = getUserProfile();
    return {
      name: p.name || "",
      email: p.email || "",
      phone: p.phone || "",
      service: "invest",
      message: "",
    };
  });

  const [status, setStatus] = useState(""); // SUCCESS, ERROR, or empty
  const [loading, setLoading] = useState(false);

  // Sync profile when updated anywhere on the site
  useEffect(() => {
    const handleProfileUpdate = () => {
      const p = getUserProfile();
      setFormData((prev) => ({
        ...prev,
        name: prev.name || p.name || "",
        phone: prev.phone || p.phone || "",
        email: prev.email || p.email || "",
      }));
    };
    window.addEventListener("arjun-profile-updated", handleProfileUpdate);
    window.addEventListener("storage", handleProfileUpdate);
    return () => {
      window.removeEventListener("arjun-profile-updated", handleProfileUpdate);
      window.removeEventListener("storage", handleProfileUpdate);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        location: "Quick Enquiry Contact Form",
        status: "new",
        read: false,
        createdAt: serverTimestamp(),
      });

      // Save user details to centralized storage
      saveUserProfile({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      setStatus("SUCCESS");
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Quick Enquiry
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit Mobile Number"
          required
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Service */}
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
          <option value="invest">Invest in a Property</option>
          <option value="sell">Sell a Property</option>
          <option value="rent">Rent a Property</option>
        </select>

        {/* Message */}
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your enquiry..."
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Checkbox */}
        <Checkbox />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors cursor-pointer">
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>

      {/* Status Notification */}
      {status && (
        <Notification
          type={status === "SUCCESS" ? "success" : "error"}
          message={
            status === "SUCCESS"
              ? "✅ Your enquiry has been sent successfully!"
              : "❌ Something went wrong. Please try again."
          }
        />
      )}
    </div>
  );
};

export default ContactForm;
