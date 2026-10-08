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

  /* Loading State */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-4">
        <div className="w-10 h-10 border-[3px] border-gray-100 border-t-red-600 rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-sm font-medium">
          Loading property details...
        </p>
      </div>
    );
  }

  /* Not Found State */
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Property not found
        </h2>
        <p className="text-gray-500 text-sm">
          The property you are looking for may have been removed or is no longer
          available.
        </p>
      </div>
    );
  }

  const pageTitle = property.name
    ? `${property.name} | Arjun Buildtech`
    : "Property Details | Arjun Buildtech";

  const pageDescription =
    property.shortTitle ||
    `Explore ${property.type || "property"} details for sale in ${property.location || "Rohtak"} with Arjun Buildtech.`;

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12">
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

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {property.type === "plot" ? (
          <PlotDetails property={property} />
        ) : (
          <HouseDetails property={property} />
        )}

        {/* Optional Compass Illustration / Footer Note */}
        <div className="flex justify-center md:justify-start mt-12 opacity-75">
          <img
            src="/northIllustration.64463390.svg"
            alt="Compass Illustration"
            className="w-20 md:w-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
