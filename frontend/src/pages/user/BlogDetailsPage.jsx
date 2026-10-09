import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogs } from "../../data/blogs";
import {
  ChevronRight,
  Calendar,
  User,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import {
  FaWhatsapp,
  FaShareAlt,
  FaHome,
  FaEye,
  FaClock,
  FaBuilding,
  FaMapMarkerAlt,
  FaKey,
  FaCheckCircle,
} from "react-icons/fa";
import NewsletterSubscribe from "../../components/common/form/NewsletterSubscribe";
import Breadcrumb from "../../components/common/Breadcrumb";
import toast from "react-hot-toast";

const SITE_URL = "https://arjunbuildtech.com";
const SITE_NAME = "Arjun Buildtech";
const LOGO_URL = `${SITE_URL}/arjunBuildTechLogo.png`;

// Make any image path absolute (needed for schema + Open Graph)
const toAbsoluteUrl = (path = "") => {
  if (!path) return LOGO_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const toISO = (value) => {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

const formatDate = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Generates views based on string length and increases over time
const getViews = (title) => {
  const baseViews = ((title.length * 47) % 2000) + 850;
  const launchTimestamp = 1704067200000; // Jan 1, 2024
  const daysSinceLaunch = Math.floor(Math.max(0, Date.now() - launchTimestamp) / (1000 * 60 * 60 * 24));
  return baseViews + (daysSinceLaunch * ((title.length % 3) + 1));
};

// Estimates reading time based on word count
const getReadTime = (content) => {
  if (!content) return 2;
  const wordCount = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

const BlogDetailsPage = () => {
  const { slug } = useParams();

  const [liveReaders, setLiveReaders] = useState(
    Math.floor(Math.random() * 12) + 4
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveReaders((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + change;
        return next < 2 ? 2 : next > 35 ? 35 : next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [slug]);

  const blog = blogs.find((b) => b.slug === slug);

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    const others = blogs.filter((b) => b.id !== blog.id);
    const sameCategory = others.filter((b) => b.category === blog.category);
    const rest = others.filter((b) => b.category !== blog.category);
    return [...sameCategory, ...rest].slice(0, 4);
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-[70vh] bg-[#F9F9F9] flex flex-col items-center justify-center px-4 text-center">
        <Helmet>
          <title>Post not found | {SITE_NAME}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Article Not Found
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          It may have been moved or removed. Browse our latest market updates
          instead.
        </p>
        <Link
          to="/blog"
          className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded text-sm hover:bg-red-700 transition">
          View all Market Updates
        </Link>
      </div>
    );
  }

  const pageUrl = `${SITE_URL}/blog/${blog.slug}`;
  const imageUrl = toAbsoluteUrl(blog.image);
  const publishedISO = toISO(blog.date);
  const modifiedISO = toISO(blog.updatedAt) || publishedISO;
  const pageTitle = `${blog.title} | ${SITE_NAME}`;

  const author = blog.author
    ? { "@type": "Person", name: blog.author }
    : { "@type": "Organization", name: SITE_NAME, url: SITE_URL };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: [imageUrl],
    datePublished: publishedISO,
    dateModified: modifiedISO,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    articleSection: blog.category,
    inLanguage: "en-IN",
    author,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: blog.title, item: pageUrl },
    ],
  };

  // Functional Share via Web API
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: blog.excerpt,
          url: pageUrl,
        });
      } catch (error) {
        console.log("Share failed", error);
      }
    } else {
      navigator.clipboard.writeText(pageUrl);
      toast.success("Link copied to clipboard!", {
        style: {
          border: '1px solid #e2e8f0',
          padding: '12px',
          color: '#1f2937',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      });
    }
  };

  // WhatsApp Share Link
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Read this: ${blog.title}\n${pageUrl}`)}`;

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={blog.excerpt} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="en_IN" />
        {publishedISO && (
          <meta property="article:published_time" content={publishedISO} />
        )}
        {modifiedISO && (
          <meta property="article:modified_time" content={modifiedISO} />
        )}
        <meta property="article:section" content={blog.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* --- MAIN CONTENT AREA --- */}
        <article className="w-full lg:w-[65%] bg-white border border-gray-200 rounded-lg p-5 md:p-8 shadow-sm">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb items={[
              { name: "Home", path: "/" },
              { name: "Market Updates", path: "/blog" },
              { name: blog.title }
            ]} />
          </div>          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center justify-start gap-2 mb-3">
              <span className="text-[12px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded">
                {blog.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-5 leading-tight tracking-tight">
              {blog.title}
            </h1>
            <div className="w-16 h-1 bg-red-600 mb-6"></div>

            {/* Portal-Style Rich Meta Data */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50 p-4 rounded border border-gray-100">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-800">
                    {blog.author || "Arjun Buildtech"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <time dateTime={publishedISO}>{formatDate(blog.date)}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaEye className="w-4 h-4 text-gray-400" />
                  <span>{getViews(blog.title).toLocaleString()} Reads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-green-600 font-semibold text-xs uppercase tracking-wider">{liveReaders} reading now</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaClock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{getReadTime(blog.content)} min read</span>
                </div>
              </div>
            </div>
          </header>

          {/* Social Share Bar */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded text-sm font-semibold transition-colors">
              <FaShareAlt /> Share Article
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded text-sm font-semibold transition-colors shadow-sm">
              <FaWhatsapp className="text-lg" /> WhatsApp
            </a>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-[16/9] mb-8 bg-gray-100 rounded border border-gray-200 overflow-hidden relative">
            <img
              src={blog.image}
              alt={blog.title}
              width="1200"
              height="675"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">
              Rohtak Market Data
            </div>
          </div>

          {/* Markdown / HTML Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-normal prose-headings:text-gray-800 prose-h2:text-3xl prose-h2:mt-10 prose-h3:text-2xl prose-p:text-gray-600 prose-p:text-[16px] prose-p:leading-relaxed prose-a:text-red-600 hover:prose-a:text-red-700 prose-img:rounded-lg prose-img:border prose-img:border-gray-200 border-b border-gray-200 pb-10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Post-Article Tags */}
          <div className="py-6 border-b border-gray-200 flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded uppercase tracking-wider">
              Rohtak
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded uppercase tracking-wider">
              Haryana Real Estate
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded uppercase tracking-wider">
              Plots for Sale
            </span>
          </div>

          {/* Author / Agency Bio Box */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-full flex items-center justify-center p-2 shadow-sm">
              <img
                src={LOGO_URL}
                alt={SITE_NAME}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Arjun Buildtech
              </h3>
              <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-3">
                Rohtak's Premier Real Estate Consultant
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We specialize in exclusive residential plots and commercial
                properties in Sector 27 & Sector 1, Rohtak. 100% independent and
                verified.
              </p>
              <Link
                to="/properties/rohtak"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors">
                <FaBuilding /> View Our Properties
              </Link>
            </div>
          </div>
        </article>

        {/* --- RIGHT SIDEBAR (PORTAL WIDGETS) --- */}
        <aside className="w-full lg:w-[35%] flex flex-col gap-8">
          {/* Widget 1: Buy Property CTA */}
          <div className="bg-[#FDFDFD] border border-gray-200 rounded-lg p-6 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <FaKey className="text-xl" />
            </div>
            <h3 className="font-normal text-2xl text-gray-800 mb-2">
              Buy Premium Plots
            </h3>
            <p className="text-[14px] text-gray-500 mb-6 leading-relaxed px-2">
              Explore exclusive residential plots and commercial lands in Rohtak
              directly from the city's most trusted dealer. No middlemen.
            </p>
            <Link
              to="/properties/rohtak"
              className="block w-full bg-red-600 text-white text-[15px] font-bold uppercase tracking-wider py-3.5 rounded hover:bg-red-700 transition-colors shadow-sm">
              View Properties
            </Link>
          </div>

          {/* Widget 2: Market Data Widget */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-normal text-xl text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Rohtak Market Data
            </h3>
            <div className="w-12 h-1 bg-red-600 mb-5"></div>

            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-gray-600 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" /> Sector 27 Demand
                </span>
                <span className="font-bold text-green-600">High</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-gray-600 flex items-center gap-2">
                  <FaBuilding className="text-gray-400" /> Primary Property
                </span>
                <span className="font-bold text-gray-900">Plots / Land</span>
              </li>
              <li className="flex justify-between items-center pt-1">
                <span className="text-gray-600 flex items-center gap-2">
                  <FaCheckCircle className="text-gray-400" /> Verified Seller
                </span>
                <span className="font-bold text-gray-900 text-right">
                  Arjun Buildtech
                </span>
              </li>
            </ul>
          </div>

          {/* Widget 3: Trending Articles */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-normal text-xl text-gray-800 mb-4 flex items-center justify-between">
              Trending Topics
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
            </h3>
            <div className="w-12 h-1 bg-red-600 mb-6"></div>

            <div className="flex flex-col gap-6">
              {relatedBlogs.map((tb, index) => (
                <Link
                  key={tb.id}
                  to={`/blog/${tb.slug}`}
                  className="group flex gap-4 items-start">
                  <div className="text-4xl font-extrabold text-gray-100 group-hover:text-red-100 transition-colors italic w-8 text-center pt-1 leading-none">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-2 mb-2">
                      {tb.title}
                    </h4>
                    <div className="flex justify-between items-center text-[11px] text-gray-500">
                      <span className="uppercase tracking-wider font-semibold">
                        {tb.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye /> {getViews(tb.title)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Widget 4: Newsletter Subscribe */}
          <NewsletterSubscribe />
        </aside>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
