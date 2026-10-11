import React from "react";

const SupportHelpWidgets = () => {
  const handleOpenCallback = () => {
    window.dispatchEvent(new CustomEvent("open-callback-modal"));
  };

  const handleScrollToFaq = () => {
    const faqElement = document.getElementById("faq-section");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/help-center";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 my-6 md:my-8 font-site">
      {/* Widget 1: Request a Callback (Matches User Design) */}
      <div className="bg-[#FFF5F5] border border-rose-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          {/* Sales Specialist Avatar with Headset */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full bg-white border border-rose-200 shadow-2xs flex items-center justify-center p-1.5">
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <circle cx="8" cy="12" r="1.5" fill="#fca5a5" />
                <circle cx="40" cy="14" r="1.5" fill="#fca5a5" />
                <circle cx="10" cy="38" r="1.5" fill="#fca5a5" />

                {/* Headset */}
                <path
                  d="M12 24 C12 14, 36 14, 36 24"
                  stroke="#475569"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <rect x="10" y="22" width="4" height="7" rx="2" fill="#d8232a" />
                <rect x="34" y="22" width="4" height="7" rx="2" fill="#d8232a" />
                <path
                  d="M36 26 C36 32, 28 34, 24 34"
                  stroke="#475569"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="23" cy="34" r="2" fill="#d8232a" />

                {/* Specialist Avatar Face */}
                <circle cx="24" cy="22" r="8" fill="#fed7aa" />
                {/* Hair */}
                <path
                  d="M16 20 C16 15, 20 14, 24 14 C28 14, 32 15, 32 20"
                  fill="#991b1b"
                />
                {/* Shirt / Tie */}
                <path
                  d="M15 36 C15 30, 20 30, 24 30 C28 30, 33 30, 33 36 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                <polygon points="24,30 22,34 24,37 26,34" fill="#d8232a" />
              </svg>
            </div>
          </div>

          {/* Text Copy */}
          <div className="text-left">
            <p className="text-[13px] sm:text-sm text-gray-800 leading-snug">
              Confused about which{" "}
              <strong className="text-gray-900 font-bold">
                Property or Plot
              </strong>{" "}
              to buy?
            </p>
            <p className="text-xs text-gray-600 mt-1 leading-normal">
              Our{" "}
              <strong className="text-gray-900 font-bold">
                Property Specialist will help
              </strong>{" "}
              you with the best choice
            </p>
          </div>
        </div>

        {/* Action Button: Opens the Universal Red Modal */}
        <button
          type="button"
          onClick={handleOpenCallback}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#d8232a] hover:bg-[#b71c1c] active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm whitespace-nowrap transition-all shrink-0 cursor-pointer text-center">
          Request a Callback
        </button>
      </div>

      {/* Widget 2: Have a Question / FAQ (Matches User Design) */}
      <div className="bg-[#374151] border border-gray-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-shadow text-white">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          {/* Question Speech Bubbles Graphic */}
          <div className="w-14 h-14 rounded-full bg-gray-800/60 border border-gray-600/50 flex items-center justify-center p-1.5 shrink-0">
            <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
              <path
                d="M12 28 C7 28, 5 24, 5 19 C5 14, 11 11, 18 11 C24 11, 28 14, 28 19 C28 22, 26 24, 23 26 L23 29 L19 28 Z"
                fill="#ea580c"
              />
              <text
                x="16"
                y="21"
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
                fontFamily="sans-serif">
                ?
              </text>

              <path
                d="M30 14 C25 14, 22 17, 22 21 C22 24, 24 26, 27 27 L26 30 L29 28 C33 28, 37 25, 37 21 C37 17, 34 14, 30 14 Z"
                fill="#f59e0b"
              />
              <text
                x="28"
                y="22"
                fill="#1e293b"
                fontSize="8"
                fontWeight="bold"
                fontFamily="sans-serif">
                ?
              </text>

              <path
                d="M26 38 C20 38, 17 35, 17 31 C17 28, 20 25, 25 25 C31 25, 35 28, 35 31 C35 33, 34 35, 32 36 L33 39 L29 38 Z"
                fill="#fbbf24"
              />
              <text
                x="25"
                y="33"
                fill="#1e293b"
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif">
                ?
              </text>
            </svg>
          </div>

          {/* Text Copy */}
          <div className="text-left">
            <h4 className="text-[14px] sm:text-[15px] font-extrabold uppercase tracking-wider text-white leading-tight">
              HAVE A QUESTION?
            </h4>
            <p className="text-xs text-gray-300 mt-1 leading-normal">
              See if we have already answered it.
            </p>
          </div>
        </div>

        {/* Action Button: Scrolls to FAQ section */}
        <button
          type="button"
          onClick={handleScrollToFaq}
          className="w-full sm:w-auto px-5 py-2 bg-white hover:bg-gray-100 active:scale-[0.99] text-gray-900 text-xs sm:text-sm font-bold rounded-md shadow-sm whitespace-nowrap transition-all shrink-0 cursor-pointer text-center">
          Show Me
        </button>
      </div>
    </div>
  );
};

export default SupportHelpWidgets;
