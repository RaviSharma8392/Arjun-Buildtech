import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, ChevronRight, PhoneCall } from "lucide-react";
import { servicesData } from "../../data/servicesData";
import InquiryPopup from "../../components/common/form/InquiryPopup";

const ServicePage = () => {
  const { slug } = useParams();
  const service = servicesData[slug];
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Arjun Buildtech",
      "image": "https://arjunbuildtech.com/arjunBuildTechLogo.png"
    },
    "description": service.heroSubtitle,
    "areaServed": "Rohtak, Haryana"
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>{service.title} | Arjun Buildtech Rohtak</title>
        <meta name="description" content={service.heroSubtitle} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${service.image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]"></div>
        
        <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wider uppercase backdrop-blur-md">
            Arjun Buildtech Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {service.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {service.heroSubtitle}
          </p>
          <button 
            onClick={() => setIsPopupOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center gap-2 mx-auto"
          >
            <PhoneCall className="w-5 h-5" />
            Get Free Consultation
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{service.title}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
            <div className="prose prose-lg text-gray-600 space-y-6">
              {service.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* FAQs */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-2">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Fill out the form below and our real estate experts will contact you shortly.
              </p>
              
              <button 
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold transition shadow-md flex justify-center items-center gap-2"
              >
                Inquire Now
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Or call us directly:</p>
                <a href="tel:+919350447531" className="text-xl font-bold text-red-600 hover:text-red-800 transition">
                  +91 93504-47531
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <InquiryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default ServicePage;
