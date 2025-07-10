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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="relative h-[360px] sm:h-[540px] w-full flex justify-center items-center overflow-x-visible px-[5%]">
      <div className="relative w-[120%] sm:w-[950px] h-[360px] sm:h-[540px]">
        {projects.map((project, index) => {
          const relativeIndex =
            (index - currentIndex + projects.length) % projects.length;
          const isActive = index === currentIndex;
          const zIndex = projects.length - relativeIndex;
          const offsetX = relativeIndex * 40; // Increased offset for mobile overflow
          const scale = 1 - relativeIndex * 0.03;
          const opacity = relativeIndex === 0 ? 1 : 0.5;

          return (
            <motion.div
              key={project.srNo}
              className="absolute top-0 left-0 w-[90%] sm:w-full h-full rounded-xl overflow-hidden shadow-2xl bg-white flex flex-col sm:flex-row"
              style={{
                zIndex,
                transform: `translateX(${offsetX}px) scale(${scale})`,
                opacity,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity,
                x: offsetX,
                scale,
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
                <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-[#7864f8] text-white text-xs sm:text-sm w-max">
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
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-[5%] top-1/2 transform -translate-y-1/2 text-white"
      >
        <FaRegArrowAltCircleLeft size={20} className="sm:w-[24px]" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-[5%] top-1/2 transform -translate-y-1/2 text-white"
      >
        <FaRegArrowAltCircleRight size={20} className="sm:w-[24px]" />
      </button>
    </div>
  );
}
