import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
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
import { normalizePropertyData } from "../utils/propertySchema";
import { Building2, ShieldCheck, MapPin, PhoneCall } from "lucide-react";
import PopularLocalities from "../components/common/PopularLocalities";
import { useLanguage } from "../context/useLanguage";
import EmiCalculatorBanner from "../components/common/banner/EmiCalculatorBanner";
import PropertyEnquiryPopup from "../components/common/form/PropertyEnquiryPopup";
import SidebarWidgets from "../components/common/info/SidebarWidgets";

const PropertiesPage = ({ typeProp = "All", cityProp = null }) => {
  const { t } = useLanguage();
  const { city: paramCity } = useParams();
  const locationState = useLocation().state || {};
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState(
    locationState.type && locationState.type !== "All Types"
      ? locationState.type.toLowerCase()
      : typeProp,
  );
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

        const propData = propSnapshot.docs.map((doc) =>
          normalizePropertyData({ id: doc.id, ...doc.data() }),
        );

        const featuredData = featuredSnapshot.docs.map((doc) =>
          normalizePropertyData({ id: doc.id, ...doc.data() }),
        );

        // Merge and remove potential duplicates by ID
        const allData = [...propData, ...featuredData];
        const uniqueData = Array.from(
          new Map(allData.map((item) => [item.id, item])).values(),
        );

        setProperties(uniqueData);
      } catch (error) {
        console.error("Error fetching properties:", error);
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
    }
  }, [city, properties, locationState.exactLocation]);

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
      selectedLocation === "All" || property.location === selectedLocation;
    const typeMatch = selectedType === "All" || property.type === selectedType;
    return locationMatch && typeMatch;
  });

  const BannerLocation =
    selectedLocation === "All" ? "Rohtak" : selectedLocation;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Helmet>
        <title>Property for Sale in {BannerLocation} | Arjun Buildtech</title>
        <meta
          name="description"
          content={`Explore the best ${selectedType !== "All" ? selectedType : "residential and commercial"} properties, luxury villas, and plots for sale in ${BannerLocation}. Get the best deals with Arjun Buildtech. ${BannerLocation} में बेस्ट प्रॉपर्टी खरीदें।`}
        />
        <meta
          name="keywords"
          content={`property in ${BannerLocation}, real estate Rohtak, plots in ${BannerLocation}, buy villa Rohtak, commercial property ${BannerLocation}, ${BannerLocation} प्रॉपर्टी, रोहतक में घर`}
        />
        <link
          rel="canonical"
          href={`https://arjunbuildtech.com/properties${city ? `/${city}` : ""}`}
        />
      </Helmet>

      <CommonBanner
        image="https://upload.wikimedia.org/wikipedia/commons/8/8b/Kusum_Sarovar_-Mathura_-Uttar_Pradesh_-PXL_20210217111946742.jpg"
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
                          exactLocation: "All Locations",
                        },
                        replace: true,
                      });
                    } else {
                      navigate(`/properties/${createSlug(newLoc)}`, {
                        state: { type: selectedType, exactLocation: newLoc },
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
                          exactLocation: "All Locations",
                        },
                        replace: true,
                      });
                    } else {
                      navigate(`/properties/${createSlug(currentLoc)}`, {
                        state: { type: newType, exactLocation: currentLoc },
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
              {t(
                "property.showing",
                "Showing {count} {type} for Sale in {location}",
              )
                .replace("{count}", filteredProperties.length)
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
            Properties for Sale in {BannerLocation} <span className="text-gray-400 font-light px-2">|</span> <span className="text-gray-500 font-normal">{filteredProperties.length} Results</span>
          </h1>
          <p className="text-sm text-gray-600 mb-4 max-w-4xl leading-relaxed">
            Find verified properties in {BannerLocation}, you'll find various options to match your needs. Discover the best Residential Land / Plots, Independent Houses, Commercial Shops, and more available with {selectedType !== "All" ? selectedType : "all type of"} furnishing options. <span className="text-blue-600 cursor-pointer">View More ˅</span>
          </p>
          <div className="bg-[#fff9e6] border border-[#f3e5b5] text-gray-700 py-3 px-4 rounded flex items-center text-sm shadow-sm cursor-pointer hover:bg-[#fff5d4] transition-colors">
            <span className="mr-2">📍</span> Get to know more about <span className="text-blue-600 font-medium ml-1">{BannerLocation} Locality</span> <span className="ml-1">→</span>
          </div>
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
                "{location} is one of the most sought-after real estate destinations in Haryana. Known for its well-planned sectors, excellent road connectivity, and robust commercial growth, investing here guarantees high long-term appreciation. Whether you are looking for verified HSVP residential plots, independent builder floors, or commercial spaces, Arjun Buildtech provides complete legal verification and end-to-end guidance.",
              ).replace("{location}", BannerLocation)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <ShieldCheck className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {t("property.verifiedTitles", "100% Verified Titles")}
                </h4>
                <p className="text-xs text-gray-500">
                  {t(
                    "property.verificationDescription",
                    "Every property listing undergoes rigorous legal verification.",
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
                    "Specialized focus on Sectors 1, 27, and Suncity townships.",
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
              "Contact our real estate experts to get personalized property recommendations and secure the best deals in Rohtak.",
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
