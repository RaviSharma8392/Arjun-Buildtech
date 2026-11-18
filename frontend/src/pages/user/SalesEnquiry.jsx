import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ContactForm from "../../components/common/form/ContactForm";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useLanguage } from "../../context/useLanguage";
import { companyInfo } from "../../data/companyInfo";

const SalesEnquiry = () => {
  const { t } = useLanguage();
  const pageUrl = "https://arjunbuildtech.com/sales-enquiry";
  const pageDescription =
    "Submit a property enquiry for buying, selling, or comparing real estate information with Arjun Buildtech in Rohtak.";
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${pageUrl}#contact-page`,
    url: pageUrl,
    name: "Sales Enquiry | Arjun Buildtech",
    description: pageDescription,
    about: { "@id": "https://arjunbuildtech.com/#organization" },
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-8 md:py-12 font-sans selection:bg-red-100 selection:text-red-900 mt-20">
      <Helmet>
        <title>Sales Enquiry | Arjun Buildtech</title>
        <meta
          name="description"
          content={pageDescription}
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sales Enquiry | Arjun Buildtech" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { name: t("common.home", "Home"), path: "/" },
              { name: t("sales.title", "Sales Enquiry") },
            ]}
          />
        </div>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-800 mb-4 tracking-tight leading-snug">
            {t("sales.title", "Sales Enquiry")}
          </h1>
          <div className="w-16 h-1 bg-red-600 mb-4"></div>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            {t(
              "sales.intro",
              "Interested in buying, selling, or investing? Fill out the form below and our sales experts will get back to you with the best property options tailored to your needs.",
            )}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl font-normal text-gray-800 mb-6">
              {t("sales.submitDetails", "Submit Your Details")}
            </h2>
            {/* Reuse the existing contact form component */}
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-normal text-gray-800 mb-4">
                {t("sales.directLine", "Direct Sales Line")}
              </h3>
              <p className="text-[15px] text-gray-600 mb-4">
                {t(
                  "sales.callCopy",
                  "Prefer to speak with someone immediately? Call our dedicated sales team.",
                )}
              </p>
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors">
                Call {companyInfo.phone}
              </a>
            </div>

            <div className="bg-gray-800 text-white border border-gray-800 rounded-lg p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-normal mb-4">
                {t("sales.whyChoose", "Why choose Arjun Buildtech?")}
              </h3>
              <ul className="space-y-3 text-[15px] text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✔</span>
                  {t(
                    "sales.verified",
                    "Ask about current listings and their availability.",
                  )}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✔</span>
                  {t(
                    "sales.legal",
                    "Expert guidance on legal checks and documentation.",
                  )}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✔</span>
                  {t(
                    "sales.local",
                    "Deep local market knowledge across Rohtak and NCR.",
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesEnquiry;
