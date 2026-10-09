import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path ? `https://arjunbuildtech.com${item.path}` : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <ul className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {isLast || !item.path ? (
                  <span className="text-gray-900 font-semibold">{item.name}</span>
                ) : (
                  <>
                    <Link to={item.path} className="hover:text-red-600">
                      {item.name}
                    </Link>
                    <span className="mx-1 text-gray-400">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Breadcrumb;
