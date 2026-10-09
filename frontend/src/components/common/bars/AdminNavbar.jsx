import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../../services/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
  FaBuilding,
  FaEnvelope,
  FaStar,
  FaUser,
  FaCog,
  FaMapPin,
} from "react-icons/fa";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
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
    { name: "Localities", path: "/admin/localities", icon: <FaMapPin /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Inquiries", path: "/admin/inquiries", icon: <FaEnvelope /> },
    { name: "Subscribers", path: "/admin/subscribers", icon: <FaUser /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("admin");
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-white/40"
          : "bg-white border-gray-100 shadow-sm"
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
            <span className="text-gray-900 font-extrabold text-[22px] tracking-tight ml-1">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-red-50 text-red-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50/60"
                }`}>
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 transition">
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
          <div className="lg:hidden flex flex-col space-y-2 pb-4 pt-2 bg-white text-gray-800 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold ${
                  location.pathname === link.path
                    ? "bg-red-50 text-red-600"
                    : "hover:bg-gray-50 text-gray-600"
                }`}>
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
