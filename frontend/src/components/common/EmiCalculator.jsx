import React, { useState } from "react";
import { Calculator, PieChart } from "lucide-react";

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;

    if (p === 0 || r === 0 || n === 0) return 0;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * (loanTenure * 12);
  const totalInterest = totalAmount - loanAmount;

  // Calculate percentages for the visual bar
  const principalPercentage =
    totalAmount > 0 ? (loanAmount / totalAmount) * 100 : 0;
  const interestPercentage =
    totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <section className="py-12 md:py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
            <Calculator size={18} />
            <span>Financial Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Home Loan EMI Calculator
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Plan your property investment effortlessly. Adjust the sliders below
            to estimate your monthly mortgage payments.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Sliders (Interactive Area) */}
          <div className="flex-1 p-6 md:p-10 lg:p-12">
            {/* Loan Amount Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="font-semibold text-gray-700 text-sm md:text-base">
                  Loan Amount
                </label>
                <div className="bg-gray-50 px-4 py-2 rounded-xl font-bold text-gray-900 border border-gray-200 text-lg">
                  ₹ {loanAmount.toLocaleString("en-IN")}
                </div>
              </div>
              <input
                type="range"
                min="500000"
                max="50000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-700 transition-all"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                <span>₹ 5L</span>
                <span>₹ 5Cr</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="font-semibold text-gray-700 text-sm md:text-base">
                  Interest Rate (p.a.)
                </label>
                <div className="bg-gray-50 px-4 py-2 rounded-xl font-bold text-gray-900 border border-gray-200 text-lg">
                  {interestRate}%
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-700 transition-all"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                <span>5%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-4">
                <label className="font-semibold text-gray-700 text-sm md:text-base">
                  Loan Tenure
                </label>
                <div className="bg-gray-50 px-4 py-2 rounded-xl font-bold text-gray-900 border border-gray-200 text-lg">
                  {loanTenure} Years
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-700 transition-all"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                <span>1 Yr</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Right Side: Results (Summary Area) */}
          <div className="w-full lg:w-[400px] bg-slate-900 text-white p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full opacity-5 blur-[100px] pointer-events-none"></div>

            <p className="text-slate-400 text-sm font-semibold tracking-wide uppercase mb-2">
              Monthly EMI
            </p>
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-8 flex items-baseline gap-1">
              ₹ {emi.toLocaleString("en-IN")}
              <span className="text-lg md:text-xl font-medium text-slate-500">
                /mo
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                <span className="text-slate-400 text-sm md:text-base">
                  Principal Amount
                </span>
                <span className="font-bold text-lg text-white">
                  ₹ {loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                <span className="text-slate-400 text-sm md:text-base">
                  Total Interest
                </span>
                <span className="font-bold text-lg text-white">
                  ₹ {totalInterest.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-end pb-2">
                <span className="text-slate-400 text-sm md:text-base">
                  Total Payable
                </span>
                <span className="font-bold text-lg text-white">
                  ₹ {totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-300">
                <PieChart size={16} className="text-slate-400" />
                Breakdown
              </div>
              <div className="w-full h-3 rounded-full flex overflow-hidden bg-slate-800">
                <div
                  style={{ width: `${principalPercentage}%` }}
                  className="bg-emerald-400 transition-all duration-300"
                  title="Principal"></div>
                <div
                  style={{ width: `${interestPercentage}%` }}
                  className="bg-red-500 transition-all duration-300"
                  title="Interest"></div>
              </div>
              <div className="flex justify-between mt-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  Principal ({principalPercentage.toFixed(1)}%)
                </div>
                <div className="flex items-center gap-1.5 text-red-500">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Interest ({interestPercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmiCalculator;
