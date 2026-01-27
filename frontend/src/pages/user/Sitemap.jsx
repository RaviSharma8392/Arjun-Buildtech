import React from "react";
import { Link } from "react-router-dom";

const routes = [
  { path: "/", name: "Home" },
  { path: "/properties", name: "Properties" },
  { path: "/properties/:location", name: "Properties by Location" },
  { path: "/property/:location/:name/:id", name: "Property Details" },
  { path: "/testimonials", name: "Client Reviews" },
  { path: "/contact", name: "Contact Us" },
  { path: "/profile", name: "Profile" },
  { path: "/services", name: "Real Estate Services" },
];

const SitemapPage = () => {
  return (
    <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Arjun BuildTech Sitemap
      </h1>
      <ul className="space-y-3">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path.replace(/:.*?(\b|$)/g, "")} // remove params for demo
              className="text-blue-700 hover:underline">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SitemapPage;
