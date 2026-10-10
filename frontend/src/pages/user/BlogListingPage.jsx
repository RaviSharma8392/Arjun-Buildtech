import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../../data/blogs";
import { ArrowRight, ChevronRight, Search, Calendar, Mail } from "lucide-react";
import { FaWhatsapp, FaShareAlt, FaHome } from "react-icons/fa";
import toast from "react-hot-toast";
import NewsletterSubscribe from "../../components/common/form/NewsletterSubscribe";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useLanguage } from "../../context/useLanguage";
import { getLocalizedField } from "../../utils/localizedField";

const BlogListingPage = () => {
  const { language, t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // State for Filters & Pagination
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Sync category state when URL changes
  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const [selectedMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // Adjusted for 2-column grid

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  // Filtering Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCategory =
        activeCategory === "All" || blog.category === activeCategory;
      const matchSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      let matchDate = true;
      if (selectedMonth) {
        const blogDate = new Date(blog.date);
        const blogMonthStr = `${blogDate.getFullYear()}-${String(
          blogDate.getMonth() + 1,
        ).padStart(2, "0")}`;
        matchDate = blogMonthStr === selectedMonth;
      }

      return matchCategory && matchSearch && matchDate;
    });
  }, [activeCategory, searchQuery, selectedMonth]);

  // Separate Featured, Grid, and Trending
  const isFiltering =
    activeCategory !== "All" || searchQuery !== "" || selectedMonth !== "";
  const featuredBlog =
    !isFiltering && filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridBlogs = featuredBlog
    ? filteredBlogs.slice(1, visibleCount + 1)
    : filteredBlogs.slice(0, visibleCount);

  const hasMore =
    (featuredBlog ? visibleCount + 1 : visibleCount) < filteredBlogs.length;

  // Trending Blogs (Sidebar) - Just taking top 4 for demo purposes
  const trendingBlogs = blogs.slice(0, 4);
  const blogTitle = (blog) =>
    getLocalizedField(blog, "title", language) || blog.title;
  const blogExcerpt = (blog) =>
    getLocalizedField(blog, "excerpt", language) || blog.excerpt;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Functional Share via Web API
  const handleShare = async (e, title, url) => {
    e.preventDefault(); // Prevent Link navigation
    const fullUrl = `https://arjunbuildtech.com/blog/${url}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: fullUrl,
        });
      } catch (error) {
        console.log("Share failed", error);
      }
    } else {
      navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied to clipboard!", {
        style: {
          border: "1px solid #e2e8f0",
          padding: "12px",
          color: "#1f2937",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fff",
        },
      });
    }
  };

  // SEO Constants
  const pageUrl = "https://arjunbuildtech.com/blog";
  const pageTitle = "Real Estate News & Market Updates | Arjun Buildtech";
  const pageDescription =
    "Stay updated with the latest Rohtak real estate news, property investment tips, infrastructure updates, and market insights by Arjun Buildtech.";
  const ogImage = "https://arjunbuildtech.com/og-banner.jpg";

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    publisher: {
      "@type": "RealEstateAgent",
      name: "Arjun Buildtech",
      logo: {
        "@type": "ImageObject",
        url: "https://arjunbuildtech.com/arjunBuildTechLogo.png",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Arjun Buildtech" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <Breadcrumb
          items={[
            { name: t("common.home", "Home"), path: "/" },
            { name: t("blog.breadcrumb", "Property News & Updates") },
          ]}
        />

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-4 tracking-tight leading-snug">
            {t("blog.heading", "Real Estate News & Insights")}
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            {t(
              "blog.intro",
              "Expert analysis, investment guides, and the latest infrastructure updates shaping the Rohtak real estate market.",
            )}
          </p>
        </div>

        {/* --- MAIN LAYOUT (CONTENT + SIDEBAR) --- */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* LEFT CONTENT AREA */}
          <div className="w-full lg:w-[68%]">
            {/* Filter Toolbar */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between shadow-sm">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setVisibleCount(6);
                    }}
                    className={`whitespace-nowrap px-4 py-2 text-[13px] font-semibold rounded transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}>
                    {cat === "All" ? t("blog.latestNews", "Latest News") : cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <div className="relative group w-full md:w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("blog.search", "Search articles...")}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(6);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-red-400 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* No Results State */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-20 px-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xl font-normal text-gray-800 mb-2">
                  {t("blog.noArticles", "No articles found")}
                </h3>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="text-sm font-semibold text-red-600 hover:underline">
                  {t("blog.clearFilters", "Clear all filters")}
                </button>
              </div>
            )}

            {/* Featured Article */}
            {featuredBlog && (
              <article className="mb-8 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                <Link
                  to={`/blog/${featuredBlog.slug}`}
                  className="flex flex-col md:flex-row items-stretch">
                  <div className="w-full md:w-1/2 bg-gray-100 overflow-hidden relative">
                    <img
                      src={featuredBlog.image}
                      alt={blogTitle(featuredBlog)}
                      className="w-full h-full aspect-[16/10] md:aspect-auto object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                      {t("blog.featured", "Featured")}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-gray-800">
                        {featuredBlog.category}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-[12px] text-gray-500">
                        {featuredBlog.date}
                      </span>
                    </div>
                    <h2 className="text-2xl font-normal text-gray-800 mb-3 leading-snug hover:text-red-600 transition-colors">
                      {blogTitle(featuredBlog)}
                    </h2>
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {blogExcerpt(featuredBlog)}
                    </p>

                    {/* Share & Read More Row */}
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) =>
                            handleShare(
                              e,
                              featuredBlog.title,
                              featuredBlog.slug,
                            )
                          }
                          className="text-gray-400 hover:text-gray-800 transition-colors"
                          title={t("blog.shareArticle", "Share Article")}>
                          <FaShareAlt className="text-[16px]" />
                        </button>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(featuredBlog.title + " https://arjunbuildtech.com/blog/" + featuredBlog.slug)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-[#25D366] transition-colors"
                          title={t("blog.whatsappShare", "WhatsApp Share")}>
                          <FaWhatsapp className="text-[18px]" />
                        </a>
                      </div>
                      <span className="flex items-center text-sm font-semibold text-red-600">
                        {t("blog.readStory", "Read Full Story")}{" "}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Grid Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gridBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="flex flex-col h-full">
                    <div className="overflow-hidden bg-gray-100 relative">
                      <img
                        src={blog.image}
                        alt={blogTitle(blog)}
                        className="w-full aspect-[16/10] object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                        {blog.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-[12px] text-gray-500 mb-2">
                        {blog.date}
                      </span>
                      <h3 className="text-[18px] font-normal text-gray-800 mb-3 leading-snug hover:text-red-600 transition-colors line-clamp-2">
                        {blogTitle(blog)}
                      </h3>
                      <p className="text-[14px] text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {blogExcerpt(blog)}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) =>
                              handleShare(e, blog.title, blog.slug)
                            }
                            className="text-gray-400 hover:text-gray-800 transition-colors">
                            <FaShareAlt className="text-[15px]" />
                          </button>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(blog.title + " https://arjunbuildtech.com/blog/" + blog.slug)}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-[#25D366] transition-colors">
                            <FaWhatsapp className="text-[17px]" />
                          </a>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {t("blog.readMore", "Read More")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center px-8 py-3 rounded bg-white border border-gray-300 text-gray-800 font-semibold text-sm hover:border-gray-800 hover:text-white transition-all duration-300">
                  {t("blog.loadMore", "Load More News")}
                </button>
              </div>
            )}
          </div>

          {/* --- RIGHT SIDEBAR (PORTAL WIDGETS) --- */}
          <aside className="w-full lg:w-[32%] flex flex-col gap-8">
            {/* Widget 1: Buy Property CTA */}
            <div className="bg-[#FDFDFD] border border-gray-200 rounded-lg p-6 text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHome className="text-xl" />
              </div>
              <h3 className="font-normal text-xl text-gray-800 mb-2">
                {t("blog.buyPremium", "Buy Premium Properties")}
              </h3>
              <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
                {t(
                  "blog.buyCopy",
                  "Explore exclusive residential plots and commercial lands in Rohtak from the city's most trusted property dealer.",
                )}
              </p>
              <Link
                to="/properties/rohtak"
                className="block w-full bg-red-600 text-white text-sm font-semibold py-3 rounded hover:bg-red-700 transition-colors shadow-sm">
                {t("blog.viewProperties", "View Available Properties")}
              </Link>
            </div>

            {/* Widget 2: Trending Articles */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-normal text-lg text-gray-800 mb-4 flex items-center justify-between">
                {t("blog.trending", "Trending Topics")}
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
              </h3>
              <div className="w-10 h-1 bg-red-600 mb-5"></div>

              <div className="flex flex-col gap-5">
                {trendingBlogs.map((blog, index) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group flex gap-4 items-center">
                    <div className="text-3xl font-extrabold text-gray-100 group-hover:text-red-100 transition-colors italic w-6 text-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-2 mb-1">
                        {blogTitle(blog)}
                      </h4>
                      <span className="text-[11px] text-gray-500">
                        {blog.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 3: Newsletter Subscribe */}
            <NewsletterSubscribe />
          </aside>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};

export default BlogListingPage;
