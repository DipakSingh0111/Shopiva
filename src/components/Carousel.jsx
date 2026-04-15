import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // 🔥 Fetch Data
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => setSlides(data.products));
  }, []);

  // 🔥 Auto Slide
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">

      {/* ✅ HD Image Fix */}
      <img
        src={slides[current].images?.[0] || slides[current].thumbnail}
        alt="slider"
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* 🔥 Content */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16">

        <div
          key={current}
          className="text-white max-w-xl space-y-5 animate-slideUp"
        >

          {/* Badge */}
          <span className="inline-block px-4 py-1 text-xs rounded-full 
          bg-gradient-to-r from-pink-500 to-purple-500">
            🔥 Trending
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {slides[current].title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-lg">
            {slides[current].description?.slice(0, 100)}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            <button className="px-6 py-3 rounded-full text-sm font-semibold 
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
            hover:scale-105 transition-all duration-300 shadow-lg">
              Shop Now
            </button>

            <button className="px-6 py-3 rounded-full text-sm border border-white/40 
            hover:bg-white/10 transition">
              Explore
            </button>

          </div>
        </div>
      </div>

      {/* 🔥 Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 
            ${
              current === index
                ? "w-6 bg-gradient-to-r from-pink-500 to-purple-500"
                : "w-2 bg-white/50"
            }`}
          ></div>
        ))}

      </div>

    </div>
  );
};

export default Carousel;