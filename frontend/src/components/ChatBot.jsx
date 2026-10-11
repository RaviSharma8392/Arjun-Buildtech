import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import { companyInfo } from "../data/companyInfo";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const isPropertyPage =
    location.pathname.startsWith("/property/") ||
    location.pathname.startsWith("/profile");

  const redirectToWhatsApp = (text) => {
    const url = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const quickReplies = [
    t("chatbot.plot", "Residential Plot"),
    t("chatbot.house", "Buy a House"),
    t("chatbot.commercial", "Commercial property"),
    t("chatbot.investment", "Investment Advice"),
  ];

  if (isPropertyPage) return null;

  return (
    <>
      {isOpen && (
        <section
          id="whatsapp-enquiry-panel"
          aria-labelledby="whatsapp-enquiry-title"
          className="fixed bottom-20 left-3 right-3 z-[9999] flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl md:bottom-24 md:left-auto md:right-6 md:w-[22rem]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
              <h3
                id="whatsapp-enquiry-title"
                className="text-[16px] font-semibold">
                {t("chatbot.whatsappUs", "Message Arjun Buildtech")}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={t("chatbot.close", "Close WhatsApp panel")}
              className="rounded p-2 text-white transition-colors hover:bg-white/10"
              title={t("chatbot.close", "Close")}>
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-gray-50 p-4">
            <p className="text-sm leading-relaxed text-gray-600">
              {t(
                "chatbot.helloText",
                "Ask us about current listings, property details, or investment enquiries in Rohtak.",
              )}
            </p>

            <button
              onClick={() =>
                redirectToWhatsApp(
                  t(
                    "chatbot.defaultMsg",
                    "Hello! I want to know more about properties.",
                  ),
                )
              }
              className="group flex w-full items-center justify-between rounded-lg border border-green-200 bg-white p-3 text-left shadow-sm transition-colors hover:bg-green-50">
              <div className="flex items-center gap-3">
                <div className="text-[#25D366]">
                  <FaWhatsapp className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-gray-900">
                    {t("chatbot.clickToChat", "Start WhatsApp enquiry")}
                  </p>
                  <p className="text-[13px] text-gray-500">
                    {companyInfo.name}
                  </p>
                </div>
              </div>
              <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-[#25D366]" />
            </button>

            <div className="mt-1 border-t border-gray-200 pt-3">
              <p className="mb-3 text-[13px] font-medium text-gray-600">
                {t("chatbot.quickShortcuts", "Or choose a topic:")}
              </p>
              <div className="flex flex-col gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      redirectToWhatsApp(`Hi, I'm interested in: ${reply}`)
                    }
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-left text-[14px] font-medium text-gray-700 shadow-sm transition-colors hover:border-[#075E54] hover:text-[#075E54]">
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Floating Button */}
      {!isPropertyPage && (
        <div className="fixed bottom-5 right-5 z-[9000] md:bottom-6 md:right-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen ? "Close WhatsApp panel" : "Open WhatsApp enquiries"
            }
            aria-expanded={isOpen}
            aria-controls="whatsapp-enquiry-panel"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#075E54] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#064E46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2"
            title={t("chatbot.whatsappUs", "WhatsApp enquiries")}>
            {isOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaWhatsapp className="h-7 w-7" />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ChatBot;
