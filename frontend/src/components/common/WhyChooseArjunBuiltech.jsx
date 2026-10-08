import React from "react";

const WhyChooseArjunBuiltech = () => {
  const reasons = [
    {
      title: "Local Expertise in Rohtak",
      desc: "We specialize only in Rohtak — with deep knowledge of HSVP and Suncity sectors to help you find the right property.",
      img: "https://static.realestateindia.com/rei/images/wh-img1.jpg",
    },
    {
      title: "Sell & Invest with Confidence",
      desc: "Whether you’re looking to sell your property or invest, we make property deals transparent, safe, and profitable.",
      img: "https://static.realestateindia.com/rei/images/wh-img2.jpg",
    },
    {
      title: "Verified Properties & Genuine Deals",
      desc: "Every property we list is verified and genuine, ensuring you connect with trusted buyers and sellers only.",
      img: "https://static.realestateindia.com/rei/images/wh-img3.jpg",
    },
    {
      title: "Personalized Support for Every Client",
      desc: "Our dedicated team provides tailored assistance based on your property needs, budget, and goals.",
      img: "https://static.realestateindia.com/rei/images/wh-img4.jpg",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Standard Portal Heading Design */}
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
            Why Choose Arjun Buildtech?
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-4 mx-auto md:mx-0"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:mx-0">
            We’re Rohtak’s trusted real estate experts — helping clients sell
            and invest in premium residential plots and homes. Here’s why people
            choose us:
          </p>
        </div>

        {/* 4-Column Utilitarian Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center md:items-start text-center md:text-left hover:shadow-md transition-shadow duration-200">
              {/* Image / Icon container */}
              <div className="mb-5 w-16 h-16 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              <h3 className="text-[16px] font-semibold text-gray-900 mb-2 leading-tight">
                {item.title}
              </h3>

              <p className="text-[13px] text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseArjunBuiltech;
