import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { seoData } from "../data/seoData";
import PropertiesPage from "./PropertiesPage";
import Breadcrumb from "../components/common/Breadcrumb";

const SITE_URL = "https://arjunbuildtech.com";

const suggestedSearches = [
  { label: "All Rohtak properties", href: "/properties" },
  { label: "Suncity listings", href: "/properties?search=Suncity" },
  { label: "HSVP Sector 27", href: "/properties?search=HSVP%20Sector%2027" },
  { label: "Sector 36 listings", href: "/properties?search=Sector%2036" },
];

const formatLocation = (value = "Rohtak") => {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the route value readable even if a malformed escape is supplied.
  }
  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const LocationNotFound = () => (
  <div className="min-h-screen bg-[#F9F9F9] px-4 py-12 font-sans sm:px-6 lg:px-8">
    <Helmet>
      <title>Page Not Found | Arjun Buildtech</title>
      <meta
        name="description"
        content="The requested Arjun Buildtech property page could not be found. Browse current Rohtak property listings or contact the team."
      />
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
      <section className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-red-700 via-red-600 to-orange-500 px-6 py-10 text-white sm:px-12 sm:py-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-100">
            Property page unavailable
          </p>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            Let&apos;s find a Rohtak property that is available to view.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-red-50 sm:text-lg">
            This link may have moved or the listing may no longer be published.
            Use the current listings below or contact Arjun Buildtech about a
            specific area.
          </p>
        </div>

        <div className="px-6 py-8 sm:px-12 sm:py-10">
          <div className="mb-8 flex flex-wrap gap-3">
            {suggestedSearches.map((search) => (
              <Link
                key={search.href}
                to={search.href}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:border-red-600 hover:text-red-600">
                {search.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Link
              to="/properties"
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-red-300 hover:bg-red-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Browse listings
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Search current plots, homes, rentals, and commercial listings in
                Rohtak.
              </p>
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-red-300 hover:bg-red-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Ask the team
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Tell us the location, property type, and details you need.
              </p>
            </Link>
            <Link
              to="/blog"
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-red-300 hover:bg-red-50">
              <h2 className="text-lg font-semibold text-gray-900">
                Read local guides
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Explore property guidance and local market information for
                Rohtak.
              </p>
            </Link>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-600">
            <Link to="/" className="font-semibold text-red-600 hover:text-red-700">
              Return to the Arjun Buildtech homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  </div>
);

const SeoListingPage = () => {
  const { slug } = useParams();

  // Intercept dynamic property search URLs (which React Router v6 partial segments don't support well)
  const propertiesMatch = slug.match(/^properties-for-sale-in-(.+)$/);
  const housesMatch = slug.match(/^houses-for-sale-in-(.+)$/);
  const plotsMatch = slug.match(/^plots-for-sale-in-(.+)$/);
  const commercialMatch = slug.match(/^commercial-property-for-sale-in-(.+)$/);
  const residentialPlotsMatch = slug.match(/^residential-plots-in-(.+)$/);
  const agricultureMatch = slug.match(/^agriculture-land-for-sale-in-(.+)$/);
  const rentalMatch = slug.match(/^rental-property-in-(.+)$/);

  if (
    propertiesMatch ||
    housesMatch ||
    plotsMatch ||
    commercialMatch ||
    residentialPlotsMatch ||
    agricultureMatch ||
    rentalMatch
  ) {
    const city =
      propertiesMatch?.[1] ||
      housesMatch?.[1] ||
      plotsMatch?.[1] ||
      commercialMatch?.[1] ||
      residentialPlotsMatch?.[1] ||
      agricultureMatch?.[1] ||
      rentalMatch?.[1];
    let type = "All";
    if (housesMatch) type = "house";
    if (plotsMatch || residentialPlotsMatch) type = "plot";
    if (commercialMatch) type = "Commercial";
    const status = rentalMatch ? "For Rent" : "For Sale";
    const locationName = formatLocation(city);
    const listingLabel = commercialMatch
      ? "Commercial Property"
      : rentalMatch
        ? "Rental Property"
        : housesMatch
          ? "Houses"
          : plotsMatch || residentialPlotsMatch
            ? "Plots"
            : "Properties";
    const transactionLabel = rentalMatch ? "for Rent" : "for Sale";

    return (
      <PropertiesPage
        cityProp={city}
        typeProp={type}
        statusProp={status}
        canonicalPath={`/${slug}`}
        seoTitle={`${listingLabel} ${transactionLabel} in ${locationName} | Arjun Buildtech`}
        seoDescription={`Browse current ${listingLabel.toLowerCase()} ${transactionLabel.toLowerCase()} in ${locationName}. Listing details and availability vary; contact Arjun Buildtech to confirm the current information.`}
      />
    );
  }

  const data = seoData[slug];

  if (!data) {
    return <LocationNotFound />;
  }

  const pageUrl = `${SITE_URL}/${slug}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: data.title,
    description: data.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    ...(data.imageUrl ? { primaryImageOfPage: data.imageUrl } : {}),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta
          name="keywords"
          content={`${slug.replace(/-/g, " ")}, rohtak real estate, property in rohtak`}
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:url" content={pageUrl} />
        {data.imageUrl && <meta property="og:image" content={data.imageUrl} />}
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 pt-6 md:px-10">
          <Breadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: "Rohtak property guides" },
            ]}
          />
        </div>
        <div className="h-64 sm:h-80 md:h-96 w-full relative">
          <img
            src={data.imageUrl}
            alt={data.h1}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
              {data.h1}
            </h1>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <article className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-6">{data.content}</p>

            <h2 className="text-2xl font-semibold text-red-900 mb-4">
              Key Benefits & Features
            </h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {data.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg mb-8">
              <h3 className="text-xl font-bold text-red-900 mb-2">
                Ask about this listing
              </h3>
              <p className="text-gray-700 mb-4">
                Open the property detail page to review the information currently
                published and contact Arjun Buildtech. Price and availability
                should be confirmed before making a decision.
              </p>
              <Link
                to={data.propertyLink}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1">
                View Full Property Details
              </Link>
            </div>

            <div className="text-sm text-gray-500 mt-8 border-t pt-4">
              <p>
                Looking for more options? Browse our{" "}
                <Link to="/properties" className="text-red-600 hover:underline">
                  complete property listings in Rohtak
                </Link>
                .
              </p>
            </div>

            {/* Arjun Buildtech Contact & Trust Section */}
            <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                About Arjun Buildtech
              </h3>
              <p className="text-gray-700 mb-4">
                Arjun Buildtech provides property consulting and listing support
                in Rohtak, Haryana. The business works with residential and
                commercial property enquiries, including locations such as{" "}
                <strong>HSVP Sectors 1, 2, 3, 25, 27</strong> and{" "}
                <strong>Suncity Sectors 34, 35, 36, and 36A</strong>, subject to
                current listing availability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                    Rohtak service area
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">📍</span> HSVP and Suncity sectors,
                      Rohtak, Haryana
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Contact Us
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">📞</span>{" "}
                      <div>
                        <strong>Arjun Buildtech:</strong>{" "}
                        <a
                          href="tel:+919350447531"
                          className="text-red-600 hover:underline">
                          93504-47531
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✉️</span>{" "}
                      <a
                        href="mailto:arjunbuildtech27@gmail.com"
                        className="text-red-600 hover:underline">
                        arjunbuildtech27@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                <a
                  href="https://www.justdial.com/Rohtak/Arjun-Buildtech-Near-Sun-City-Sector-27/9999PX126-X126-220412152824-M3Q2_BZDET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                  View business profile
                </a>
                <a
                  href="https://www.facebook.com/arjunbuildtech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 transition-colors">
                  <span className="mr-2 text-red-600 text-lg">📘</span>
                  Follow on Facebook
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default SeoListingPage;
