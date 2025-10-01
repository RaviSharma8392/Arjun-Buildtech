import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactInfo = () => {
  const isHome = window.location.pathname === "/";
  const contactDetails = [
    {
      icon: <FaMapMarkerAlt className="text-red-500 w-5 h-5" />,
      label: "Address",
      value: "Bhateliya, Mukteshwar, Nainital, Uttarakhand, India",
    },
    {
      icon: <FaPhone className="text-green-600 w-5 h-5" />,
      label: "Phone",
      value: "+91 76177 11003",
      action: () => (window.location.href = "tel:+917617711003"),
    },
    {
      icon: <FaEnvelope className="text-purple-600 w-5 h-5" />,
      label: "Email",
      value: "naitikbisht1@gmail.com",
      action: () => (window.location.href = "mailto:naitikbisht1@gmail.com"),
    },
  ];

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-[Montserrat] text-gray-900  text-center mb-6">
          How to Find Us{" "}
        </h2>

        {/* Single Contact Card */}
        <div className="bg-tr p-6 rounded-xl transition cursor-pointer">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="flex items-center gap-4 mb-4 last:mb-0p-3 rounded transition">
              <div className="bg-white rounded-full p-3 flex items-center justify-center shadow-md">
                {item.icon}
              </div>

              <div className="text-left">
                <p className="text-white font-[Sacramento]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        {!isHome && (
          <div className="mt-8">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13914.415517530062!2d79.54313820289677!3d29.323293154710555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0977d3a2728eb%3A0x51e41c838d9641a2!2sJoonstate%2C%20Uttarakhand%20263136!5e0!3m2!1sen!2sin!4v1759227849002!5m2!1sen!2sin" // replace with your link
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-xl "
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactInfo;
