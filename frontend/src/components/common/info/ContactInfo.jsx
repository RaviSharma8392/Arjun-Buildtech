import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="hidden lg:flex flex-col justify-start space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">Our Locations</h4>
              <p className="text-gray-600">• G74P, Sector-27, Rohtak</p>
              <p className="text-gray-600">• 828, Sector-1, Rohtak, 124001</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">Call Us</h4>
              <p className="text-gray-600">
                Parveen Gehlawat: 93504-47531, 98994-81428
              </p>
              <p className="text-gray-600">Naveen Gehlawat: 98121-50126</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="h-6 w-6 text-purple-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">Email</h4>
              <p className="text-gray-600">arjunbuildtech27@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="h-6 w-6 text-orange-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">Office Hours</h4>
              <p className="text-gray-600">Mon–Fri: 9am–6pm</p>
              <p className="text-gray-600">Sat: 10am–4pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
