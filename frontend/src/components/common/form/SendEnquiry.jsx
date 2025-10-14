import Button from "../button/Button";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const SendEnquiry = ({ property }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: `I'm interested in property: ${property.name}. Details: ${property.propertyType}, ${property.builtUpArea} in ${property.location}. My details are:`,
  });

  const [isSent, setIsSent] = useState(false);
  const [validationError, setValidationError] = useState("");

  const contactNumber = "98994 81428";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile) {
      setValidationError(
        "Please fill in your Name and Mobile Number to proceed."
      );
      return;
    }

    const fullMessage =
      `${formData.message}\n` +
      `Name: ${formData.name}\n` +
      `Mobile: ${formData.mobile}\n` +
      (formData.email ? `Email: ${formData.email}` : "");

    const whatsappLink = `https://wa.me/${contactNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    window.open(whatsappLink, "_blank");
    setIsSent(true);
  };

  return (
    <div
      id="inquiry"
      className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Enquire via WhatsApp
      </h2>

      {isSent ? (
        // Success View
        <div className="text-center py-6 border-t border-gray-200 mt-4">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Opening WhatsApp Chat...
          </p>
          <p className="text-gray-600 mb-6">
            If the chat didn't open automatically, please click the button
            again.
          </p>

          <a
            href={`https://wa.me/${contactNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 
                       bg-red-600 hover:bg-red-700 
                       text-white font-bold py-3 px-6 rounded-lg 
                       transition duration-200 shadow-lg transform hover:scale-[1.02]">
            <FaWhatsapp className="w-6 h-6" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      ) : (
        // Form View
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Validation Error */}
          {validationError && (
            <p className="text-red-600 text-sm font-medium p-3 bg-red-50 rounded-lg border border-red-200">
              ⚠️ {validationError}
            </p>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
          </div>

          {/* Mobile No Field */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Mobile No
            </label>
            <input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
          </div>

          {/* Email Field (Optional) */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Pre-filled Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              readOnly
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-600 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center space-x-2 
                       bg-red-600 hover:bg-red-700 
                       text-white font-bold py-3 px-6 rounded-lg 
                       transition duration-200 shadow-lg">
            <FaWhatsapp className="w-6 h-6" />
            <span>Send Details via WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default SendEnquiry;
