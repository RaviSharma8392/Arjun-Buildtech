import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";
import ContactForm from "../components/common/form/ContactForm";
import Breadcrumb from "../components/common/Breadcrumb";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactPersons = [
    { name: "Parveen Gehlawat", phones: ["93504-47531", "98994-81428"] },
    { name: "Naveen Gehlawat", phones: ["98121-50126"] },
  ];

  const offices = [
    { name: "Head Office", address: "G74P, Sector-27, Rohtak, Haryana" },
    {
      name: "Branch Office",
      address: "828, Sector-1, Rohtak, Haryana, 124001",
    },
  ];

  const companyImages = [
    "/ARJUN ROHTAK BROCHURE (2)_page-0001.jpg",
    "/ARJUN ROHTAK BROCHURE (2)_page-0002.jpg",
    "/ARJUN ROHTAK BROCHURE (2)_page-0003.jpg",
    "/ARJUN ROHTAK BROCHURE (2)_page-0004.jpg",
  ];

  // LocalBusiness Schema for Local SEO dominance
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Arjun Buildtech",
    image: "https://arjunbuildtech.com/arjunBuildTechLogo.png",
    description:
      "Leading real estate advisors and property consultants in Rohtak, Haryana with a decade of experience.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "G74P, Sector-27",
      addressLocality: "Rohtak",
      addressRegion: "Haryana",
      postalCode: "124001",
      addressCountry: "IN",
    },
    telephone: "+91-9350447531",
    email: "arjunbuildtech27@gmail.com",
    url: "https://arjunbuildtech.com/profile",
    areaServed: "Rohtak",
    priceRange: "$$",
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-12 md:py-16">
      <Helmet>
        <title>
          About Arjun Buildtech | Top Real Estate Consultants in Rohtak
        </title>
        <meta
          name="description"
          content="Learn about Arjun Buildtech, Rohtak's most trusted real estate agency. We specialize in buying, selling, and investing in residential plots and commercial properties."
        />
        <link rel="canonical" href="https://arjunbuildtech.com/profile" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-12">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Company Profile" }]} />
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mt-4">
          <span className="inline-block bg-red-50 text-red-600 border border-red-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Company Profile
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Arjun Buildtech
          </h1>
          <p className="text-gray-600 text-[15px] md:text-base leading-relaxed">
            If you are looking for a trusted property consultant to help you
            secure your dream plot, luxury villa, or high-return investment, you
            are at the right place. As one of the leading real estate advisory
            firms in Rohtak, Haryana, we bring over a decade of verified market
            expertise to ensure your investments are safe and profitable.
          </p>
        </div>

        {/* Core Values / Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <FaBuilding size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Prime Real Estate
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Specializing in HSVP Sectors, Suncity, and premium commercial
              properties across Rohtak.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <FaBriefcase size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Investment Advisory
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tailored investment strategies designed to maximize ROI and
              long-term capital appreciation.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <FaCheckCircle size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              100% Transparency
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Guaranteed clear titles, complete legal verification, and
              end-to-end documentation support.
            </p>
          </div>
        </div>

        {/* Brochure / Image Gallery */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Our Portfolio
            </h2>
            <div className="w-12 h-1 bg-red-600"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companyImages.map((img, idx) => (
              <div
                key={idx}
                className="relative group overflow-hidden rounded bg-gray-100 border border-gray-200 aspect-[3/4]">
                <img
                  src={img}
                  alt={`Arjun Buildtech Brochure Page ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Offices Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Contact Details */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 h-full">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Contact Directory
                </h2>
                <div className="w-12 h-1 bg-red-600"></div>
              </div>

              <div className="space-y-8">
                {/* Persons */}
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Key Personnel
                  </h3>
                  <div className="space-y-4">
                    {contactPersons.map((person, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FaPhoneAlt className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {person.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {person.phones.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Offices */}
                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Our Offices
                  </h3>
                  <div className="space-y-4">
                    {offices.map((office, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FaMapMarkerAlt className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {office.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                            {office.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Email */}
                <div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Email Address
                      </p>
                      <a
                        href="mailto:arjunbuildtech27@gmail.com"
                        className="text-sm text-gray-600 hover:text-red-600 transition-colors mt-0.5 block">
                        arjunbuildtech27@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="h-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
