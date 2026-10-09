import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "How do I schedule a property visit?",
      answer: "You can schedule a property visit by filling out the Sales Enquiry form or contacting us directly via phone. Our agents will coordinate a time that works best for you.",
    },
    {
      question: "What legal documents are required for buying?",
      answer: "Typically, you will need a valid ID, PAN card, address proof, and passport-size photographs. Depending on the property, No Dues Certificates (NDC) and previous registry papers will also be checked.",
    },
    {
      question: "Do you offer assistance with home loans?",
      answer: "Yes, we partner with leading banks and financial institutions to help our clients secure home loans with favorable interest rates and quick processing.",
    },
    {
      question: "How can I list my property for sale?",
      answer: "You can reach out to our team through the 'Contact Us' page or by calling our support line. We will evaluate your property and list it across our premium channels.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900 mt-20">
      <Helmet>
        <title>Help Center | Arjun Buildtech</title>
        <meta name="description" content="Find answers to frequently asked questions and get support for buying, selling, or renting properties with Arjun Buildtech." />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-600 transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="text-gray-900">Help Center</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-4 tracking-tight leading-snug">
            Help Center
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            Find answers to frequently asked questions, learn more about our processes, and discover how Arjun Buildtech can help you secure your dream property.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm max-w-4xl">
          <h2 className="text-2xl font-normal text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-red-50 rounded-lg border border-red-100">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Still need help?</h3>
            <p className="text-[15px] text-gray-600 mb-5">
              If you couldn't find the answer to your question, our support team is always ready to assist you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-6 py-2.5 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors">
                Contact Support
              </Link>
              <Link to="/chat-with-us" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:text-red-600 hover:border-red-600 transition-colors">
                Chat with Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
