import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../../../services/firebase"; // adjust path if needed
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import DynamicPropertyForm from "../../admin/DynamicPropertyForm";
import {
  buildFirestorePropertyPayload,
  normalizePropertyData,
} from "../../../utils/propertySchema";

const PropertyFormContainer = ({
  propertyId = null,
  propertyType = "house",
  collectionName = "properties", // default to "properties"
}) => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(Boolean(propertyId));

  // Fetch property details if editing
  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        const docRef = doc(db, collectionName, propertyId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInitialData(
            normalizePropertyData({ id: docSnap.id, ...docSnap.data() }),
          );
        } else {
          console.warn(`${collectionName} document not found:`, propertyId);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, collectionName]);

  // Handle add or update
  const handleSubmit = async (data) => {
    try {
      const payload = buildFirestorePropertyPayload(data);

      if (propertyId) {
        // update existing
        const docRef = doc(db, collectionName, propertyId);
        await setDoc(
          docRef,
          { ...payload, updatedAt: serverTimestamp() },
          { merge: true },
        );
        toast.success(`Property updated successfully in ${collectionName}`);
      } else {
        // create new
        const colRef = collection(db, collectionName);
        await addDoc(colRef, { ...payload, createdAt: serverTimestamp() });
        toast.success(`New property added successfully to ${collectionName}`);
      }
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to save property");
      throw error;
    }
  };

  if (loading) {
    return (
      <p className="text-center py-8 text-gray-500">Loading property...</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <DynamicPropertyForm
        onSubmit={handleSubmit}
        initialData={initialData}
        propertyType={propertyType}
      />
    </div>
  );
};

export default PropertyFormContainer;
