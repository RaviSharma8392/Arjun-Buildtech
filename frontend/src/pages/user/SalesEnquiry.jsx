import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "../../components/common/form/ContactForm";

const SalesEnquiry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900 mt-20">
      <Helmet>
        <title>Sales Enquiry | Arjun Buildtech</title>
        <meta name="description" content="Submit a sales enquiry for buying, selling, or investing in real estate with Arjun Buildtech in Rohtak." />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-600 transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="text-gray-900">Sales Enquiry</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-4 tracking-tight leading-snug">
            Sales Enquiry
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            Interested in buying, selling, or investing? Fill out the form below and our sales experts will get back to you with the best property options tailored to your needs.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-normal text-gray-800 mb-6">Submit Your Details</h2>
            {/* Reuse the existing contact form component */}
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-normal text-gray-800 mb-4">Direct Sales Line</h3>
              <p className="text-[15px] text-gray-600 mb-4">
                Prefer to speak with someone immediately? Call our dedicated sales team.
              </p>
              <a href="tel:+919899481428" className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors">
                Call +91 98994 81428
              </a>
            </div>

            <div className="bg-gray-800 text-white border border-gray-800 rounded-lg p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-normal mb-4">Why choose Arjun Buildtech?</h3>
              <ul className="space-y-3 text-[15px] text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✔</span>
                  100% verified properties and transparent pricing.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✔</span>
                  Expert guidance on legal checks and documentation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✔</span>
                  Deep local market knowledge across Rohtak and NCR.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesEnquiry;
