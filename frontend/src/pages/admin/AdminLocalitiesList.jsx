import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { Trash2, Edit, Plus, Eye, EyeOff, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLocalitiesList = () => {
  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLocalities = async () => {
    try {
      const snap = await getDocs(collection(db, "localities"));
      let data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Sort by order or propertyCount
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setLocalities(data);
    } catch (error) {
      console.error("Error fetching localities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalities();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this locality?")) return;
    try {
      await deleteDoc(doc(db, "localities", id));
      setLocalities((p) => p.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const toggleVisibility = async (id, currentStatus) => {
    const newStatus = currentStatus === false ? true : false;
    try {
      await updateDoc(doc(db, "localities", id), { isVisible: newStatus });
      setLocalities((p) => p.map((l) => l.id === id ? { ...l, isVisible: newStatus } : l));
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 relative text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md md:text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="text-red-600" /> Manage Popular Localities
          </h1>
          <button
            onClick={() => navigate("/admin/localities/new")}
            className="flex items-center gap-2 bg-red-600 text-white md:px-5 px-4 py-1.5 md:py-2.5 rounded-lg hover:bg-red-700 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            <Plus size={18} />
            Add Locality
          </button>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div></div>
        ) : localities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Localities Found</h3>
            <p className="text-gray-500 mt-1">Add your first popular locality to display on the homepage.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {localities.map((loc) => (
              <div
                key={loc.id}
                className={`glass-panel bg-white border border-gray-200 rounded-md md:rounded-2xl overflow-hidden relative hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group ${loc.isVisible === false ? 'opacity-60' : ''}`}>
                
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-lg shadow-sm z-10">
                  <button
                    onClick={() => toggleVisibility(loc.id, loc.isVisible)}
                    className="p-1 text-gray-500 hover:text-gray-800 bg-gray-100 rounded"
                    title={loc.isVisible === false ? "Show" : "Hide"}>
                    {loc.isVisible === false ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => navigate(`/admin/localities/${loc.id}`)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => remove(loc.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="h-32 bg-gray-100 relative">
                  {loc.image ? (
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {loc.isVisible === false && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white px-2 py-1 text-xs font-bold rounded">HIDDEN</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{loc.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{loc.priceRange || "Price on Request"}</p>
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs">
                      <span className="font-bold text-gray-900">{loc.rating || "4.5"}★</span>
                      <span className="text-gray-500 ml-1">({loc.reviewsCount || 0} reviews)</span>
                    </div>
                    <div className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                      {loc.propertyCount || 0} Props
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLocalitiesList;
