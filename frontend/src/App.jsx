import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import UserLayout from "./layouts/UserLayout";
import Testimonials from "./pages/Testimonials";
import PropertiesPage from "./pages/Property";
import PropertyDetails from "./pages/PropertyDetails";
import WhatsAppButton from "./components/common/button/ButtonWithWhatsApp";
import ClientReviews from "./components/ClientReviews";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import ServicesWeOffer from "./components/ServicesWeOffer";

const App = () => {
  return (
    <UserLayout>
      {/* <WhatsAppButton /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/properties" element={<PropertiesPage />} />

        <Route
          path="/property/:location/:name/:id"
          element={<PropertyDetails />}
        />
        <Route path="/testimonials" element={<ClientReviews />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<ServicesWeOffer />} />
      </Routes>
    </UserLayout>
  );
};

export default App;
