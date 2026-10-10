import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButtons = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show 'Scroll to Top' if scrolled down a bit
      if (scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }

      // Show 'Scroll to Bottom' if not at the very bottom
      if (scrollY + windowHeight < documentHeight - 100) {
        setShowBottom(true);
      } else {
        setShowBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9000] flex flex-col gap-3">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 flex items-center justify-center border border-gray-600"
          title="Scroll to Top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 flex items-center justify-center border border-gray-600"
          title="Scroll to Bottom"
        >
          <FaArrowDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;
