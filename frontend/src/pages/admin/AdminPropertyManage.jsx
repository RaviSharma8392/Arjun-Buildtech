import React, { useEffect, useState } from "react";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Plus, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PropertyCard from "../../components/common/card/PropertyCard";
import Notification from "../../components/common/notification/Notification";
import { normalizePropertyData } from "../../utils/propertySchema";

const AdminPropertyManage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

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
          ...normalizePropertyData({ id: d.id, ...d.data() }),
          docId: d.id,
        }));

        setProperties(data);
        setFilteredProperties(data);
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

  // Search Filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProperties(properties);
    } else {
      const lowerQ = searchQuery.toLowerCase();
      const filtered = properties.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(lowerQ)) ||
          (p.location && p.location.toLowerCase().includes(lowerQ)) ||
          (p.type && p.type.toLowerCase().includes(lowerQ)),
      );
      setFilteredProperties(filtered);
    }
  }, [searchQuery, properties]);

  // Delete property
  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      setIsDeleting(docId);
      await deleteDoc(doc(db, collectionName, docId));
      setProperties((prev) => prev.filter((p) => p.docId !== docId));
      setFilteredProperties((prev) => prev.filter((p) => p.docId !== docId));
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
      setIsDeleting(null);
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
    <div className="px-6 py-10 relative text-slate-800">
      {/* Notification */}
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          {isFeatured ? "Featured Properties" : "All Properties"}
        </h1>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, type, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-72 pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all outline-none"
            />
          </div>

          <button
            onClick={handleAddNew}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No {isFeatured ? "featured" : "regular"} properties found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.docId}
              className="glass-panel rounded-2xl transition-all duration-300 overflow-hidden relative group hover:-translate-y-1 hover:shadow-xl">
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
