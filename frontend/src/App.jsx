import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { useLanguage } from "./context/useLanguage";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Pages
import AdminPropertyManage from "./pages/admin/AdminPropertyManage";
import AddEditPropertyPage from "./pages/admin/EditPropertyPage";
import AdminReviewsList from "./pages/admin/AdminReviewsList";
import AdminReviewForm from "./pages/admin/AdminReviewForm";
import AdminRegister from "./pages/admin/Register";
import AdminSettings from "./pages/admin/AdminSettings";
import SitemapPage from "./pages/user/Sitemap";
import AdminLocalitiesList from "./pages/admin/AdminLocalitiesList";
import AdminLocalityForm from "./pages/admin/AdminLocalityForm";
import BlogListingPage from "./pages/user/BlogListingPage";
import BlogDetailsPage from "./pages/user/BlogDetailsPage";

// Lazy-loaded Pages
const Home = lazy(() => import("./pages/user/Home"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetails = lazy(() => import("./pages/user/PropertyDetails"));
const ClientReviews = lazy(() => import("./components/ClientReviews"));
const ServicePage = lazy(() => import("./pages/user/ServicePage"));
const Profile = lazy(() => import("./pages/Profile"));
const PrivacyPolicy = lazy(() => import("./pages/user/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/user/TermsOfService"));
const RealEstateServices = lazy(
  () => import("./components/RealEstateServices"),
);
const ContactUs = lazy(() => import("./pages/user/ContactUs"));
const SeoListingPage = lazy(() => import("./pages/SeoListingPage"));
const HelpCenter = lazy(() => import("./pages/user/HelpCenter"));
const SalesEnquiry = lazy(() => import("./pages/user/SalesEnquiry"));
const ChatWithUs = lazy(() => import("./pages/user/ChatWithUs"));
const EmiCalculatorPage = lazy(() => import("./pages/user/EmiCalculatorPage"));
const AreaConverterPage = lazy(() => import("./pages/user/AreaConverterPage"));
const ToolsPage = lazy(() => import("./pages/user/ToolsPage"));

// Admin Lazy Pages
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin")); // login/signup page

// -------- Admin Route Guard --------
const RequireAdmin = ({ children }) => {
  const adminData = JSON.parse(localStorage.getItem("admin")); // get stored login info

  console.log(adminData);
  // If not logged in or role is not admin, redirect to login
  if (!adminData || !adminData.uid || adminData.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// -------- App Component --------
const App = () => {
  const { t } = useLanguage();
  return (
    <HelmetProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-slate-100 text-center px-4">
            <img
              src="/arjunBuildTechLogo.png"
              alt="Arjun BuildTech"
              className="w-28 h-28 object-contain animate-pulse mb-6 drop-shadow-md"
            />
            <div className="relative mb-5">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {t("common.loadingTitle", "Loading Your Dream Property...")}
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
              {t(
                "common.loadingDescription",
                "Please wait a moment while we prepare your personalized real estate experience.",
              )}
            </p>
          </div>
        }>
        <Routes>
          {/* ---------- User Routes ---------- */}
          <Route path="/sitemap" element={<SitemapPage />} />

          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            {/* Property Listings by Location */}
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:city" element={<PropertiesPage />} />
            <Route
              path="property/:location/:name/:id"
              element={<PropertyDetails />}
            />
            {/* Pages / Components */}
            <Route path="testimonials" element={<ClientReviews />} />
            <Route path="reviews" element={<ClientReviews />} />{" "}
            {/* optional */}
            <Route
              path="real-estate-services"
              element={<RealEstateServices />}
            />
            <Route path="contact" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services" element={<RealEstateServices />} />
            <Route path="services/:slug" element={<ServicePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            {/* Help & Support Routes */}
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="sales-enquiry" element={<SalesEnquiry />} />
            <Route path="chat-with-us" element={<ChatWithUs />} />
            {/* Blog Routes */}
            <Route path="blog" element={<BlogListingPage />} />
            <Route path="blog/:slug" element={<BlogDetailsPage />} />
            <Route path="emi-calculator" element={<EmiCalculatorPage />} />
            <Route path="area-converter" element={<AreaConverterPage />} />
            <Route path="tools" element={<ToolsPage />} />
            {/* Programmatic Dynamic Handler for SEO Pages */}
            <Route path=":slug" element={<SeoListingPage />} />
          </Route>

          {/* ---------- Admin Auth Routes ---------- */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* <Route path="/admin/register" element={<AdminRegister />} /> */}
          {/* same component handles signup */}
          {/* ---------- Admin Protected Routes ---------- */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }>
            <Route index element={<AdminPropertyManage />} />
            <Route
              path="edit-property/:collectionName/new"
              element={<AddEditPropertyPage />}
            />
            <Route
              path="edit-property/:collectionName/:docId"
              element={<AddEditPropertyPage />}
            />
            <Route path="properties" element={<AdminPropertyManage />} />
            <Route
              path="featuredproperties"
              element={<AdminPropertyManage />}
            />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="reviews" element={<AdminReviewsList />} />
            <Route path="localities" element={<AdminLocalitiesList />} />
            <Route path="localities/new" element={<AdminLocalityForm />} />
            <Route path="localities/:id" element={<AdminLocalityForm />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          {/* Admin Review Forms */}
          <Route
            path="/admin/reviews/new"
            element={
              <RequireAdmin>
                <AdminReviewForm />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/reviews/:id"
            element={
              <RequireAdmin>
                <AdminReviewForm />
              </RequireAdmin>
            }
          />
          {/* ---------- 404 Fallback ---------- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
