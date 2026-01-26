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
import { Star, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const StarInput = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onChange(s)}
        className={`${s <= value ? "text-amber-400" : "text-gray-300"}`}>
        <Star className="w-6 h-6 fill-current" />
      </button>
    ))}
  </div>
);

const AdminReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isEdit) {
      getDoc(doc(db, "reviews", id)).then((snap) => {
        const d = snap.data();
        setName(d.name);
        setFeedback(d.feedback);
        setRating(d.rating);
        setLocation(d.location || "");
        setDate(d.date || "");
      });
    }
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      feedback,
      rating,
      location,
      date,
      updatedAt: serverTimestamp(),
    };

    if (isEdit) {
      await updateDoc(doc(db, "reviews", id), data);
    } else {
      await addDoc(collection(db, "reviews"), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }

    navigate("/admin/reviews");
  };

  return (
    <div className="md:min-h-screen bg-slate-100 md:p-4">
      <div className="md:max-w-xl md:mx-auto bg-white md:rounded-2xl md:shadow-lg p-6">
        <h1 className="text-xl font-semibold mb-6">
          {isEdit ? "Update Review" : "Add Review"}
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <StarInput value={rating} onChange={setRating} />

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Client feedback"
            className="w-full border  border-gray-300 rounded-lg px-4 py-2 min-h-[120px]"
            required
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full border  border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border  border-gray-300 rounded-lg px-4 py-2"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center gap-2">
            <Save size={18} />
            {isEdit ? "Update Review" : "Save Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminReviewForm;
