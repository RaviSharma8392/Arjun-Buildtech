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
      setMessages([{ from: "bot", text: "Hi 👋 How can I help you today?" }]);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log("User interaction needed to play sound");
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPropertyPage]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const whatsappNumber = "919876543210"; // your WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      userMessage
    )}`;
    window.open(url, "_blank");
    setUserMessage("");
  };

  if (isPropertyPage) return null;

  return (
    <div className="fixed bottom-18 right-6 z-50">
      {/* Hidden Audio */}
      <audio ref={audioRef} src="/notify.mp3" preload="auto" />

      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition">
          <FaComments className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-72 sm:w-80 md:w-96 bg-white shadow-xl rounded-2xl overflow-hidden  relative">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaWhatsapp />
              Chat with Us
            </div>
            {/* Cross Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 p-1 rounded-full transition">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 h-40 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.from === "bot"
                    ? "bg-gray-100 text-gray-700 self-start"
                    : "bg-green-600 text-white self-end ml-auto"
                }`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t border-gray-200">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 hover:bg-green-700 transition">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
