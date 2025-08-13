"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

// Define the type for a single project object
interface Project {
  srNo: number;
  title: string;
  content: string;
  imageSrc: string;
}

const projects: Project[] = [
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isWheeling, setIsWheeling] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(handleNext, 5000);
    return () => resetTimeout();
  }, [currentIndex, handleNext]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isWheeling) return;
    if (e.deltaY > 50) {
      handleNext();
      setIsWheeling(true);
    } else if (e.deltaY < -50) {
      handlePrev();
      setIsWheeling(true);
    }
    setTimeout(() => setIsWheeling(false), 800);
  };

  const handleDragEnd = (
    _event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;
    const swipePower = Math.abs(info.velocity.x) * 0.1;
    if (info.offset.x < -swipeThreshold || swipePower > 50) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || swipePower > 50) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative h-[480px] sm:h-[540px] w-full flex justify-center items-center overflow-hidden px-[5%]"
      onWheel={handleWheel}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2"
        aria-label="Previous Project"
      >
        <FaRegArrowAltCircleLeft size={24} color="#fff" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2"
        aria-label="Next Project"
      >
        <FaRegArrowAltCircleRight size={24} color="#fff" />
      </button>

      {/* Cards Container */}
      <motion.div
        className="relative w-full sm:w-[950px] h-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project, index) => {
          const relativeIndex =
            (index - currentIndex + projects.length) % projects.length;
          const zIndex = projects.length - relativeIndex;
          const isBehind =
            relativeIndex > 0 && relativeIndex <= projects.length / 2;

          let x = 0;
          let scale = 1;
          let opacity = 1;

          if (relativeIndex !== 0) {
            x =
              (isBehind ? 1 : -1) *
              40 *
              Math.min(relativeIndex, projects.length - relativeIndex);
            scale =
              1 -
              0.05 * Math.min(relativeIndex, projects.length - relativeIndex);
            opacity = 0.4;
          }

          return (
            <motion.div
              key={project.srNo}
              className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-2xl bg-white flex flex-col sm:flex-row cursor-grab active:cursor-grabbing"
              style={{ originX: 0.5, originY: 0.5 }}
              initial={false}
              animate={{
                x,
                scale,
                zIndex,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Card Content */}
              <div className="w-full sm:w-1/2 p-4 sm:p-10 flex flex-col justify-around space-y-2 sm:space-y-4">
                <div className="text-[28px] sm:text-[42px] font-chronicle text-[#111]">
                  {project.srNo}
                </div>
                <div className="text-[20px] sm:text-[32px] font-chronicle text-[#444]">
                  {project.title}
                </div>
                <p className="text-[#777] italic font-lato text-sm sm:text-[16px]">
                  {project.content}
                </p>
                <button className="mt-2 sm:mt-4 px-5 sm:px-6 text-[15px] font-lato italic py-1.5 sm:py-2 rounded bg-gradient-to-r from-[#236FC7] to-[#E30615] text-white text-xs sm:text-sm w-max">
                  Learn More
                </button>
              </div>
              <div className="w-full sm:w-1/2 h-[180px] sm:h-full">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  draggable="false"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
