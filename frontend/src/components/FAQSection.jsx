import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Arjun Buildtech provide?",
      answer:
        "We specialize in property consulting and real estate services focused on helping clients buy, sell, and invest in properties within Rohtak, Haryana.",
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

  return (
    <section className="bg-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-gray-800 hover:bg-gray-100 transition">
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
