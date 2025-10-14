import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaThLarge,
  FaPlus,
  FaPhone,
  FaQuestionCircle,
} from "react-icons/fa";

export default function BottomNavbar({ onHelpClick }) {
  const location = useLocation();
  const isPropertyPage = location.pathname.startsWith("/property/");
  if (isPropertyPage) return null;

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Projects", path: "/projects", icon: FaBuilding },
    { name: "Properties", path: "/properties", icon: FaThLarge },
    { name: "Post", path: "/post-property", icon: FaPlus, free: true },
    { name: "Contact", path: "/contactus", icon: FaPhone },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-2xl sm:hidden">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isHelp) {
            return (
              <button
                key={item.name}
                onClick={onHelpClick}
                className="flex flex-col items-center justify-center p-1 w-full h-full transition-colors duration-300">
                <Icon className="w-5 h-5 text-gray-500" />
                <span className="text-xs mt-1 font-semibold text-gray-500">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center p-1 w-full h-full transition-colors duration-300">
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                {item.free && (
                  <span className="absolute -top-1 -right-2 text-[10px] bg-green-200 text-green-800 px-1 rounded">
                    Free
                  </span>
                )}
              </div>
              <span
                className={`text-xs mt-1 font-semibold transition-colors duration-300 ${
                  isActive ? "text-blue-600" : "text-gray-500"
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
