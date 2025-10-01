import React from "react";
import { Link } from "react-router-dom";

const PopularLocalities = ({ localities }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Popular Localities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {localities.map((loc, index) => (
            <Link
              to={loc.link || "#"}
              key={index}
              className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-center">
                <h3 className="text-lg font-semibold">{loc.name}</h3>
                {loc.propertiesCount && (
                  <p className="text-sm">{loc.propertiesCount} Properties</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularLocalities;
