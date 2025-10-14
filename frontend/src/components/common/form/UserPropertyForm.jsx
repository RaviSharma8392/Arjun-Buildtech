import React, { useState } from "react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Notification = ({ message, type, onClose }) => {
  // type = "success" | "error"
  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} ${textColor} border border-gray-300 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-xs w-full`}>
      <p className="text-sm">{message}</p>
      <button onClick={onClose} className="ml-4 font-bold hover:text-gray-700">
        ✕
      </button>
    </div>
  );
};

const UserPropertyForm = ({ title, subtitle, roles, intents }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    role: roles[0],
    intent: intents[0],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setNotification({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "propertyLeads"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setNotification({
        message: "Your details have been submitted successfully!",
        type: "success",
      });

      // Reset form after success
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        role: roles[0],
        intent: intents[0],
        description: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setNotification({
        message: "Something went wrong! Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  bg-white md:w-full md:max-w-3xl  rounded-2xl shadow-xl p-6 sm:p-8">
      {/* Notification Panel */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-red-500 inline-block">
        {title}
      </h2>
      {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Name + Phone */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className="flex flex-1 border border-gray-300 rounded-lg">
            <span className="px-3 py-3 text-gray-500 border-r">+91</span>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 px-3 py-3 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Email + Location */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Choose your location"
            value={formData.location}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Role */}
        <div className="flex flex-wrap gap-3">
          <p className="text-gray-700 font-medium w-full">You are</p>
          {roles.map((role) => (
            <label
              key={role}
              className={`px-4 py-2 border rounded-full cursor-pointer text-sm ${
                formData.role === role
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}>
              <input
                type="radio"
                name="role"
                value={role}
                checked={formData.role === role}
                onChange={handleChange}
                className="hidden"
              />
              {role}
            </label>
          ))}
        </div>

        {/* Intent */}
        <div className="flex flex-wrap gap-3">
          <p className="text-gray-700 font-medium w-full">You are here to</p>
          {intents.map((intent) => (
            <label
              key={intent}
              className={`px-4 py-2 border rounded-full cursor-pointer text-sm ${
                formData.intent === intent
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}>
              <input
                type="radio"
                name="intent"
                value={intent}
                checked={formData.intent === intent}
                onChange={handleChange}
                className="hidden"
              />
              {intent}
            </label>
          ))}
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Add a brief description about your property..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-none"></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
          {loading ? "Submitting..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default UserPropertyForm;
