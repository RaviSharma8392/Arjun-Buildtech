import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/useLanguage";

const NotFoundPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect to homepage
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 px-4">
      <Helmet>
        <title>Page Not Found | Arjun Buildtech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {t("notFound.title", "Oops! Page Not Found")}
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-sm">
        {t(
          "notFound.copy",
          "The page you are looking for does not exist. You will be redirected to the homepage shortly.",
        )}
      </p>
      <div className="w-24 h-1 bg-red-600 rounded-full animate-pulse"></div>
    </div>
  );
};

export default NotFoundPage;
