import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import ContactForm from "../components/common/form/ContactForm";

const Profile = () => {
  const contactPersons = [
    { name: "Parveen Gehlawat", phones: ["93504-47531", "98994-81428"] },
    { name: "Naveen Gehlawat", phones: ["98121-50126"] },
  ];

  const offices = [
    { address: "G74P, Sector-27, Rohtak" },
    { address: "828, Sector-1, Rohtak, 124001" },
  ];

  const companyImages = [
    "/ARJUN ROHTAK BROCHURE (2)_page-0001.jpg",
    "/ARJUN ROHTAK BROCHURE (2)_page-0002.jpg",
    "/ARJUN ROHTAK BROCHURE (2)_page-0003.jpg",
    "/ARJUN ROHTAK BROCHURE (2)_page-0004.jpg",
  ];

  return (
    <div className="min-h-screen mt-12  bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Arjun Buildtech
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            If you are looking for a property consultant to help you get your
            dream plot or investment, then you are at the right place. We, at
            Arjun Buildtech, are one of the leading real estate advisors in
            Rohtak, Haryana, with a decade of experience. Our main motive is to
            provide excellent quality and planning tailored to the needs of our
            clients.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 rounded-lg overflow-hidden shadow-md">
          {companyImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Company Image ${idx + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Services & Focus
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Services:</strong> Property Consulting and Real Estate
              services in Rohtak, Haryana
            </li>
            <li>
              <strong>Focus:</strong> Helping Clients Buy, Sell and Invest in
              Property
            </li>
            <li>
              <strong>Office Location:</strong> G74P, Sector-27, Rohtak
            </li>
            <li>
              <strong>Specialization:</strong> Providing tailored solutions
              based on client need
            </li>
          </ul>
        </div>

        {/* Offices & Contact Persons */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Offices
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {offices.map((office, idx) => (
                <li key={idx} className="text-gray-700">
                  {office.address}
                </li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">
              Contact Persons
            </h2>
            <div className="space-y-4">
              {contactPersons.map((person, idx) => (
                <div key={idx}>
                  <p className="font-medium text-gray-900">{person.name}</p>
                  <p className="text-gray-600 text-sm">
                    {person.phones.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Company Contact Info */}
        <div className="border border-gray-200 rounded-lg p-6 grid md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <p className="text-gray-600 text-sm">G74P, Sector-27, Rohtak</p>
              <p className="text-gray-600 text-sm">
                828, Sector-1, Rohtak, 124001
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-gray-600 text-sm">
                93504-47531, 98994-81428, 98121-50126
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600 text-sm">
                arjunbuildtech27@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
