import React from "react";
import { FaStar, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

const TrustedBrands = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="flex-1 w-full text-center md:text-left">
            {/* Standard Portal Heading Design */}
            <div className="mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-3">
                <FaShieldAlt className="w-4 h-4" />
                <span className="text-[12px] font-semibold uppercase tracking-wider">
                  100% Independent
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
                Rohtak's Premier Real Estate Consultant
              </h2>
              <div className="w-16 h-1 bg-red-600 mb-6 mx-auto md:mx-0"></div>
            </div>

            <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Arjun Buildtech is a dedicated local property dealership operating
              in Rohtak, with a focus on{" "}
              <span className="font-semibold text-gray-800">
                Sector 27 & Sector 1.
              </span>{" "}
              We operate independently and are{" "}
              <strong className="font-semibold text-gray-800">
                not affiliated with any corporate entities or construction
                companies in Kurukshetra.
              </strong>
            </p>
          </div>

          {/* Right Content - Rating Card */}
          <div className="w-full md:w-[320px] bg-[#F9F9F9] border border-gray-200 rounded-lg p-6 shrink-0 flex flex-col items-center md:items-start hover:shadow-md transition-shadow duration-200">
            {/* Rating Section */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-bold text-4xl text-gray-900">4.9</span>
              <div>
                <div className="flex items-center gap-1 text-[#F5A623] text-[15px] mb-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-[12px] text-gray-500">Customer rating</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-4"></div>

            {/* Justdial Section */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[13px] text-gray-600">
                Verified reviews on
              </span>
              <img
                src="https://akam.cdn.jdmagicbox.com/images/icontent/jdrwd/jdlogosvg.svg"
                alt="Justdial"
                className="h-6 w-auto object-contain"
              />
            </div>

            {/* Verified Badge */}
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#00875A]">
              <FaCheckCircle className="w-4 h-4 shrink-0" />
              <span>100% Verified Agents</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
