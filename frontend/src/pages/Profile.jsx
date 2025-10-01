import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaUser,
  FaCalendar,
  FaCity,
  FaShieldAlt,
} from "react-icons/fa";
import ContactForm from "../components/common/contact/ContactForm";

const Profile = () => {
  const propertyCities = ["Nainital", "Haldwani"];

  const companyInfo = [
    { icon: FaUser, label: "CEO", value: "Naitik Bisht" },
    {
      icon: FaBuilding,
      label: "Business Type",
      value: "Builders & Developers",
    },
    {
      icon: FaShieldAlt,
      label: "Legal Status",
      value: "Individual (Sole Proprietorship)",
    },
    { icon: FaCalendar, label: "Year of Establishment", value: "2020" },
    { icon: FaCity, label: "Operating Cities", value: "Nainital" },
    {
      icon: FaShieldAlt,
      label: "Registrar of Companies",
      value: "DIN 10143065",
    },
  ];

  const contactInfo = {
    address: "Bhateliya, Mukteshwar, Nainital, Uttarakhand, India",
    phone: "+91 76177 11003",
    email: "naitikbisht1@gmail.com",
  };

  const coreValues = [
    "Uphold values and disciplines in life and business.",
    "Build trust and long-term relationships.",
    "Deliver consistent positive outcomes for clients.",
    "Maintain professionalism and integrity in all dealings.",
    "Provide innovative real estate solutions.",
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Hero Section with Image */}
        <div className="md:bg-white md:rounded-2xl md:shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Vips Real Estate Solutions
              </h1>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Vips Real Estate Solutions is one of the most renowned real
                  estate companies in Uttarakhand, India. Our outstanding
                  reputation is earned through consistent hard work and positive
                  outcomes for clients via a network of talented, professional,
                  and multilingual real estate agents.
                </p>
                <p>
                  Over the years, we expanded from excelling in the off-plan
                  sector into a multicultural holding company with several
                  prosperous divisions. Our success is defined by client
                  satisfaction and achievements since inception.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://catalog.wlimg.com/about_us_image/rei/4.jpg"
                alt="Vips Real Estate Solutions"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">M</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to offer innovative services through trusted
              expertise and help clients find valuable solutions to their real
              estate requirements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">V</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our vision is to position Vips Real Estate Solutions as the number
              one real estate firm in the region, recognized for integrity,
              professionalism, and reputation.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Company Information
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.map((info, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {info.label}
                  </p>
                  <p className="text-gray-900 font-semibold">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="md:bg-white md:rounded-2xl md:shadow-sm md:border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Contact Info */}
            <div className="p-8 bg-gray-50">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h3>
                    <p className="text-gray-700">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-700">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
