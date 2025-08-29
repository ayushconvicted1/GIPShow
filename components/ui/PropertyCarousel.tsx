"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const data = [
  {
    imgSrc: "/PropertyImg1.png",
    title: "01",
    description: "30+ properties, all under the roof, with never-before prices",
  },
  {
    imgSrc: "/PropertyImg2.png",
    title: "02",
    description: "Meet top developers directly — negotiate, book, and save big",
  },
  {
    imgSrc: "/PropertyImg3.png",
    title: "03",
    description:
      "From studio apartments to luxury penthouses — find it all here",
  },
  {
    imgSrc: "/PropertyImg4.png",
    title: "04",
    description:
      "One-day-only exclusive pricing, flash deals, and surprise offers",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const textVariants: any = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const PropertyCarousel = () => {
  const baseStiffness = 300;
  const damping = 20;

  return (
    <div className="h-full w-full flex items-center justify-center z-[20]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full"
      >
        <motion.div className="mb-[70px]" variants={textVariants}>
          <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle">
            This Is Not Just a Site Visit. <br />
            <span className="text-[30px] sm:text-[45px]">
              This is a{" "}
              <span className="relative inline-block font-bold">
                Property Festival.
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
              </span>
            </span>
          </h2>
        </motion.div>

        {/* ✅ FIX: Prevents items from wrapping to a new line on smaller screens */}
        <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-8 px-[5%] pb-4">
          {data.map((item, index) => {
            const stiffness = baseStiffness - index * 50;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{
                  type: "spring",
                  stiffness: stiffness,
                  damping: damping,
                }}
                className="flex-shrink-0" // Prevents items from shrinking
              >
                <div className="relative group w-[304px] h-[357px]">
                  <Image
                    src={item.imgSrc}
                    height={357}
                    width={304}
                    alt={`Property showcase image ${index + 1}`}
                    className="object-cover rounded-sm w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-sm bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <p className="font-chronicle text-[40px] text-white">
                      {item.title}
                    </p>
                    <p className="font-lato text-[22px] leading-[30px] italic break-words text-white">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyCarousel;
