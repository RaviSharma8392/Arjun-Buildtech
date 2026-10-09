import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  FileText,
  Building2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";

const SitemapPage = () => {
  const mainPages = [
    { path: "/", name: "Home" },
    { path: "/properties", name: "Explore Properties" },
    { path: "/testimonials", name: "Client Reviews" },
    { path: "/contact", name: "Contact Us" },
    { path: "/profile", name: "Company Profile" },
    { path: "/services", name: "Real Estate Services" },
  ];

  const servicePages = [
    {
      path: "/services/invest-in-rohtak-properties",
      name: "Invest in Rohtak Properties",
    },
    {
      path: "/services/sell-property-in-rohtak",
      name: "Sell Property in Rohtak",
    },
    { path: "/services/investment-consulting", name: "Investment Consulting" },
    { path: "/services/property-consultation", name: "Property Consultation" },
    {
      path: "/services/prime-areas",
      name: "Prime Areas We Cover (Sectors & Suncity)",
    },
  ];

  const legalPages = [
    { path: "/privacy-policy", name: "Privacy Policy" },
    { path: "/terms-of-service", name: "Terms of Service" },
    { path: "/sitemap", name: "Sitemap" },
  ];

  return (
    <div className="bg-[#F9F9F9] min-h-screen py-12 md:py-16">
      <Helmet>
        <title>Sitemap | Arjun Buildtech</title>
        <meta name="description" content="Sitemap for Arjun Buildtech. Find all pages, properties, and resources for real estate in Rohtak." />
      </Helmet>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Sitemap" }]} />
        {/* Standard Portal Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border border-red-100">
            <Globe className="w-3.5 h-3.5" />
            <span>Website Navigation Directory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            Arjun Buildtech Sitemap
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
            Easily navigate through all available pages, property categories,
            service channels, and legal policies on our website.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Pages Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900 text-base">
                Main Pages
              </h2>
            </div>
            <ul className="space-y-3 flex-grow">
              {mainPages.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="flex items-center justify-between text-[14px] text-gray-700 hover:text-red-600 transition-colors group">
                    <span>{route.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-600 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Consulting Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900 text-base">
                Our Services
              </h2>
            </div>
            <ul className="space-y-3 flex-grow">
              {servicePages.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="flex items-center justify-between text-[14px] text-gray-700 hover:text-red-600 transition-colors group">
                    <span>{route.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-600 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900 text-base">
                Legal & Policies
              </h2>
            </div>
            <ul className="space-y-3 flex-grow">
              {legalPages.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="flex items-center justify-between text-[14px] text-gray-700 hover:text-red-600 transition-colors group">
                    <span>{route.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-600 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
