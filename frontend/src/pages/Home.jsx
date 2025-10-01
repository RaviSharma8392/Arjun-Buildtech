import React from "react";
import HeroBanner from "../components/HeroBanner";
import FeaturedProperties from "../components/FeaturedProperties";
import PopularLocalities from "../components/PopularLocalities";
import ServicesWeOffer from "../components/ServicesWeOffer";
import Testimonials from "./Testimonials";
import ContactForm from "../components/common/contact/ContactForm";
import localities from "../data/localities.json";
import services from "../data/services.json";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroBanner />

      {/* Featured Properties Section */}

      <FeaturedProperties />

      {/* Popular Localities Section */}

      <PopularLocalities localities={localities} />

      {/* Services We Offer Section */}

      <ServicesWeOffer />

      {/* Testimonials Section */}

      <Testimonials />

      {/* Contact Section */}

      <ContactUs />
    </div>
  );
};

export default Home;
