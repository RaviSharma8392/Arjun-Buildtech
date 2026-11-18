import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/useLanguage";

const NotFoundPage = () => {
  const { t } = useLanguage();
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F9F9F9] px-4 py-12">
      <Helmet>
        <title>Page Not Found | Arjun Buildtech</title>
        <meta
          name="description"
          content="The requested Arjun Buildtech page could not be found. Browse current Rohtak property listings."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">404</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          {t("notFound.title", "Page not found")}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-gray-600">
          {t(
            "notFound.copy",
            "This link may have moved or the page is no longer published. Choose a destination below.",
          )}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/properties"
            className="rounded bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">
            Browse properties
          </Link>
          <Link
            to="/"
            className="rounded border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-red-600 hover:text-red-600">
            Go to homepage
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
