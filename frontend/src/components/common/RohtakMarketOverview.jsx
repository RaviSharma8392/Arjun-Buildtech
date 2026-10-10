import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  TrendingUp,
  MapPin,
  GraduationCap,
  Car,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "../../context/useLanguage";

const RohtakMarketOverview = () => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const isHindi = language === "hi";

  const keyHighlights = [
    {
      icon: Car,
      title: isHindi
        ? "सड़क और स्थानीय कनेक्टिविटी"
        : "Road Access & Local Routes",
      desc: isHindi
        ? "रोहतक से जुड़े मार्गों और अपनी रोज़मर्रा की यात्रा के अनुसार लोकेशन की तुलना करें।"
        : "Compare locations against the routes you use and check current travel conditions before visiting.",
    },
    {
      icon: GraduationCap,
      title: isHindi
        ? "शिक्षा और स्वास्थ्य सुविधाएँ"
        : "Education & Healthcare",
      desc: isHindi
        ? "MDU, IIM रोहतक और PGIMS जैसे संस्थानों के लिए संपत्ति से वास्तविक दूरी जाँचें।"
        : "Check the actual distance from a property to institutions such as MDU, IIM Rohtak and PGIMS.",
    },
    {
      icon: Building2,
      title: isHindi ? "स्थानीय रोजगार केंद्र" : "Local Employment Hubs",
      desc: isHindi
        ? "IMT रोहतक शहर के औद्योगिक केंद्रों में से एक है; वर्तमान जानकारी आधिकारिक स्रोतों से जाँचें।"
        : "IMT Rohtak is one of the city’s industrial hubs; confirm current project details with official sources.",
    },
    {
      icon: TrendingUp,
      title: isHindi ? "खरीद से पहले तुलना करें" : "Compare Before You Buy",
      desc: isHindi
        ? "कीमत, संपत्ति का उपयोग, दस्तावेज़, पहुँच और रखरखाव लागत को साथ में देखें।"
        : "Compare asking price, intended use, documents, access and ongoing costs. Future returns are not guaranteed.",
    },
    {
      icon: MapPin,
      title: isHindi ? "रोहतक की संपत्ति सूची" : "Rohtak Property Listings",
      desc: isHindi
        ? "उपलब्ध प्लॉट, घर और व्यावसायिक संपत्तियों के लिए वर्तमान लिस्टिंग देखें।"
        : "Browse current residential plot, home and commercial listings, as availability can change.",
    },
    {
      icon: ShieldCheck,
      title: isHindi ? "दस्तावेज़ों की जाँच" : "Review Property Documents",
      desc: isHindi
        ? "स्वामित्व, भूमि उपयोग, बकाया और स्वीकृतियों से जुड़े दस्तावेज़ स्वतंत्र रूप से जाँचें।"
        : "Review ownership, land use, dues and approvals; consider independent legal advice before purchase.",
    },
  ];

  const popularSearches = [
    {
      label: isHindi ? "सेक्टर 27 में संपत्ति" : "Properties in Sector 27",
      path: "/properties?location=Sector-27",
    },
    {
      label: isHindi ? "सनसिटी रोहतक में संपत्ति" : "Properties in Suncity",
      path: "/properties?location=Suncity",
    },
    {
      label: isHindi ? "रोहतक की सभी संपत्तियाँ" : "All Rohtak Properties",
      path: "/properties/Rohtak",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="site-container font-sans">
        {/* Main Section Heading matching screenshot */}
        <div className="text-center mb-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#8B2323] mb-4 tracking-tight">
            {isHindi
              ? "रोहतक (हरियाणा) रियल एस्टेट मार्केट का एक अवलोकन"
              : "An Overview of the Rohtak Real Estate Market"}
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded mb-6"></div>

          {/* Primary Lead SEO Paragraph */}
          <p className="text-[15px] sm:text-[16px] text-gray-700 leading-relaxed">
            {isHindi ? (
              <>
                हरियाणा में स्थित <strong>रोहतक</strong> आवासीय और व्यावसायिक
                संपत्ति के अलग-अलग विकल्पों वाला शहर है। संपत्ति चुनते समय अपने
                रोज़मर्रा के मार्ग, आसपास की सुविधाएँ, उपयोग की ज़रूरत और
                दस्तावेज़ों को साथ में देखें।
              </>
            ) : (
              <>
                <strong>Rohtak</strong> is a city in Haryana with residential
                and commercial property options across different localities.
                When comparing a property, consider your daily routes, nearby
                facilities, intended use and the documents available for review.
              </>
            )}
          </p>
        </div>

        {/* 6 Key Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {keyHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-gray-50/80 hover:bg-white rounded-xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4">
                <div className="bg-red-50 text-red-600 p-2.5 rounded-lg shrink-0 border border-red-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extended In-Depth SEO Overview (Collapsible / Clean) */}
        <div className="bg-[#FAF8F8] border border-gray-200/80 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="prose max-w-none text-gray-700 text-[14px] sm:text-[15px] leading-relaxed space-y-4">
            <p>
              {isHindi ? (
                <>
                  रोहतक में उपलब्ध संपत्तियों में रिहायशी प्लॉट, घर और
                  व्यावसायिक विकल्प शामिल हो सकते हैं। <strong>HSVP</strong> या{" "}
                  <strong>Suncity</strong> जैसे क्षेत्र देखते समय हर लिस्टिंग का
                  सटीक स्थान, उपलब्ध सुविधाएँ और दस्तावेज़ अलग-अलग जाँचें।
                </>
              ) : (
                <>
                  Rohtak listings can include residential plots, homes and
                  commercial options. When considering areas such as{" "}
                  <strong>HSVP</strong> or <strong>Suncity</strong>, check the
                  exact location, available facilities and documents for each
                  property individually.
                </>
              )}
            </p>

            {isExpanded && (
              <div className="space-y-4 pt-2 border-t border-gray-200 animate-in fade-in duration-300">
                <p>
                  {isHindi ? (
                    <>
                      <strong>स्थानीय रोजगार और सेवाएँ:</strong>{" "}
                      <strong>IMT Rohtak</strong> शहर के औद्योगिक क्षेत्रों में
                      से एक है। वर्तमान परियोजनाओं और सुविधाओं के बारे में
                      निर्णय लेने से पहले आधिकारिक स्रोतों से जानकारी जाँचें।
                    </>
                  ) : (
                    <>
                      <strong>Local employment and services:</strong>{" "}
                      <strong>IMT Rohtak</strong> is one of the city’s
                      industrial areas. Check official sources for current
                      projects and facilities rather than assuming a particular
                      effect on rents or property values.
                    </>
                  )}
                </p>
                <p>
                  {isHindi ? (
                    <>
                      <strong>खरीद से पहले की जाँच:</strong> स्वामित्व, भूमि
                      उपयोग, स्वीकृतियाँ, बकाया और रजिस्ट्री प्रक्रिया से जुड़े
                      दस्तावेज़ ध्यान से देखें। ज़रूरत पड़ने पर स्वतंत्र कानूनी
                      सलाह लें।
                    </>
                  ) : (
                    <>
                      <strong>Buying checklist:</strong> Review ownership, land
                      use, approvals, dues and registry requirements before
                      proceeding. Independent legal advice can help you assess
                      documents for a specific property.
                    </>
                  )}
                </p>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                {isExpanded ? (
                  <>
                    {isHindi ? "कम पढ़ें" : "Show Less"}{" "}
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    {isHindi ? "विस्तार से पढ़ें" : "Read Full Market Overview"}{" "}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Popular SEO Search Direct Links / Tags */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">
            {isHindi
              ? "रोहतक में लोकप्रिय रियल एस्टेट खोजें"
              : "Popular Real Estate Searches in Rohtak"}
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, i) => (
              <Link
                key={i}
                to={search.path}
                className="text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors">
                {search.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RohtakMarketOverview;
