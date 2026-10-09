import React from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Property", path: "/properties" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="w-4 h-4" />,
      href: "https://www.facebook.com/NewRohtak/",
      name: "Facebook",
    },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      href: "https://www.instagram.com/arjun.buildtech",
      name: "Instagram",
    },
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          {/* Company Info & Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="flex items-center">
                <img
                  src="/arjunBuildTechLogo.png"
                  alt="Arjun Builtech Logo"
                  className="w-32 md:w-36 object-contain"
                />
              </Link>
            </div>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
              If you are looking for a property consultant to help you get your
              dream plot, luxury villa, or high-return investment, then you are
              at the right place. We, at Arjun Buildtech, are one of the leading
              real estate advisors in Rohtak, Haryana, with a decade of
              experience. Our main motive is to provide excellent quality and
              planning tailored to the needs of our clients.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded text-xs font-semibold hover:border-red-600 hover:text-red-600 transition-colors"
                  title={social.name}>
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-[14px] text-gray-600 hover:text-red-600 transition-colors inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Contact Info
            </h3>
            <div className="space-y-4 text-[14px]">
              {/* Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <FaPhone className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Contact Numbers</p>
                  <div className="text-gray-600 space-y-0.5 mt-0.5 text-[13px]">
                    <p>Parveen Gehlawat: 93504-47531, 98994-81428</p>
                    <p>Naveen Gehlawat: 98121-50126</p>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Office Locations
                  </p>
                  <div className="text-gray-600 space-y-0.5 mt-0.5 text-[13px]">
                    <p>• G74P, Sector-27, Rohtak</p>
                    <p>• 828, Sector-1, Rohtak, 124001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Business Hours
            </h3>
            <div className="bg-gray-50 rounded p-4 border border-gray-200">
              <div className="space-y-1 mb-4 text-[13px]">
                <div className="text-gray-600">All 7 days available</div>
                <div className="font-semibold text-gray-900">
                  10:00 AM - 7:00 PM
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-[13px] text-gray-700 font-medium text-center mb-2">
                  Ready to find your dream property?
                </p>
                <Link
                  to="/contact"
                  className="block text-center w-full bg-red-600 text-white py-2 px-3 rounded text-[13px] font-semibold hover:bg-red-700 transition-colors">
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Mega Links Section */}
        <div className="border-b border-gray-200 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Government & Useful Links */}
            <div>
              <h4 className="text-gray-900 font-bold mb-3 text-xs uppercase tracking-wider">
                Government & Useful Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-gray-500">
                <a href="https://jamabandi.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  Jamabandi Nakal (Digital Land Record)
                </a>
                <a href="https://haryanarera.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  HRERA Policies
                </a>
                <a href="https://ulbhryndc.org/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  Property ID Status
                </a>
                <a href="https://hsvp.org.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  HSVP Plots Status
                </a>
                <a href="https://hsvpeauction.org.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  HSVP e-Auction News
                </a>
                <a href="https://tcpharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  Master Plan Rohtak 2031
                </a>
                <a href="https://tcpharyana.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  Haryana Building Code
                </a>
                <a href="https://egrashry.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                  Online Stamp (E-GRAS)
                </a>
              </div>
            </div>

            {/* Properties by Area */}
            <div>
              <h4 className="text-gray-900 font-bold mb-3 text-xs uppercase tracking-wider">
                Properties in Rohtak
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-gray-500">
                <Link
                  to="/properties-for-sale-in-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Property for sale in Rohtak
                </Link>
                <Link
                  to="/properties-for-sale-in-sector-27-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Property for sale in Sector-27
                </Link>
                <Link
                  to="/properties-for-sale-in-suncity-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Property for sale in Suncity
                </Link>
                <Link
                  to="/properties-for-sale-in-hsvp-rohtak"
                  className="hover:text-red-600 transition-colors">
                  HSVP Plots for sale in Rohtak
                </Link>
                <Link
                  to="/commercial-property-for-sale-in-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Commercial Property in Rohtak
                </Link>
                <Link
                  to="/residential-plots-in-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Residential Plots in Rohtak
                </Link>
                <Link
                  to="/agriculture-land-for-sale-in-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Agricultural Land in Rohtak
                </Link>
                <Link
                  to="/rental-property-in-rohtak"
                  className="hover:text-red-600 transition-colors">
                  Rental Property in Rohtak
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Arjun Buildtech. All rights
            reserved. Made & Managed by{" "}
            <span className="font-semibold text-gray-700">Ravi Sharma</span>.
          </div>

          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-red-600 transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-red-600 transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-red-600 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
