import React from "react";
import {
  FaUserTie,
  FaHardHat,
  FaDraftingCompass,
  FaPaintRoller,
  FaCompass,
  FaTools,
  FaSearchLocation,
  FaBriefcase,
} from "react-icons/fa";

const services = [
  {
    title: "Agents / Brokers",
    description:
      "Here Are Hassle-Free Solutions! Buy - Sell - Rent Your Property",
    icon: <FaUserTie className="text-3xl text-blue-600" />,
  },
  {
    title: "Builders / Developers",
    description:
      "List of the most trusted and reliable builders to fulfill your Dream HOME.",
    icon: <FaHardHat className="text-3xl text-yellow-600" />,
  },
  {
    title: "Architects / Architecture",
    description:
      "Professional Architecture will meet your needs and expectations.",
    icon: <FaDraftingCompass className="text-3xl text-green-600" />,
  },
  {
    title: "Interior Decorators",
    description:
      "A One-Stop Solution for all your decor Needs to Match Your Lifestyle.",
    icon: <FaPaintRoller className="text-3xl text-pink-500" />,
  },
  {
    title: "Vaastu Consultant",
    description: "Connect to top most Vastu consultants for right direction.",
    icon: <FaCompass className="text-3xl text-indigo-600" />,
  },
  {
    title: "Building Contractors",
    description:
      "General contractor for a home repair, remodel, or construction.",
    icon: <FaTools className="text-3xl text-gray-700" />,
  },
  {
    title: "Home Inspection",
    description: "A complete range of building and home inspection services.",
    icon: <FaSearchLocation className="text-3xl text-red-500" />,
  },
  {
    title: "Property Consultants",
    description:
      "List of Leading Real Estate Consultant for Professional Assistance Services.",
    icon: <FaBriefcase className="text-3xl text-teal-600" />,
  },
];

const RealEstateServices = () => {
  return (
    <div className="px-4 mt-8 py-12 bg-gray-50 ">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-8">
        Explore our <span className="text-black">Real Estate</span> Services
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
