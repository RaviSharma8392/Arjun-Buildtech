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

// -------- Admin Route Guard --------
const RequireAdmin = ({ children }) => {
  // const isAdmin = localStorage.getItem("admin") === "true"; // check admin flag
  const isAdmin = "true"; // check admin flag

  if (!isAdmin) {
    return <Navigate to="/" replace />; // redirect non-admin users
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
          <Route path="/" element={<UserLayout />}>
            <Route
              index
              element={
                <>
                  <Helmet>
                    <title>Home | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Explore premium residential and commercial properties with Arjun BuildTech. Buy, sell, or rent your dream property with trusted experts."
                    />
                    <meta
                      name="keywords"
                      content="real estate, properties, homes, plots, villas, apartments, Arjun BuildTech"
                    />
                  </Helmet>
                  <Home />
                </>
              }
            />

            <Route
              path="properties"
              element={
                <>
                  <Helmet>
                    <title>Properties | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Browse premium residential and commercial properties by Arjun BuildTech. Buy, sell, or rent your ideal home or plot."
                    />
                    <meta
                      name="keywords"
                      content="properties, houses, villas, apartments, plots, Arjun BuildTech"
                    />
                  </Helmet>
                  <PropertiesPage />
                </>
              }
            />
            <Route
              path="properties/:location"
              element={
                <>
                  <Helmet>
                    <title>Properties in Location | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Discover properties in your preferred location with Arjun BuildTech. Browse homes, villas, apartments, and plots."
                    />
                    <meta
                      name="keywords"
                      content="properties, location properties, real estate, Arjun BuildTech"
                    />
                  </Helmet>
                  <PropertiesPage />
                </>
              }
            />

            <Route
              path="property/:location/:name/:id"
              element={
                <>
                  <Helmet>
                    <title>Property Details | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="View detailed information, images, and features of the property by Arjun BuildTech. Get in touch to buy or rent today."
                    />
                    <meta
                      name="keywords"
                      content="property details, buy property, rent property, Arjun BuildTech"
                    />
                  </Helmet>
                  <PropertyDetails />
                </>
              }
            />

            <Route
              path="testimonials"
              element={
                <>
                  <Helmet>
                    <title>Client Testimonials | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Read client reviews and testimonials about Arjun BuildTech. Trusted real estate experts delivering dream properties."
                    />
                    <meta
                      name="keywords"
                      content="client reviews, testimonials, Arjun BuildTech"
                    />
                  </Helmet>
                  <ClientReviews />
                </>
              }
            />

            <Route
              path="contact"
              element={
                <>
                  <Helmet>
                    <title>Contact Us | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Contact Arjun BuildTech for queries, property inquiries, or assistance. Reach out to our real estate experts today."
                    />
                    <meta
                      name="keywords"
                      content="contact, inquiries, Arjun BuildTech"
                    />
                  </Helmet>
                  <ContactUs />
                </>
              }
            />

            <Route
              path="profile"
              element={
                <>
                  <Helmet>
                    <title>User Profile | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Manage your Arjun BuildTech account, saved properties, and personal information."
                    />
                    <meta
                      name="keywords"
                      content="profile, account, Arjun BuildTech"
                    />
                  </Helmet>
                  <Profile />
                </>
              }
            />

            <Route
              path="services"
              element={
                <>
                  <Helmet>
                    <title>Real Estate Services | Arjun BuildTech</title>
                    <meta
                      name="description"
                      content="Explore the comprehensive real estate services offered by Arjun BuildTech. Buying, selling, renting, and property management."
                    />
                    <meta
                      name="keywords"
                      content="real estate services, Arjun BuildTech"
                    />
                  </Helmet>
                  <RealEstateServices />
                </>
              }
            />
          </Route>

          {/* ---------- Admin Routes ---------- */}
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
