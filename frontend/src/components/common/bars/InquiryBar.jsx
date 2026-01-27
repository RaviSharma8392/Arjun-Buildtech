const MobileContactBar = ({ property }) => {
  const contactNumber = "919350447531";

  // Open WhatsApp chat
  const handleWhatsAppChat = () => {
    const message = `Hi, I'm interested in ${property?.name} at ${property?.location}.`;
    const whatsappLink = `https://wa.me/${contactNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappLink, "_blank");
  };

  // Trigger enquiry
  const handleContactSeller = () => {
    alert("Open Contact Seller form");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Buttons */}
      <div className="flex gap-3 bg-white border-t border-gray-200 shadow-lg p-3">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppChat}
          className="flex-1 flex items-center justify-center gap-2 border border-green-500 text-green-600 font-bold py-3  hover:bg-green-50 transition">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          Chat
        </button>

        {/* Contact Seller Button */}
        <button
          onClick={handleContactSeller}
          className="flex-1 flex items-center justify-center gap-2 bg-green-400 text-white font-bold py-3  hover:bg-green-600 transition">
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default MobileContactBar;
