import React from "react";
import services from "../data/services.json";

const ServicesWeOffer = () => {
  return (
    <section
      className="py-16 relative bg-gray-50"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Overlay for better contrast */}
      <div className="absolute inset-0bg-opacity-10"></div>

      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Services We Offer
        </h2>
        <p className="text-center text-gray-200 max-w-2xl mx-auto mb-12">
          We provide end-to-end real estate solutions to help you buy, sell, and
          invest in properties with confidence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              {service.image && (
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-44 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesWeOffer;
