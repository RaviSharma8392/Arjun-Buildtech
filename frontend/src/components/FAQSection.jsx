import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/useLanguage";
import { companyInfo } from "../data/companyInfo";

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Arjun Buildtech provide?",
      answer:
        "We specialize in property consulting and real estate services focused on helping clients sell and invest in properties within Rohtak, Haryana.",
    },
    {
      question: "Where is Arjun Buildtech located?",
      answer: `Our business address is ${companyInfo.address}. Please contact us before visiting to confirm the appropriate location.`,
    },
    {
      question: "Do you help with property investment planning?",
      answer:
        "We can discuss your goals and help compare available property information. Future prices or investment returns are not guaranteed.",
    },
    {
      question: "Can I list my property for sale with Arjun Buildtech?",
      answer:
        "Contact us to discuss the listing process, required property details, and any applicable terms before proceeding.",
    },
    {
      question: "What types of properties do you deal in?",
      answer:
        "Property types vary by current availability. Browse the listings page for residential plots, homes, and commercial options in Rohtak.",
    },
    {
      question: "Do you assist with property documents and registration?",
      answer:
        "We can help explain the information available for a listing and discuss next steps. Have property documents reviewed independently by a qualified legal professional.",
    },
    {
      question: "How can I contact Arjun Buildtech?",
      answer: `Call us at ${companyInfo.phone} or email ${companyInfo.email}. You can also send an inquiry through our website’s contact form.`,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-12 md:py-16 border-t border-gray-200">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="site-container">
        <div className="mx-auto max-w-4xl">
          {/* Standard Portal Heading Design */}
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
              {t("home.faqTitle", "Frequently Asked Questions")}
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
              {t(
                "home.faqIntro",
                "Find quick answers to common questions about our real estate services, property listings, and legal procedures in Rohtak.",
              )}
            </p>
          </div>

          {/* Clean Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white border transition-colors duration-200 rounded-md overflow-hidden ${
                    isOpen
                      ? "border-gray-300"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-4 md:p-5 text-left bg-white hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-gray-900 text-[15px] pr-4 leading-snug">
                      {t(`home.faq${index + 1}q`, faq.question)}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 md:px-5 pb-5 pt-1 text-[14px] text-gray-600 leading-relaxed border-t border-transparent">
                      {t(`home.faq${index + 1}a`, faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
