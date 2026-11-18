import React from "react";
import { Helmet } from "react-helmet-async";
import ContactInfo from "../../components/common/info/ContactInfo";
import ContactForm from "../../components/common/form/ContactForm";
import MapSection from "../../components/MapSection";

import Breadcrumb from "../../components/common/Breadcrumb";

const SITE_URL = "https://arjunbuildtech.com";

const ContactUs = ({ isStandalone = true }) => {
  const pageUrl = `${SITE_URL}/contact`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${pageUrl}#contact-page`,
    url: pageUrl,
    name: "Contact Arjun Buildtech",
    description:
      "Contact Arjun Buildtech about property listings and real estate enquiries in Rohtak.",
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <section className="bg-white border-t border-gray-200">
      {isStandalone && (
        <Helmet>
          <title>Contact Us | Arjun Buildtech</title>
          <meta name="description" content="Get in touch with Arjun Buildtech for any real estate inquiries in Rohtak. We are here to help you find your dream property." />
          <link rel="canonical" href={pageUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Contact Arjun Buildtech" />
          <meta property="og:description" content="Contact Arjun Buildtech about property listings and real estate enquiries in Rohtak." />
          <meta property="og:url" content={pageUrl} />
          <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        </Helmet>
      )}
      <div className="py-12 md:py-16">
        {/* Main Content Container */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-12 md:mb-16">
          {isStandalone && <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Contact Us" }]} />}
          {isStandalone && (
            <h1 className="mb-6 text-3xl font-normal text-gray-900 md:text-4xl">
              Contact Arjun Buildtech
            </h1>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="w-full">
              <ContactInfo />
            </div>

            {/* Right: Form */}
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map Section (Full width or contained based on your MapSection component) */}
        <div className="w-full bg-gray-50 border-t border-gray-200">
          <MapSection />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
