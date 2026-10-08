import React from "react";
import ContactInfo from "../../components/common/info/ContactInfo";
import ContactForm from "../../components/common/form/ContactForm";
import MapSection from "../../components/MapSection";

const ContactUs = () => {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="py-12 md:py-16">
        {/* Main Content Container */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-12 md:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="w-full">
              <ContactInfo />
            </div>

            {/* Right: Form */}
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map Section (Full width or contained based on your MapSection component) */}
        <div className="w-full bg-gray-50 border-t border-gray-200">
          <MapSection />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
