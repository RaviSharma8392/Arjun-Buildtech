import React, { useState } from "react";
import Checkbox from "../Checkbox";
import Notification from "../notification/Notification";

const ContactForm = () => {
  const [status, setStatus] = useState(""); // SUCCESS, ERROR, or empty

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("SUCCESS");
        form.reset();
        // Optional: auto-hide notification after 5s
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("ERROR");
    }
  };

  return (
    <div className=" p-6 md:p-8  max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Quick Enquiry
      </h3>

      <form
        action="https://formspree.io/f/yourFormId" // Replace with your Formspree form ID
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="+91"
          required
          className="w-full px-4 py-2 border  bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Service */}
        <select
          name="service"
          className="w-full px-4 py-2 border  bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
          <option value="buy">Buy a Property</option>
          <option value="sell">Sell a Property</option>
          <option value="rent">Rent a Property</option>
        </select>

        {/* Message */}
        <textarea
          name="message"
          rows="4"
          placeholder="Write your enquiry..."
          className="w-full px-4 py-2  bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Checkbox */}
        <Checkbox />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors">
          Send Enquiry
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
