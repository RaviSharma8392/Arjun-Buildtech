import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { db } from "../../services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import DynamicPropertyForm from "../../components/admin/DynamicPropertyForm";
import Notification from "../../components/common/notification/Notification"; // optional, if you have
import {
  buildFirestorePropertyPayload,
  normalizePropertyData,
} from "../../utils/propertySchema";

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
            setInitialData(
              normalizePropertyData({ id: docSnap.id, ...docSnap.data() }),
            );
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
      setInitialData(null);
      setLoading(false);
    }
  }, [docId, collectionName]);

  const handleSubmit = async (data) => {
    setErrorMessage(""); // clear previous errors
    try {
      const payload = buildFirestorePropertyPayload(data);

      if (docId) {
        await setDoc(
          doc(db, collectionName, docId),
          { ...payload, updatedAt: serverTimestamp() },
          { merge: true },
        );
        toast.success("Property updated successfully!");
      } else {
        const newDocRef = doc(collection(db, collectionName));
        await setDoc(newDocRef, { ...payload, createdAt: serverTimestamp() });
        toast.success("Property added successfully!");
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
      throw err;
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
    <div className="md:p-6 p-4 relative text-slate-800">
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
