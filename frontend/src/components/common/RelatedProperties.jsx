import { useParams } from "react-router-dom";
import PropertyCard from "../common/card/PropertyCard";
import properties from "../../data/properties.json";

export default function RelatedProperties() {
  const { locationSlug } = useParams();
  const locationText = locationSlug ? locationSlug.replace(/-/g, " ") : "";
  console.log(locationText);

  // Filter properties based on current location
  const relatedProperties = properties.filter((p) =>
    p.location.toLowerCase().includes(locationText.toLowerCase())
  );

  if (relatedProperties.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-[Poppins] text-gray-900 mb-4">
            Related Properties in {locationText || "this area"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore other premium properties in {locationText || "this area"}{" "}
            curated just for you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProperties.slice(2).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Optional View All Button */}
        <div className="text-center mt-12">
          <a
            href={`/properties?location=${locationText.replace(/\s+/g, "-")}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Properties in {locationText || "this area"}
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
          </a>
        </div>
      </div>
    </section>
  );
}
