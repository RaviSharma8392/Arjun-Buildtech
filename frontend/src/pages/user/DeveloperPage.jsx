import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  SearchCheck,
  ShoppingCart,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Breadcrumb from "../../components/common/Breadcrumb";

const SITE_URL = "https://arjunbuildtech.com";
const PAGE_URL = `${SITE_URL}/website-developer`;
const phone = "+918392856993";
const phoneFormatted = "+91 83928 56993";
const email = "sharmaravi8392@gmail.com";
const instagramUrl = "https://www.instagram.com/raviiiiii._0/";
const whatsappUrl = `https://wa.me/${phone.slice(1)}?text=${encodeURIComponent(
  "Hi Ravi, I would like to discuss a website project.",
)}`;

const projectFeatures = [
  {
    icon: Code2,
    title: "Property discovery",
    copy: "A responsive interface for exploring Rohtak plots, homes, commercial listings and property details.",
  },
  {
    icon: ShoppingCart,
    title: "Content management",
    copy: "Firebase-backed property, enquiry, review and blog workflows for the Arjun Buildtech team.",
  },
  {
    icon: SearchCheck,
    title: "Search foundations",
    copy: "Page metadata, canonical URLs, structured data, internal links and an XML sitemap.",
  },
  {
    icon: CheckCircle2,
    title: "Enquiry experience",
    copy: "Clear contact paths that connect property visitors with the Arjun Buildtech team.",
  },
];

const serviceAreas = [
  "Nainital",
  "Bhimtal",
  "Haldwani",
  "Kathgodam",
  "Uttarakhand",
  "Remote projects across India",
];

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Arjun Buildtech Website | Designed by Ravi Sharma (RSDEV)",
  description:
    "The official Arjun Buildtech property website was designed and developed by Ravi Sharma (RSDEV).",
  dateModified: "2026-11-18",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${PAGE_URL}#person` },
  creator: {
    "@type": "Person",
    "@id": `${PAGE_URL}#person`,
    name: "Ravi Sharma",
    alternateName: "RSDEV",
    jobTitle: "Full-Stack Web Developer",
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nainital",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    sameAs: [instagramUrl],
    knowsAbout: ["React.js", "Firebase", "Vite", "Technical SEO", "Website development"],
  },
};

