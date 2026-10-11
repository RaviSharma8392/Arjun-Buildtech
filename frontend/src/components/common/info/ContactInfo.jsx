import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "../../../context/useLanguage";
import { companyInfo } from "../../../data/companyInfo";

const ContactInfo = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 h-full">
      {/* Standard Portal Heading Design */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-normal text-gray-800 mb-4">
          {t("contactInfo.title", "Get In Touch")}
        </h2>
        <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
        <p className="text-sm md:text-[15px] text-gray-600">
          {t(
            "contactInfo.description",
            "Reach out to our experts for inquiries, site visits, or property consultations. We are here to help.",
          )}
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
              {t("contactInfo.locations", "Our Locations")}
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {companyInfo.address}
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
              {t("contactInfo.call", "Call Us")}
            </h4>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="text-[14px] text-gray-600 leading-relaxed hover:text-red-600">
              {companyInfo.phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
            <Mail className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1">
              {t("contactInfo.email", "Email")}
            </h4>
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-[14px] text-gray-600 leading-relaxed hover:text-red-600">
              {companyInfo.email}
            </a>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
            <Clock className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1">
              {t("contactInfo.hours", "Office Hours")}
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {t("contactInfo.weekdays", "Mon–Sat: 10am–6pm")}
            </p>
            <p className="text-[14px] text-gray-600 leading-relaxed mt-0.5">
              {t("contactInfo.saturday", "Contact us to confirm availability")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
