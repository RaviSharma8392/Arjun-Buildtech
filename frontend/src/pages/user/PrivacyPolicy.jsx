import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <Helmet>
        <title>Privacy Policy | Arjun Buildtech</title>
        <meta name="description" content="Read the privacy policy of Arjun Buildtech. We value your privacy and are committed to protecting your personal data." />
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Welcome to Arjun Buildtech. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our real estate services.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address, phone number, and property preferences when you fill out inquiry forms, subscribe to our newsletter, or contact our agents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide you with personalized real estate recommendations.</li>
              <li>Respond to your inquiries and support requests.</li>
              <li>Send you updates about new properties, plots, and villas in Rohtak.</li>
              <li>Improve our website and services based on user feedback.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Sharing of Information</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100 inline-block">
              <p><strong>Phone:</strong> +91-9350447531</p>
              <p><strong>Office:</strong> G74P, Sector-27, Rohtak, Haryana</p>
            </div>
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

export default PrivacyPolicy;
