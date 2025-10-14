import React from "react";

const ContactCard = ({ property }) => {
  return (
    <div className="w-2xl">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Contact for this Property
      </h3>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> Arjun BuildTech
        </p>
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {property.location || "Rohtak, Haryana"}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ₹{" "}
          {property.price || "—"}
        </p>
        <p>
          <span className="font-semibold">Area:</span> {property.area || "—"}
        </p>
        <p>
          <span className="font-semibold">Property Type:</span>{" "}
          {property.type || "House"}
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Enquiry Now
        </button>
        <button className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition">
          Get Phone No.
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
