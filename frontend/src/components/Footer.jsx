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
    { name: "Post Property", path: "/post-property", free: true },
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
            If you are looking for a property consultant to help you get your
            dream plot or investment, you are at the right place. We provide
            excellent quality and planning tailored to your needs.
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

          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Contacts:</strong>
            </p>
            <p>Parveen Gehlawat: 93504-47531, 98994-81428</p>
            <p>Naveen Gehlawat: 98121-50126</p>

            <p className="mt-2">
              <strong>Offices:</strong>
            </p>
            <p>G74P, Sector-27, Rohtak</p>
            <p>828, Sector-1, Rohtak, 124001</p>
          </div>

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
