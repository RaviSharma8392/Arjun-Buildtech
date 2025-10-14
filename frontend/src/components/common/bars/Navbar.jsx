import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaPhone, FaQuestionCircle } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Profile", path: "/profile" },
    { name: "Properties", path: "/properties" },
    { name: "Post Property", path: "/post-property", free: true },
    { name: "Testimonials", path: "/testimonials" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsHelpOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-200"
      }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/arjunBuildTechLogo.png"
              alt="Arjun Builtech Logo"
              className="w-36 md:w-44"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-[15px] font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-orange-600 font-semibold border-b-2 border-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}>
                {link.name}
                {link.free && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                    Free
                  </span>
                )}
              </Link>
            ))}

            {/* Contact Us Button */}
            <Link
              to="/contact"
              className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition flex items-center gap-2">
              <FaPhone /> Contact Us
            </Link>

            {/* Help Center */}
            <div className="relative">
              <button
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="ml-2 p-2 rounded-md hover:bg-gray-100 transition"
                title="Help Center">
                <FaQuestionCircle className="w-5 h-5 text-gray-700" />
              </button>

              {isHelpOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border shadow-xl rounded-md p-4 z-50">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Help Center
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Phone:</strong> +91 76177 11003
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> support@arjunbuildtech.com
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Hours:</strong> Mon–Sat, 10 AM – 6 PM
                  </p>
                  <button
                    onClick={() => window.open("tel:+917617711003", "_self")}
                    className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition mb-2">
                    Request Call Back
                  </button>
                  <Link
                    to="/help-center"
                    className="block text-center w-full bg-gray-100 py-2 rounded-md hover:bg-gray-200 transition">
                    Visit Help Center
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition">
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-gray-700 hover:text-orange-600 ${
                  location.pathname === link.path
                    ? "font-semibold text-orange-600"
                    : ""
                }`}>
                {link.name}
                {link.free && (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 rounded">
                    Free
                  </span>
                )}
              </Link>
            ))}

            <Link
              to="/contact"
              className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 flex items-center gap-2">
              <FaPhone /> Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
