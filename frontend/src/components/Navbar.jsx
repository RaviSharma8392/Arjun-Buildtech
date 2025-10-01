import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => setIsMenuOpen(false), [location]);

  const handleContactClick = () => {
    window.open("tel:+917617711003", "_self");
  };

  return (
    <nav
      className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-white/90"
      }`}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="h-2 w-50 mb-4">
            <img
              src="https://catalog.wlimg.com/3/2263736/other-images/12585-comp-image.png"
              alt=""
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-[Pacifico] transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}>
                {link.name}
              </Link>
            ))}

            {/* Contact Button */}
            <button
              onClick={handleContactClick}
              className="ml-4 bg-gray-900 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition">
              <FaPhone className="inline mr-2" /> Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition">
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
          <div className="lg:hidden flex flex-col space-y-1 pb-4 h-screen bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-md text-gray-700 hover:text-gray-900 ${
                  location.pathname === link.path
                    ? "font-semibold"
                    : "font-medium"
                }`}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
