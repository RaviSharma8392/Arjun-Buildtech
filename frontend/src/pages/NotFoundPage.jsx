import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, PlusCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560185127-6f56c7d62508?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-16 text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          You might be looking for your property, but you are in the right place
          to find it! Use the options below to get back on track.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/post-property"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-md">
            <PlusCircle className="w-5 h-5" />
            Post Property
          </Link>

          <Link
            to="/properties"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-md">
            <Search className="w-5 h-5" />
            Search Property
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-md">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
