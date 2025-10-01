import React from "react";
import ContactInfo from "../components/common/contact/ContactInfo";
import ContactForm from "../components/common/contact/ContactForm";

const ContactUs = () => {
  return (
    <section
      className="relative py-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1470&q=80')",
      }}>
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-blue-900/50"></div>

      <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactUs;
