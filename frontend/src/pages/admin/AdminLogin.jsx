import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../services/firebase"; // check path
import { signInWithEmailAndPassword } from "firebase/auth";

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

      // Save admin info in localStorage
      localStorage.setItem(
        "admin",
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: "admin",
        }),
      );

      navigate("/admin"); // Redirect to admin dashboard
    } catch (err) {
      console.error(err);

      // Map Firebase errors to user-friendly messages
      let message = "Something went wrong. Please try again.";

      switch (err.code) {
        case "auth/user-not-found":
          message = "User not found. Please check your email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
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
    <div className="min-h-screen flex items-center justify-center md:bg-gray-50">
      <div className="bg-white md:rounded-lg md:shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

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

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/admin/register"
            className="text-red-600 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
