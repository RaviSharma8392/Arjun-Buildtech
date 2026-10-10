import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../../data/blogs";

const SidebarWidgets = () => {
  return (
    <div className="flex flex-col gap-6 sticky top-[100px]">
      {/* Widget 1: Buy Property */}
      <div className="bg-white border border-gray-200 rounded p-6 shadow-sm flex flex-col items-center text-center">
        <div className="bg-[#fcf8f0] p-4 w-full rounded mb-4">
          <h3 className="text-xl text-gray-800">
            Looking to <span className="text-[#d9534f] font-semibold">Buy/Invest</span><br/>in Property?
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Get access to verified property deals & connect with our experts
        </p>
        <Link to="/contact" className="w-full bg-[#c9302c] hover:bg-red-800 text-white font-medium py-2.5 rounded transition-colors shadow-sm text-sm">
          Contact Us <span className="text-yellow-400 font-bold ml-1 text-xs">NOW</span>
        </Link>
      </div>

      {/* Widget 2: EMI Calculator */}
      <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
        <h3 className="text-[17px] text-gray-800 mb-2 font-semibold">EMI Calculator</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-gray-600 max-w-[160px] leading-relaxed">
            Calculate your monthly home loan EMI instantly with our smart tool.
          </p>
          <div className="w-10 h-14 bg-red-50 flex items-center justify-center rounded">
            <span className="text-2xl">🧮</span>
          </div>
        </div>
        <Link to="/emi-calculator" className="inline-block bg-[#d9534f] hover:bg-[#c9302c] text-white font-medium text-xs px-4 py-2 rounded transition-colors shadow-sm">
          Calculate EMI Now
        </Link>
      </div>

      {/* Widget 3: Area Converter */}
      <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
        <h3 className="text-[17px] text-gray-800 mb-2 font-semibold">Area Converter</h3>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-gray-600 max-w-[160px] leading-relaxed">
            Quickly convert land area units like Sq.Yard, Gaj, Acre, and more.
          </p>
          <div className="w-10 h-14 bg-blue-50 flex items-center justify-center rounded">
            <span className="text-2xl">📐</span>
          </div>
        </div>
        <Link to="/area-converter" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded transition-colors shadow-sm">
          Convert Area Now
        </Link>
      </div>

      {/* Widget 4: Recent News */}
      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <h3 className="text-[#d9534f] font-semibold p-4 border-b border-gray-100 bg-gray-50">
          Real Estate News
        </h3>
        <div className="bg-white flex flex-col">
          {blogs.slice(0, 3).map((blog, index) => (
            <Link key={blog.id || index} to={`/blog/${blog.slug}`} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 line-clamp-2 transition-colors">
                {blog.title}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{blog.date}</span>
            </Link>
          ))}
        </div>
        <div className="p-3 text-center bg-gray-50">
          <Link to="/blog" className="text-xs font-semibold text-gray-600 hover:text-red-600">
            View All News &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarWidgets;
