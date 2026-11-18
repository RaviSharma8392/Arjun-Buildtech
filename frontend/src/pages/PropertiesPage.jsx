import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import CommonBanner from "../components/common/banner/CommonBanner";
import Button from "../components/common/button/Button";
import UserPropertyCard from "../components/common/card/UserPropertyCard";
import PropertyCard from "../components/common/card/PropertyCard";
import HorizontalPropertyCard from "../components/common/card/HorizontalPropertyCard";
import Breadcrumb from "../components/common/Breadcrumb";
import { createSlug } from "../utils/slugify";
import {
  isPropertyPubliclyAvailable,
  normalizePropertyData,
} from "../utils/propertySchema";
import { Building2, ShieldCheck, MapPin, PhoneCall } from "lucide-react";
import PopularLocalities from "../components/common/PopularLocalities";
import { useLanguage } from "../context/useLanguage";
import EmiCalculatorBanner from "../components/common/banner/EmiCalculatorBanner";
import PropertyEnquiryPopup from "../components/common/form/PropertyEnquiryPopup";
import SidebarWidgets from "../components/common/info/SidebarWidgets";
import { FALLBACK_FEATURED_PROPERTY } from "../data/fallbackFeaturedProperty";

const PropertiesPage = ({
  typeProp = "All",
  cityProp = null,
  statusProp = null,
  canonicalPath = null,
  seoTitle = null,
  seoDescription = null,
}) => {
  const { t } = useLanguage();
  const { city: paramCity } = useParams();
  const routeLocation = useLocation();
  const locationState = routeLocation.state || {};
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const locationQuery = searchParams.get("location")?.trim() || "";
  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";
  const searchTerms = searchQuery
    .split(/\s+/)
    .filter(Boolean)
    .map((term) =>
      term.endsWith("ies")
        ? `${term.slice(0, -3)}y`
        : term.endsWith("s") && !term.endsWith("ss")
          ? term.slice(0, -1)
          : term,
    );
  const requestedType =
    locationState.type || searchParams.get("type") || typeProp || "All";
  const normalizedRequestedType = String(requestedType).trim().toLowerCase();
  const propertyTypeOptions = ["house", "villa", "plot", "flat", "commercial"];
  const requestedPropertyType = propertyTypeOptions.includes(
    normalizedRequestedType,
  )
    ? normalizedRequestedType
    : "All";
  const typeStatus = {
    buy: "For Sale",
    sale: "For Sale",
    "for sale": "For Sale",
    rent: "For Rent",
    lease: "For Rent",
    investment: "Investment",
  }[normalizedRequestedType];
  const requestedStatus =
    locationState.status ||
    searchParams.get("status") ||
    typeStatus ||
    statusProp ||
    "Any";

  const [properties, setProperties] = useState([FALLBACK_FEATURED_PROPERTY]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState(requestedPropertyType);
  const [selectedStatus, setSelectedStatus] = useState(requestedStatus);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [enquiryProperty, setEnquiryProperty] = useState(null);
  const [isEnquiryPopupOpen, setIsEnquiryPopupOpen] = useState(false);

  const city = cityProp || paramCity;

  const translateType = (type) => {
    const key = {
      house: "property.house",
      villa: "property.villa",
      plot: "property.plot",
      flat: "property.flat",
      commercial: "property.commercial",
    }[type.toLowerCase()];
    return key ? t(key, type) : type;
  };

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [propSnapshot, featuredSnapshot] = await Promise.all([
          getDocs(collection(db, "properties")),
          getDocs(collection(db, "featuredproperties")),
        ]);

        const propData = propSnapshot.docs
          .map((doc) => normalizePropertyData({ id: doc.id, ...doc.data() }))
          .filter(isPropertyPubliclyAvailable);

        const featuredData = featuredSnapshot.docs
          .map((doc) => normalizePropertyData({ id: doc.id, ...doc.data() }))
          .filter(isPropertyPubliclyAvailable);

        // Merge and remove potential duplicates by ID
        const allData = [...propData, ...featuredData];
        const uniqueData = Array.from(
          new Map(allData.map((item) => [item.id, item])).values(),
        );
        const requestedRecord = [...propSnapshot.docs, ...featuredSnapshot.docs].find(
          (propertyDoc) => propertyDoc.id === FALLBACK_FEATURED_PROPERTY.id,
        );
        const allowFallback =
          !requestedRecord ||
          isPropertyPubliclyAvailable(
            normalizePropertyData({
              id: requestedRecord.id,
              ...requestedRecord.data(),
            }),
          );

        setProperties(
          !allowFallback ||
          uniqueData.some(
            (property) => property.id === FALLBACK_FEATURED_PROPERTY.id,
          )
            ? uniqueData
            : [...uniqueData, FALLBACK_FEATURED_PROPERTY],
        );
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([FALLBACK_FEATURED_PROPERTY]);
      }
    };
    fetchProperties();
  }, []);

  // Auto-select location from URL or State
  useEffect(() => {
    if (
      locationState.exactLocation &&
      locationState.exactLocation !== "All Locations"
    ) {
      setSelectedLocation(locationState.exactLocation);
    } else if (locationQuery) {
      // Keep partial location searches broad; the filter below matches the query.
      setSelectedLocation("All");
    } else if (city && properties.length > 0) {
      const formattedCity = city
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
      const matchedLocation = properties.find(
        (property) =>
          property.location.toLowerCase() === formattedCity.toLowerCase() ||
          property.location.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ===
            city.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
      );
      setSelectedLocation(matchedLocation ? matchedLocation.location : "All");
    } else {
      setSelectedLocation("All");
    }
  }, [city, properties, locationQuery, locationState.exactLocation]);

  useEffect(() => {
    setSelectedType(requestedPropertyType);
    setSelectedStatus(requestedStatus);
  }, [requestedPropertyType, requestedStatus, searchParamsKey, typeProp, statusProp]);

  // Extract unique locations dynamically
  const locations = [
    "All",
    ...new Set(properties.map((p) => p.location).filter(Boolean)),
  ];

  // Extract unique types dynamically
  const types = [
    "All Types",
    ...new Set(
      properties
        .map((p) => p.type)
        .filter(Boolean)
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
    ),
  ];

  // Filtered properties
  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      (selectedLocation === "All" || property.location === selectedLocation) &&
      (!locationQuery ||
        property.location.toLowerCase().includes(locationQuery.toLowerCase()));
    const typeMatch =
      selectedType === "All" ||
      String(property.type || "").toLowerCase() === selectedType.toLowerCase();
    const searchableText = [
      property.name,
      property.title,
      property.location,
      property.locality,
      property.city,
      property.type,
      property.type === "plot" ? "plots" : "",
      property.societyName,
      property.bedrooms,
      property.bathrooms,
      ...property.features,
      ...property.amenities,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const searchMatch =
      searchTerms.length === 0 ||
      searchTerms.every((term) => searchableText.includes(term));
    const transactionText = `${property.transactionType} ${property.status}`.toLowerCase();
    const statusMatch =
      selectedStatus === "Any" ||
      (selectedStatus === "For Sale" && !/rent|lease/.test(transactionText)) ||
      (selectedStatus === "For Rent" && /rent|lease/.test(transactionText)) ||
      (selectedStatus === "Investment" &&
        transactionText.includes("investment"));
    return locationMatch && typeMatch && searchMatch && statusMatch;
  });

  const BannerLocation =
    selectedLocation === "All" ? "Rohtak" : selectedLocation;
  const resolvedCanonicalPath = canonicalPath ||
    `/properties${city ? `/${city}` : ""}`;
  const resolvedTitle =
    seoTitle || `Property Listings in ${BannerLocation} | Arjun Buildtech`;
  const resolvedDescription =
    seoDescription ||
    `Browse ${selectedType !== "All" ? selectedType : "residential and commercial"} property listings in ${BannerLocation}. Listing details and availability vary; contact Arjun Buildtech to confirm current information.`;
  const listingsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://arjunbuildtech.com${resolvedCanonicalPath}#collection-page`,
    url: `https://arjunbuildtech.com${resolvedCanonicalPath}`,
    name: resolvedTitle,
    description: resolvedDescription,
    isPartOf: { "@id": "https://arjunbuildtech.com/#website" },
    about: { "@id": "https://arjunbuildtech.com/#organization" },
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Helmet>
        <title>{resolvedTitle}</title>
        <meta name="description" content={resolvedDescription} />
        <meta
          name="keywords"
          content={`property in ${BannerLocation}, real estate Rohtak, plots in ${BannerLocation}, buy villa Rohtak, commercial property ${BannerLocation}, ${BannerLocation} प्रॉपर्टी, रोहतक में घर`}
        />
        <link
          rel="canonical"
          href={`https://arjunbuildtech.com${resolvedCanonicalPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta
          property="og:url"
          content={`https://arjunbuildtech.com${resolvedCanonicalPath}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(listingsSchema)}
        </script>
      </Helmet>

      <CommonBanner
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
        title={t(
          "property.findDream",
          `Find Your Dream Property in ${BannerLocation}`,
          { location: BannerLocation },
        )}
        subtitle={t(
          "property.explore",
          `Explore the best residential and commercial properties in ${BannerLocation}`,
          { location: BannerLocation },
        )}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-6">
        <Breadcrumb
          items={[
            { name: t("common.home", "Home"), path: "/" },
            {
              name: `${BannerLocation} ${t("property.in", "Properties")}`,
              path: "/properties",
            },
          ]}
        />
      </div>

      {/* Filters Section (Structured Search Bar) */}
      <section className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Location Filter */}
              <div className="w-full sm:w-64 relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    const newLoc = e.target.value;
                    setSelectedLocation(newLoc);
                    if (newLoc === "All") {
                      navigate("/properties", {
                        state: {
                          type: selectedType,
                          status: selectedStatus,
                          exactLocation: "All Locations",
                        },
                        replace: true,
                      });
                    } else {
                      navigate(`/properties/${createSlug(newLoc)}`, {
                        state: {
                          type: selectedType,
                          status: selectedStatus,
                          exactLocation: newLoc,
                        },
                        replace: true,
                      });
                    }
                  }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 text-gray-900 rounded font-medium focus:ring-1 focus:ring-red-600 focus:border-red-600 appearance-none shadow-sm cursor-pointer hover:border-gray-400 text-sm">
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === "All"
                        ? t("common.allLocations", "All Locations")
                        : location}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              {/* Property Type Filter */}
              <div className="w-full sm:w-56 relative">
                <select
                  value={selectedType}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setSelectedType(newType);
                    const currentLoc = selectedLocation;
                    if (currentLoc === "All") {
                      navigate("/properties", {
                        state: {
                          type: newType,
                          status: selectedStatus,
                          exactLocation: "All Locations",
                        },
                        replace: true,
                      });
                    } else {
                      navigate(`/properties/${createSlug(currentLoc)}`, {
                        state: {
                          type: newType,
                          status: selectedStatus,
                          exactLocation: currentLoc,
                        },
                        replace: true,
                      });
                    }
                  }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 text-gray-900 rounded font-medium focus:ring-1 focus:ring-red-600 focus:border-red-600 appearance-none shadow-sm cursor-pointer hover:border-gray-400 text-sm">
                  {types.map((type) => (
                    <option
                      key={type}
                      value={type === "All Types" ? "All" : type.toLowerCase()}>
                      {type === "All Types"
                        ? t("property.allTypes", "All Types")
                        : translateType(type)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 font-medium">
              {(selectedStatus === "Any"
                ? t(
                    "property.showingAll",
                    "Showing {count} {type} in {location}",
                  )
                : t(
                    "property.showingStatus",
                    "Showing {count} {type} {status} in {location}",
                  )
              )
                .replace("{count}", filteredProperties.length)
                .replace("{status}", selectedStatus)
                .replace(
                  "{type}",
                  selectedType === "All"
                    ? t("common.properties", "Properties")
                    : translateType(selectedType),
                )
                .replace("{location}", BannerLocation)}
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards Section with Sidebar Layout */}
      <main className="container mx-auto px-4 md:px-8 max-w-7xl py-8">
        {/* Page Title & Description */}
        <div className="mb-6">
          <h1 className="text-2xl font-normal text-gray-900 mb-2">
            Property Listings in {BannerLocation}{" "}
            <span className="text-gray-400 font-light px-2">|</span>{" "}
            <span className="text-gray-500 font-normal">
              {filteredProperties.length} Results
            </span>
          </h1>
          <p className="text-sm text-gray-600 mb-4 max-w-4xl leading-relaxed">
            Browse current listings in {BannerLocation}. Details and
            availability vary by property; contact Arjun Buildtech to ask about
            a listing.
          </p>
          <Link
            to={`/properties/${createSlug(BannerLocation)}`}
            className="inline-flex items-center gap-2 rounded border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:border-red-300 hover:text-red-700">
            Browse listings in {BannerLocation}{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column - Properties */}
          <div className="w-full lg:w-[70%]">
            {filteredProperties.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {t("property.noResults", "No properties found")}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  {t(
                    "property.noResultsDescription",
                    "We couldn't find any listings matching your selected filters in {location}. Try changing your location or property type.",
                  ).replace("{location}", BannerLocation)}
                </p>
                <button
                  onClick={() => {
                    setSelectedLocation("All");
                    setSelectedType("All");
                    navigate("/properties", { replace: true });
                  }}
                  className="bg-[#d9534f] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#c9302c] transition">
                  {t("property.resetFilters", "Reset Filters")}
                </button>
              </div>
            ) : isMobile ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="block">
                    <UserPropertyCard
                      property={property}
                      onContactAgent={(prop) => {
                        setEnquiryProperty(prop);
                        setIsEnquiryPopupOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProperties.map((property) => (
                  <HorizontalPropertyCard
                    key={property.id}
                    property={property}
                    onContactAgent={(prop) => {
                      setEnquiryProperty(prop);
                      setIsEnquiryPopupOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="w-full lg:w-[30%]">
            <SidebarWidgets />
          </div>
        </div>
      </main>

      {/* Local Real Estate Guide / Info Section */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-normal text-gray-900 mb-3">
              {t(
                "property.marketTitle",
                "Real Estate Market in {location}",
              ).replace("{location}", BannerLocation)}
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-6"></div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {t(
                "property.marketDescription",
                "Explore current property listings in {location}. Availability, documents, and property details vary by listing; contact Arjun Buildtech to ask about a specific property. Investment outcomes are not guaranteed.",
              ).replace("{location}", BannerLocation)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <ShieldCheck className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Property information
                </h4>
                <p className="text-xs text-gray-500">
                  {t(
                    "property.verificationDescription",
                    "Review the information supplied for each listing and ask us about its documents.",
                  )}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <MapPin className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {t("property.primeLocations", "Prime Locations")}
                </h4>
                <p className="text-xs text-gray-500">
                  {t(
                    "property.primeDescription",
                    "Availability depends on current listings across Rohtak.",
                  )}
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <PhoneCall className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {t("property.directAssistance", "Direct Assistance")}
                </h4>
                <p className="text-xs text-gray-500">
                  {t(
                    "property.directDescription",
                    "Speak directly with expert local property consultants.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Localities */}
      <section className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <PopularLocalities />
        </div>
      </section>

      {/* EMI Calculator Banner */}
      <section className="container mx-auto px-4 md:px-8 max-w-7xl">
        <EmiCalculatorBanner />
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 py-12 text-center max-w-4xl">
          <h2 className="text-2xl font-normal text-gray-900 mb-3">
            {t(
              "property.lookingMore",
              "Looking for more properties in {location}?",
            ).replace("{location}", BannerLocation)}
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 max-w-xl mx-auto">
            {t(
              "property.contactDescription",
              "Contact our Rohtak property team to discuss current listings and the details that matter for your enquiry.",
            )}
          </p>
          <div className="flex justify-center">
            <Button
              label={t("property.contactAgent", "Contact Agent")}
              variant="whatsapp"
            />
          </div>
        </div>
      </section>

      {/* Enquiry Popup */}
      <PropertyEnquiryPopup
        isOpen={isEnquiryPopupOpen}
        onClose={() => {
          setIsEnquiryPopupOpen(false);
          setEnquiryProperty(null);
        }}
        property={enquiryProperty}
      />
    </div>
  );
};

export default PropertiesPage;
