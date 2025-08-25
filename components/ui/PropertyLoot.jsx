import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PropertyLoot = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  // Text animations - moves from center to top and fades out
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, -100, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.8], [0, 1, 1, 0]);
  // Image scale animations - zooms in then zooms out (pinch effect)
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 2.5, 2.5, 0.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0.7, 0.9, 0.9, 0]);
  // Play button animations
  const playButtonScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 3, 3, 0.3]);
  const playButtonOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [1, 1, 1, 0]);
  return (
    <div ref={containerRef} className="relative h-[300vh] overflow-hidden">
      {/* Text Section - Initially centered, moves up and fades out */}
      <motion.section 
        className="fixed inset-0 bg-[#171a34]/80 text-white flex items-center justify-center px-4 z-20"
        style={{ 
          y: textY,
          opacity: textOpacity
        }}
      >
        <div className="text-center">
          <motion.h2 
            className="text-white text-[24px] sm:text-[32px] md:text-[40px] font-chronicle mt-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            India's{" "}
            <span className="relative inline-block">
              <span className="font-bold">Biggest Property Loot!</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
            </span>
          </motion.h2>
          <motion.h2 
            className="text-white text-[24px] sm:text-[32px] md:text-[40px] font-chronicle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Only on{" "}
            <span className="relative inline-block">
              <span className="font-bold">14th September!</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
            </span>
          </motion.h2>
        </div>
      </motion.section>

      {/* Background Image and Play Button Section */}
      <motion.section 
        className="fixed inset-0 bg-[#17203d]/80 text-white text-lg sm:text-2xl flex items-center justify-center z-10"
        style={{ opacity: imageOpacity }}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ scale: imageScale }}
          >
            <div 
              className="w-full h-[80vh] bg-cover bg-center bg-no-repeat opacity-70"
              style={{
                backgroundImage: "url('/Section2Top.png')",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)"
              }}
            />
          </motion.div>

          {/* Play Button */}
          <motion.div 
            className="relative z-30 flex items-center justify-center"
            style={{ 
              scale: playButtonScale,
              opacity: playButtonOpacity
            }}
          >
            <div className="w-[40px] h-[40px] sm:w-[62px] sm:h-[62px] relative">
              {/* Play button background circle */}
              <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm border border-white/30"></div>
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Spacer to allow scrolling */}
      <div className="h-full relative z-0"></div>
    </div>
  );
};

export default PropertyLoot;