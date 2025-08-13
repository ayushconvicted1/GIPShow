"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const projects = [
  {
    srNo: 1,
    title: "The Skyline Royale",
    content:
      "A stunning 6,000 sq. ft. penthouse with panoramic views of Central Park. Features a private rooftop pool, smart automation, and marble-clad interiors.",
    imageSrc: "/Project1Image.png",
  },
  {
    srNo: 2,
    title: "The Horizon Estate",
    content:
      "An elegant 5-bedroom residence with sweeping ocean views, featuring private beach access, infinity pool, and contemporary architecture.",
    imageSrc: "/Project2Image.png",
  },
  {
    srNo: 3,
    title: "The Grand Vista",
    content:
      "A luxury retreat nestled in the hills with 360-degree views, spa facilities, and eco-conscious design elements.",
    imageSrc: "/Project3Image.png",
  },
  {
    srNo: 4,
    title: "The Celestial Heights",
    content:
      "Towering above the city skyline, this project offers a sky lounge, vertical gardens, and high-tech amenities.",
    imageSrc: "/Project4Image.png",
  },
];

export default function FocusProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    // Resetting interval on manual navigation
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-[360px] sm:h-[540px] w-full flex justify-center items-center overflow-x-visible px-[5%]">
      {/* Left Arrow Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full"
        aria-label="Previous Project"
      >
        <div className="hidden sm:flex items-center">
          <FaRegArrowAltCircleLeft size={24} color="#fff" />
        </div>
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full"
        aria-label="Next Project"
      >
        <div className="hidden sm:flex items-center">
          <FaRegArrowAltCircleRight size={24} color="#fff" />
        </div>
      </button>

      <div className="relative w-[120%] sm:w-[950px] h-[360px] sm:h-[540px]">
        {projects.map((project, index) => {
          const relativeIndex =
            (index - currentIndex + projects.length) % projects.length;
          const isActive = index === currentIndex;
          const zIndex = projects.length - relativeIndex;
          const offsetX = relativeIndex * 40;
          const scale = 1 - relativeIndex * 0.03;
          const blur = relativeIndex === 0 ? "blur(0)" : "blur(4px)";
          const brightness =
            relativeIndex === 0 ? "brightness(1)" : "brightness(0.8)";

          return (
            <motion.div
              key={project.srNo}
              className="absolute top-0 left-0 w-[90%] sm:w-full h-full rounded-xl overflow-hidden shadow-2xl bg-white flex flex-col sm:flex-row"
              style={{
                zIndex,
                transform: `translateX(${offsetX}px) scale(${scale})`,
                filter: `${blur} ${brightness}`,
              }}
              initial={{
                opacity: 0,
                x: 100,
                filter: "blur(4px) brightness(0.8)",
              }}
              animate={{
                opacity: 1,
                x: offsetX,
                scale,
                filter: `${blur} ${brightness}`,
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Left Text Section */}
              <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col justify-around space-y-3 sm:space-y-4">
                <div className="text-[28px] sm:text-[42px] font-chronicle text-[#111]">
                  {project.srNo}
                </div>
                <div className="text-[24px] sm:text-[32px] font-chronicle text-[#444]">
                  {project.title}
                </div>
                <p className="text-[#777] italic font-lato text-sm sm:text-[16px]">
                  {project.content}
                </p>
                <button className="mt-3 sm:mt-4 px-5 sm:px-6 text-[15px] font-lato italic py-1.5 sm:py-2 rounded bg-gradient-to-r from-[#236FC7] to-[#E30615] text-white text-xs sm:text-sm w-max">
                  Learn More
                </button>
              </div>

              {/* Right Image */}
              <div className="w-full sm:w-1/2 h-[200px] sm:h-full">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
