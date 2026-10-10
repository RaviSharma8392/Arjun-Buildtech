import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebookMessenger, FaRegComments } from "react-icons/fa";
import { useLanguage } from "../../context/useLanguage";

const ChatWithUs = () => {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900 mt-20">
      <Helmet>
        <title>Chat with Us | Arjun Buildtech</title>
        <meta
          name="description"
          content="Chat instantly with Arjun Buildtech support team via WhatsApp or Messenger."
        />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav
          aria-label={t("common.breadcrumb", "Breadcrumb")}
          className="flex items-center text-xs text-gray-500 mb-6">
          <Link
            to="/"
            className="hover:text-red-600 transition-colors duration-200">
            {t("common.home", "Home")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="text-gray-900">
            {t("chat.title", "Chat with Us")}
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-4 tracking-tight leading-snug">
            {t("chat.title", "Chat with Us")}
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            {t(
              "chat.intro",
              "Get instant answers to your questions. Connect with our property experts in real-time through your preferred messaging platform.",
            )}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/919899481428"
            target="_blank"
            rel="noreferrer"
            className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-[#25D366] transition-all group">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FaWhatsapp className="text-3xl text-[#25D366]" />
            </div>
            <h2 className="text-xl font-normal text-gray-800 mb-2">
              {t("chat.whatsappSupport", "WhatsApp Support")}
            </h2>
            <p className="text-[14px] text-gray-500 mb-6">
              {t(
                "chat.online",
                "Our experts are online and ready to help you with property details, site visits, and pricing.",
              )}
            </p>
            <span className="inline-block px-6 py-2.5 bg-[#25D366] text-white rounded font-medium shadow-sm">
              {t("chat.startWhatsApp", "Start WhatsApp Chat")}
            </span>
          </a>

          {/* Standard Contact */}
          <Link
            to="/contact"
            className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-red-600 transition-all group">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FaRegComments className="text-3xl text-red-600" />
            </div>
            <h2 className="text-xl font-normal text-gray-800 mb-2">
              {t("chat.sendMessage", "Send us a Message")}
            </h2>
            <p className="text-[14px] text-gray-500 mb-6">
              {t(
                "chat.formCopy",
                "Prefer to send a detailed inquiry? Use our contact form and we'll reply to your email.",
              )}
            </p>
            <span className="inline-block px-6 py-2.5 bg-red-600 text-white rounded font-medium shadow-sm">
              {t("chat.openForm", "Open Contact Form")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatWithUs;
