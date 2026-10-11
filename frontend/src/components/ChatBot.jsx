import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FaWhatsapp,
  FaTimes,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { companyInfo } from "../data/companyInfo";
import {
  getUserProfile,
  saveUserProfile,
} from "../utils/userProfile";

// Helper for time-based greeting in English
const getGreetingTimeEn = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

// Helper for time-based greeting in Hindi
const getGreetingTimeHi = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "शुभ प्रभात";
  if (hour < 18) return "शुभ दोपहर";
  return "शुभ संध्या";
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // User Profile
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [step, setStep] = useState("name"); // "name" | "phone" | "chat"

  // Messages stream
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const isPropertyPage = location.pathname.startsWith("/property/");

  // Sync profile from localStorage / userProfile utility
  useEffect(() => {
    const syncProfile = () => {
      const p = getUserProfile();
      if (p.name && p.phone) {
        setUserName(p.name);
        setUserPhone(p.phone);
        setStep("chat");
      } else if (p.name) {
        setUserName(p.name);
        setStep("phone");
      } else {
        setUserName("");
        setUserPhone("");
        setStep("name");
      }
    };

    syncProfile();
    window.addEventListener("arjun-profile-updated", syncProfile);
    window.addEventListener("storage", syncProfile);
    return () => {
      window.removeEventListener("arjun-profile-updated", syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, []);

  // Initialize conversation when opened
  useEffect(() => {
    const p = getUserProfile();
    if (p.name && p.phone) {
      setUserName(p.name);
      setUserPhone(p.phone);
      setStep("chat");
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: `${getGreetingTimeEn()}, ${p.name}! 👋 Welcome back to Arjun Buildtech.\n${getGreetingTimeHi()}, ${p.name}! अर्जुन बिल्डटेक में आपका स्वागत है। 🙏\n\nHow can we help you today with properties in Rohtak? Feel free to type your question below.`,
        },
      ]);
    } else {
      setUserName("");
      setUserPhone("");
      setStep("name");
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: `Namaste & Welcome to Arjun Buildtech! 🙏\nनमस्ते और अर्जुन बिल्डटेक में आपका स्वागत है!\n\nPlease enter your Name:\nकृपया अपना नाम बताएं:`,
        },
      ]);
    }
  }, [isOpen]);

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Global listener to open chat
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-chatbot-modal", handleOpenChat);
    return () => window.removeEventListener("open-chatbot-modal", handleOpenChat);
  }, []);

  if (isPropertyPage) return null;

  const directWhatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Namaste Arjun Buildtech! I am inquiring from your website about properties in Rohtak. Please guide me.",
  )}`;

  // Handle Send Message
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    const cleanText = inputText.trim();
    if (!cleanText) return;

    // Add user message to stream
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: cleanText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // STEP 1: Awaiting Name
    if (step === "name") {
      if (cleanText.length < 2) {
        setIsBotTyping(true);
        setTimeout(() => {
          setIsBotTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "Please enter a valid Name (at least 2 letters):\nकृपया अपना सही नाम दर्ज करें:",
            },
          ]);
        }, 400);
        return;
      }

      setUserName(cleanText);
      setStep("phone");
      setIsBotTyping(true);
      setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Nice to connect with you, ${cleanText}! 😊\nTo assist you better, please enter your 10-digit mobile number:\nकृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें:`,
          },
        ]);
      }, 450);
      return;
    }

    // STEP 2: Awaiting Mobile Number
    if (step === "phone") {
      const cleanDigits = cleanText.replace(/\D/g, "");
      const isValid = cleanDigits.length === 10 && /^[6-9]\d{9}$/.test(cleanDigits);

      if (!isValid) {
        setIsBotTyping(true);
        setTimeout(() => {
          setIsBotTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "bot",
              text: "Oops! Please enter a valid 10-digit Indian mobile number.\nकृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें:",
            },
          ]);
        }, 400);
        return;
      }

      // Valid phone! Save to localStorage and Admin Firestore
      setUserPhone(cleanDigits);
      setStep("chat");

      // 1. Save to centralized storage (auto-fills all contact forms)
      saveUserProfile({
        name: userName,
        phone: cleanDigits,
        verified: true,
      });

      // 2. Save lead to Admin Firestore inquiries collection
      try {
        await addDoc(collection(db, "inquiries"), {
          name: userName,
          phone: cleanDigits,
          message: "New user registered via chat",
          source: "Website Chatbot",
          status: "new",
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error saving chatbot lead:", err);
      }

      setIsBotTyping(true);
      setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `✅ Thank you, ${userName}! Your details have been saved.\nधन्यवाद, ${userName}! आपका विवरण सुरक्षित कर लिया गया है।\n\nOur property specialist will assist you shortly. What kind of property are you looking for in Rohtak? (Plots, Houses, Commercial)`,
          },
        ]);
      }, 500);
      return;
    }

    // STEP 3: Regular Chat Query
    if (step === "chat") {
      setIsBotTyping(true);

      // Save user inquiry query to Admin Firestore
      try {
        await addDoc(collection(db, "inquiries"), {
          name: userName || "Visitor",
          phone: userPhone || "",
          message: cleanText,
          source: "Website Chatbot Message",
          status: "new",
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error saving chat message to admin:", err);
      }

      setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: `Thank you, ${userName}! We have received your query: "${cleanText}".\nOur team is contacting you at +91 ${userPhone} shortly.\n\nधन्यवाद ${userName}! हमें आपकी पूछताछ मिल गई है, हमारी टीम जल्द ही आपसे संपर्क करेगी।\n\nYou can also message us directly on WhatsApp anytime:\n👉 https://wa.me/${companyInfo.whatsapp}`,
          },
        ]);
      }, 500);
    }
  };

  return (
    <>
      {/* Desktop Overlay - Direct close on click */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-[9998] hidden md:block animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Chat Window */}
      <div
        id="helpdesk-chatbot-window"
        className={`fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#f8f9fa] flex flex-col font-sans transition-transform duration-300 shadow-2xl md:left-auto md:right-0 md:w-[420px] md:border-l md:border-gray-200 ${
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full hidden"
        }`}>
        {/* Red Header - Simple with direct close button, no 3 dots */}
        <div className="bg-[#d8232a] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
              <span className="font-black text-[#d8232a] text-base tracking-tighter">
                AB
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[17px] tracking-tight leading-none text-white">
                Arjun Buildtech
              </h3>
              <p className="text-[12px] text-red-100 font-medium mt-1">
                Helpdesk Support {userName ? `• Hi, ${userName}` : "• Online"}
              </p>
            </div>
          </div>

          {/* Direct Close Button - Closes instantly without asking Yes/No */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            title="Close chat"
            aria-label="Close chat"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Pure Simple Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f4f5f7]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}>
              {msg.sender === "user" ? (
                /* User Bubble with Checkmark (Exact Match to Image 2) */
                <div className="max-w-[85%] bg-[#d8232a] text-white text-[14px] px-4 py-2.5 rounded-2xl rounded-tr-sm shadow-sm font-medium flex items-center gap-1.5">
                  <span className="whitespace-pre-line leading-snug">{msg.text}</span>
                  <FaCheck className="w-3 h-3 text-red-200 shrink-0 ml-1 inline-block" />
                </div>
              ) : (
                /* Bot Bubble (Exact Match to Image 2) */
                <div className="max-w-[90%] bg-white text-gray-800 text-[14px] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200/70 whitespace-pre-line leading-relaxed font-normal">
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isBotTyping && (
            <div className="flex items-center gap-1.5 bg-white px-4 py-3 rounded-2xl rounded-tl-sm w-18 border border-gray-200/70 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#d8232a] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#d8232a] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#d8232a] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Bar */}
        <div className="bg-white p-3 border-t border-gray-200 shrink-0">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1.5 focus-within:border-[#d8232a] focus-within:ring-2 focus-within:ring-red-100 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                step === "name"
                  ? "Enter your name / अपना नाम लिखें..."
                  : step === "phone"
                  ? "Enter 10-digit mobile number..."
                  : "Type your message / संदेश लिखें..."
              }
              className="flex-1 bg-transparent text-sm py-1.5 px-2 outline-none text-gray-800 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-[#d8232a] hover:bg-[#b71c1c] disabled:opacity-30 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer">
              <FaPaperPlane className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Bottom-Right Widgets (ONLY 2 WIDGETS: 1. WhatsApp, 2. Assistant) */}
      <aside
        id="floating-helpdesk-widgets"
        aria-label="Contact and Helpdesk Support"
        className={`fixed bottom-6 right-4 sm:bottom-7 sm:right-6 z-[9000] flex flex-col items-end gap-3 transition-opacity duration-300 ${
          isOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}>
        {/* WIDGET 1: WhatsApp */}
        <a
          href={directWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Enquiry"
          className="group flex items-center gap-2.5 rounded-full border border-gray-200/90 bg-white/95 backdrop-blur-md p-1.5 pr-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
            <FaWhatsapp className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full ring-2 ring-white" />
          </div>
          <span className="text-[13px] font-extrabold text-gray-800 group-hover:text-emerald-700 tracking-tight whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        {/* WIDGET 2: Assistant Trigger Avatar (Only 2 widgets on desktop!) */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Helpdesk Chatbot"
          className="group flex items-center gap-2.5 rounded-full border-2 border-[#00bcd4] bg-white p-1 pr-4 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500 cursor-pointer mt-1">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F7FA] overflow-hidden shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="#E0F7FA"
                stroke="#00BCD4"
                strokeWidth="2.5"
              />
              <path
                d="M20 32 C20 22, 44 22, 44 32"
                stroke="#00BCD4"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <rect
                x="18"
                y="29"
                width="4.5"
                height="10"
                rx="2.2"
                fill="#00BCD4"
              />
              <rect
                x="41.5"
                y="29"
                width="4.5"
                height="10"
                rx="2.2"
                fill="#00BCD4"
              />
              <path
                d="M42 35 C42 43, 34 45, 29 45"
                stroke="#00BCD4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="28" cy="45" r="2.5" fill="#00BCD4" />
              <path
                d="M23 28 C23 21, 27 18, 32 18 C37 18, 41 21, 41 28 C41 30, 40 33, 39 33 C38 27, 35 24, 32 24 C29 24, 26 27, 25 33 C24 33, 23 30, 23 28 Z"
                fill="#2d3748"
              />
              <path
                d="M25 29 C25 37, 28 42, 32 42 C36 42, 39 37, 39 29 Z"
                fill="#FBD38D"
              />
              <path d="M29 42 L29 46 L35 46 L35 42 Z" fill="#FBD38D" />
              <path
                d="M21 54 C21 48, 26 46, 32 46 C38 46, 43 48, 43 54 Z"
                fill="#4DD0E1"
              />
            </svg>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] ring-2 ring-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[14px] font-extrabold text-gray-900 group-hover:text-[#00bcd4] tracking-tight whitespace-nowrap">
              {userName ? `Hi, ${userName}` : "Helpdesk Chat"}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold tracking-tight">
              Online Now
            </span>
          </div>
        </button>
      </aside>
    </>
  );
};

export default ChatBot;
