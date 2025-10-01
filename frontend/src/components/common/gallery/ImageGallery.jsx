import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageGallery = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative md:rounded-2xl overflow-hidden shadow-lg">
      <img
        src={images[current]}
        alt={`Property Image ${current + 1}`}
        className="w-full h-80 md:h-[400px] lg:h-[500px] object-cover"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg">
        <FaChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg">
        <FaChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      <div className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageGallery;
