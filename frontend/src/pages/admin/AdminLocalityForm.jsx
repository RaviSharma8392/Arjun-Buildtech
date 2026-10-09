import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";

const AdminLocalityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    rating: "4.5",
    reviewsCount: 10,
    priceRange: "",
    propertyCount: 0,
    isVisible: true,
    order: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getDoc(doc(db, "localities", id)).then((snap) => {
        if (snap.exists()) {
          setFormData((prev) => ({ ...prev, ...snap.data() }));
        }
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        updatedAt: serverTimestamp(),
      };

      if (isEdit) {
        await updateDoc(doc(db, "localities", id), dataToSave);
      } else {
        await addDoc(collection(db, "localities"), {
          ...dataToSave,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/admin/localities");
    } catch (error) {
      console.error("Error saving locality:", error);
      alert("Failed to save. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-8 p-4 relative text-slate-800">
      <div className="md:max-w-2xl md:mx-auto">
        <Link to="/admin/localities" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Localities
        </Link>
        
        <div className="glass-panel md:rounded-2xl p-6 md:p-8 bg-white border border-gray-200">
          <h1 className="text-xl font-semibold mb-6">
            {isEdit ? "Update Locality" : "Add Popular Locality"}
          </h1>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Locality Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sector 21, Rohtak"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Provide a direct link to an image. This will be shown in the circle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (String)</label>
                <input
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="e.g. 4.8"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                <input
                  name="reviewsCount"
                  type="number"
                  value={formData.reviewsCount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range Display</label>
                <input
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  placeholder="e.g. ₹2,750 - ₹12,000 per sqft"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Properties for Sale</label>
                <input
                  name="propertyCount"
                  type="number"
                  value={formData.propertyCount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div className="flex items-center h-full pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.isVisible}
                    onChange={handleChange}
                    className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                  />
                  <span className="text-gray-700 font-medium">Visible on website</span>
                </label>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-3.5 rounded-lg flex justify-center gap-2 mt-6 hover:bg-red-700 shadow-sm transition-all disabled:opacity-50">
              <Save size={18} />
              {loading ? "Saving..." : isEdit ? "Update Locality" : "Save Locality"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLocalityForm;
