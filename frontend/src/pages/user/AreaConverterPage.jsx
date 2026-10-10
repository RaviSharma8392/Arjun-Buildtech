import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import { blogs } from "../../data/blogs";
import SidebarWidgets from "../../components/common/info/SidebarWidgets";

const AreaConverterPage = () => {
  const { t } = useLanguage();
  
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Square Meters");
  const [result, setResult] = useState("");

  const conversionRatesToSqFt = {
    "Square Meters": 10.7639,
    "Square Yards": 9,
    "Acres": 43560,
    "Hectares": 107639,
    "Square Feets": 1,
    "Square Feet": 1,
    "Bigha": 27225, // Assuming standard Bigha, though it varies.
  };

  const calculateArea = () => {
    const val = parseFloat(inputValue);
    if (!isNaN(val) && conversionRatesToSqFt[fromUnit]) {
      const converted = val * conversionRatesToSqFt[fromUnit];
      // Format to 2 decimal places if needed
      setResult(converted.toFixed(2).replace(/\.00$/, '')); 
    } else {
      setResult("");
    }
  };

  const clearFields = () => {
    setInputValue("");
    setFromUnit("Square Meters");
    setResult("");
  };

  const hotProperties = [
    "Factory / Industrial Building for Sale in M.I.E., Bahadurgarh",
    "Industrial Land / Plot for Sale in Bahadurgarh Bypass, Bahadurgarh",
    "Industrial Land / Plot for Sale in Bahadurgarh Bypass, Bahadurgarh",
    "Industrial Land / Plot for Sale in Bahadurgarh Bypass, Bahadurgarh",
    "2500 Sq. Yards Commercial Lands /Inst. Land for Sale in Bahadurgarh, Jhajjar",
    "Industrial Land / Plot for Sale in Bahadurgarh Bypass, Bahadurgarh",
    "Industrial Land / Plot for Sale in Bahadurgarh Bypass, Bahadurgarh",
    "Industrial Land / Plot for Sale in Kharkhoda, Sonipat",
  ];

  return (
    <div className="min-h-screen bg-white py-10">
      <Helmet>
        <title>{t("areaCalc.pageTitle", "Area Converter | Arjun Buildtech")}</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Main Calculator Content */}
        <div className="md:col-span-3">
          <h1 className="text-3xl text-gray-800 mb-6 font-serif">
            {t("areaCalc.title", "Area Converter")}
          </h1>
          
          <div className="bg-[#f5f5f5] p-2 mb-6 text-sm text-gray-700">
            {t("areaCalc.title", "Area Converter")}
          </div>

          <div className="border border-gray-300">
            {/* Table Header */}
            <div className="bg-[#2c2c2c] text-white p-3 font-bold">
              {t("areaCalc.header", "Area Conversion to Square Feets")}
            </div>
            
            {/* Table Body */}
            <div className="bg-[#f9f9f9]">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                <div className="p-4 flex items-center md:justify-end text-sm text-gray-700 font-medium border-b md:border-b-0 md:border-r border-gray-200">
                  {t("areaCalc.enterArea", "Enter Area :")}
                </div>
                <div className="p-3 bg-white">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="0"
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                <div className="p-4 flex items-center md:justify-end text-sm text-gray-700 font-medium border-b md:border-b-0 md:border-r border-gray-200">
                  {t("areaCalc.selectUnit", "Select Unit :")}
                </div>
                <div className="p-3 bg-white">
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 focus:outline-none focus:border-gray-500 text-gray-700 bg-white"
                  >
                    {Object.keys(conversionRatesToSqFt).filter(k => k !== "Square Feet").map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 (Result) */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 hidden md:block"></div>
                <div className="p-3 bg-white flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={result}
                    placeholder="0"
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 bg-white text-gray-800 focus:outline-none"
                  />
                  <span className="text-sm text-gray-700 font-medium">{t("areaCalc.sqFeets", "Sq. feets")}</span>
                </div>
              </div>

              {/* Buttons Row */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 border-r border-gray-200 hidden md:block"></div>
                <div className="p-4 bg-white flex gap-2">
                  <button 
                    onClick={calculateArea}
                    className="bg-[#d9534f] text-white px-5 py-1.5 text-sm font-semibold hover:bg-[#c9302c] transition-colors"
                  >
                    {t("areaCalc.calculate", "Calculate")}
                  </button>
                  <button 
                    onClick={clearFields}
                    className="bg-[#d9534f] text-white px-5 py-1.5 text-sm font-semibold hover:bg-[#c9302c] transition-colors"
                  >
                    {t("areaCalc.clear", "Clear")}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Sidebar: Recent News */}
        <div className="md:col-span-1">
          <SidebarWidgets />
        </div>

      </div>
    </div>
  );
};

export default AreaConverterPage;
