import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import PropertyCard from "../common/card/PropertyCard";

export default function RelatedProperties() {
  const { location } = useParams(); // e.g. "gurgaon"
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedLocation =
    location &&
    location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

  // Fetch related properties from Firebase
  useEffect(() => {
    const fetchRelatedProperties = async () => {
      if (!formattedLocation) return;

      try {
        const q = query(
          collection(db, "properties"),
          where("location", "==", formattedLocation)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRelatedProperties(data);
      } catch (error) {
        console.error("Error fetching related properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProperties();
  }, [formattedLocation]);

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (relatedProperties.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Related Properties in {formattedLocation}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore more premium properties in {formattedLocation}, curated just
            for you.
          </p>
        </div>

        {/* Grid of Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to={`/properties/${formattedLocation.toLowerCase()}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Properties in {formattedLocation}
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
