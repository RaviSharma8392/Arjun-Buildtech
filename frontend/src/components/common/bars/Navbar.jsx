import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaRegEnvelope,
  FaRegClock,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Properties", path: "/properties", badge: "New" },
    { name: "Profile", path: "/profile" },
    { name: "Blog", path: "/blog" },
  ];

  // Handle scroll effect for clean portal border
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-200 bg-white border-b border-gray-200 ${
          isScrolled ? "shadow-sm py-3" : "py-4"
        }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img
                src="/arjunBuildTechLogo.png"
                alt="Arjun Buildtech"
                className="w-32 md:w-36 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <div key={link.name} className="relative group py-1">
                    <Link
                      to={link.path}
                      className={`text-[15px] transition-colors duration-150 flex items-center gap-1.5 ${
                        isActive
                          ? "text-red-600 font-semibold"
                          : "text-gray-700 font-medium hover:text-red-600"
                      }`}>
                      {link.name}
                    </Link>

                    {/* Simple Bottom Active Indicator */}
                    {isActive && (
                      <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-red-600"></span>
                    )}

                    {/* Badge */}
                    {link.badge && (
                      <span className="absolute -top-2.5 -right-5 text-[9px] uppercase font-bold bg-red-600 text-white px-1.5 py-0.2 rounded">
                        {link.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions (Desktop) */}
            <div className="hidden lg:flex items-center shrink-0 gap-4">
              {/* Direct Contact Info */}
              <div className="hidden xl:flex flex-col items-end pr-2 border-r border-gray-200">
                <a
                  href="tel:+919899481428"
                  className="text-gray-900 font-bold text-[14px] hover:text-red-600 transition flex items-center gap-1.5">
                  <FaPhoneAlt className="w-3 h-3 text-red-600" /> +91 98994
                  81428
                </a>
                <a
                  href="mailto:arjunbuildtech27@gmail.com"
                  className="text-gray-500 text-[11px] font-medium hover:text-red-600 transition flex items-center gap-1.5 mt-0.5">
                  <FaRegEnvelope className="w-3 h-3 text-red-600" />
                  arjunbuildtech27@gmail.com
                </a>
              </div>

              {/* Primary CTA */}
              <Link
                to="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm">
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Toggles */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Mobile Translator Slot */}
              <div className="flex items-center justify-center bg-gray-50 rounded border border-gray-200 px-1">
                <div
                  id="google_translate_element_mobile"
                  className="h-6 w-[70px] overflow-hidden flex items-center justify-center text-[10px]"></div>
              </div>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-800 focus:outline-none bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition">
                <FaBars className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Off-Canvas Drawer --- */}

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[110] lg:hidden transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[120] lg:hidden border-l border-gray-200 flex flex-col transition-transform duration-200 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <img src="/arjunBuildTechLogo.png" alt="Logo" className="w-28" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-gray-600 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded text-[15px] font-medium transition-colors ${
                  isActive
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}>
                <div className="flex items-center gap-2">
                  {link.name}
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold bg-red-100 text-red-600 px-1.5 py-0.2 rounded">
                      {link.badge}
                    </span>
                  )}
                </div>
                <FaChevronRight
                  className={`w-3 h-3 ${isActive ? "text-red-600" : "text-gray-400"}`}
                />
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer / Contact Box */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 mt-auto">
          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-2.5">
            Direct Contact
          </p>
          <div className="space-y-2.5 mb-4 text-[13px]">
            <div className="flex items-center gap-2.5 text-gray-700">
              <FaPhoneAlt className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <a
                href="tel:+919899481428"
                className="font-semibold hover:text-red-600">
                +91 98994 81428
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-gray-700">
              <FaRegEnvelope className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <a
                href="mailto:arjunbuildtech27@gmail.com"
                className="font-medium hover:text-red-600 truncate">
                arjunbuildtech27@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-gray-700">
              <FaRegClock className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="font-medium">Mon–Sat, 10 AM – 6 PM</span>
            </div>
          </div>
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="flex justify-center w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded font-semibold text-sm transition-colors shadow-sm">
            Request Call Back
          </Link>
        </div>
      </div>
    </>
  );
}
