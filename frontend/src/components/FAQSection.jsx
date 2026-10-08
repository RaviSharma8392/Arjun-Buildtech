import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Arjun Buildtech provide?",
      answer:
        "We specialize in property consulting and real estate services focused on helping clients sell and invest in properties within Rohtak, Haryana.",
    },
    {
      question: "Where is Arjun Buildtech located?",
      answer:
        "Our office is located at G74P, Sector-27, Rohtak, Haryana. You can visit us during working hours or schedule an appointment for personal assistance.",
    },
    {
      question: "Do you help with property investment planning?",
      answer:
        "Yes, we provide property investment guidance to help you make informed decisions that deliver long-term returns and security.",
    },
    {
      question: "Can I list my property for sale with Arjun Buildtech?",
      answer:
        "Absolutely! You can post your property for free through our website. We’ll help you connect with potential buyers and ensure smooth transactions.",
    },
    {
      question: "What types of properties do you deal in?",
      answer:
        "We deal in residential plots, houses, builder floors, apartments, and commercial properties in Rohtak. Our focus is always on quality and verified listings.",
    },
    {
      question: "Do you assist with property documents and registration?",
      answer:
        "Yes, our team provides full support for legal verification, registry, and documentation to make property transactions hassle-free.",
    },
    {
      question: "How can I contact Arjun Buildtech?",
      answer:
        "You can call us at +91 93504 47531 or email arjun.buildtech27@gmail.com. You can also send an inquiry through our website’s contact form.",
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

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Standard Portal Heading Design */}
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
            Find quick answers to common questions about our real estate
            services, property listings, and legal procedures in Rohtak.
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
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 md:px-5 pb-5 pt-1 text-[14px] text-gray-600 leading-relaxed border-t border-transparent">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
