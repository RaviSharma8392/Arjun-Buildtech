import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import { blogs } from "../../data/blogs";
import SidebarWidgets from "../../components/common/info/SidebarWidgets";

const EmiCalculatorPage = () => {
  const { t } = useLanguage();
  
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [emi, setEmi] = useState("");

  const calculateEmi = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanPeriod) * 12;

    if (P && R && N) {
      const calculatedEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEmi(Math.round(calculatedEmi).toString());
    } else {
      setEmi("");
    }
  };

  const clearFields = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanPeriod("");
    setEmi("");
  };

  // Mock data for Hot Properties sidebar (we can fetch from db if needed, but keeping it simple as per image layout)
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
        <title>{t("emiCalc.pageTitle", "Home Loan EMI Calculator | Arjun Buildtech")}</title>
        <meta
          name="description"
          content="Calculate your home loan EMI instantly with the Arjun Buildtech EMI Calculator. होम लोन ईएमआई कैलकुलेटर का उपयोग करें।"
        />
        <meta
          name="keywords"
          content="emi calculator, home loan calculator, property emi, Arjun Buildtech, ईएमआई कैलकुलेटर, होम लोन"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Main Calculator Content */}
        <div className="md:col-span-3">
          <h1 className="text-3xl text-gray-800 mb-6 font-serif">
            {t("emiCalc.title", "EMI Calculator")}
          </h1>
          
          <div className="bg-[#f5f5f5] p-2 mb-6 text-sm text-gray-700">
            {t("emiCalc.title", "EMI Calculator")}
          </div>

          <div className="border border-gray-300">
            {/* Table Header */}
            <div className="bg-[#2c2c2c] text-white p-3 font-bold">
              {t("emiCalc.title", "EMI Calculator")}
            </div>
            
            {/* Table Body */}
            <div className="bg-[#f9f9f9]">
              
              {/* Row 1 */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-4 flex items-center justify-end text-sm text-gray-700 font-medium border-r border-gray-200">
                  {t("emiCalc.loanAmount", "Loan Amount (Rs.)")}
                </div>
                <div className="p-3 bg-white">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-4 flex items-center justify-end text-sm text-gray-700 font-medium border-r border-gray-200">
                  {t("emiCalc.interestRate", "Interest Rate (%)")}
                </div>
                <div className="p-3 bg-white">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-4 flex items-center justify-end text-sm text-gray-700 font-medium border-r border-gray-200">
                  {t("emiCalc.loanPeriod", "Loan Period (Yrs)")}
                </div>
                <div className="p-3 bg-white">
                  <input
                    type="number"
                    value={loanPeriod}
                    onChange={(e) => setLoanPeriod(e.target.value)}
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {/* Row 4 (EMI Result) */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-4 flex items-center justify-end text-sm text-gray-700 font-medium border-r border-gray-200">
                  {t("emiCalc.emi", "Equated Monthly Installment(EMI)")}
                </div>
                <div className="p-3 bg-white">
                  <input
                    type="text"
                    readOnly
                    value={emi}
                    className="w-full max-w-[200px] border border-gray-300 p-1.5 bg-gray-50 text-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Buttons Row */}
              <div className="grid grid-cols-2">
                <div className="p-4 border-r border-gray-200"></div>
                <div className="p-4 bg-white flex gap-2">
                  <button 
                    onClick={calculateEmi}
                    className="bg-[#d9534f] text-white px-5 py-1.5 text-sm font-semibold hover:bg-[#c9302c] transition-colors"
                  >
                    {t("emiCalc.calculate", "Calculate")}
                  </button>
                  <button 
                    onClick={clearFields}
                    className="bg-[#d9534f] text-white px-5 py-1.5 text-sm font-semibold hover:bg-[#c9302c] transition-colors"
                  >
                    {t("emiCalc.clear", "Clear")}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Usage Guide Section */}
          <div className="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              {t("emiCalc.guideTitle", "How to use this EMI Calculator?")}
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-blue-800 text-sm">
              <li>{t("emiCalc.guide1", "Enter the total Loan Amount you wish to borrow in Rupees.")}</li>
              <li>{t("emiCalc.guide2", "Enter the applicable Interest Rate (annual percentage).")}</li>
              <li>{t("emiCalc.guide3", "Enter the Loan Period or tenure in Years.")}</li>
              <li>{t("emiCalc.guide4", "Click on the 'Calculate' button to see your estimated Equated Monthly Installment (EMI).")}</li>
              <li>{t("emiCalc.guide5", "Use the 'Clear' button to reset the calculator and try different values.")}</li>
            </ul>
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

export default EmiCalculatorPage;
