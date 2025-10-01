import React, { useState } from "react";
import {
  FaShare,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const ShareButton = ({ property }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `Check out this property: ${property.name}`;

  const platforms = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-6 h-6 text-green-600" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="w-6 h-6 text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-6 h-6 text-blue-400" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText + " " + shareUrl
      )}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope className="w-6 h-6 text-gray-700" />,
      url: `mailto:?subject=${encodeURIComponent(
        property.name
      )}&body=${encodeURIComponent(shareText + "\n" + shareUrl)}`,
    },
  ];

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors duration-200">
        <FaShare className="w-5 h-5" />
      </button>

      {/* Share Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-3 w-44 z-50">
          {platforms.map((platform, idx) => (
            <a
              key={idx}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors">
              {platform.icon}
              <span className="text-gray-800 font-medium">{platform.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
