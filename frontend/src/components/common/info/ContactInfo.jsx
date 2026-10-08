import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 h-full">
      {/* Standard Portal Heading Design */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-normal text-gray-800 mb-4">
          Get In Touch
        </h2>
        <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
        <p className="text-sm md:text-[15px] text-gray-600">
          Reach out to our experts for inquiries, site visits, or property
          consultations. We are here to help.
        </p>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
            <MapPin className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1">
              Our Locations
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              G74P, Sector-27, Rohtak
            </p>
            <p className="text-[14px] text-gray-600 leading-relaxed mt-0.5">
              828, Sector-1, Rohtak, 124001
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
            <Phone className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1">
              Call Us
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Parveen Gehlawat: 93504-47531, 98994-81428
            </p>
            <p className="text-[14px] text-gray-600 leading-relaxed mt-0.5">
              Naveen Gehlawat: 98121-50126
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
            <Mail className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1">
              Email
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              arjunbuildtech27@gmail.com
            </p>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
            <Clock className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1">
              Office Hours
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Mon–Fri: 9am–6pm
            </p>
            <p className="text-[14px] text-gray-600 leading-relaxed mt-0.5">
              Sat: 10am–4pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