const DeveloperPage = () => (
  <>
    <Helmet>
      <title>Arjun Buildtech Website Developer | Ravi Sharma (RSDEV)</title>
      <meta
        name="description"
        content="Ravi Sharma (RSDEV) is the website developer behind Arjun Buildtech. Based in Nainital and Bhimtal, he builds business websites, ecommerce and React/Firebase apps."
      />
      <meta name="author" content="Ravi Sharma" />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Arjun Buildtech Website Developer | Ravi Sharma (RSDEV)" />
      <meta
        property="og:description"
        content="Ravi Sharma (RSDEV) is the website developer behind Arjun Buildtech and builds business websites, ecommerce and React/Firebase apps."
      />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:site_name" content="Arjun Buildtech" />
      <meta property="og:image" content={`${SITE_URL}/arjunBuildTechLogo.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arjun Buildtech Website Developer | Ravi Sharma (RSDEV)" />
      <meta
        name="twitter:description"
        content="Website developer behind the Arjun Buildtech property website, based in Nainital and Bhimtal."
      />
      <meta name="twitter:image" content={`${SITE_URL}/arjunBuildTechLogo.png`} />
      <script type="application/ld+json">{JSON.stringify(schemaJsonLd)}</script>
    </Helmet>

    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
          <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Website Developer" }]} />

          <div className="mt-8 grid gap-8 md:grid-cols-[1.35fr_0.65fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
                <Code2 size={14} /> Arjun Buildtech website
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
                The Arjun Buildtech property website.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                This is the official Arjun Buildtech website for property listings
                and enquiries in Rohtak, Haryana. It was designed and developed by
                Ravi Sharma (RSDEV), a full-stack web developer based in Nainital
                and Bhimtal.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  Open Arjun Buildtech website <ExternalLink size={16} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-red-400 hover:text-red-700"
                >
                  <FaWhatsapp size={18} /> Contact developer
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">Project attribution</p>
              <h2 className="mt-3 text-2xl font-semibold">Built for Arjun Buildtech</h2>
              <p className="mt-1 text-sm text-slate-300">Designed and developed by Ravi Sharma (RSDEV)</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2"><MapPin size={16} className="text-red-400" /> Rohtak property website</p>
                <p className="flex items-center gap-2"><Code2 size={16} className="text-red-400" /> React, Firebase and technical SEO</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-7 px-4 py-8 md:px-8 md:py-12">
        <section>
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">What was built</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">A complete property website for Arjun Buildtech</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projectFeatures.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                {React.createElement(Icon, { className: "text-red-600", size: 23 })}
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_0.8fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">Website developer in Nainital &amp; Bhimtal</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">The developer behind this Arjun Buildtech website</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Ravi Sharma (RSDEV) works with businesses that need a clear,
              responsive website and a dependable way to manage enquiries. The
              Arjun Buildtech project combines property discovery, Firebase
              content, technical SEO foundations and real customer contact paths.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">{area}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-950">Explore the project</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/" className="font-semibold text-red-700 hover:text-red-800">Arjun Buildtech homepage <ArrowRight className="ml-1 inline" size={15} /></Link>
              <Link to="/properties" className="font-semibold text-red-700 hover:text-red-800">Property listings <ArrowRight className="ml-1 inline" size={15} /></Link>
              <Link to="/blog" className="font-semibold text-red-700 hover:text-red-800">SEO and property guides <ArrowRight className="ml-1 inline" size={15} /></Link>
              <Link to="/contact" className="font-semibold text-red-700 hover:text-red-800">Arjun Buildtech contact <ArrowRight className="ml-1 inline" size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="grid gap-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_0.8fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">Developer of this website</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Ravi Sharma (RSDEV)</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Ravi designed and developed this Arjun Buildtech website to bring
              property information, search, enquiries, blogs and contact options
              together in one clear experience. For a new business website or web
              application, contact him directly.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
            <p className="flex items-center gap-2"><MapPin size={16} className="text-red-600" /> Nainital &amp; Bhimtal, Uttarakhand</p>
            <a className="mt-3 flex items-center gap-2 hover:text-red-700" href={`tel:${phone}`}><Phone size={16} className="text-red-600" /> {phoneFormatted}</a>
            <a className="mt-3 flex items-center gap-2 break-all hover:text-red-700" href={`mailto:${email}`}><Mail size={16} className="text-red-600" /> {email}</a>
            <a className="mt-3 inline-flex items-center gap-2 hover:text-red-700" href={instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram size={16} /> Instagram</a>
          </div>
        </section>

        <section className="rounded-2xl bg-red-600 p-6 text-white shadow-sm md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <h2 className="text-2xl font-semibold">Need a website for your business?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-red-100">Discuss your project with the developer who built this Arjun Buildtech website.</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-50 md:mt-0"><FaWhatsapp size={17} /> WhatsApp Ravi</a>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">Common questions</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">About this website and its developer</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <details className="rounded-xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">Who developed Arjun Buildtech?</summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">The website was designed and developed by Ravi Sharma (RSDEV), a full-stack developer based in Nainital and Bhimtal.</p>
            </details>
            <details className="rounded-xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">What does the site include?</summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">It includes property listings, search, detail pages, enquiries, blog content, Firebase workflows and technical SEO foundations.</p>
            </details>
            <details className="rounded-xl bg-slate-50 p-4">
              <summary className="cursor-pointer font-semibold text-slate-900">Can I hire the developer?</summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">Yes. Contact Ravi by WhatsApp, phone, email or Instagram to discuss a business website, ecommerce store or web application.</p>
            </details>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <span>Arjun Buildtech property website · Designed and developed by Ravi Sharma (RSDEV)</span>
          <Link to="/" className="font-semibold text-red-700 hover:text-red-800">Back to Arjun Buildtech <ArrowRight className="ml-1 inline" size={15} /></Link>
        </div>
      </div>
    </main>
  </>
);

export default DeveloperPage;
