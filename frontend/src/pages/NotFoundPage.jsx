import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect to homepage
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-sm">
        The page you are looking for does not exist. You will be redirected to
        the homepage shortly.
      </p>
      <div className="w-24 h-1 bg-red-600 rounded-full animate-pulse"></div>
    </div>
  );
};

export default NotFoundPage;
