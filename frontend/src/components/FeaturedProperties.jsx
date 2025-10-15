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
        // Optional: order by createdAt if you have timestamp
        const q = query(collection(db, "featuredproperties"));
        const snapshot = await getDocs(q);

        const fetchedProperties = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        setProperties(fetchedProperties);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setNotification({
          message: "Failed to load featured properties. Try again later.",
          type: "error",
          visible: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading)
    return (
      <div className="py-16 flex justify-center items-center text-gray-500 text-lg">
        Loading featured properties...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Featured Properties
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Discover our handpicked selection of premium properties in Rohtak,
          each offering exceptional value and modern amenities.
        </p>

        {properties.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No featured properties available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.docId}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 overflow-hidden">
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
