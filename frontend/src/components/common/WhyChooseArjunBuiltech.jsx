import React from "react";

const WhyChooseArjunBuiltech = () => {
  const reasons = [
    {
      title: "Local Expertise in Rohtak",
      desc: "We specialize only in Rohtak — with deep knowledge of HSVP and Suncity sectors to help you find the right property.",
      img: "https://static.realestateindia.com/rei/images/wh-img1.jpg",
    },
    {
      title: "Buy, Sell & Invest with Confidence",
      desc: "Whether you’re a first-time buyer or an investor, we make property deals transparent, safe, and profitable.",
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
    <section className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Choose <span className="text-blue-600">Arjun Builtech?</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We’re Rohtak’s trusted real estate experts — helping clients buy,
          sell, and invest in premium residential plots and homes. Here’s why
          people choose us:
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
