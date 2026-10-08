import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaComments, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const audioRef = useRef(null);

  const location = useLocation();

  // Hide chatbot on property or profile pages
  const isPropertyPage =
    location.pathname.startsWith("/property/") ||
    location.pathname.startsWith("/profile");

  useEffect(() => {
    if (isPropertyPage) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([
        {
          from: "bot",
          text: "Hi! Looking for a premium property in Rohtak? I can help you find the best deals in HSVP and Suncity Sectors. How can I assist you today?",
        },
      ]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPropertyPage]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const whatsappNumber = "919350447531"; // your WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      userMessage,
    )}`;
    window.open(url, "_blank");
    setUserMessage("");
  };

  if (isPropertyPage) return null;

  return (
    <div className="fixed bottom-18 right-6 z-50">
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center justify-center animate-bounce">
          <FaWhatsapp className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-72 sm:w-80 md:w-96 bg-white shadow-2xl rounded-2xl overflow-hidden relative border border-gray-100 flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 font-semibold flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                 <FaWhatsapp className="w-8 h-8 text-white" />
                 <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-300 border-2 border-green-600 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-base leading-none">Parveen Gehlawat</span>
                <span className="text-xs font-normal text-green-100 mt-1">Real Estate Expert | Online</span>
              </div>
            </div>
            {/* Cross Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 p-1.5 rounded-full transition-colors opacity-80 hover:opacity-100">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto text-sm space-y-4 bg-slate-50 flex flex-col">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${
                  msg.from === "bot"
                    ? "bg-white text-gray-800 self-start rounded-tl-none border border-gray-100"
                    : "bg-green-500 text-white self-end ml-auto rounded-tr-none"
                }`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t border-gray-200 bg-white p-2 gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-600 transition-colors shadow-md">
              <svg className="w-4 h-4 transform rotate-45 -mt-1 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
