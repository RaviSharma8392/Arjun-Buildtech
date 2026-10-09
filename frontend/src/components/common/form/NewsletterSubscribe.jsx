import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { db } from "../../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-center shadow-lg border border-gray-800">
      <Mail className="w-10 h-10 text-gray-400 mx-auto mb-4" />
      <h3 className="font-normal text-xl text-white mb-2">
        Market Updates in your Inbox
      </h3>
      <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">
        Don't miss out on real estate trends, price drops, and exclusive
        land opportunities in Rohtak.
      </p>

      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded p-4 flex flex-col items-center gap-2">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <span className="text-green-400 font-semibold text-sm">Successfully subscribed!</span>
        </div>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-red-500 placeholder-gray-500 disabled:opacity-50"
            required
            disabled={status === "loading"}
          />
          {status === "error" && (
            <div className="text-red-400 text-xs flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errorMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-white text-gray-900 text-[14px] font-bold uppercase tracking-wider py-3 rounded hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
            {status === "loading" ? (
              <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSubscribe;
