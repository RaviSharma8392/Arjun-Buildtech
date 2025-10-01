import { useState, useEffect } from "react";

export default function HeroBanner() {
  const images = [
    "https://shikharspaces.com/wp-content/uploads/2024/12/Screenshot-2024-12-27-130450-min-768x392.jpg",
    "https://d34mfkth6cubud.cloudfront.net/wp-content/uploads/2023/01/19112227/real-estate-negotiation-tips-_-Cover-19-1-23.jpg",
    "https://shikharspaces.com/wp-content/uploads/2024/12/Screenshot-2024-12-27-130450-min-768x392.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative mt-5 h-[80vh] md:h-[90vh] w-full overflow-hidden">
      {/* Image Slides */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: idx === currentIndex ? "scale(1.05)" : "scale(1)",
            transition: "transform 6s linear",
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-20"></div>

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-wide drop-shadow-2xl">
          Discover Your <span className="text-yellow-400">Perfect Space</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-white max-w-4xl mb-10 opacity-90 drop-shadow-lg">
          Explore the finest properties and innovative projects, crafted with
          precision and elegance.
        </p>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 border-white/80 ${
              idx === currentIndex
                ? "bg-yellow-400 w-5 h-3.5" // Active dot
                : "bg-white/40" // Inactive dot
            }`}></button>
        ))}
      </div>
    </section>
  );
}
