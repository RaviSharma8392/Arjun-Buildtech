import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { companyInfo } from "../../../data/companyInfo";

const ContactInfo = () => {
  const isHome = window.location.pathname === "/";
  const contactDetails = [
    {
      icon: <FaMapMarkerAlt className="text-red-500 w-5 h-5" />,
      label: "Address",
      value: companyInfo.address,
    },
    {
      icon: <FaPhone className="text-green-600 w-5 h-5" />,
      label: "Phone",
      value: companyInfo.phone,
      action: () =>
        (window.location.href = `tel:${companyInfo.phone.replace(/\s/g, "")}`),
    },
    {
      icon: <FaEnvelope className="text-purple-600 w-5 h-5" />,
      label: "Email",
      value: companyInfo.email,
      action: () => (window.location.href = `mailto:${companyInfo.email}`),
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
              src={`https://www.google.com/maps?q=${encodeURIComponent(companyInfo.address)}&output=embed`}
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
