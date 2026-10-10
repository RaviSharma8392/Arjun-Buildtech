import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaBuilding,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";
import ContactForm from "../components/common/form/ContactForm";
import Breadcrumb from "../components/common/Breadcrumb";
import { useLanguage } from "../context/useLanguage";

const Profile = () => {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactPersons = [
    {
      name: "Parveen Gehlawat",
      role: "Managing Director",
      phones: ["93504-47531", "98994-81428"],
    },
    { name: "Naveen Gehlawat", role: "Director", phones: ["98121-50126"] },
  ];

  const offices = [
    {
      name: "Head Office",
      address: "G74P, Sector-27, Rohtak, Haryana",
      type: "head",
    },
    {
      name: "Branch Office",
      address: "828, Sector-1, Rohtak, Haryana, 124001",
      type: "branch",
    },
  ];

  const companyImages = [
    "/ARJUN%20ROHTAK%20BROCHURE%20(2)_page-0003.jpg",
    "/ARJUN%20ROHTAK%20BROCHURE%20(2)_page-0001.jpg",
    "/ARJUN%20ROHTAK%20BROCHURE%20(2)_page-0002.jpg",
    "/ARJUN%20ROHTAK%20BROCHURE%20(2)_page-0004.jpg",
  ];

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Arjun Buildtech",
    url: "https://arjunbuildtech.com/profile",
    image: "https://arjunbuildtech.com/arjunBuildTechLogo.png",
    telephone: "+91-9350447531",
    email: "arjunbuildtech27@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "G74P, Sector-27",
      addressLocality: "Rohtak",
      addressRegion: "Haryana",
      postalCode: "124001",
      addressCountry: "IN",
    },
    areaServed: ["Rohtak", "Haryana"],
    sameAs: [
      "https://www.facebook.com/NewRohtak/",
      "https://www.instagram.com/arjun.buildtech",
      "https://www.youtube.com/@arjunbuildtech3465",
    ],
    knowsAbout: [
      "Residential plots in Rohtak",
      "Commercial property in Rohtak",
      "Real estate investment advisory",
    ],
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Helmet>
        <title>
          Arjun Buildtech Profile | Real Estate Consultant in Rohtak
        </title>
        <meta
          name="description"
          content="Learn about Arjun Buildtech, a real estate consultant in Rohtak, Haryana. Explore residential plots, villas, commercial property, service areas, and contact details."
        />
        <meta
          name="keywords"
          content="Arjun Buildtech, real estate consultant Rohtak, property dealer Rohtak, plots in Rohtak, villas in Rohtak, commercial property Rohtak, HSVP plots, Suncity Rohtak"
        />
        <link rel="canonical" href="https://arjunbuildtech.com/profile" />
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>

      <main className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <Breadcrumb
          items={[
            { name: t("common.home", "Home"), path: "/" },
            { name: t("profile.breadcrumb", "Arjun Buildtech Profile") },
          ]}
        />

        <section className="border-b border-gray-200 pb-8 md:pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase text-red-600">
                {t(
                  "profile.eyebrow",
                  "Real Estate Consultant in Rohtak, Haryana",
                )}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Arjun Buildtech {t("profile.title", "Profile")}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {t(
                  "profile.intro",
                  "Arjun Buildtech provides property advice and real estate services in Rohtak, Haryana. Our team helps buyers explore residential plots, villas, and commercial properties across HSVP and Suncity, and guides them through property checks and the next steps.",
                )}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link
                to="/properties"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-800 hover:border-red-600 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                <FaBuilding aria-hidden="true" />
                {t("profile.browseAction", "Browse Properties")}
              </Link>
              <a
                href="tel:+919350447531"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2">
                <FaPhoneAlt aria-hidden="true" />
                {t("profile.contactAction", "Contact Us")}
              </a>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-y-4 border-t border-gray-200 pt-5 text-sm sm:grid-cols-4">
            {[
              ["profile.focusPlots", "Residential plots"],
              ["profile.focusVillas", "Villas and homes"],
              ["profile.focusCommercial", "Commercial property"],
              ["profile.focusAdvice", "Investment advice"],
            ].map(([key, fallback]) => (
              <div key={key} className="border-l-2 border-red-600 pl-3">
                <span className="font-semibold text-gray-800">
                  {t(key, fallback)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <div className="min-w-0 space-y-10">
            <section>
              <h2 className="text-xl font-bold text-gray-900">
                {t("profile.aboutHeading", "About Arjun Buildtech")}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
                {t(
                  "profile.aboutCopy",
                  "Arjun Buildtech provides property advice and real estate services in Rohtak, Haryana. Our team works with residential plots, villas, and commercial properties across HSVP and Suncity, helping buyers understand options, review documents, and plan next steps.",
                )}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["profile.prime", "Property advisory"],
                  ["profile.transparency", "Document guidance"],
                ].map(([key, fallback]) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 border-t border-gray-200 py-3">
                    <FaCheckCircle
                      className="mt-0.5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {t(key, fallback)}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {t(
                          key === "profile.prime"
                            ? "profile.primeCopy"
                            : "profile.transparencyCopy",
                          key === "profile.prime"
                            ? "Residential and commercial property across Rohtak."
                            : "Guidance with property checks and documentation.",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t("profile.portfolio", "Portfolio")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {t(
                      "profile.portfolioDescription",
                      "Explore the Arjun Buildtech brochure.",
                    )}
                  </p>
                </div>
                <Link
                  to="/properties"
                  className="text-sm font-semibold text-red-600 hover:text-red-700">
                  {t("profile.browseAction", "Browse Properties")} &rarr;
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {companyImages.map((img, idx) => (
                  <a
                    key={img}
                    href={img}
                    target="_blank"
                    rel="noreferrer"
                    className={`group block overflow-hidden border border-gray-200 bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${idx === 0 ? "col-span-2 row-span-2 aspect-[3/2] sm:col-span-2 sm:aspect-[4/3]" : "aspect-[3/4]"}`}
                    aria-label={`Open Arjun Buildtech brochure page ${idx + 1}`}>
                    <img
                      src={img}
                      alt={`Arjun Buildtech brochure, page ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </a>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">
                {t("profile.areasHeading", "Areas We Serve in Rohtak")}
              </h2>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
                <Link
                  to="/properties"
                  className="flex items-start gap-3 border-b border-gray-200 py-3 text-sm text-gray-700 hover:text-red-600">
                  <FaMapMarkerAlt
                    className="mt-0.5 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  {t("profile.areaSectors", "HSVP Sectors 1, 2, 3, 25 and 27")}
                </Link>
                <Link
                  to="/properties"
                  className="flex items-start gap-3 border-b border-gray-200 py-3 text-sm text-gray-700 hover:text-red-600">
                  <FaMapMarkerAlt
                    className="mt-0.5 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  {t(
                    "profile.areaSuncity",
                    "Suncity Sectors 34, 35, 36 and 36A",
                  )}
                </Link>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">
                {t("profile.personnel", "Leadership Team")}
              </h2>
              <div className="mt-3 divide-y divide-gray-200 border-y border-gray-200">
                {contactPersons.map((person) => (
                  <div
                    key={person.name}
                    className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div className="flex items-center gap-3">
                      <FaUserTie className="text-red-600" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-500">{person.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {person.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="text-sm text-gray-700 hover:text-red-600">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">
                {t("profile.offices", "Our Offices")}
              </h2>
              <div className="mt-3 grid gap-5 sm:grid-cols-2">
                {offices.map((office, idx) => (
                  <div
                    key={office.type}
                    className="border-l-2 border-gray-300 pl-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {t(
                        idx === 0
                          ? "profile.headOffice"
                          : "profile.branchOffice",
                        office.name,
                      )}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="border border-gray-200 bg-white p-5">
              <h2 className="text-base font-bold text-gray-900">
                {t("profile.contactHeading", "Contact the Team")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {t(
                  "profile.contactDescription",
                  "Talk with our team about property, site visits, or investment questions.",
                )}
              </p>
              <div className="mt-4 grid gap-2">
                <a
                  href="tel:+919350447531"
                  className="flex min-h-11 items-center justify-center gap-2 bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700">
                  <FaPhoneAlt aria-hidden="true" />{" "}
                  {t("profile.directCall", "Call the Team")}
                </a>
                <a
                  href="https://wa.me/919350447531"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-4 text-sm font-semibold text-gray-800 hover:border-green-600 hover:text-green-700">
                  <FaWhatsapp aria-hidden="true" /> WhatsApp
                </a>
                <a
                  href="mailto:arjunbuildtech27@gmail.com"
                  className="flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-4 text-sm font-semibold text-gray-800 hover:border-red-600 hover:text-red-600">
                  <FaEnvelope aria-hidden="true" />{" "}
                  {t("profile.emailUs", "Email Us")}
                </a>
              </div>
              <div className="mt-5 border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold uppercase text-gray-500">
                  {t("profile.email", "Email Address")}
                </p>
                <a
                  href="mailto:arjunbuildtech27@gmail.com"
                  className="mt-1 block break-all text-sm text-gray-800 hover:text-red-600">
                  arjunbuildtech27@gmail.com
                </a>
              </div>
            </section>
            <div className="border border-gray-200 bg-white p-5">
              <ContactForm />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Profile;
