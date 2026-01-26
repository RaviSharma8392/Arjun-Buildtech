import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";

import PlotDetails from "../../components/common/info/PlotDetails";
import HouseDetails from "../../components/common/info/HouseDetails";

const PropertyDetailsPage = () => {
  const { id } = useParams(); // Firestore document ID
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
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

  /* Loading */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading property details...
        </p>
      </div>
    );
  }

  /* Not Found */
  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg font-medium">
          Property not found 🏠
        </p>
      </div>
    );
  }

  const pageTitle = property.name
    ? `${property.name} | Arjun BuildTech`
    : "Property Details | Arjun BuildTech";

  const pageDescription =
    property.shortTitle ||
    "Explore premium real estate properties with Arjun BuildTech.";

  return (
    <div className="min-h-screen bg-gray-50 md:py-10 md:px-4 lg:px-8">
      {/* SEO */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {property.images?.length > 0 && (
          <meta property="og:image" content={property.images[0]} />
        )}
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mx-auto space-y-8">
        {property.type === "plot" ? (
          <PlotDetails property={property} />
        ) : (
          <HouseDetails property={property} />
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
