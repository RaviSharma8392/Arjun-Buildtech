import React from "react";

const MapSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Visit <span className="text-red-600">Arjun Buildtech</span>
          </h2>
          <p className="text-gray-600">
            Find us easily at our Rohtak office — we’re here to guide you
            through every step.
          </p>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Arjun Buildtech Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.1942154062053!2d76.64041477529798!3d28.862840775539805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b0021fa5cd7%3A0xf4fa69786aa72d2d!2sArjun%20Buildtech!5e0!3m2!1sen!2sin!4v1760500091777!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
