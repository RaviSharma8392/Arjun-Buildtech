import Button from "../button/Button";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import the WhatsApp icon

// NOTE: Formspree logic is REMOVED. This component only initiates a WhatsApp chat.
const SendEnquiry = ({ property }) => {
  // We still use state to manage the form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    // Pre-populate message with property details
    message: `I'm interested in property: ${property.name}. Details: ${property.propertyType}, ${property.builtUpArea} in ${property.location}. My details are:`,
  });

  const [isSent, setIsSent] = useState(false); // Tracks if the WhatsApp link was initiated
  const [validationError, setValidationError] = useState("");

  // Define WhatsApp details
  const contactNumber = "917617711003"; // Your number (without + or spaces for the URL)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationError(""); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Basic Validation
    if (!formData.name || !formData.mobile) {
      setValidationError(
        "Please fill in your Name and Mobile Number to proceed."
      );
      return;
    }

    // 2. Construct the final message with user details
    const fullMessage =
      `${formData.message}\n` +
      `Name: ${formData.name}\n` +
      `Mobile: ${formData.mobile}\n` +
      (formData.email ? `Email: ${formData.email}` : "");

    // 3. Create the WhatsApp API link
    const whatsappLink = `https://wa.me/${contactNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    // 4. Open WhatsApp
    window.open(whatsappLink, "_blank");

    // 5. Update state to show confirmation message
    setIsSent(true);
  };

  return (
    <div
      id="inquiry"
      className="md:bg-white md:shadow-lg md:rounded-2xl p-6 max-w-md mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Enquire via WhatsApp
      </h2>

      {isSent ? (
        // === WhatsApp Confirmation View ===
        <div className="text-center py-6 border-t border-gray-200 mt-4">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Opening WhatsApp Chat...
          </p>
          <p className="text-gray-600 mb-6">
            If the chat didn't open automatically, please click the button
            again.
          </p>

          {/* Button to allow user to retry if the chat didn't open */}
          <a
            href={`https://wa.me/${contactNumber}`} // Use simpler link for retry
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 
                       bg-green-600 hover:bg-green-700 
                       text-white font-bold py-3 px-6 rounded-lg 
                       transition duration-200 shadow-xl text-lg transform hover:scale-[1.02]">
            <FaWhatsapp className="w-6 h-6" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      ) : (
        // === Form View ===
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Validation Error Message */}
          {validationError && (
            <p className="text-red-600 text-sm font-medium p-3 bg-red-50 rounded-lg border border-red-200">
              ⚠️ {validationError}
            </p>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          {/* Mobile No Field */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Mobile No
            </label>
            <input
              type="tel"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          {/* Email Field (Optional) */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          {/* Message Field (Read-only prompt for user) */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Pre-filled Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              readOnly // Make this read-only since it's pre-populated details
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-600 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center space-x-2 
                       bg-green-600 hover:bg-green-700 
                       text-white font-bold py-3 px-6 rounded-lg 
                       transition duration-200 shadow-xl text-lg">
            <FaWhatsapp className="w-6 h-6" />
            <span>Send Details via WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default SendEnquiry;
