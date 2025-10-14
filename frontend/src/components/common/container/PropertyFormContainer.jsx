import React, { useState, useEffect } from "react";
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
          setInitialData({ id: docSnap.id, ...docSnap.data() });
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
      if (propertyId) {
        // update existing
        const docRef = doc(db, collectionName, propertyId);
        await setDoc(
          docRef,
          { ...data, updatedAt: serverTimestamp() },
          { merge: true }
        );
        alert(`✅ Property updated successfully in ${collectionName}`);
      } else {
        // create new
        const colRef = collection(db, collectionName);
        await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
        alert(`✅ New property added successfully to ${collectionName}`);
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("❌ Failed to save property");
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
