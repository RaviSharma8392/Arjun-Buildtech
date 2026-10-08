import React from "react";

const MapSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Standard Portal Heading Design */}
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            Visit Arjun Buildtech
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
            Find us easily at our Rohtak office — we’re here to guide you
            through every step of your real estate journey.
          </p>
        </div>

        {/* Clean, Framed Map Container */}
        <div className="w-full bg-white p-2 md:p-3 rounded-lg border border-gray-200">
          <div className="rounded border border-gray-100 overflow-hidden w-full h-[350px] md:h-[450px]">
            <iframe
              title="Arjun Buildtech Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.1942154062053!2d76.64041477529798!3d28.862840775539805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b0021fa5cd7%3A0xf4fa69786aa72d2d!2sArjun%20Buildtech!5e0!3m2!1sen!2sin!4v1760500091777!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
