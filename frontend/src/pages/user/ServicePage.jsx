import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, ChevronRight, PhoneCall } from "lucide-react";
import { servicesData } from "../../data/servicesData";
import InquiryPopup from "../../components/common/form/InquiryPopup";
import Breadcrumb from "../../components/common/Breadcrumb";

const SITE_URL = "https://arjunbuildtech.com";
const SITE_NAME = "Arjun Buildtech";
const LOGO_URL = `${SITE_URL}/arjunBuildTechLogo.png`;

const ServicePage = () => {
  const { slug } = useParams();
  const service = servicesData[slug];
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const pageUrl = `${SITE_URL}/services/${slug}`;
  const pageTitle = `${service.title} | ${SITE_NAME} Rohtak`;
  const pageDescription = service.heroSubtitle;

  // Enhanced JSON-LD Schema for Real Estate Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "RealEstateAgent",
      name: SITE_NAME,
      url: SITE_URL,
      logo: LOGO_URL,
      image: `${SITE_URL}/og-banner.jpg`,
      telephone: "+91-9350447531",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rohtak",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
    },
    description: pageDescription,
    areaServed: ["Rohtak", "Haryana", "Sector 27", "Sector 1"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
    ],
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-20 font-sans selection:bg-red-100 selection:text-red-900">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[55vh] min-h-[380px] flex items-center justify-center text-white pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${service.image})` }}></div>
        <div className="absolute inset-0 bg-gray-900/70 z-10 backdrop-blur-[2px]"></div>

        <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block text-red-400 text-xs font-bold uppercase tracking-widest mb-4 bg-black/40 px-3 py-1 rounded border border-red-500/30">
            Arjun Buildtech Professional Services
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal mb-5 leading-tight tracking-tight">
            {service.heroTitle}
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-6 mx-auto"></div>
          <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {service.heroSubtitle}
          </p>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 mx-auto uppercase">
            <PhoneCall className="w-4 h-4" />
            Get Free Consultation
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-3">
          <Breadcrumb items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title }
          ]} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left Column: Content */}
          <div className="lg:w-2/3">
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-normal text-gray-800 mb-4">
                About This Service
              </h2>
              <div className="w-12 h-1 bg-red-600 mb-6"></div>

              <div className="prose prose-lg max-w-none text-gray-600 space-y-5 font-light text-[16px] leading-relaxed">
                {service.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
              <h3 className="text-2xl font-normal text-gray-800 mb-4">
                Key Benefits
              </h3>
              <div className="w-12 h-1 bg-red-600 mb-6"></div>

              <ul className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-gray-50/50 p-4 rounded border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-semibold text-sm">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
                <h3 className="text-2xl font-normal text-gray-800 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="w-12 h-1 bg-red-600 mb-6"></div>

                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-gray-50/50 rounded-lg border border-gray-200 p-5">
                      <h4 className="text-base font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>

              <h3 className="text-xl font-normal text-gray-800 mb-3 mt-1">
                Ready to Get Started?
              </h3>
              <div className="w-10 h-1 bg-red-600 mb-4"></div>

              <p className="text-gray-600 mb-6 text-sm font-light leading-relaxed">
                Fill out our quick inquiry form and our real estate experts in
                Rohtak will contact you shortly.
              </p>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded font-bold text-sm uppercase tracking-wide transition shadow-sm flex justify-center items-center gap-2">
                Inquire Now
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Or call us directly:
                </p>
                <a
                  href="tel:+919350447531"
                  className="text-lg font-extrabold text-red-600 hover:text-red-800 transition">
                  +91 93504-47531
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InquiryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default ServicePage;
