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
        setLoading(true);

        /* 1️⃣ Try main properties collection */
        const mainRef = doc(db, "properties", id);
        const mainSnap = await getDoc(mainRef);

        if (mainSnap.exists()) {
          setProperty({ id: mainSnap.id, ...mainSnap.data() });
          return;
        }

        /* 2️⃣ Fallback to featuredproperties */
        const featuredRef = doc(db, "featuredproperties", id);
        const featuredSnap = await getDoc(featuredRef);

        if (featuredSnap.exists()) {
          setProperty({ id: featuredSnap.id, ...featuredSnap.data() });
          return;
        }

        /* 3️⃣ Not found anywhere */
        setProperty(null);
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty(null);
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
    <div className="min-h-screen bg-gray-50 mt-10 md:mt-20 md:px-4 lg:px-8">
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
      {property.type === "plot" ? (
        <PlotDetails property={property} />
      ) : (
        <HouseDetails property={property} />
      )}
      <div className="flex justify-center md:justify-start md:mx-36 gap-4">
        {/* Mobile / all devices: first image */}
        <img src="/northIllustration.64463390.svg" alt="Illustration" />

        {/* Only show on md+ screens */}
        <img
          src="/northIllustration.64463390.svg"
          alt="Illustration"
          className="hidden md:block "
        />
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
