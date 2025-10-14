import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import DynamicPropertyForm from "../../components/admin/DynamicPropertyForm";

const AddEditPropertyPage = () => {
  const { docId } = useParams(); // Firestore doc ID if editing
  const location = useLocation();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(!!docId);

  // Determine collection based on URL
  const isFeatured = location.pathname.includes("featuredproperties");
  const collectionName = isFeatured ? "featuredproperties" : "properties";

  useEffect(() => {
    if (docId) {
      const fetchProperty = async () => {
        try {
          const docRef = doc(db, collectionName, docId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setInitialData({ id: docSnap.id, ...docSnap.data() });
          } else {
            alert("Property not found!");
            navigate("/admin");
          }
        } catch (err) {
          console.error("Error fetching property:", err);
          alert("Failed to fetch property data.");
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    } else {
      setLoading(false);
    }
  }, [docId, collectionName, navigate]);

  const handleSubmit = async (data) => {
    try {
      if (docId) {
        // Update existing property
        await setDoc(doc(db, collectionName, docId), data, { merge: true });
        alert("Property updated successfully!");
      } else {
        // Add new property
        const newDocRef = doc(collection(db, collectionName));
        await setDoc(newDocRef, data);
        alert("Property added successfully!");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Failed to save property. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading property details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DynamicPropertyForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditPropertyPage;
