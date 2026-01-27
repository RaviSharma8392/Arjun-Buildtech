import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

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
import SitemapPage from "./pages/user/Sitemap";

// Lazy-loaded Pages
const Home = lazy(() => import("./pages/user/Home"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetails = lazy(() => import("./pages/user/PropertyDetails"));
const ClientReviews = lazy(() => import("./components/ClientReviews"));
const Profile = lazy(() => import("./pages/Profile"));
const RealEstateServices = lazy(
  () => import("./components/RealEstateServices"),
);
const ContactUs = lazy(() => import("./pages/user/ContactUs"));

// Admin Lazy Pages
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
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
  return (
    <HelmetProvider>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 text-center px-4">
            <img
              src="/arjunBuildTechLogo.png"
              alt="Arjun BuildTech"
              className="w-28 h-28 object-contain animate-pulse mb-6 drop-shadow-md"
            />
            <div className="relative mb-5">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Loading Your Dream Property...
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
              Please wait a moment while we prepare your personalized real
              estate experience.
            </p>
          </div>
        }>
        <Routes>
          {/* ---------- User Routes ---------- */}
          {/* <Route path="/sitemap" element={<SitemapPage />} /> */}

          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            {/* Property Listings by Location */}
            <Route path="properties" element={<PropertiesPage />} />
            <Route
              path="properties-for-sale-in-:location"
              element={<PropertiesPage />}
            />
            <Route
              path="property/:location/:name/:id"
              element={<PropertyDetails />}
            />
            <Route
              path="houses-for-sale-in-:location"
              element={<PropertiesPage type="house" />}
            />
            <Route
              path="plots-for-sale-in-:location"
              element={<PropertiesPage type="plot" />}
            />
            {/* Pages / Components */}
            <Route path="testimonials" element={<ClientReviews />} />
            <Route path="reviews" element={<ClientReviews />} />{" "}
            {/* optional */}
            <Route
              path="real-estate-services"
              element={<RealEstateServices />}
            />
            <Route path="contact-agent" element={<ContactUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services" element={<RealEstateServices />} />
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
            <Route path="reviews" element={<AdminReviewsList />} />
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
