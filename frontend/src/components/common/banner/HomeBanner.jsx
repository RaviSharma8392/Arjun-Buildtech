import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Building2, Landmark } from "lucide-react";

const HomeBanner = () => {
  const navigate = useNavigate();
  const [activeTab] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}&type=${activeTab}`);
    } else {
      navigate(`/properties?type=${activeTab}`);
    }
  };


  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden font-sans mt-0 lg:mt-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')",
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 md:px-8 mt-10 md:mt-0">


        {/* Search Widget - MagicBricks Style */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-2xl animate-fade-in-up delay-100">
          <div className="bg-white rounded-xl overflow-hidden shadow-inner">
            


            {/* Search Input Area */}
            <div className="p-2 md:p-4">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                  <div className="pl-4 pr-2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by locality, sector, or project (e.g. Sector 27, Suncity)"
                    className="w-full py-3.5 pr-4 bg-transparent text-gray-800 text-[15px] font-medium focus:outline-none placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)]"
                >
                  <Search size={20} />
                  Search
                </button>
              </form>
            </div>

          </div>
        </div>
        
        {/* Quick Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4 animate-fade-in-up delay-200">
          <span className="text-white/80 text-sm font-medium">Popular:</span>
          {["Suncity Plots", "Sector 14 Shops", "HSVP Sector 27", "3 BHK Villas"].map((tag) => (
            <button 
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                navigate(`/properties?search=${encodeURIComponent(tag)}&type=Buy`);
              }}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs rounded-full border border-white/30 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>
    </div>
  );
};

export default HomeBanner;
