import React from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Property", path: "/property" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  const socialLinks = [
    {
      icon: "https://static.realestateindia.com/rei/images/icon_facebook.svg",
      href: "#",
      name: "Facebook",
    },
    {
      icon: "https://static.realestateindia.com/rei/images/icon_instagram.svg",
      href: "#",
      name: "Instagram",
    },
    {
      icon: "https://static.realestateindia.com/rei/images/icon_linkedin.svg",
      href: "#",
      name: "LinkedIn",
    },
  ];

  return (
    <footer className="mb-10 bg-white text-gray-800  py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info & Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/arjunBuildTechLogo.png"
                  alt="Arjun Builtech Logo"
                  className="w-36 md:w-44"
                />
              </Link>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If you are looking for a property consultant to help you get your
              dream plot or investment, you are at the right place. We provide
              excellent quality and planning tailored to your needs.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 transition-all duration-300 hover:bg-gray-200 hover:scale-110"
                  title={social.name}>
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Contact Info
            </h3>
            <div className="space-y-4">
              {/* Phone Numbers */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Contact Numbers</p>
                    <div className="text-gray-600 space-y-1 mt-1">
                      <p className="text-sm">
                        Parveen Gehlawat: 93504-47531, 98994-81428
                      </p>
                      <p className="text-sm">Naveen Gehlawat: 98121-50126</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Office Locations
                    </p>
                    <div className="text-gray-600 space-y-1 mt-1">
                      <p className="text-sm">G74P, Sector-27, Rohtak</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Business Hours
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-900">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-4 p-3  rounded-lg ">
                <p className="text-sm text-red-800 font-medium text-center">
                  Ready to find your dream property?
                </p>
                <button className="w-full mt-2 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Arjun Buildtech. All rights
              reserved.
            </div>

            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
