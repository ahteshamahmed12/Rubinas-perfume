"use client";
import React from "react";

const Topheader = () => {
  return (
    <div className="w-full bg-black text-white overflow-hidden py-2 md:py-3">
      <div className="relative w-full h-6 md:h-8 flex items-center">
        <div
          className="absolute whitespace-nowrap animate-marquee"
          style={{ willChange: "transform" }}
        >
          <span className="text-sm md:text-lg font-semibold text-gray-300">
            RUBINA FRAGRANCE STORE, YOUR DESTINATION FOR PREMIUM FRAGRANCE – AUTHENTIC, CURATED, AND UNFORGETTABLE. SHOP WITH CONFIDENCE.
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 19s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Topheader;
