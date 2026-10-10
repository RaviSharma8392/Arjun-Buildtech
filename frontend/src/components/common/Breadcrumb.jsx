import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../../context/useLanguage";

const Breadcrumb = ({ items = [] }) => {
  const { t } = useLanguage();
  if (!items || items.length === 0) return null;

  const translateName = (name) => {
    const labels = {
      Home: ["common.home", "Home"],
      Properties: ["nav.properties", "Properties"],
      Services: ["nav.services", "Services"],
      "Contact Us": ["nav.contactUs", "Contact Us"],
      "Company Profile": ["profile.title", "Company Profile"],
      "Help Center": ["help.title", "Help Center"],
      "Sales Enquiry": ["sales.title", "Sales Enquiry"],
      "Chat with Us": ["chat.title", "Chat with Us"],
      Sitemap: ["footer.sitemap", "Sitemap"],
      "Privacy Policy": ["privacy.title", "Privacy Policy"],
      "Terms of Service": ["terms.title", "Terms of Service"],
      Blog: ["nav.blog", "Blog"],
      "Market Updates": ["market.updates", "Market Updates"],
    };
    const entry = labels[name];
    return entry ? t(entry[0], entry[1]) : name;
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `https://arjunbuildtech.com${item.path}` : undefined,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <nav
        className="text-sm text-gray-600 mb-4"
        aria-label={t("common.breadcrumb", "breadcrumb")}>
        <ul className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {isLast || !item.path ? (
                  <span className="text-gray-900 font-semibold">
                    {translateName(item.name)}
                  </span>
                ) : (
                  <>
                    <Link to={item.path} className="hover:text-red-600">
                      {translateName(item.name)}
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
