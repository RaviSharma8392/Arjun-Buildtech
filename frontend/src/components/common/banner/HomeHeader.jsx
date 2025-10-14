import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Home } from "lucide-react";

const HomeHeader = () => {
  const navigate = useNavigate();

  const haryanaCities = [
    { name: "Gurgaon", icon: <Building2 className="w-5 h-5" /> },
    { name: "Faridabad", icon: <Home className="w-5 h-5" /> },
    { name: "Rohtak", icon: <MapPin className="w-5 h-5" /> },
  ];

  const handleCityClick = (city) => {
    const normalizedCity = city.toLowerCase().replace(/\s+/g, "-");
    navigate(`/properties/${normalizedCity}`);
  };

  return (
    <section
      className="relative w-full min-h-[450px] bg-cover bg-center flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          Discover <span className="text-orange-400">Properties</span> in
          Haryana
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-6">
          Find your perfect home in the heart of Haryana’s finest cities.
        </p>

        {/* City Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {haryanaCities.map((city, idx) => (
            <button
              key={idx}
              onClick={() => handleCityClick(city.name)}
              className="flex items-center gap-2 bg-white/15 hover:bg-orange-500/90 text-white px-4 py-2 rounded-full border border-white/30 text-sm font-medium transition-all hover:scale-105 backdrop-blur-md">
              {city.icon}
              <span>{city.name}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/properties")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-base font-semibold shadow-md transition-all hover:scale-105">
            Explore All Properties
          </button>
          a
        </div>
      </div>

      {/* Soft Blurs */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HomeHeader;
