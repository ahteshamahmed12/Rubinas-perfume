"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const images = [
  { src: "/pic1.png", alt: "Premium Oud Fragrance Bottle" },
  { src: "/pic3.png", alt: "Elegant Perfume Packaging Showcase" },
  { src: "/pic4.png", alt: "Exclusive Signature Scent" },
  { src: "/pic5.png", alt: "Exclusive Signature Scent" },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section
      aria-label="Fragrance Store Featured Banners"
      className="w-full max-w-6xl mx-auto mt-6 relative overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ aspectRatio: "16 / 9" }} // maintain aspect ratio on all screens
    >
      {/* Sliding container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full relative"
            style={{ width: `${100 / images.length}%` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              index === current ? "bg-white" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
