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
        isScrolled ? "bg-white shadow-lg" : "bg-white "
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
                    ? "text-red-600 font-semibold border-b-2 border-red-600"
                    : "text-gray-800 hover:text-red-600"
                }`}>
                {link.name}
                {link.free && (
                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                    Free
                  </span>
                )}
              </Link>
            ))}

            {/* Contact Us Button */}
            <Link
              to="/contact"
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition flex items-center gap-2">
              <FaPhone className="w-4 h-4" /> Contact Us
            </Link>

            {/* Help Center */}
            <div className="relative">
              <button
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="ml-2 p-2 rounded-md hover:bg-gray-100 transition"
                title="Help Center">
                <FaQuestionCircle className="w-5 h-5 text-gray-800 hover:text-red-600 transition-colors" />
              </button>

              {isHelpOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-300 shadow-xl rounded-lg p-4 z-50">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                    Help Center
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <strong className="text-gray-900">Phone:</strong>
                      <span className="text-red-600 font-medium">
                        +91 76177 11003
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">Email:</strong>{" "}
                      support@arjunbuildtech.com
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">Hours:</strong> Mon–Sat,
                      10 AM – 6 PM
                    </p>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => window.open("tel:+917617711003", "_self")}
                      className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition">
                      Request Call Back
                    </button>
                    <Link
                      to="/help-center"
                      className="block text-center w-full bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition font-medium">
                      Visit Help Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Help Button */}
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
              title="Help Center">
              <FaQuestionCircle className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition">
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-300 shadow-inner">
          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-3 rounded-md text-gray-800 hover:text-red-600 hover:bg-red-50 transition-colors ${
                  location.pathname === link.path
                    ? "font-semibold text-red-600 bg-red-50"
                    : ""
                }`}>
                {link.name}
                {link.free && (
                  <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-1 rounded">
                    Free
                  </span>
                )}
              </Link>
            ))}

            <Link
              to="/contact"
              className="mt-2 bg-red-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-red-700 flex items-center justify-center gap-2">
              <FaPhone /> Contact Us
            </Link>

            {/* Mobile Help Info */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-700 mb-2">
                Call us:{" "}
                <span className="text-red-600 font-medium">
                  +91 76177 11003
                </span>
              </p>
              <button
                onClick={() => window.open("tel:+917617711003", "_self")}
                className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition">
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Help Dropdown */}
      {isHelpOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute top-20 right-4 w-72 bg-white border border-gray-300 shadow-xl rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                Help Center
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="p-1 rounded hover:bg-gray-100">
                <FaTimes className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <strong className="text-gray-900 w-16">Phone:</strong>
                <span className="text-red-600 font-medium">
                  +91 76177 11003
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <strong className="text-gray-900 w-16">Email:</strong>
                <span>support@arjunbuildtech.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <strong className="text-gray-900 w-16">Hours:</strong>
                <span>Mon–Sat, 10 AM – 6 PM</span>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  window.open("tel:+917617711003", "_self");
                  setIsHelpOpen(false);
                }}
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition">
                Request Call Back
              </button>
              <Link
                to="/help-center"
                className="block text-center w-full bg-gray-100 text-gray-800 py-3 rounded-md hover:bg-gray-200 transition font-medium"
                onClick={() => setIsHelpOpen(false)}>
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
