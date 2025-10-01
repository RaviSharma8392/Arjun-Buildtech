import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBuilding, FaThLarge, FaPhone } from "react-icons/fa";

export default function BottomNavbar() {
  const location = useLocation();

  // ✅ Hide BottomNavbar on property detail pages
  const isPropertyPage = location.pathname.startsWith("/property/");

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Projects", path: "/projects", icon: FaBuilding },
    { name: "Properties", path: "/properties", icon: FaThLarge },
    { name: "Contact", path: "/contact", icon: FaPhone },
  ];
  if (isPropertyPage) return null;

  return (
    // The main container: fixed to the bottom, full width, hidden on screens larger than mobile (sm:hidden)
    <nav className=" md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-2xl sm:hidden">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center p-1 w-full h-full transition-colors duration-300">
              <Icon
                // Icon color changes based on active state
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-blue-500"
                }`}
              />
              <span
                // Text size and color changes based on active state
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
