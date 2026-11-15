import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Breadcrumb from "../../components/common/Breadcrumb";

const DeveloperPage = () => {
  const phone = "+918392856993";
  const phoneFormatted = "+91 83928 56993";
  const email = "sharmaravi8392@gmail.com";
  const instagramUrl = "https://www.instagram.com/raviiiiii._0/";

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://arjunbuildtech.com/website-developer/#page",
    url: "https://arjunbuildtech.com/website-developer",
    name: "Ravi Sharma (RSDEV) | Website Developer for Arjun Buildtech",
    description:
      "Meet Ravi Sharma (RSDEV), the website developer who designed and developed the Arjun Buildtech website.",
    mainEntity: {
      "@type": "Person",
      "@id": "https://arjunbuildtech.com/website-developer/#person",
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
      knowsAbout: ["React.js", "Firebase", "Website Development", "Technical SEO"],
    },
  };

  return (
    <>
      <Helmet>
        <title>Ravi Sharma (RSDEV) | Website Developer for Arjun Buildtech</title>
        <meta
          name="description"
          content="Ravi Sharma (RSDEV) designed and developed the Arjun Buildtech website. Learn about the project and contact him for website development."
        />
        <meta name="author" content="Ravi Sharma" />
        <meta
          name="keywords"
          content="Ravi Sharma web developer, Ravi Sharma RSDEV, Arjun Buildtech website developer, who built Arjun Buildtech website, full-stack web developer"
        />
        <link rel="canonical" href="https://arjunbuildtech.com/website-developer" />
        <meta
          property="og:title"
          content="Ravi Sharma (RSDEV) | Website Developer for Arjun Buildtech"
        />
        <meta
          property="og:description"
          content="Meet Ravi Sharma (RSDEV), the website developer who designed and developed the Arjun Buildtech website."
        />
        <meta property="og:url" content="https://arjunbuildtech.com/website-developer" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{JSON.stringify(schemaJsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-gray-50 font-site">
        <div className="border-b border-gray-200 bg-white py-8 md:py-10">
          <div className="site-container max-w-5xl">
            <Breadcrumb
              items={[
                { name: "Home", path: "/" },
                { name: "Website Developer" },
              ]}
            />

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  <Code2 size={14} /> Website Developer
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  Ravi Sharma <span className="text-red-600">(RSDEV)</span>
                </h1>
                <p className="mt-2 text-lg font-semibold text-gray-700">
                  Website Developer for Arjun Buildtech
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
                  Ravi designed and developed the Arjun Buildtech website to help people explore property information and contact the team.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:min-w-64">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#d8232a] text-lg font-extrabold text-white">
                  RS
                </div>
                <div>
                  <p className="font-bold text-gray-900">Full-Stack Web Developer</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={14} className="text-red-600" />
                    Nainital, Uttarakhand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-container max-w-5xl space-y-6 py-8 md:py-10">
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">About this website</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                The Arjun Buildtech website brings property listings, local information, and enquiry options together in one place. Ravi built the responsive interface and the tools that connect visitors with the Arjun Buildtech team.
              </p>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Website technologies">
                {["React.js", "Firebase", "Vite", "React Router", "Tailwind CSS"].map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Ravi</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                For a business website or an online project, contact Ravi directly by WhatsApp, phone, or email.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={`https://wa.me/91${phone.slice(3)}?text=${encodeURIComponent("Hi Ravi, I would like to discuss a website project.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d8232a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <FaWhatsapp size={17} /> Chat on WhatsApp <ArrowRight size={15} />
                </a>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                  <a className="inline-flex items-center gap-2 hover:text-red-600" href={`tel:${phone}`}>
                    <Phone size={15} /> {phoneFormatted}
                  </a>
                  <a className="inline-flex items-center gap-2 hover:text-red-600" href={`mailto:${email}`}>
                    <Mail size={15} /> Email Ravi
                  </a>
                  <a
                    className="inline-flex items-center gap-2 hover:text-red-600"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={15} /> Instagram
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-1">
            <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-red-600">
              <span className="inline-flex items-center gap-1.5">Back to Arjun Buildtech <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default DeveloperPage;
