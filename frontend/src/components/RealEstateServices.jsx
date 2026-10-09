import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaHome,
  FaHandshake,
  FaChartLine,
  FaUserTie,
  FaMapMarkerAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Invest in Rohtak Properties",
    description:
      "Find lucrative verified residential plots and luxury villas in Rohtak’s prime areas — HSVP Sectors 1, 2, 3, 25, 27, and Suncity 34, 35, 36, 36A.",
    icon: <FaHome className="w-5 h-5 text-red-600" />,
    slug: "invest-in-rohtak-properties",
  },
  {
    title: "Sell Property in Rohtak",
    description:
      "Get the best market value for your land, plot, or villa with expert help from our local real estate team.",
    icon: <FaHandshake className="w-5 h-5 text-red-600" />,
    slug: "sell-property-in-rohtak",
  },
  {
    title: "Investment Consulting",
    description:
      "We guide you through high-return investment opportunities across top residential and commercial sectors in Rohtak.",
    icon: <FaChartLine className="w-5 h-5 text-red-600" />,
    slug: "investment-consulting",
  },
  {
    title: "Property Consultation",
    description:
      "Our experts help you choose the right property based on your needs, budget, and future value potential.",
    icon: <FaUserTie className="w-5 h-5 text-red-600" />,
    slug: "property-consultation",
  },
  {
    title: "Prime Areas We Cover",
    description:
      "We specialize in Rohtak’s major real estate zones: HSVP Sector 1–3, 25, 27, and Suncity Sector 34–36A.",
    icon: <FaMapMarkerAlt className="w-5 h-5 text-red-600" />,
    slug: "prime-areas",
  },
];

const RealEstateServices = () => {
  const location = useLocation();
  const isServicesRoute = location.pathname === "/services" || location.pathname === "/real-estate-services";

  return (
    <section className={`py-12 md:py-16 bg-[#F9F9F9] border-t border-gray-200 ${isServicesRoute ? "mt-[70px] min-h-screen" : ""}`}>
      {isServicesRoute && (
        <Helmet>
          <title>Real Estate Services | Arjun Buildtech Rohtak</title>
          <meta name="description" content="Explore top-tier real estate services in Rohtak with Arjun Buildtech. We offer property consultation, investment advice, and dedicated support for buying and selling plots and villas." />
        </Helmet>
      )}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Standard Portal Heading Design */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            Explore Our Real Estate Services
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Comprehensive property solutions in Rohtak, from buying and selling
            to expert investment consulting.
          </p>
        </div>

        {/* 3-Column Utilitarian Grid (Best for 5 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-[15px] leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Card Body */}
              <p className="text-gray-700 text-[14px] leading-relaxed flex-grow mb-5">
                {service.description}
              </p>

              {/* Card Footer */}
              <div className="mt-auto">
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center text-[13px] font-medium text-red-600 border border-red-600 px-4 py-1.5 rounded hover:bg-red-50 transition-colors w-max">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEstateServices;
