import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

const PAGE_SIZE = 10;

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "subscribers"), orderBy("subscribedAt", "desc"));
      const snapshot = await getDocs(q);
      setSubscribers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm("Delete this subscriber?")) return;
    await deleteDoc(doc(db, "subscribers", id));
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredSubscribers = subscribers.filter((sub) => {
    if (!sub.subscribedAt?.seconds) return true;
    const createdTime = sub.subscribedAt.seconds * 1000;
    if (filter === "7") return createdTime > Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (filter === "30") return createdTime > Date.now() - 30 * 24 * 60 * 60 * 1000;
    return true;
  });

  const totalPages = Math.ceil(filteredSubscribers.length / PAGE_SIZE) || 1;
  const paginatedSubscribers = filteredSubscribers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="p-6 relative text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl overflow-hidden">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Newsletter Subscribers</h1>
              <p className="text-sm text-slate-500">
                {filteredSubscribers.length} total subscribers
              </p>
            </div>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="w-fit border border-gray-200 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all">
              <option value="all">All Time</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-700">
              <thead className="bg-gray-100/50 text-slate-600 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200/60">
                <tr>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Date Subscribed</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="py-12 text-center text-slate-500">
                      Loading subscribers...
                    </td>
                  </tr>
                ) : paginatedSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-12 text-center text-slate-500">
                      No subscribers found
                    </td>
                  </tr>
                ) : (
                  paginatedSubscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-slate-200/60 hover:bg-white/40 transition duration-300">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {sub.email}
                      </td>
                      <td className="px-6 py-4">
                        {sub.subscribedAt?.seconds
                          ? new Date(sub.subscribedAt.seconds * 1000).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteSubscriber(sub.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 text-sm border border-slate-200 bg-white/50 rounded-lg disabled:opacity-40 hover:bg-white transition duration-300">
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-sm border border-slate-200 bg-white/50 rounded-lg disabled:opacity-40 hover:bg-white transition duration-300">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscribers;
