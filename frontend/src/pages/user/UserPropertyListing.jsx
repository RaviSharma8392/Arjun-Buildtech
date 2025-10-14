import React from "react";
import UserPropertyForm from "../../components/common/form/UserPropertyForm";
import WhyChooseArjunBuiltech from "../../components/common/WhyChooseArjunBuiltech";

const UserPropertyListing = () => {
  // Left section content (dynamic)
  const leftContent = {
    title: "Sell or Rent Your Property Online in Haryana for FREE!",
    highlights: [
      "Advertise for FREE",
      "List Your Property in Minutes",
      "Zero Brokerage",
      "Get Shortlisted Buyers & Tenants",
    ],
  };

  // Form options (dynamic)
  const formOptions = {
    title: "Let’s get you started",
    roles: ["Owner", "Agent", "Builder"],
    intents: ["Sell", "Rent/Lease"],
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100  gap-12">
      {/* Top Section: Left + Form */}
      <div className="flex flex-col md:flex-row items-start md:items-center w-full max-w-7xl gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {leftContent.title.split("FREE!")[0]}
            <span className="text-blue-600">FREE!</span>
          </h1>
          <ul className="space-y-3 text-gray-700">
            {leftContent.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-blue-500">➤</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 mt-15  p-5 flex flex-col items-center w-full">
          <UserPropertyForm
            title={formOptions.title}
            roles={formOptions.roles}
            intents={formOptions.intents}
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full  bg-white ">
        <WhyChooseArjunBuiltech />
      </div>
    </div>
  );
};

export default UserPropertyListing;
