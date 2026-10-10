import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import { blogs } from "../../data/blogs";

const LatestNews = () => {
  const { t } = useLanguage();

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("home.latestNewsTitle", "Real Estate News & Insights")}
            </h2>
            <div className="w-16 h-1 bg-[#d9534f] mb-4"></div>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl">
              {t(
                "home.latestNewsDesc",
                "Stay updated with the latest trends, market insights, and real estate news from Arjun Buildtech."
              )}
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-red-600 hover:text-red-700 transition-colors pb-1"
          >
            {t("home.viewAllNews", "View all articles")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.slice(0, 4).map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={blog.image || "/placeholder.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-red-600">
                  {blog.category || "Real Estate"}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center text-gray-400 text-xs mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {blog.date}
                </div>
                <h3 className="font-semibold text-gray-900 leading-snug mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mt-auto">
                  {blog.excerpt || "Read this comprehensive guide to understand the market trends and make informed decisions."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
