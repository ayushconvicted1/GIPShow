"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.6"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["75px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // ✨ FIX: Added `w-full` to ensure the container takes up the full width
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`w-full ${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
