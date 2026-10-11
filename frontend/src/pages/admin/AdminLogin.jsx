import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { auth, db } from "../../services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const adminSnapshot = await getDoc(
        doc(db, "admins", userCredential.user.uid),
      );
      if (!adminSnapshot.exists() || adminSnapshot.data().role !== "admin") {
        await signOut(auth);
        setError("This account is not authorized for administrator access.");
        return;
      }

      navigate("/admin");
    } catch (err) {
      console.error(err);

      // Map Firebase errors to user-friendly messages
      let message = "Something went wrong. Please try again.";

      switch (err.code) {
        case "auth/user-not-found":
          message = "User not found. Please check your email.";
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
          message = "Email or password is incorrect. Please try again.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address.";
          break;
        case "auth/too-many-requests":
          message = "Too many failed attempts. Please try again later.";
          break;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrator Login | Arjun Buildtech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center md:bg-gray-50">
        <div className="bg-white md:rounded-lg md:shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Admin Login
          </h2>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
