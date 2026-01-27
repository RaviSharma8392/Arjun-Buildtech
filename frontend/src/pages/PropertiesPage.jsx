import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import CommonBanner from "../components/common/banner/CommonBanner";
import Button from "../components/common/button/Button";
import UserPropertyCard from "../components/common/card/UserPropertyCard";
import PropertyCard from "../components/common/card/PropertyCard";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { city } = useParams(); // Get city from URL if exists

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
        const snapshot = await getDocs(collection(db, "properties"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // Auto-select location from URL
  useEffect(() => {
    if (city && properties.length > 0) {
      const formattedCity = city
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
      const matchedLocation = properties.find(
        (property) =>
          property.location.toLowerCase() === formattedCity.toLowerCase(),
      );
      setSelectedLocation(matchedLocation ? matchedLocation.location : "All");
    }
  }, [city, properties]);

  // Extract unique locations dynamically
  const locations = ["All", ...new Set(properties.map((p) => p.location))];

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
    <div className="min-h-screen md:px-20 mt-5 md:mt-20 bg-gray-50">
      <CommonBanner
        image="https://content.r9cdn.net/rimg/dimg/1b/18/f2f80dcf-city-35183-1754ec6ebf4.jpg?width=2160&height=1215&xhint=1287&yhint=1101&crop=true"
        title={`Find Your Dream Property in ${BannerLocation}`}
        subtitle={`Explore the best residential and commercial properties in ${BannerLocation}`}
      />

      {/* Filters Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Location Filter */}
              <div className="w-full sm:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="All">All Types</option>
                  <option value="house">House</option>
                  <option value="plot">Plot</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 mt-2 sm:mt-0">
              Showing{" "}
              <span className="font-semibold">{filteredProperties.length}</span>{" "}
              <span className="font-semibold">{typeText}</span> {saleText}{" "}
              {locationText && (
                <span className="font-semibold">{locationText}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards */}
      <main className="container mx-auto py-2 md:py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : isMobile ? (
          <div className="grid grid-cols-1 gap-2">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.location
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${property.name
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}/${property.id}`}
                className="block">
                <UserPropertyCard property={property} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.location
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${property.name
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}/${property.id}`}
                className="hover:shadow-lg transition">
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Contact Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-[Poppins] text-gray-900 mb-4">
            Looking for more properties in {BannerLocation}?
          </h2>
          <p className="text-gray-600 font-[Pacifico] mb-6 max-w-2xl mx-auto">
            Contact our real estate experts to get personalized property
            recommendations and the best deals.
          </p>
          <Button label="Contact Agent" variant="whatsapp" />
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
