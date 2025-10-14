import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import PlotDetails from "../../components/common/info/PlotDetails";
import HouseDetails from "../../components/common/info/HouseDetails";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const q = query(
          collection(db, "properties"),
          where("id", "==", Number(id))
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setProperty(snapshot.docs[0].data());
        } else {
          console.warn("Property not found:", id);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading property details...
        </p>
      </div>
    );

  if (!property)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg font-medium">
          Property not found 🏠
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8">
        {/* Property Details Section */}
        {property.propertyType === "plot" || property.type === "plot" ? (
          <PlotDetails property={property} />
        ) : (
          <HouseDetails property={property} />
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
