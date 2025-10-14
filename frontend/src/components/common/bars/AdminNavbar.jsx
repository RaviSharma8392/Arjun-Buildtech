import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
  FaBuilding,
  FaEnvelope,
  FaStar,
  FaUser,
} from "react-icons/fa";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    // { name: "Add Property", path: "/admin/add-property", icon: <FaBuilding /> },
    {
      name: "Manage Properties",
      path: "/admin/properties",
      icon: <FaBuilding />,
    },
    {
      name: "Manage Featured",
      path: "/admin/featuredproperties",
      icon: <FaBuilding />,
    },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Inquiries", path: "/admin/inquiries", icon: <FaEnvelope /> },
    { name: "Users", path: "/admin/users", icon: <FaUser /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location]);

  const handleLogout = () => {
    // Replace with Firebase signOut in production
    alert("Logged out successfully");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 shadow-md backdrop-blur-sm"
          : "bg-gray-900/90"
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <img
              src="/arjunBuildTechLogo.png"
              alt="Admin Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-bold text-xl tracking-wide">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "bg-white text-gray-900"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}>
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 transition">
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col space-y-2 pb-4 bg-gray-900 text-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md ${
                  location.pathname === link.path
                    ? "bg-white text-gray-900"
                    : "hover:bg-gray-800"
                }`}>
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
