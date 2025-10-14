import React from "react";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Trusted Real Estate & Property Consulting in Rohtak, Haryana",
      buttonText: "Explore Services",
      bgColor: "bg-pink-600",
      link: "/services",
    },
    {
      title: "Explore Top Residential Plots & Investment Properties",
      buttonText: "View Properties",
      bgColor: "bg-yellow-300",
      textColor: "text-black",
      link: "/properties",
    },
    {
      title: "Need Help Finding the Right Property?",
      buttonText: "Post Your Requirement",
      bgColor: "bg-teal-400",
      link: "/contact",
    },
    {
      title: "Visit Our Offices – Rohtak & Gurugram",
      buttonText: "Get Directions",
      bgColor: "bg-indigo-600",
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
