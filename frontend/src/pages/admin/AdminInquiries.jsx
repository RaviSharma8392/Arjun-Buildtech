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

const AdminInquiries = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all"); // all | 7 | 30

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setLeads(
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

  // ✅ Manual delete only
  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await deleteDoc(doc(db, "contacts", id));
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // ✅ Date filters only
  const filteredLeads = leads.filter((lead) => {
    if (!lead.createdAt?.seconds) return true;

    const createdTime = lead.createdAt.seconds * 1000;

    if (filter === "7") {
      return createdTime > Date.now() - 7 * 24 * 60 * 60 * 1000;
    }
    if (filter === "30") {
      return createdTime > Date.now() - 30 * 24 * 60 * 60 * 1000;
    }
    return true;
  });

  // ✅ Pagination
  const totalPages = Math.ceil(filteredLeads.length / PAGE_SIZE);
  const paginatedLeads = filteredLeads.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Leads</h1>
              <p className="text-sm text-slate-500">
                {filteredLeads.length} total records
              </p>
            </div>

            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="w-fit border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Leads</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Phone</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Message</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-slate-500">
                      Loading leads...
                    </td>
                  </tr>
                ) : paginatedLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-slate-500">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4">{lead.phone}</td>
                      <td className="px-6 py-4 text-indigo-600">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4">{lead.location || "-"}</td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {lead.message}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteLead(lead.id)}
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
                className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-slate-100">
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-slate-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;
