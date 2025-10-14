import React from "react";
import ContactInfo from "../../components/common/info/ContactInfo";
import ContactForm from "../../components/common/form/ContactForm";

const ContactUs = () => {
  return (
    <div className="min-h-screen md:mt-10 bg-gradient-to-br from-slate-50 to-blue-50 pt-5 md:py-12 flex justify-center items-start">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <ContactInfo />

        {/* Right: Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
