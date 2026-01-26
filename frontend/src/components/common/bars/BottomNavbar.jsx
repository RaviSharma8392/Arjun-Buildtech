import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBuilding, FaThLarge, FaPlus, FaPhone } from "react-icons/fa";

export default function BottomNavbar({ onHelpClick }) {
  const location = useLocation();
  const isPropertyPage = location.pathname.startsWith("/property/");
  if (isPropertyPage) return null;

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Properties", path: "/properties", icon: FaThLarge },
    { name: "Services", path: "/services", icon: FaPlus },
    { name: "Contact", path: "/contact", icon: FaPhone },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-red-500 shadow-2xl sm:hidden">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center p-1 w-full h-full transition-colors duration-300">
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-red-600" : "text-gray-500"
                  }`}
                />
              </div>
              <span
                className={`text-xs mt-1 font-semibold transition-colors duration-300 ${
                  isActive ? "text-red-600" : "text-gray-500"
                }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
