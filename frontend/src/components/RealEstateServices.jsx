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
import { useLanguage } from "../context/useLanguage";

const services = [
  {
    title: "Invest in Rohtak Properties",
    translationKey: "services.invest",
    description:
      "Explore residential plots and homes listed in Rohtak. Availability and property details vary by listing.",
    icon: <FaHome className="w-5 h-5 text-red-600" />,
    slug: "invest-in-rohtak-properties",
  },
  {
    title: "Sell Property in Rohtak",
    translationKey: "services.sell",
    description:
      "Discuss your property, asking price, and the information buyers may need before listing it for sale.",
    icon: <FaHandshake className="w-5 h-5 text-red-600" />,
    slug: "sell-property-in-rohtak",
  },
  {
    title: "Investment Consulting",
    translationKey: "services.investment",
    description:
      "Compare location, intended use, asking price, documents, and ongoing costs when considering a property purchase.",
    icon: <FaChartLine className="w-5 h-5 text-red-600" />,
    slug: "investment-consulting",
  },
  {
    title: "Property Consultation",
    translationKey: "services.consult",
    description:
      "We help you compare available property options against your needs, budget, and intended use.",
    icon: <FaUserTie className="w-5 h-5 text-red-600" />,
    slug: "property-consultation",
  },
  {
    title: "Prime Areas We Cover",
    translationKey: "services.areas",
    description:
      "Browse current Rohtak listings by locality and contact us to confirm the areas covered by a specific request.",
    icon: <FaMapMarkerAlt className="w-5 h-5 text-red-600" />,
    slug: "prime-areas",
  },
];

const RealEstateServices = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isServicesRoute =
    location.pathname === "/services" ||
    location.pathname === "/real-estate-services";

  return (
    <section
      className={`py-12 md:py-16 bg-[#F9F9F9] border-t border-gray-200 ${isServicesRoute ? "mt-[70px] min-h-screen" : ""}`}>
      {isServicesRoute && (
        <Helmet>
          <title>Real Estate Services | Arjun Buildtech Rohtak</title>
          <meta
            name="description"
            content="Explore top-tier real estate services in Rohtak with Arjun Buildtech. We offer property consultation, investment advice, and dedicated support for buying and selling plots and villas."
          />
        </Helmet>
      )}
      <div className="site-container">
        {/* Standard Portal Heading Design */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            {t("services.heading", "Explore Our Real Estate Services")}
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            {t(
              "services.description",
              "Comprehensive property solutions in Rohtak, from buying and selling to expert investment consulting.",
            )}
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
                  {t(`${service.translationKey}.title`, service.title)}
                </h3>
              </div>

              {/* Card Body */}
              <p className="text-gray-700 text-[14px] leading-relaxed flex-grow mb-5">
                {t(
                  `${service.translationKey}.description`,
                  service.description,
                )}
              </p>

              {/* Card Footer */}
              <div className="mt-auto">
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center text-[13px] font-medium text-red-600 border border-red-600 px-4 py-1.5 rounded hover:bg-red-50 transition-colors w-max">
                  {t("services.readMore", "Read More")}
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
