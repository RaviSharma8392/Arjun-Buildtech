import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import DynamicPropertyForm from "../../components/admin/DynamicPropertyForm";
import Notification from "../../components/common/notification/Notification"; // optional, if you have

const AddEditPropertyPage = () => {
  const { docId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(!!docId);
  const [errorMessage, setErrorMessage] = useState("");

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
            setErrorMessage("Property not found.");
          }
        } catch (err) {
          console.error("Error fetching property:", err);
          setErrorMessage(
            "Failed to load property data. Please try again later.",
          );
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    } else {
      setLoading(false);
    }
  }, [docId, collectionName]);

  const handleSubmit = async (data) => {
    setErrorMessage(""); // clear previous errors
    try {
      if (docId) {
        await setDoc(doc(db, collectionName, docId), data, { merge: true });
        alert("Property updated successfully!");
      } else {
        const newDocRef = doc(collection(db, collectionName));
        await setDoc(newDocRef, data);
        alert("Property added successfully!");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving property:", err);
      // Simplify Firebase error for user
      let message = "Failed to save property. Please try again.";
      if (err.code === "permission-denied") {
        message = "You don't have permission to perform this action.";
      } else if (err.code === "unavailable") {
        message = "Service is temporarily unavailable. Try again later.";
      }
      setErrorMessage(message);
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
    <div className="min-h-screen bg-gray-50 md:p-6">
      {/* Show error notification if any */}
      {errorMessage && (
        <Notification
          message={errorMessage}
          type="error"
          duration={5000}
          onClose={() => setErrorMessage("")}
        />
      )}

      <DynamicPropertyForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditPropertyPage;
