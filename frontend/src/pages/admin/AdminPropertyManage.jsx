import React, { useEffect, useState } from "react";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PropertyCard from "../../components/common/card/PropertyCard";
import Notification from "../../components/common/notification/Notification";

const AdminPropertyManage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Notification state
  const [notification, setNotification] = useState({
    message: "",
    type: "success", // success | error | warning | info
    visible: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Determine collection robustly
  const collectionName = location.pathname.includes("featuredproperties")
    ? "featuredproperties"
    : "properties";

  const isFeatured = collectionName === "featuredproperties";

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, collectionName));

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({
          docId: d.id,
          ...d.data(),
        }));

        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setNotification({
          message: "Failed to fetch properties. Check console for details.",
          type: "error",
          visible: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [collectionName]);

  // Delete property
  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      setDeletingId(docId);
      await deleteDoc(doc(db, collectionName, docId));
      setProperties((prev) => prev.filter((p) => p.docId !== docId));
      setNotification({
        message: "Property deleted successfully!",
        type: "success",
        visible: true,
      });
    } catch (err) {
      console.error("Error deleting property:", err);
      setNotification({
        message: "Failed to delete property. Try again.",
        type: "error",
        visible: true,
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Redirect to edit page
  const handleEdit = (docId) => {
    navigate(`/admin/edit-property/${collectionName}/${docId}`);
  };

  // Redirect to add new
  const handleAddNew = () => {
    navigate(`/admin/edit-property/${collectionName}/new`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading properties...
      </div>
    );

  return (
    <div className="px-6 py-10 min-h-screen bg-gray-50 relative">
      {/* Notification */}
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          {isFeatured ? "Featured Properties" : "All Properties"} (Admin)
        </h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition">
          <Plus size={18} /> Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No {isFeatured ? "featured" : "regular"} properties found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.docId}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden relative group">
              <PropertyCard
                property={property}
                isAdmin={true}
                onEdit={() => handleEdit(property.docId)}
                onDelete={() => handleDelete(property.docId)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPropertyManage;
