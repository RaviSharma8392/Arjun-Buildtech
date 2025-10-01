import React from "react";

const CommonBanner = ({ image, title, subtitle, height = "h-64" }) => {
  return (
    <section
      className={`relative bg-cover bg-center ${height} flex items-center justify-center text-center text-white`}
      style={{ backgroundImage: `url(${image})` }}>
      <div className="bg-black/40 p-6 rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-md md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
};

export default CommonBanner;
