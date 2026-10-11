import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./services/firebase";
import { useLanguage } from "./context/useLanguage";
import { getRouteMetadata, updateDocumentMetadata } from "./utils/seoMetadata";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import NotFoundPage from "./pages/NotFoundPage";

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
const SitemapPage = lazy(() => import("./pages/user/Sitemap"));
const BlogListingPage = lazy(() => import("./pages/user/BlogListingPage"));
const BlogDetailsPage = lazy(() => import("./pages/user/BlogDetailsPage"));

// Admin Lazy Pages
const AdminPropertyManage = lazy(
  () => import("./pages/admin/AdminPropertyManage"),
);
const AddEditPropertyPage = lazy(
  () => import("./pages/admin/EditPropertyPage"),
);
const AdminReviewsList = lazy(() => import("./pages/admin/AdminReviewsList"));
const AdminReviewForm = lazy(() => import("./pages/admin/AdminReviewForm"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminLocalitiesList = lazy(
  () => import("./pages/admin/AdminLocalitiesList"),
);
const AdminLocalityForm = lazy(() => import("./pages/admin/AdminLocalityForm"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin")); // login/signup page

// -------- Admin Route Guard --------
const RequireAdmin = ({ children }) => {
  const [access, setAccess] = useState("checking");

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (active) setAccess("denied");
        return;
      }

      try {
        const adminSnapshot = await getDoc(doc(db, "admins", user.uid));
        const isAdmin =
          adminSnapshot.exists() && adminSnapshot.data().role === "admin";
        if (active) setAccess(isAdmin ? "allowed" : "denied");
        if (!isAdmin) await signOut(auth);
      } catch (error) {
        console.error("Unable to verify administrator access:", error);
        if (active) setAccess("denied");
        await signOut(auth);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  if (access === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Verifying access...
      </div>
    );
  }
  if (access !== "allowed") return <Navigate to="/admin/login" replace />;

  return (
    <>
      <Helmet>
        <title>Admin | Arjun Buildtech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
    </>
  );
};

// -------- App Component --------
const App = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    updateDocumentMetadata(getRouteMetadata(pathname));
  }, [pathname]);

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
