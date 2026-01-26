import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../services/firebase"; // make sure db is imported
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Save admin info in Firestore
      await setDoc(doc(db, "admins", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        fullName,
        role,
        createdAt: new Date(),
      });

      // Save login info in localStorage
      localStorage.setItem(
        "admin",
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          fullName,
          role,
        }),
      );

      navigate("/admin"); // Redirect to admin dashboard
    } catch (err) {
      console.error(err);

      // Map Firebase errors to user-friendly messages
      let message = "Something went wrong. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address.";
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          break;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

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

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition">
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-red-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
