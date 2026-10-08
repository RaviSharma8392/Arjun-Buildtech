import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import CommonBanner from "../components/common/banner/CommonBanner";
import Button from "../components/common/button/Button";
import UserPropertyCard from "../components/common/card/UserPropertyCard";
import PropertyCard from "../components/common/card/PropertyCard";
import { createSlug } from "../utils/slugify";
import { Building2, ShieldCheck, MapPin, PhoneCall } from "lucide-react";

const PropertiesPage = ({ typeProp = "All", cityProp = null }) => {
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

  const city = cityProp || paramCity;

  const typeText = selectedType !== "All" ? selectedType : "Properties";
  const locationText = `in ${selectedLocation === "All" ? "Rohtak" : selectedLocation}`;
  const saleText = "for Sale";

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

        const propData = propSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const featuredData = featuredSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
          content={`Explore the best ${selectedType !== "All" ? selectedType : "residential and commercial"} properties, luxury villas, and plots for sale in ${BannerLocation}. Get the best deals with Arjun Buildtech.`}
        />
        <meta
          name="keywords"
          content={`property in ${BannerLocation}, real estate Rohtak, plots in ${BannerLocation}, buy villa Rohtak, commercial property ${BannerLocation}`}
        />
        <link
          rel="canonical"
          href={`https://arjunbuildtech.com/properties${city ? `/${city}` : ""}`}
        />
      </Helmet>

      <CommonBanner
        image="https://upload.wikimedia.org/wikipedia/commons/8/8b/Kusum_Sarovar_-Mathura_-Uttar_Pradesh_-PXL_20210217111946742.jpg"
        title={`Find Your Dream Property in ${BannerLocation}`}
        subtitle={`Explore the best residential and commercial properties in ${BannerLocation}`}
      />

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
                      {location === "All" ? "All Locations" : location}
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
                      {type}
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
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredProperties.length}
              </span>{" "}
              {typeText} {saleText} {locationText}
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards Section */}
      <main className="container mx-auto px-4 md:px-8 max-w-7xl py-10">
        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No properties found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              We couldn't find any listings matching your selected filters in{" "}
              {BannerLocation}. Try changing your location or property type.
            </p>
            <button
              onClick={() => {
                setSelectedLocation("All");
                setSelectedType("All");
                navigate("/properties", { replace: true });
              }}
              className="bg-red-600 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-red-700 transition">
              Reset Filters
            </button>
          </div>
        ) : isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${createSlug(property.location)}/${createSlug(property.name)}/${property.id}`}
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden">
                <UserPropertyCard property={property} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${createSlug(property.location)}/${createSlug(property.name)}/${property.id}`}
                className="transition-all duration-200 hover:shadow-md rounded-lg bg-white border border-gray-200 overflow-hidden block">
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Local Real Estate Guide / Info Section */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-normal text-gray-900 mb-3">
              Real Estate Market in {BannerLocation}
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-6"></div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {BannerLocation} is one of the most sought-after real estate
              destinations in Haryana. Known for its well-planned sectors,
              excellent road connectivity, and robust commercial growth,
              investing here guarantees high long-term appreciation. Whether you
              are looking for verified HSVP residential plots, independent
              builder floors, or commercial spaces, Arjun Buildtech provides
              complete legal verification and end-to-end guidance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <ShieldCheck className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  100% Verified Titles
                </h4>
                <p className="text-xs text-gray-500">
                  Every property listing undergoes rigorous legal verification.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <MapPin className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Prime Locations
                </h4>
                <p className="text-xs text-gray-500">
                  Specialized focus on Sectors 1, 27, and Suncity townships.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <PhoneCall className="w-5 h-5 text-red-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Direct Assistance
                </h4>
                <p className="text-xs text-gray-500">
                  Speak directly with expert local property consultants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 py-12 text-center max-w-4xl">
          <h2 className="text-2xl font-normal text-gray-900 mb-3">
            Looking for more properties in {BannerLocation}?
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Contact our real estate experts to get personalized property
            recommendations and secure the best deals in Rohtak.
          </p>
          <div className="flex justify-center">
            <Button label="Contact Agent" variant="whatsapp" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
