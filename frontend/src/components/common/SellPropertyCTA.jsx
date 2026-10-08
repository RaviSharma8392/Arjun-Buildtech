import React, { useState } from "react";
import InquiryPopup from "./form/InquiryPopup";
import { Home } from "lucide-react";

const SellPropertyCTA = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <section className="bg-red-600 text-white py-16 px-4 my-10 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-red-700 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-full inline-block mb-6 shadow-inner">
            <Home className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
            Want to Sell Your Property in Rohtak?
          </h2>
          
          <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl font-light">
            Get the best market value for your residential plot, commercial space, or home in HSVP & Suncity sectors. Our expert agents ensure a fast and profitable sale.
          </p>
          
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2"
          >
            List Your Property Today
            <span className="text-xl">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Reusing the Inquiry Popup for Sellers as well */}
      <InquiryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};

export default SellPropertyCTA;
