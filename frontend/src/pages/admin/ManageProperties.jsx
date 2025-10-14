import React, { useEffect, useState } from "react";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import PropertyCard from "../../components/common/card/PropertyCard";
import { Edit, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, "properties"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        alert("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Delete property
  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(propertyId);
      await deleteDoc(doc(db, "properties", propertyId));
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      alert("Property deleted successfully!");
    } catch (err) {
      console.error("Error deleting property:", err);
      alert("Failed to delete property. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter properties by search term
  const filteredProperties = properties.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading your properties...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Manage Properties
          </h1>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* No properties */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            No properties found. Add a new property to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
                <PropertyCard property={property} />

                {/* Manage Buttons */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  {/* Edit */}
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg"
                    onClick={() =>
                      navigate(`/admin/edit-property/${property.id}`)
                    }>
                    <Edit size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    className={`${
                      deletingId === property.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white p-2 rounded-lg`}
                    onClick={() => handleDelete(property.id)}
                    disabled={deletingId === property.id}>
                    {deletingId === property.id ? (
                      "Deleting..."
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;
