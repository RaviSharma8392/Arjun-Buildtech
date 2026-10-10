import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes, FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();
  const location = useLocation();

  const isPropertyPage =
    location.pathname.startsWith("/property/") ||
    location.pathname.startsWith("/profile");

  useEffect(() => {
    if (isPropertyPage) return;

    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPropertyPage]);

  const redirectToWhatsApp = (text) => {
    const whatsappNumber = "919350447531"; 
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const quickReplies = [
    t("chatbot.plot", "Residential Plot"),
    t("chatbot.house", "Buy a House"),
    t("chatbot.sell", "Sell Property"),
    t("chatbot.investment", "Investment Advice"),
  ];

  if (isPropertyPage) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] md:inset-auto md:bottom-24 md:right-6 md:w-[320px] bg-white shadow-2xl md:rounded-xl overflow-hidden flex flex-col animate-in md:slide-in-from-bottom-5 slide-in-from-bottom-full fade-in duration-300">
          
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaWhatsapp className="w-6 h-6" />
              <h3 className="font-semibold text-[16px] tracking-wide">
                {t("chatbot.whatsappUs", "WhatsApp Us")}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1"
              title={t("chatbot.close", "Close")}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 flex-1 flex flex-col gap-4 bg-[#f9f9f9]">
            
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {t("chatbot.helloText", "Hello! How can we assist you today? We usually reply in a few minutes.")}
            </p>

            <button
              onClick={() => redirectToWhatsApp(t("chatbot.defaultMsg", "Hello! I want to know more about properties."))}
              className="bg-white border border-[#25D366] rounded-lg p-3 shadow-sm flex items-center justify-between hover:bg-[#f0fdf4] transition-all group w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="text-[#25D366]">
                  <FaWhatsapp className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-800">
                    {t("chatbot.clickToChat", "Start Chat")}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {t("chatbot.parveen", "Arjun Buildtech Properties")}
                  </p>
                </div>
              </div>
              <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-[#25D366]" />
            </button>

            <div className="pt-2 border-t border-gray-200 mt-1">
               <p className="text-[12px] text-gray-500 mb-3">
                 {t("chatbot.quickShortcuts", "Or choose a topic:")}
               </p>
               <div className="flex flex-col gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => redirectToWhatsApp(`Hi, I'm interested in: ${reply}`)}
                    className="bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-md text-[13px] font-medium hover:border-[#128C7E] hover:text-[#128C7E] transition-colors text-left w-full shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[9000]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          title="WhatsApp Us"
        >
          <FaWhatsapp className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default ChatBot;
