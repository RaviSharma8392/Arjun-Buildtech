import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { Helmet } from "react-helmet-async";

import PremiumPropertyDetails from "../../components/common/info/PremiumPropertyDetails";
import { normalizePropertyData } from "../../utils/propertySchema";
import { getLocalizedField } from "../../utils/localizedField";
import { useLanguage } from "../../context/useLanguage";
import EmiCalculatorBanner from "../../components/common/banner/EmiCalculatorBanner";
import InlineEnquiryForm from "../../components/common/form/InlineEnquiryForm";

const PropertyDetailsPage = () => {
  const { language, t } = useLanguage();
  const { id } = useParams(); // Firestore document ID
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        // Fetch from both properties and featuredproperties in parallel for speed
        const [mainSnap, featuredSnap] = await Promise.allSettled([
          getDoc(doc(db, "properties", id)),
          getDoc(doc(db, "featuredproperties", id)),
        ]);

        let foundProperty = null;

        if (mainSnap.status === "fulfilled" && mainSnap.value.exists()) {
          foundProperty = normalizePropertyData({
            id: mainSnap.value.id,
            ...mainSnap.value.data(),
          });
        } else if (
          featuredSnap.status === "fulfilled" &&
          featuredSnap.value.exists()
        ) {
          foundProperty = normalizePropertyData({
            id: featuredSnap.value.id,
            ...featuredSnap.value.data(),
          });
        }

        setProperty(foundProperty);

        // Fast Similar Properties Fetch
        if (foundProperty && foundProperty.location) {
          const propertiesRef = collection(db, "properties");
          // Use direct equality query to limit returned docs instantly instead of fetching 15
          const q = query(
            propertiesRef,
            where("location", "==", foundProperty.location),
            limit(5),
          );
          const querySnapshot = await getDocs(q);

          const simProps = [];
          querySnapshot.forEach((docSnap) => {
            if (docSnap.id !== foundProperty.id && simProps.length < 4) {
              simProps.push(
                normalizePropertyData({
                  id: docSnap.id,
                  ...docSnap.data(),
                }),
              );
            }
          });

          // If exact match yields nothing, we could fetch fallback, but keeping it simple/fast
          setSimilarProperties(simProps);
        }
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
        <Helmet>
          <title>Loading Property... | Arjun Buildtech</title>
        </Helmet>
        <div className="w-10 h-10 border-[3px] border-gray-100 border-t-red-600 rounded-full animate-spin mb-3"></div>
        <p className="text-gray-600 text-sm font-medium">
          {t("detail.loading", "Loading property details...")}
        </p>
      </div>
    );
  }

  /* Not Found State */
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-4">
        <Helmet>
          <title>Property Not Found | Arjun Buildtech</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {t("detail.notFound", "Property not found")}
        </h2>
        <p className="text-gray-500 text-sm">
          {t(
            "detail.notFoundDescription",
            "The property you are looking for may have been removed or is no longer available.",
          )}
        </p>
      </div>
    );
  }

  const propertyName = getLocalizedField(property, "name", language);
  const pageTitle = propertyName
    ? `${propertyName} | Arjun Buildtech`
    : `${t("detail.title", "Property Details")} | Arjun Buildtech`;

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
        <PremiumPropertyDetails
          property={property}
          similarProperties={similarProperties}
        />

        <div className="mt-8">
          <EmiCalculatorBanner />
        </div>

        {/* Optional Compass Illustration / Footer Note */}
        <div className="flex justify-center md:justify-start mt-12 opacity-75">
          <img
            src="/northIllustration.64463390.svg"
            alt={t("detail.compassAlt", "Compass Illustration")}
            className="w-20 md:w-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
