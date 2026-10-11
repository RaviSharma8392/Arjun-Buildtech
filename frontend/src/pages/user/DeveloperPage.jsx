import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Code2,
  CheckCircle2,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Laptop,
  Zap,
  Globe,
  Layers,
  ShieldCheck,
  DollarSign,
  ArrowRight,
  MapPin,
  Building2,
  Info,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Breadcrumb from "../../components/common/Breadcrumb";
import toast from "react-hot-toast";

const DeveloperPage = () => {
  const [copied, setCopied] = useState(false);

  const phoneRaw = "8392856993";
  const phoneFormatted = "+91 83928 56993";
  const email = "sharmaravi8392@gmail.com";
  const instagramUrl = "https://www.instagram.com/raviiiiii._0/";
  const whatsappUrl = `https://wa.me/91${phoneRaw}?text=${encodeURIComponent(
    "Hi Ravi! I saw your work on the Arjun Buildtech website. I am looking to build a website for my business and would like to discuss packages."
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!", {
      style: {
        background: "#1f2937",
        color: "#fff",
        borderRadius: "8px",
        fontSize: "13px",
      },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://arjunbuildtech.com/website-developer/#page",
        "url": "https://arjunbuildtech.com/website-developer",
        "name": "Arjun Buildtech Website Developer | Ravi Sharma",
        "description": "Meet Ravi Sharma, the Full-Stack MERN & Firebase web developer from Nainital, Uttarakhand who designed, coded, and manages the Arjun Buildtech website.",
        "mainEntity": {
          "@type": "Person",
          "@id": "https://arjunbuildtech.com/website-developer/#person",
          "name": "Ravi Sharma",
          "jobTitle": "Full-Stack Web Developer",
          "email": "sharmaravi8392@gmail.com",
          "telephone": "+918392856993",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nainital",
            "addressRegion": "Uttarakhand",
            "addressCountry": "IN"
          },
          "sameAs": ["https://www.instagram.com/raviiiiii._0/"],
          "knowsAbout": [
            "MERN Stack",
            "Firebase",
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Real Estate Web Development",
            "Search Engine Optimization (SEO)"
          ]
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Arjun Buildtech Website Developer | Ravi Sharma (MERN & Firebase)</title>
        <meta
          name="description"
          content="Official developer credits for Arjun Buildtech. The website was custom-coded & engineered by Ravi Sharma, Full-Stack MERN & Firebase developer based in Nainital, Uttarakhand. Contact for affordable custom websites."
        />
        <meta name="author" content="Ravi Sharma" />
        <meta
          name="keywords"
          content="arjun buildtech website developer, who made arjun buildtech website, ravi sharma developer, web developer nainital uttarakhand, mern stack developer uttarakhand, affordable website developer"
        />
        <link rel="canonical" href="https://arjunbuildtech.com/website-developer" />

        {/* Open Graph */}
        <meta property="og:title" content="Arjun Buildtech Website Developer | Ravi Sharma" />
        <meta
          property="og:description"
          content="The official digital platform of Arjun Buildtech was custom built and is maintained by Ravi Sharma, Full-Stack Web Developer from Nainital, Uttarakhand."
        />
        <meta property="og:url" content="https://arjunbuildtech.com/website-developer" />
        <meta property="og:type" content="profile" />

        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      <div className="bg-white min-h-screen font-site">
        {/* Top Breadcrumb & Hero Header */}
        <div className="bg-[#f8f9fa] border-b border-gray-200 py-10 md:py-14">
          <div className="site-container max-w-5xl">
            <Breadcrumb
              items={[
                { name: "Home", path: "/" },
                { name: "Website Developer" },
              ]}
            />

            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Official Website Developer &bull; Technical Architect
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Arjun Buildtech Website Developer
                </h1>

                <p className="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  The official digital portal (<strong className="text-gray-900">arjunbuildtech.com</strong>) was custom-designed, coded, and is managed by{" "}
                  <strong className="text-gray-900 font-bold">Ravi Sharma</strong>, a Full-Stack MERN Stack &amp; Google Firebase Developer.
                </p>
              </div>

              {/* Developer Badge Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 shrink-0">
                <div className="w-16 h-16 rounded-xl bg-[#d8232a] text-white flex flex-col items-center justify-center font-bold shadow-md shrink-0">
                  <span className="text-xl leading-none font-black">RS</span>
                  <span className="text-[9px] uppercase tracking-wider text-red-100 mt-1">
                    DEV
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Ravi Sharma</h3>
                  <p className="text-xs text-red-600 font-semibold">Full-Stack Web Developer</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-gray-400 shrink-0" />
                    <span>Nainital, Uttarakhand, India</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Clear Role Separation Notice */}
            <div className="mt-6 bg-amber-50/90 border border-amber-300/80 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-950 leading-relaxed shadow-2xs">
              <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Role &amp; Business Clarification:</strong> <strong>Arjun Buildtech</strong> is a premier real estate advisory &amp; property dealership firm based in Rohtak, Haryana. <strong>Ravi Sharma</strong> is solely the <strong>Independent Website Developer &amp; Software Engineer</strong> (based in Nainital, Uttarakhand) who custom-designed, coded, and maintains this web application. Ravi Sharma is not an owner, partner, or property dealer of Arjun Buildtech.
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="site-container max-w-5xl py-12 space-y-12">
          {/* Section 1: The Story & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                About the Website Engineering
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                The Arjun Buildtech portal was custom crafted to offer property buyers and investors in Rohtak a lightning-fast, mobile-first experience. Unlike generic templates or slow WordPress builders, the entire site was coded from scratch for maximum speed, security, and search engine visibility.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ravi Sharma implemented dynamic SEO routing, automated sitemap generation, Firebase real-time database management, and conversion-focused contact funnels that drive real inquiries.
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Specialized Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 font-semibold rounded-lg">React.js</span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-800 font-semibold rounded-lg border border-amber-200">Firebase Firestore</span>
                  <span className="px-3 py-1 bg-green-50 text-green-800 font-semibold rounded-lg border border-green-200">Node.js</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-semibold rounded-lg border border-emerald-200">MongoDB</span>
                  <span className="px-3 py-1 bg-sky-50 text-sky-800 font-semibold rounded-lg border border-sky-200">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-800 font-semibold rounded-lg border border-purple-200">Google SEO</span>
                </div>
              </div>
            </div>

            {/* Why Work With Ravi Card */}
            <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider">
                <Zap size={16} />
                <span>Affordable Web Development</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                Want a Website Like This for Your Business?
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ravi helps businesses, real estate consultants, agencies, local shops, and startups build modern websites that generate real phone calls and WhatsApp leads — without exorbitant agency charges.
              </p>

              <div className="space-y-2 text-xs text-gray-700 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>Affordable &amp; Transparent:</strong> Direct developer rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>100% Custom Code:</strong> Fast load time, zero clutter</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>Free Support:</strong> Domain setup &amp; maintenance support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Options Banner */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-2">
                Get In Touch with Developer Ravi Sharma
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Let's Discuss Your New Website Project
              </h3>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                Ready to take your business online with a custom MERN &amp; Firebase website? Contact Ravi directly on WhatsApp or call for a free consultation and project quote.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs flex items-center justify-between transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp Chat</span>
                </div>
                <ArrowRight size={14} />
              </a>

              {/* Call */}
              <a
                href={`tel:${phoneRaw}`}
                className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-red-400" />
                  <span>{phoneFormatted}</span>
                </div>
                <ExternalLink size={13} className="text-gray-400" />
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white rounded-xl font-semibold text-xs flex items-center justify-between transition-opacity"
              >
                <div className="flex items-center gap-2.5">
                  <FaInstagram size={17} />
                  <span>@raviiiiii._0</span>
                </div>
                <ExternalLink size={13} />
              </a>

              {/* Email Copy */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <Mail size={16} className="text-red-400 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                {copied ? <Check size={14} className="text-emerald-400 shrink-0" /> : <Copy size={14} className="shrink-0" />}
              </button>
            </div>
          </div>

          {/* Property Inquiries vs Web Inquiries */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div>
              <span className="font-bold text-gray-900 block mb-0.5">Looking to Buy or Sell Property in Rohtak?</span>
              <span>Contact the Arjun Buildtech property consultancy team directly for verified plots and site visits.</span>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-bold transition-colors whitespace-nowrap"
            >
              Contact Arjun Buildtech Team &rarr;
            </Link>
          </div>

          {/* Back to Home Link */}
          <div className="pt-2 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors"
            >
              <span>← Return to Arjun Buildtech Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperPage;
