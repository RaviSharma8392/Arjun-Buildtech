import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Calculator, Landmark, Paintbrush, TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";

const AdviceAndTools = () => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef(null);

  const tools = [
    {
      id: "emi",
      icon: <Calculator className="w-7 h-7 text-gray-800" />,
      title: t("tools.emiTitle", "EMI Calculator"),
      desc: t("tools.emiDesc", "Know how much you'll have to pay every month on your loan"),
      link: "/emi-calculator",
    },
    {
      id: "homeloan",
      icon: <Landmark className="w-7 h-7 text-gray-800" />,
      title: t("tools.homeLoanTitle", "Best Home Loan Offers"),
      desc: t("tools.homeLoanDesc", "Get the best bank offers curated just for your profile"),
      link: "/contact", // Placeholder link
    },
    {
      id: "interiors",
      icon: <Paintbrush className="w-7 h-7 text-gray-800" />,
      title: t("tools.interiorsTitle", "Interiors Budget Estimator"),
      desc: t("tools.interiorsDesc", "Know the cost of getting your full/partial home interiors done"),
      link: "/contact", // Placeholder link
    },
    {
      id: "rates",
      icon: <TrendingUp className="w-7 h-7 text-gray-800" />,
      title: t("tools.ratesTitle", "Rates & Trends"),
      desc: t("tools.ratesDesc", "Know all about Property Rates & Trends in your city"),
      link: "/contact", // Placeholder link
    },
    {
      id: "area",
      icon: <Calculator className="w-7 h-7 text-gray-800" />, // Can reuse calculator or use an icon like Maximize
      title: t("areaCalc.title", "Area Converter"),
      desc: t("tools.areaDesc", "Easily convert land area into Square Feet from multiple units"),
      link: "/area-converter",
    },
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-normal text-gray-800">
          {t("tools.title", "Advice & Tools")}
        </h2>
        <div className="w-10 h-1 bg-[#00bcd4] mt-2"></div>
      </div>

      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              className="flex-none w-[280px] md:w-[300px] bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow snap-start"
            >
              <div>
                <div className="mb-4">
                  {tool.icon}
                </div>
                <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {tool.desc}
                </p>
              </div>
              <div>
                <Link 
                  to={tool.link} 
                  className="inline-flex items-center text-[#d9534f] text-[15px] font-medium hover:text-[#c9302c] transition-colors"
                >
                  {t("tools.viewNow", "View now")} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom scroll right button (visible on hover on desktop) */}
        <button 
          onClick={scrollRight}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md items-center justify-center text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Scroll right"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default AdviceAndTools;
