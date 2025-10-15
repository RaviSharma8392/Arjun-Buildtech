import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import PropertyCard from "../components/common/card/PropertyCard";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "featuredproperties"));
        const snapshot = await getDocs(q);

        const fetchedProperties = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        setProperties(fetchedProperties);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        alert("Failed to load featured properties. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading)
    return (
      <div className="py-16 flex justify-center text-gray-500 text-lg">
        Loading featured properties...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Properties Discover our handpicked selection of premium
        </h1>{" "}
        properties in Rohtak, each offering exceptional value and modern
        amenities.{" "}
        {properties.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No featured properties found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.docId}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 overflow-hidden">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
