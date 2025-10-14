import React, { useState } from "react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    location: "All Locations",
    gdprAgreement: false,
  });
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

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
        location: "All Locations",
        gdprAgreement: false,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
      <div className="text-center mb-6 lg:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Fill out the form and our team will respond promptly.
        </p>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center text-green-800 font-medium">
          Message Sent Successfully! We'll get back to you within 24 hours.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name*"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email*"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number*"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
            <option value="All Locations">All Locations</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Rohtak">Rohtak</option>
            <option value="Panipat">Panipat</option>
            <option value="Hisar">Hisar</option>
          </select>
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message*"
          required
          rows="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="gdprAgreement"
            checked={formData.gdprAgreement}
            onChange={handleChange}
            required
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I consent to storing my information to respond to my inquiry.
          </span>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.gdprAgreement}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <Send size={20} /> Submit Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
