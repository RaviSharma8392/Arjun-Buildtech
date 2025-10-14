import React from "react";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Post Your Property Free !!",
      buttonText: "List Your Property",
      bgColor: "bg-blue-700",
      link: "/post-property",
    },
    {
      title: "Top Real Estate Agents & Property Dealers in Haryana",
      buttonText: "Explore Now",
      bgColor: "bg-pink-600",
      link: "/agents",
    },
    {
      title: "Explore Haryana's Top Residential Plot",
      buttonText: "Explore Now",
      bgColor: "bg-yellow-300",
      textColor: "text-black",
      link: "/properties",
    },
    {
      title: "Helping you to find your dream Property",
      buttonText: "Post Your Requirement",
      bgColor: "bg-teal-400",
      link: "/contact",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex-1 min-w-[250px] p-6 rounded-lg shadow-lg ${
            card.bgColor
          } ${card.textColor || "text-white"} flex flex-col justify-between`}>
          <h2 className="text-lg font-semibold mb-4">{card.title}</h2>
          <button
            onClick={() => navigate(card.link)}
            className="bg-white text-black font-medium py-2 px-4 rounded hover:bg-gray-200 transition">
            {card.buttonText} &rarr;
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomeBanner;
