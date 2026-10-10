import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaRegEnvelope,
  FaRegClock,
  FaChevronRight,
} from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "../../../context/useLanguage";
import { companyInfo } from "../../../data/companyInfo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Exactly matching the screenshot links
  const navLinks = [
    { name: "Home", key: "nav.home", path: "/" },
    { name: "Services", key: "nav.services", path: "/services" },
    {
      name: "Properties",
      key: "nav.properties",
      path: "/properties",
      badge: "NEW",
    },
    { name: "Testimonials", key: "nav.testimonials", path: "/testimonials" },
    { name: "Profile", key: "nav.profile", path: "/profile" },
    { name: "Blog", key: "nav.blog", path: "/blog" },
  ];

  // Handle scroll effect
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

  const isContactActive = location.pathname === "/contact";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-200 bg-white border-b border-gray-200 ${
          isScrolled ? "shadow-sm py-2" : "py-3"
        }`}>
        <div className="site-container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/arjunBuildTechLogo.png"
                alt="Arjun Buildtech"
                className="h-9 w-32 md:w-36 object-contain"
              />
            </Link>

            {/* Desktop Navigation (Center) */}
            <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== "/" &&
                    location.pathname.startsWith(link.path));
                return (
                  <div key={link.name} className="relative group py-1">
                    {link.name === "Blog" ? (
                      <div className="relative group py-1 cursor-pointer">
                        <div
                          className={`text-[14px] transition-colors duration-150 flex items-center gap-1.5 ${
                            isActive
                              ? "text-red-600 font-semibold"
                              : "text-gray-600 font-medium hover:text-red-600"
                          }`}>
                          {t("nav.blog", "Blog")}
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        {isActive && (
                          <span className="absolute -bottom-[22px] left-0 w-full h-[2px] bg-red-600"></span>
                        )}
                        {/* Blog Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                          <div className="py-2 flex flex-col">
                            <Link
                              to="/blog?category=Market+News"
                              className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t("blog.category.MarketNews", "Market News")}
                            </Link>
                            <Link
                              to="/blog?category=Investment+Guide"
                              className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t(
                                "blog.category.InvestmentGuide",
                                "Investment Guide",
                              )}
                            </Link>
                            <Link
                              to="/blog?category=Buying+Guide"
                              className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t("blog.category.BuyingGuide", "Buying Guide")}
                            </Link>
                            <Link
                              to="/blog?category=Policy+Update"
                              className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t("blog.category.PolicyUpdate", "Policy Update")}
                            </Link>
                            <Link
                              to="/blog"
                              className="px-4 py-2.5 text-[14px] font-medium text-red-600 border-t border-gray-100 mt-1 hover:bg-gray-50 transition-colors">
                              {t("nav.viewAllArticles", "View All Articles")}{" "}
                              &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link
                          to={link.path}
                          className={`text-[14px] transition-colors duration-150 flex items-center gap-1.5 ${
                            isActive
                              ? "text-red-600 font-semibold"
                              : "text-gray-600 font-medium hover:text-red-600"
                          }`}>
                          {t(link.key, link.name)}
                        </Link>

                        {/* Exact Screenshot Active Line */}
                        {isActive && (
                          <span className="absolute -bottom-[22px] left-0 w-full h-[2px] bg-red-600"></span>
                        )}

                        {link.badge && (
                          <span className="absolute -top-3 -right-5 text-[9px] uppercase font-bold bg-[#FFC107] text-gray-900 px-1.5 py-[2px] rounded-full shadow-sm tracking-wide">
                            {link.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions (Cleaned Up) */}
            <div className="hidden lg:flex items-center shrink-0 gap-4 xl:gap-6">
              <LanguageSwitcher />

              {/* Help Dropdown */}
              <div className="relative group py-2 cursor-pointer">
                <div className="flex items-center gap-1 text-[15px] font-medium text-gray-600 hover:text-red-600 transition-colors">
                  {t("nav.help", "Help")}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="py-2 flex flex-col">
                    <Link
                      to="/help-center"
                      className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                      {t("nav.helpCenter", "Help Center")}
                    </Link>
                    <Link
                      to="/sales-enquiry"
                      className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                      {t("nav.salesEnquiry", "Sales Enquiry")}
                    </Link>
                    <Link
                      to="/chat-with-us"
                      className="px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                      {t("nav.chatWithUs", "Chat with Us")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Us CTA (Always Red with FREE badge) */}
              <Link
                to="/contact"
                className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 border bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700">
                <span className="font-medium">
                  {t("nav.contactUs", "Contact Us")}
                </span>
                <span className="text-[10px] uppercase font-bold bg-[#FFC107] text-gray-900 px-2 py-0.5 rounded-full tracking-wide">
                  {t("nav.free", "Free")}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggles */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-800 focus:outline-none bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition">
                <FaBars className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE OFF-CANVAS DRAWER (Clean, Soft Design) --- */}

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[110] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[120] lg:hidden border-l border-gray-100 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <img src="/arjunBuildTechLogo.png" alt="Logo" className="w-32" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-gray-500 transition-colors">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-4 border-b border-gray-200 text-[14px] font-normal transition-colors ${
                  isActive
                    ? "text-red-600 bg-red-50/50"
                    : "text-[#303030] hover:text-red-600 hover:bg-gray-50"
                }`}>
                <div className="flex items-center gap-3">
                  {t(link.key, link.name)}
                  {link.badge && (
                    <span className="text-[10px] font-medium bg-[#FFC107] text-gray-900 px-2 py-0.5 rounded shadow-sm tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </div>
                <FaChevronRight
                  className={`w-3.5 h-3.5 ${isActive ? "text-red-600" : "text-gray-800"}`}
                />
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer (Clean, Modern Mobile Contacts) */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
          <div className="mb-5">
            <LanguageSwitcher mobile />
          </div>

          <div className="space-y-4 mb-6">
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-gray-800 font-semibold text-[16px] hover:text-red-600 transition-colors">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-600 shadow-sm">
                <FaPhoneAlt className="w-3.5 h-3.5" />
              </div>
              {companyInfo.phone}
            </a>

            <a
              href="mailto:arjunbuildtech27@gmail.com"
              className="flex items-center gap-3 text-gray-600 font-medium text-[14px] hover:text-red-600 transition-colors">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-600 shadow-sm">
                <FaRegEnvelope className="w-3.5 h-3.5" />
              </div>
              arjunbuildtech27@gmail.com
            </a>

            <div className="flex items-center gap-3 text-gray-500 font-medium text-[13px]">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-600 shadow-sm">
                <FaRegClock className="w-3.5 h-3.5" />
              </div>
              Mon–Sat, 10 AM – 6 PM
            </div>
          </div>

          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`flex justify-center w-full py-3 rounded-lg font-semibold text-[15px] transition-colors shadow-sm ${
              isContactActive
                ? "bg-red-600 text-white"
                : "bg-white border border-gray-300 text-gray-800 hover:border-red-600 hover:text-red-600"
            }`}>
            Help & Support
          </Link>
        </div>
      </div>
    </>
  );
}
