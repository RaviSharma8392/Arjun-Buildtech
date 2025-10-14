import React from "react";
import { MapPin, Home, Building2, Star, ArrowRight } from "lucide-react";

const PopularAreas = () => {
  const areas = [
    {
      title: "HSVP Sectors",
      sectors: "Sector 1, 2, 3, 25, 27",
      description:
        "Premium residential plots with modern amenities and peaceful surroundings.",
      icon: <Building2 className="w-6 h-6" />,
      features: ["Modern Infrastructure", "Peaceful Environment", "High ROI"],
      rating: 4.8,
    },
    {
      title: "Suncity Township",
      sectors: "Sector 34, 35, 36, 36A",
      description:
        "Modern community living with excellent connectivity and infrastructure.",
      icon: <Home className="w-6 h-6" />,
      features: ["Community Living", "Excellent Connectivity", "All Amenities"],
      rating: 4.7,
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
            Prime Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Areas in <span className="text-orange-500">Rohtak</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We exclusively operate within{" "}
            <strong className="text-gray-800">Rohtak city</strong>, focusing on
            prime residential sectors known for their growth potential,
            amenities, and strong property value appreciation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-100">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-50 rounded-xl text-orange-500 group-hover:bg-orange-100 transition-colors">
                      {area.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {area.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(area.rating)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          {area.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-orange-500" />
                  </div>
                </div>

                <p className="text-gray-700 font-medium mb-4 px-1">
                  {area.sectors}
                </p>
                <p className="text-gray-600 mb-5">{area.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {area.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full py-3 bg-orange-50 text-orange-600 font-semibold rounded-xl hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                  Explore Properties
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Visit Our Office
                </h3>
                <p className="text-gray-700">
                  G74P, Sector-27, Rohtak, Haryana
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors shadow-md">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;
