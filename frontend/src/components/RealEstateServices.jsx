import React from "react";
import {
  FaHome,
  FaHandshake,
  FaChartLine,
  FaUserTie,
  FaMapMarkerAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Buy Property in Rohtak",
    description:
      "Find verified plots and homes in Rohtak’s prime areas — HSVP Sectors 1, 2, 3, 25, 27, and Suncity 34, 35, 36, 36A.",
    icon: <FaHome className="text-3xl text-blue-600" />,
  },
  {
    title: "Sell Property in Rohtak",
    description:
      "Get the best market value for your property with expert help from our local real estate team.",
    icon: <FaHandshake className="text-3xl text-green-600" />,
  },
  {
    title: "Investment Consulting",
    description:
      "We guide you through high-return investment opportunities across top residential and commercial sectors in Rohtak.",
    icon: <FaChartLine className="text-3xl text-yellow-500" />,
  },
  {
    title: "Property Consultation",
    description:
      "Our experts help you choose the right property based on your needs, budget, and future value potential.",
    icon: <FaUserTie className="text-3xl text-indigo-600" />,
  },
  {
    title: "Prime Areas We Cover",
    description:
      "We specialize in Rohtak’s major real estate zones: HSVP Sector 1–3, 25, 27, and Suncity Sector 34–36A.",
    icon: <FaMapMarkerAlt className="text-3xl text-red-600" />,
  },
];

const RealEstateServices = () => {
  return (
    <div className="px-4 mt-8 py-12 bg-gray-50 ">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
        Explore Our <span className="text-black">Real Estate Services</span> in
        Rohtak
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <button className="text-blue-600 border border-blue-600 rounded px-3 py-1 text-sm hover:bg-blue-50 transition">
                Read More
              </button>
              <div>{service.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstateServices;
