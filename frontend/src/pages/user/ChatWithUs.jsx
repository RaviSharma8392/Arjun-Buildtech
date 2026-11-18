import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaRegComments,
} from "react-icons/fa";
import { useLanguage } from "../../context/useLanguage";
import { companyInfo } from "../../data/companyInfo";
import Breadcrumb from "../../components/common/Breadcrumb";

const ChatWithUs = () => {
  const { t } = useLanguage();
  const pageUrl = "https://arjunbuildtech.com/chat-with-us";
  const pageDescription =
    "Contact Arjun Buildtech about current property listings and enquiries through WhatsApp, callback, or the contact form.";
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${pageUrl}#contact-page`,
    url: pageUrl,
    name: "Chat with Us | Arjun Buildtech",
    description: pageDescription,
    about: { "@id": "https://arjunbuildtech.com/#organization" },
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900 mt-20">
      <Helmet>
        <title>Chat with Us | Arjun Buildtech</title>
        <meta
          name="description"
          content={pageDescription}
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chat with Us | Arjun Buildtech" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { name: t("common.home", "Home"), path: "/" },
              { name: t("chat.title", "Chat with Us") },
            ]}
          />
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${companyInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-[#25D366] transition-all group">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FaWhatsapp className="text-3xl text-[#25D366]" />
            </div>
            <h2 className="text-xl font-normal text-gray-800 mb-2">
              {t("chat.whatsappSupport", "WhatsApp Support")}
            </h2>
            <p className="text-[14px] text-gray-500 mb-6 flex-grow">
              {t(
                "chat.online",
                "Our experts are online and ready to help you with property details, site visits, and pricing.",
              )}
            </p>
            <span className="w-full inline-block px-6 py-2.5 bg-[#25D366] text-white rounded font-medium shadow-sm">
              {t("chat.startWhatsApp", "Start WhatsApp Chat")}
            </span>
          </a>

          {/* Callback Card */}
          <div
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-callback-modal"))
            }
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-[#d8232a] transition-all group cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FaPhoneAlt className="text-2xl text-[#d8232a]" />
            </div>
            <h2 className="text-xl font-normal text-gray-800 mb-2">
              Request a Callback
            </h2>
            <p className="text-[14px] text-gray-500 mb-6 flex-grow">
              Prefer to talk on phone? Leave your number and our property specialist will call you directly.
            </p>
            <span className="w-full inline-block px-6 py-2.5 bg-[#d8232a] text-white rounded font-bold shadow-sm group-hover:bg-[#b71c1c] transition-colors">
              Call Me Back
            </span>
          </div>

          {/* Standard Contact Form */}
          <Link
            to="/contact"
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-red-600 transition-all group">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FaRegComments className="text-3xl text-red-600" />
            </div>
            <h2 className="text-xl font-normal text-gray-800 mb-2">
              {t("chat.sendMessage", "Send us a Message")}
            </h2>
            <p className="text-[14px] text-gray-500 mb-6 flex-grow">
              {t(
                "chat.formCopy",
                "Prefer to send a detailed inquiry? Use our contact form and we'll reply to your email.",
              )}
            </p>
            <span className="w-full inline-block px-6 py-2.5 bg-gray-800 text-white rounded font-medium shadow-sm hover:bg-black transition-colors">
              {t("chat.openForm", "Open Contact Form")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatWithUs;
