import React, { useState } from "react";
import toast from "react-hot-toast";
import DynamicPropertyForm from "../components/admin/DynamicPropertyForm";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { buildFirestorePropertyPayload } from "../utils/propertySchema";

const AdminPropertyManager = () => {
  const [loading, setLoading] = useState(false);

  const handlePropertySubmit = async (formData) => {
    setLoading(true);
    try {
      // formData.images already contains Cloudinary URLs from ImageUploader
      // No need to upload again!
      const payload = buildFirestorePropertyPayload(formData);
      const propertyData = {
        ...payload,
        // images are already Cloudinary URLs, just ensure we have array
        images: payload.images || [],
        createdAt: serverTimestamp(),
        featured: false,
        views: 0,
      };

      await addDoc(collection(db, "properties"), propertyData);
      toast.success("Property successfully added!");

      // Optional: Reset form or redirect
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("❌ Error saving property:", err);
      toast.error("Failed to save property. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="mt-5 bg-white rounded-2xl shadow-lg border border-gray-200">
        <DynamicPropertyForm onSubmit={handlePropertySubmit} />

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Saving property...</p>
              <p className="text-sm text-gray-500 mt-1">
                Please don't close this window
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPropertyManager;
