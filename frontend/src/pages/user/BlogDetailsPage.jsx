import React, { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../../data/blogs";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Schema for Google SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": [blog.image],
    "datePublished": new Date(blog.date).toISOString(),
    "author": [{
      "@type": "Organization",
      "name": "Arjun Buildtech",
      "url": "https://arjunbuildtech.com"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Arjun Buildtech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://arjunbuildtech.com/arjunBuildTechLogo.png"
      }
    },
    "description": blog.excerpt
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <Helmet>
        <title>{blog.title} | Arjun Buildtech Blog</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={`real estate, ${blog.category}, Rohtak property, Arjun Buildtech, ${blog.title.split(' ')[0]}`} />
        <link rel="canonical" href={`https://arjunbuildtech.com/blog/${blog.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Hero Header */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
              {blog.category}
            </span>
            <span className="text-gray-200 text-sm font-medium">{blog.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <article className="lg:w-2/3">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-600 hover:prose-a:text-red-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
             <Link to="/blog" className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition">
               &larr; Back to all Market Updates
             </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-28 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Updates</h3>
            <div className="flex flex-col gap-6">
              {blogs.filter(b => b.id !== blog.id).slice(0, 4).map((recentBlog) => (
                <Link key={recentBlog.id} to={`/blog/${recentBlog.slug}`} className="group flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={recentBlog.image} 
                      alt={recentBlog.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                      {recentBlog.title}
                    </h4>
                    <span className="text-xs text-gray-500">{recentBlog.date}</span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 bg-red-600 text-white rounded-xl p-6 text-center">
              <h4 className="font-bold text-xl mb-2">Looking for a Property?</h4>
              <p className="text-sm text-red-100 mb-4">Contact our experts to find the best deals in Rohtak today.</p>
              <Link to="/contact" className="block w-full bg-white text-red-600 font-bold py-2 rounded-lg hover:bg-gray-100 transition shadow-sm">
                Contact Agent
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
