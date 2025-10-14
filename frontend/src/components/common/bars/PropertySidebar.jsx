import React, { useState } from "react";
import { FaPhone, FaWhatsapp, FaEnvelope, FaUser } from "react-icons/fa";

const PropertySidebar = ({ property }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Enquiry submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Contact Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Agent
        </h3>

        {/* Agent Info */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <FaUser className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Arjun Buildtech</p>
            <p className="text-sm text-gray-600">Property Consultant</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="tel:+917617711003"
            className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            <FaPhone className="w-4 h-4" />
            Call
          </a>
          <a
            href="https://wa.me/917617711003"
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            <FaWhatsapp className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Enquiry Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Send Enquiry
          </button>
        </form>
      </div>

      {/* Quick Facts */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Property Facts
        </h3>
        <div className="space-y-3">
          {[
            { label: "Property ID", value: property.id },
            { label: "Posted", value: "Recently" },
            { label: "Last Updated", value: "Today" },
          ].map((fact, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{fact.label}</span>
              <span className="font-semibold text-gray-900">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySidebar;
