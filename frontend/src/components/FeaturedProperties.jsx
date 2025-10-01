import { Link } from "react-router-dom";
import PropertyCard from "./common/card/PropertyCard";
import properties from "../data/properties.json";

export default function FeaturedProperties() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in the most
            sought-after locations
          </p>
        </div>

        {/* Properties Grid */}
        {/* Mobile: Horizontal scroll | Desktop: Grid */}
        <div>
          {/* Mobile Layout */}
          <div className="flex gap-6 overflow-x-auto pb-4 md:hidden">
            {properties.map((property) => (
              <div key={property.id} className="min-w-[280px]">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-black hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Properties
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
