import React from "react";
import { useNavigate } from "react-router-dom";
import HomeSearchBar from "../form/HomeSearchBar";

const HomeHeader = () => {
  const navigate = useNavigate();

  const handleCityClick = () => {
    navigate("/properties/rohtak");
  };

  return (
    <section
      className="relative w-full min-h-[480px] md:min-h-[520px] bg-cover bg-center flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920')",
      }}>
      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 w-full max-w-5xl mx-auto py-12">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 leading-tight">
          Arjun Buildtech
          <span className="block mt-1 text-red-500 font-semibold text-2xl sm:text-3xl md:text-4xl">
            Leading Real Estate in Rohtak
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
          Find your perfect luxury villa, residential plot, or high-return
          investment in the heart of Rohtak city with trusted property
          consultants.
        </p>

        {/* Search Bar Wrapper */}
        <div className="w-full max-w-4xl mx-auto">
          <HomeSearchBar />
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
