import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import DynamicPropertyForm from "../../components/common/admin/DynamicPropertyForm";

const AddEditPropertyPage = () => {
  const { id } = useParams(); // if id exists, we are editing
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const docRef = doc(db, "properties", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setInitialData({ id: docSnap.id, ...docSnap.data() });
          } else {
            alert("Property not found!");
            navigate("/admin");
          }
        } catch (err) {
          console.error("Error fetching property:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      if (id) {
        // Update existing property
        await setDoc(doc(db, "properties", id), data, { merge: true });
        alert("Property updated successfully!");
      } else {
        // Add new property
        const newDocRef = doc(collection(db, "properties"));
        await setDoc(newDocRef, data);
        alert("Property added successfully!");
      }
      navigate("/admin/dashboard");
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
