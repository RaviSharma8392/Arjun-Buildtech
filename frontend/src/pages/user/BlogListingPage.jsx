import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../../data/blogs";

const BlogListingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8">
      <Helmet>
        <title>Real Estate Blog & Market Updates | Arjun Buildtech</title>
        <meta name="description" content="Stay updated with the latest Rohtak real estate news, property investment tips, and market insights from Arjun Buildtech." />
        <link rel="canonical" href="https://arjunbuildtech.com/blog" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Market Insights & <span className="text-red-600">News</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert analysis, investment guides, and the latest infrastructure updates in Rohtak real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="group block h-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    {blog.category}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-gray-400 font-medium mb-3">
                    {blog.date}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <span className="text-red-600 font-semibold text-sm group-hover:underline flex items-center gap-1">
                      Read Full Story <span className="text-lg">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
