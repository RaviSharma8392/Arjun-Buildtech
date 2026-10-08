import React from "react";

const CommonBanner = ({ image, title, subtitle, height = "h-64" }) => {
  return (
    <section
      className={`relative bg-cover bg-center ${height} flex items-center justify-center text-center text-white`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${image}')`,
      }}>
      <div className="container mx-auto px-4 max-w-5xl z-10">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base text-gray-200 font-light max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default CommonBanner;
