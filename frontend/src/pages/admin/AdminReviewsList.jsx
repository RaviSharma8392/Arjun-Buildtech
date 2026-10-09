import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { Star, Trash2, Edit, Plus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stars = ({ value }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-4 h-4 ${
          s <= value ? "text-amber-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const AdminReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    const snap = await getDocs(collection(db, "reviews"));
    let data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    data.sort((a, b) => {
      const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return bTime - aTime;
    });
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await deleteDoc(doc(db, "reviews", id));
    setReviews((p) => p.filter((r) => r.id !== id));
  };

  const toggleVisibility = async (id, currentStatus) => {
    const newStatus = currentStatus === false ? true : false;
    await updateDoc(doc(db, "reviews", id), { isVisible: newStatus });
    setReviews((p) => p.map((r) => r.id === id ? { ...r, isVisible: newStatus } : r));
  };

  return (
    <div className="p-4 md:p-6 relative text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md md:text-2xl font-semibold text-slate-800">
            Client Reviews
          </h1>
          <button
            onClick={() => navigate("/admin/reviews/new")}
            className="flex items-center gap-2 bg-red-600 text-white md:px-5 px-4 py-1.5 md:py-2.5 rounded-lg hover:bg-red-700 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300">
            <Plus size={18} />
            Add Review
          </button>
        </div>

        {/* GRID */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className={`glass-panel rounded-md md:rounded-2xl p-6 relative hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group ${r.isVisible === false ? 'opacity-60' : ''}`}>
                <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleVisibility(r.id, r.isVisible)}
                    className="text-gray-500 hover:text-gray-800"
                    title={r.isVisible === false ? "Show Review" : "Hide Review"}>
                    {r.isVisible === false ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => navigate(`/admin/reviews/${r.id}`)}
                    className="text-red-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => remove(r.id)} className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>

                <Stars value={r.rating} />

                <p className="mt-3 text-sm text-gray-700 line-clamp-4">
                  {r.feedback}
                </p>

                <div className="flex items-center gap-3 mt-5 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                    {r.name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">
                      {r.location} {r.date && `• ${r.date}`}
                    </p>
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

export default AdminReviewsList;
