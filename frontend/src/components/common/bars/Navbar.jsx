import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaRegEnvelope,
  FaRegClock,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "../../../context/useLanguage";
import { companyInfo } from "../../../data/companyInfo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
        className={`fixed top-0 left-0 right-0 z-[100] w-full font-site transition-all duration-300 ${
          isScrolled
            ? "py-2.5 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
            : "py-4 bg-white border-b border-gray-100"
        }`}>
        <div className="mx-auto w-full max-w-[95rem] px-4 md:px-8 2xl:px-10">
          <div className="flex min-h-10 items-center justify-between gap-5">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/arjunBuildTechLogo.png"
                alt="Arjun Buildtech"
                className="h-10 w-36 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex flex-1 items-center justify-center space-x-6 2xl:space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== "/" &&
                    location.pathname.startsWith(link.path));
                return (
                  <div key={link.name} className="relative group py-2">
                    {link.name === "Blog" ? (
                      <div className="relative group cursor-pointer">
                        <div
                          className={`flex items-center gap-1.5 whitespace-nowrap text-[15px] transition-colors duration-200 ${
                            isActive
                              ? "text-red-600 font-semibold"
                              : "text-gray-600 font-medium hover:text-red-600"
                          }`}>
                          {t("nav.blog", "Blog")}
                          <FaChevronDown className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
                        </div>
                        {isActive && (
                          <span className="absolute -bottom-[26px] left-0 w-full h-[2px] bg-red-600"></span>
                        )}
                        {/* Blog Dropdown */}
                        <div className="absolute top-full left-0 mt-4 w-52 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                          <div className="py-2 flex flex-col">
                            <Link
                              to="/blog?category=Market+News"
                              className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t("blog.category.MarketNews", "Market News")}
                            </Link>
                            <Link
                              to="/blog?category=Investment+Guide"
                              className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t(
                                "blog.category.InvestmentGuide",
                                "Investment Guide",
                              )}
                            </Link>
                            <Link
                              to="/blog?category=Buying+Guide"
                              className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t("blog.category.BuyingGuide", "Buying Guide")}
                            </Link>
                            <Link
                              to="/blog?category=Policy+Update"
                              className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                              {t("blog.category.PolicyUpdate", "Policy Update")}
                            </Link>
                            <Link
                              to="/blog"
                              className="px-5 py-3 text-[14px] font-semibold text-red-600 border-t border-gray-100 mt-1 hover:bg-red-50 transition-colors flex items-center justify-between">
                              <span>
                                {t("nav.viewAllArticles", "View All Articles")}
                              </span>
                              <FaChevronRight className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link
                          to={link.path}
                          className={`flex items-center gap-1.5 whitespace-nowrap text-[15px] transition-colors duration-200 ${
                            isActive
                              ? "text-red-600 font-semibold"
                              : "text-gray-600 font-medium hover:text-red-600"
                          }`}>
                          {t(link.key, link.name)}
                        </Link>
                        {isActive && (
                          <span className="absolute -bottom-[26px] left-0 w-full h-[2px] bg-red-600 rounded-t-full"></span>
                        )}
                        {link.badge && (
                          <span className="absolute -top-3 -right-6 text-[9px] uppercase font-bold bg-[#FFC107] text-gray-900 px-1.5 py-[2px] rounded-full shadow-sm tracking-wide">
                            {link.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="hidden xl:flex shrink-0 items-center gap-4 2xl:gap-5">
              <LanguageSwitcher />

              {/* Help Dropdown */}
              <div className="relative group py-2 cursor-pointer">
                <div className="flex items-center gap-1.5 whitespace-nowrap text-[15px] font-medium text-gray-600 transition-colors hover:text-red-600">
                  {t("nav.help", "Help")}
                  <FaChevronDown className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
                </div>
                <div className="absolute top-full right-0 mt-4 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2 flex flex-col">
                    <Link
                      to="/help-center"
                      className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                      {t("nav.helpCenter", "Help Center")}
                    </Link>
                    <Link
                      to="/sales-enquiry"
                      className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                      {t("nav.salesEnquiry", "Sales Enquiry")}
                    </Link>
                    <Link
                      to="/chat-with-us"
                      className="px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">
                      {t("nav.chatWithUs", "Chat with Us")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Exact Match Design: Post Property FREE Button */}
              <Link
                to="/contact"
                className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
                <span className="text-[15px] font-medium text-[#1e293b]">
                  Contact Us{" "}
                </span>
                <span className="rounded-full bg-[#FFC107] px-2.5 py-[2px] text-[10px] font-bold text-gray-900 tracking-wide">
                  FREE
                </span>
              </Link>

              {/* Request Callback CTA */}
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-callback-modal"))
                }
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white px-5 py-2 text-[14px] font-semibold shadow-sm transition-all cursor-pointer">
                <FaPhoneAlt className="w-3 h-3" />
                <span>Request Callback</span>
              </button>
            </div>

            {/* Mobile Menu Toggles */}
            <div className="flex items-center gap-3 xl:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-800 focus:outline-none bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition active:scale-[0.96]">
                <FaBars className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE OFF-CANVAS DRAWER --- */}

      <div
        className={`fixed inset-0 z-[110] bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 z-[120] flex h-full w-[88%] max-w-md flex-col border-l border-gray-100 bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <img
            src="/arjunBuildTechLogo.png"
            alt="Logo"
            className="w-32 object-contain"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200 rounded-lg text-gray-500 transition-colors active:scale-[0.96]">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between border-b border-gray-100 px-6 py-4 text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-red-600 bg-red-50/50"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                }`}>
                <div className="flex items-center gap-3">
                  {t(link.key, link.name)}
                  {link.badge && (
                    <span className="text-[9px] uppercase font-bold bg-[#FFC107] text-gray-900 px-2 py-0.5 rounded shadow-sm tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </div>
                <FaChevronRight
                  className={`w-3.5 h-3.5 ${isActive ? "text-red-600" : "text-gray-400"}`}
                />
              </Link>
            );
          })}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
          <div className="mb-5 flex justify-center bg-white py-2 rounded-lg border border-gray-200 shadow-sm">
            <LanguageSwitcher mobile />
          </div>

          <div className="space-y-4 mb-6">
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-gray-800 font-semibold text-[15px] hover:text-red-600 transition-colors">
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

          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              window.dispatchEvent(new CustomEvent("open-callback-modal"));
            }}
            className="flex items-center justify-center gap-2 w-full py-3 mb-3 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white rounded-lg font-semibold text-[15px] shadow-sm transition-all cursor-pointer">
            <FaPhoneAlt className="w-3.5 h-3.5" />
            <span>Request a Callback</span>
          </button>

          {/* Exact Match Design: Post Property FREE Button (Mobile) */}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`flex justify-center items-center gap-2.5 w-full py-2.5 rounded-lg border border-gray-300 font-medium text-[15px] transition-colors shadow-sm active:scale-[0.98] ${
              isContactActive
                ? "bg-red-50 border-red-200"
                : "bg-white hover:border-gray-400"
            }`}>
            <span className="text-[#1e293b]">Post Property</span>
            <span className="rounded-full bg-[#FFC107] px-2.5 py-[2px] text-[10px] font-bold text-gray-900 tracking-wide">
              FREE
            </span>
          </Link>

          <div className="mt-5 pt-4 border-t border-gray-200">
            <Link
              to="/website-developer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between text-[11px] text-gray-500 hover:text-red-600 transition-colors py-1">
              <span className="uppercase tracking-wider font-semibold">
                Website Developer
              </span>
              <span className="font-semibold text-gray-700 hover:text-red-600">
                Ravi Sharma ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
