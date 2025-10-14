import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ property }) => {
  if (!property) return null;

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-1">›</span>
        </li>
        <li>
          <Link
            to={`/properties?location=${encodeURIComponent(property.location)}`}
            className="hover:text-blue-600">
            Property in{" "}
            {property.location.split(",")[1]?.trim() || property.location}
          </Link>
          <span className="mx-1">›</span>
        </li>
        <li>
          <Link
            to={`/properties?location=${encodeURIComponent(property.location)}`}
            className="hover:text-blue-600">
            Property for Sale in {property.location}
          </Link>
          <span className="mx-1">›</span>
        </li>
        <li className="text-gray-900 font-semibold">{property.name}</li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
