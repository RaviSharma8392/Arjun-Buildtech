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
import { useLanguage } from "../../context/useLanguage";

const SitemapPage = () => {
  const { t } = useLanguage();
  const mainPages = [
    { path: "/", name: "Home", key: "common.home" },
    {
      path: "/properties",
      name: "Explore Properties",
      key: "sitemap.exploreProperties",
    },
    {
      path: "/testimonials",
      name: "Client Reviews",
      key: "common.clientReviews",
    },
    { path: "/contact", name: "Contact Us", key: "nav.contactUs" },
    {
      path: "/profile",
      name: "Company Profile",
      key: "sitemap.companyProfile",
    },
    {
      path: "/services",
      name: "Real Estate Services",
      key: "sitemap.realEstateServices",
    },
  ];

  const servicePages = [
    {
      path: "/services/invest-in-rohtak-properties",
      name: "Invest in Rohtak Properties",
      key: "sitemap.investProperties",
    },
    {
      path: "/services/sell-property-in-rohtak",
      name: "Sell Property in Rohtak",
      key: "sitemap.sellProperty",
    },
    {
      path: "/services/investment-consulting",
      name: "Investment Consulting",
      key: "sitemap.investmentConsulting",
    },
    {
      path: "/services/property-consultation",
      name: "Property Consultation",
      key: "sitemap.propertyConsultation",
    },
    {
      path: "/services/prime-areas",
      name: "Prime Areas We Cover (Sectors & Suncity)",
      key: "sitemap.primeAreas",
    },
  ];

  const legalPages = [
    { path: "/privacy-policy", name: "Privacy Policy", key: "privacy.title" },
    { path: "/terms-of-service", name: "Terms of Service", key: "terms.title" },
    { path: "/sitemap", name: "Sitemap", key: "footer.sitemap" },
  ];

  const renderLinks = (routes) =>
    routes.map((route) => (
      <li key={route.path}>
        <Link
          to={route.path}
          className="flex items-center justify-between text-[14px] text-gray-700 hover:text-red-600 transition-colors group">
          <span>{t(route.key, route.name)}</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-600 transition-colors" />
        </Link>
      </li>
    ));

  return (
    <div className="bg-[#F9F9F9] min-h-screen py-12 md:py-16">
      <Helmet>
        <title>Sitemap | Arjun Buildtech</title>
        <meta
          name="description"
          content="Sitemap for Arjun Buildtech. Find all pages, properties, and resources for real estate in Rohtak."
        />
      </Helmet>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Breadcrumb
          items={[
            { name: t("common.home", "Home"), path: "/" },
            { name: t("footer.sitemap", "Sitemap") },
          ]}
        />
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border border-red-100">
            <Globe className="w-3.5 h-3.5" />
            <span>
              {t("sitemap.directory", "Website Navigation Directory")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            {t("sitemap.title", "Arjun Buildtech Sitemap")}
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
            {t(
              "sitemap.description",
              "Easily navigate through all available pages, property categories, service channels, and legal policies on our website.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900 text-base">
                {t("sitemap.mainPages", "Main Pages")}
              </h2>
            </div>
            <ul className="space-y-3 flex-grow">{renderLinks(mainPages)}</ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900 text-base">
                {t("common.ourServices", "Our Services")}
              </h2>
            </div>
            <ul className="space-y-3 flex-grow">{renderLinks(servicePages)}</ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="font-semibold text-gray-900 text-base">
                {t("sitemap.legal", "Legal & Policies")}
              </h2>
            </div>
            <ul className="space-y-3 flex-grow">{renderLinks(legalPages)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
