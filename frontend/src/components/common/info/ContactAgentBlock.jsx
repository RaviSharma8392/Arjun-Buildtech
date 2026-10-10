import React from "react";
import { Phone, MessageCircle, Share2 } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage";

const ContactAgentBlock = ({ propertyName }) => {
  const { t } = useLanguage();
  const phoneNumber = "9350447531";
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: propertyName || "Arjun Buildtech Property",
        text: `Check out this property from Arjun Buildtech: ${propertyName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t("card.copied", "Link copied to clipboard!"));
    }
  };

  const whatsappMessage = encodeURIComponent(`Hi, I am interested in this property: ${propertyName || "your listing"}`);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {t("contactBlock.title", "Contact Arjun Buildtech")}
      </h3>
      <p className="text-gray-600 mb-6">
        {t("contactBlock.subtitle", "Call us directly")}
      </p>

      <div className="flex items-center justify-center gap-3 bg-red-50 text-red-600 px-6 py-3 rounded-lg font-bold text-2xl mb-6">
        <Phone className="w-6 h-6" />
        <span>+91 93504 47531</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <a 
          href={`tel:+91${phoneNumber}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#d9534f] hover:bg-[#c9302c] text-white py-3 px-4 rounded font-semibold transition-colors"
        >
          <Phone className="w-5 h-5" />
          {t("contactBlock.callNow", "Call Now")}
        </a>
        
        <a 
          href={`https://wa.me/91${phoneNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded font-semibold transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
      </div>

      <button 
        onClick={handleShare}
        className="mt-6 flex items-center gap-2 text-gray-600 hover:text-[#d9534f] transition-colors font-medium"
      >
        <Share2 className="w-5 h-5" />
        {t("contactBlock.share", "Share Property")}
      </button>
    </div>
  );
};

export default ContactAgentBlock;
