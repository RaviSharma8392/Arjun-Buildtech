const SITE_URL = "https://arjunbuildtech.com";
const BRAND = "Arjun Buildtech";

const staticPages = {
  "/": {
    title: "Property Dealer in Rohtak | Plots, Homes & Commercial | Arjun Buildtech",
    description:
      "Explore residential plots, homes and commercial property listings in Rohtak, Haryana, with local guidance from Arjun Buildtech.",
  },
  "/properties": {
    title: "Property for Sale in Rohtak | Arjun Buildtech",
    description:
      "Browse current property listings for sale in Rohtak. Ask Arjun Buildtech about property details and availability.",
  },
  "/testimonials": {
    title: "Client Reviews | Arjun Buildtech",
    description:
      "Read reviews shared with Arjun Buildtech about property and local area experiences in Rohtak.",
  },
  "/reviews": {
    title: "Client Reviews | Arjun Buildtech",
    description:
      "Read reviews shared with Arjun Buildtech about property and local area experiences in Rohtak.",
    canonicalPath: "/testimonials",
  },
  "/real-estate-services": {
    title: "Real Estate Services | Arjun Buildtech Rohtak",
    description:
      "Property listing and investment enquiry support from Arjun Buildtech in Rohtak, Haryana.",
  },
  "/services": {
    title: "Real Estate Services in Rohtak | Arjun Buildtech",
    description:
      "Explore property listing and investment enquiry services in Rohtak from Arjun Buildtech.",
  },
  "/contact": {
    title: "Contact Us | Arjun Buildtech",
    description:
      "Contact Arjun Buildtech in Rohtak about a property listing or investment enquiry.",
  },
  "/blog": {
    title: "Real Estate News & Market Updates | Arjun Buildtech",
    description:
      "Read property guides and real estate updates for Rohtak and Haryana.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Arjun Buildtech",
    description: "Read the Arjun Buildtech privacy policy.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Arjun Buildtech",
    description: "Read the terms of service for Arjun Buildtech.",
  },
  "/help-center": {
    title: "Help Center | Arjun Buildtech",
    description: "Find help with property listings and enquiries in Rohtak.",
  },
  "/sales-enquiry": {
    title: "Property Enquiry | Arjun Buildtech",
    description: "Send Arjun Buildtech a property or investment enquiry in Rohtak.",
  },
  "/chat-with-us": {
    title: "Chat With Arjun Buildtech | Rohtak Property Enquiries",
    description: "Contact Arjun Buildtech about current property listings in Rohtak.",
  },
  "/emi-calculator": {
    title: "EMI Calculator | Arjun Buildtech",
    description: "Estimate monthly loan payments with the Arjun Buildtech EMI calculator.",
  },
  "/area-converter": {
    title: "Property Area Converter | Arjun Buildtech",
    description: "Convert common property area units with the Arjun Buildtech area converter.",
  },
  "/tools": {
    title: "Property Tools | Arjun Buildtech",
    description: "Explore property calculators and tools from Arjun Buildtech.",
  },
};

const knownSeoListings = new Set([
  "/properties-for-sale-in-rohtak",
  "/plots-for-sale-in-rohtak",
  "/houses-for-sale-in-rohtak",
]);

const titleCaseSlug = (value) => {
  try {
    return decodeURIComponent(value)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  } catch {
    return value.replace(/[-_]+/g, " ");
  }
};

export const getRouteMetadata = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  const canonicalPath = path === "/reviews" ? "/testimonials" : path;

  if (path === "/profile") {
    return {
      title: `Arjun Buildtech Profile | Real Estate Consultant in Rohtak`,
      description:
        "Company contact and property enquiry information for Arjun Buildtech in Rohtak.",
      canonicalPath: null,
      robots: "noindex, nofollow",
    };
  }

  if (path.startsWith("/admin")) {
    return {
      title: path.includes("login")
        ? "Administrator Login | Arjun Buildtech"
        : `Admin | ${BRAND}`,
      description: "",
      canonicalPath: null,
      robots: "noindex, nofollow",
    };
  }

  if (staticPages[path]) {
    return { ...staticPages[path], canonicalPath };
  }

  if (path.startsWith("/properties/")) {
    const location = titleCaseSlug(path.split("/").at(-1));
    return {
      title: `Property for Sale in ${location} | ${BRAND}`,
      description: `Browse current property listings in ${location}, Rohtak. Ask Arjun Buildtech about listing details and availability.`,
      canonicalPath,
    };
  }

  if (path.startsWith("/property/")) {
    const segments = path.split("/").filter(Boolean);
    const propertyName = titleCaseSlug(segments.at(-2) || "Property");
    return {
      title: `${propertyName} | ${BRAND}`,
      description: `View details for ${propertyName} in Rohtak and contact Arjun Buildtech with a property enquiry.`,
      canonicalPath,
      robots: segments.length === 4 ? "index, follow" : "noindex, nofollow",
    };
  }

  if (path.startsWith("/blog/")) {
    const articleTitle = titleCaseSlug(path.split("/").at(-1));
    return {
      title: `${articleTitle} | ${BRAND}`,
      description: `${articleTitle}. Property guides and real estate information from Arjun Buildtech in Rohtak.`,
      canonicalPath,
    };
  }

  if (path.startsWith("/services/")) {
    const serviceName = titleCaseSlug(path.split("/").at(-1));
    return {
      title: `${serviceName} | ${BRAND} Rohtak`,
      description: `${serviceName} enquiries and local property information from Arjun Buildtech in Rohtak.`,
      canonicalPath,
    };
  }

  if (knownSeoListings.has(path)) {
    const listingName = titleCaseSlug(path.slice(1));
    return {
      title: `${listingName} | ${BRAND}`,
      description: `Browse current ${listingName.toLowerCase()} listings in Rohtak. Availability varies by property.`,
      canonicalPath,
    };
  }

  return {
    title: `Page Not Found | ${BRAND}`,
    description: "The requested Arjun Buildtech page could not be found.",
    canonicalPath: null,
    robots: "noindex, nofollow",
  };
};

export const updateDocumentMetadata = ({
  title,
  description,
  canonicalPath,
  robots = "index, follow, max-image-preview:large",
}) => {
  if (typeof document === "undefined") return;

  document.title = title;

  const updateMeta = (selector, name, content, property = false) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(property ? "property" : "name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  updateMeta('meta[name="description"]', "description", description);
  updateMeta('meta[name="robots"]', "robots", robots);
  updateMeta('meta[property="og:title"]', "og:title", title, true);
  updateMeta(
    'meta[property="og:description"]',
    "og:description",
    description,
    true,
  );

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalPath) {
    canonical?.remove();
    return;
  }

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  canonical.href = canonicalUrl;
  updateMeta('meta[property="og:url"]', "og:url", canonicalUrl, true);
};