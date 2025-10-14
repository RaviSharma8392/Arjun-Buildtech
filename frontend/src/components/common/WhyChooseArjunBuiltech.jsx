import React from "react";

const WhyChooseArjunBuiltech = () => {
  const reasons = [
    {
      title: "Reach Millions of Buyers & Tenants",
      desc: "Our user-friendly platform ensures your listing reaches potential buyers and tenants quickly.",
      img: "https://static.realestateindia.com/rei/images/wh-img1.jpg",
    },
    {
      title: "Free & Premium Plans",
      desc: "Post free property ads or choose premium plans for exclusive features, zero charges for agents and builders.",
      img: "https://static.realestateindia.com/rei/images/wh-img1.jpg",
    },
    {
      title: "Simple & Fast Process",
      desc: "List your property easily—add details, upload images, and your ad goes live within minutes.",
      img: "https://static.realestateindia.com/rei/images/wh-img1.jpg",
    },
    {
      title: "Verified Leads Only",
      desc: "Connect only with verified buyers and tenants, ensuring safe and genuine deals.",
      img: "https://static.realestateindia.com/rei/images/wh-img1.jpg",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Choose <span className="text-blue-600">Arjun Builtech?</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Arjun Builtech is one of the most trusted platforms for buying,
          selling, or renting properties. Here’s why thousands of clients choose
          us:
        </p>

        {/* Grid of Reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="mb-4 w-20 h-20">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseArjunBuiltech;
