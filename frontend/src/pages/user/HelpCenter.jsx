import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import Breadcrumb from "../../components/common/Breadcrumb";

const HelpCenter = () => {
  const { t } = useLanguage();
  const pageUrl = "https://arjunbuildtech.com/help-center";
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Help Center | Arjun Buildtech",
    description:
      "Find help with property listings, enquiries, and buying or selling processes in Rohtak.",
    about: { "@id": "https://arjunbuildtech.com/#organization" },
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "How do I schedule a property visit?",
      answer:
        "You can schedule a property visit by filling out the Sales Enquiry form or contacting us directly via phone. Our agents will coordinate a time that works best for you.",
    },
    {
      question: "What legal documents are required for buying?",
      answer:
        "Typically, you will need a valid ID, PAN card, address proof, and passport-size photographs. Depending on the property, No Dues Certificates (NDC) and previous registry papers will also be checked.",
    },
    {
      question: "Do you offer assistance with home loans?",
      answer:
        "We can explain the information available for a listing and point you to the questions to ask a lender. Confirm eligibility, rates, and loan terms directly with the bank.",
    },
    {
      question: "How can I list my property for sale?",
      answer:
        "You can reach out to our team through the 'Contact Us' page or by calling our support line. We can discuss the property information and listing process.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900 mt-20">
      <Helmet>
        <title>Help Center | Arjun Buildtech</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions and get support for buying, selling, or renting properties with Arjun Buildtech."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Help Center | Arjun Buildtech" />
        <meta property="og:description" content="Find help with property listings, enquiries, and buying or selling processes in Rohtak." />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Help Center" }]} />

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-4 tracking-tight leading-snug">
            {t("help.title", "Help Center")}
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            {t(
              "help.intro",
              "Find answers to frequently asked questions, learn more about our processes, and discover how Arjun Buildtech can help you secure your dream property.",
            )}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm max-w-4xl">
          <h2 className="text-2xl font-normal text-gray-800 mb-6">
            {t("help.faqHeading", "Frequently Asked Questions")}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t(`help.faq${idx + 1}q`, faq.question)}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {t(`help.faq${idx + 1}a`, faq.answer)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-red-50 rounded-lg border border-red-100">
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              {t("help.stillNeed", "Still need help?")}
            </h3>
            <p className="text-[15px] text-gray-600 mb-5">
              {t(
                "help.stillNeedCopy",
                "If you couldn't find the answer to your question, our support team is always ready to assist you.",
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-callback-modal"))
                }
                className="px-6 py-2.5 bg-[#d8232a] text-white rounded font-bold hover:bg-[#b71c1c] transition-colors cursor-pointer shadow-xs">
                Request a Callback
              </button>
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:text-red-600 hover:border-red-600 transition-colors">
                {t("help.contactSupport", "Contact Support")}
              </Link>
              <Link
                to="/chat-with-us"
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:text-red-600 hover:border-red-600 transition-colors">
                {t("nav.chatWithUs", "Chat with Us")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
