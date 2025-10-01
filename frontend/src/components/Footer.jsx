import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Property", path: "/property" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Arjun Buildtech
          </h2>
          <p className="text-gray-400">
            Building your dream properties with quality and trust. Serving
            Mukteshwar & Nainital.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="hover:text-emerald-500 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p>123, Mukteshwar Road, Nainital, Uttarakhand</p>
          <p className="mt-1">Phone: +91 76177 11003</p>
          <p className="mt-1">Email: info@arjunbuildtech.com</p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-emerald-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-emerald-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-emerald-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-emerald-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Arjun Buildtech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
