import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaComments, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const location = useLocation();

  // Hide chatbot on property or profile pages
  const isPropertyPage =
    location.pathname.startsWith("/property/") ||
    location.pathname.startsWith("/profile");

  useEffect(() => {
    if (isPropertyPage) return;

    setMessages([
      {
        from: "bot",
        text: "Hi! Looking for a premium property in Rohtak? I can help you find the best deals in HSVP and Suncity Sectors. How can I assist you today?",
      },
    ]);

    // Only auto-open on desktop after 3 seconds
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPropertyPage]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    redirectToWhatsApp(userMessage);
    setUserMessage("");
  };

  const redirectToWhatsApp = (text) => {
    const whatsappNumber = "919350447531"; // your WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const quickReplies = [
    "I'm looking for a residential plot",
    "I want to buy a house",
    "I have a property to sell",
    "I need investment advice"
  ];

  if (isPropertyPage) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div className="fixed bottom-18 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-red-600 text-white p-3.5 md:p-4 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center z-50">
            <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-18 md:right-6 z-[9999] w-full h-full md:w-96 md:h-auto bg-white shadow-2xl md:rounded-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 font-semibold flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/help.png"
                  alt="Support agent"
                  className="w-10 h-10 rounded-full object-cover bg-white"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-300 border-2 border-red-700 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-base leading-none font-bold">Parveen Gehlawat</span>
                <span className="text-xs font-medium text-red-100 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse"></span>
                  Replies typically in minutes
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <a href="tel:+919350447531" className="hover:bg-red-800 p-2 rounded-full transition-colors opacity-90 hover:opacity-100" title="Call Now">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-red-800 p-2 rounded-full transition-colors opacity-90 hover:opacity-100" title="Close">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 flex-1 md:h-80 overflow-y-auto text-sm space-y-4 bg-[#efeae2] flex flex-col relative">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${
                  msg.from === "bot"
                    ? "bg-white text-gray-800 self-start rounded-tl-none border border-gray-100"
                    : "bg-red-100 text-gray-800 self-end ml-auto rounded-tr-none"
                }`}>
                {msg.text}
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-2 items-end animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => redirectToWhatsApp(reply)}
                    className="bg-white border border-red-200 text-red-700 px-4 py-2.5 rounded-2xl rounded-tr-none text-xs sm:text-sm font-medium hover:bg-red-50 transition-colors shadow-sm text-left max-w-[90%] active:scale-95">
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex border-t border-gray-200 bg-gray-50 p-3 gap-2 items-center z-10">
            <div className="flex-1 bg-white rounded-full border border-gray-300 flex items-center px-4 py-2 shadow-inner focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-all">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Message..."
                className="w-full bg-transparent border-none focus:outline-none text-sm md:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white p-3 w-12 h-12 flex items-center justify-center rounded-full hover:bg-red-700 transition-colors shadow-md active:scale-95 shrink-0">
              <svg
                className="w-5 h-5 transform rotate-45 -mt-1 -ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
