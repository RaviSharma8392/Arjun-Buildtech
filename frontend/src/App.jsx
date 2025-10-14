import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ManageProperties from "./pages/admin/ManageProperties";
import AddEditPropertyPage from "./pages/admin/EditPropertyPage";

// Lazy-loaded Pages (for performance)
const Home = lazy(() => import("./pages/user/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const ClientReviews = lazy(() => import("./components/ClientReviews"));
const Profile = lazy(() => import("./pages/Profile"));
const RealEstateServices = lazy(() =>
  import("./components/RealEstateServices")
);
const ContactUs = lazy(() => import("./pages/user/ContactUs"));
const UserPropertyListing = lazy(() =>
  import("./pages/user/UserPropertyListing")
);

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPropertyManager = lazy(() => import("./services/AddButton"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Global SEO Meta Tags */}
        <title>Arjun BuildTech | Real Estate Experts in India</title>
        <meta
          name="description"
          content="Explore premium residential and commercial properties with Arjun BuildTech. Buy, sell, or rent your dream property with trusted experts."
        />
        <meta
          name="keywords"
          content="real estate, properties, buy house, plots, villas, apartments, Arjun BuildTech"
        />
        <meta
          property="og:title"
          content="Arjun BuildTech | Properties & Projects"
        />
        <meta
          property="og:description"
          content="Find your dream home or plot with Arjun BuildTech — trusted real estate partners."
        />
        <meta property="og:image" content="/arjunBuildTechLogo.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Router Wrapper */}
      {/* Suspense wraps lazy-loaded routes for fallback */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 text-center px-4">
            {/* Logo / Illustration */}
            <img
              src="/arjunBuildTechLogo.png"
              alt="Arjun BuildTech"
              className="w-28 h-28 object-contain animate-pulse mb-6 drop-shadow-md"
            />

            {/* Animated Spinner */}
            <div className="relative mb-5">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>

            {/* Loading Text */}
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
          <Route path="/" element={<UserLayout />}>
            <Route
              index
              element={
                <>
                  <Helmet>
                    <title>Home | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Discover featured properties, latest projects, and trusted real estate services from Arjun BuildTech."
                    />
                  </Helmet>
                  <Home />
                </>
              }
            />
            <Route path="projects" element={<Projects />} />
            <Route path="properties" element={<PropertiesPage />} />

            <Route path="properties/:location" element={<PropertiesPage />} />
            <Route
              path="property/:location/:name/:id"
              element={<PropertyDetails />}
            />
            <Route path="testimonials" element={<ClientReviews />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services" element={<RealEstateServices />} />
            <Route path="post-property" element={<UserPropertyListing />} />
          </Route>

          {/* ---------- Admin Routes ---------- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-property" element={<AddEditPropertyPage />} />
            <Route path="edit-property/:id" element={<AddEditPropertyPage />} />
            <Route path="property-manager" element={<ManageProperties />} />
            <Route path="inquiries" element={<AdminInquiries />} />
          </Route>

          {/* ---------- 404 Fallback Route ---------- */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
