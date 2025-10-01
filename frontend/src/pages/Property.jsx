import React, { useState } from "react";
import { Link } from "react-router-dom";
import properties from "../data/properties.json";
import PropertyCard from "../components/common/card/PropertyCard";
import CommonBanner from "../components/common/banner/CommonBanner";
import Button from "../components/common/button/Button";

// Extract unique locations for filter
const locations = [...new Set(properties.map((property) => property.location))];

const PropertiesPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Filter properties based on selections
  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      selectedLocation === "All" || property.location === selectedLocation;
    const typeMatch = selectedType === "All" || property.type === selectedType;
    return locationMatch && typeMatch;
  });
  // banner location
  const BannerLocation =
    selectedLocation === "All" ? "Noida" : selectedLocation;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
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
                  <option value="All">All Locations</option>
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

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <Link key={property.id} className="hover:shadow-lg transition">
                <PropertyCard property={property} />
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Additional Info Section */}
      <section className="bg-white ">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-[Poppins] text-gray-900 mb-4">
              Looking for more properties in Mukteshwar?
            </h2>
            <p className="text-gray-600 font-[Pacifico] mb-6 max-w-2xl mx-auto">
              Contact our real estate experts to get personalized property
              recommendations and the best deals in Mukteshwar, Nainital.
            </p>
            <Button label="Contact Agent" variant="whatsapp" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
