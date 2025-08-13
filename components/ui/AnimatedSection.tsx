"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  yOffset = 50,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  // Trigger animation when 20% of the element is in view, and only run it once.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
