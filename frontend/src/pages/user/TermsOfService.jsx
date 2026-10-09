import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <Helmet>
        <title>Terms of Service | Arjun Buildtech</title>
        <meta name="description" content="Read the terms of service for using Arjun Buildtech's real estate consulting services in Rohtak." />
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Welcome to Arjun Buildtech. By accessing our website and using our real estate services, you agree to be bound by the following Terms and Conditions. Please read them carefully.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Services Provided</h2>
            <p>
              Arjun Buildtech provides real estate consulting services, including assistance with buying, selling, and investing in residential plots, luxury villas, and commercial properties in Rohtak, Haryana. All property details, availability, and prices are subject to change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information Accuracy</h2>
            <p>
              While we strive to ensure that all information on our website is accurate and up-to-date, we do not warrant the completeness, reliability, or accuracy of this information. Property listings are provided for general informational purposes and do not constitute a binding offer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Client Responsibilities</h2>
            <p>
              Clients are responsible for verifying all property-related information, including legal title, zoning, and physical condition, before making any financial commitments. Arjun Buildtech is not liable for any losses incurred due to discrepancies in property documents or physical conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites (e.g., government portals for checking property status). These links are provided for your convenience. We have no control over the content of these sites and assume no responsibility for them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page. Your continued use of our services following any modifications constitutes acceptance of the new terms.
            </p>
          </section>

          <div className="pt-8 mt-8 border-t">
            <Link to="/" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
