// components/PropertyCarousel.jsx
"use client";

import Image from "next/image";
import React from "react";
import { motion, useSpring, useTransform } from "framer-motion";

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

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const PropertyCarousel = ({ scrollValue }: any) => {
  // Accept scrollValue prop
  const springOptions = { stiffness: 200, damping: 50 };

  // Define new animation variables for the text on top of the carousel
  const carouselTextY = useSpring(
    useTransform(scrollValue, [0, 0.5, 0.7, 1], [300, 0, 0, -300]),
    springOptions
  );
  const carouselTextOpacity = useTransform(
    scrollValue,
    [0, 0.5, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <div className="w-full py-16 relative z-[20]">
      {/* New animated text component */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center pointer-events-none"
        style={{
          y: carouselTextY,
          opacity: carouselTextOpacity,
        }}
      >
        <h2 className="text-white text-center text-[30px] sm:text-[40px] font-chronicle px-4">
          Unprecedented Deals,
          <br />
          <span className="relative inline-block text-[40px] sm:text-[50px] font-bold">
            Unbeatable Prices!
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full" />
          </span>
        </h2>
      </motion.div>
      <motion.div
        className="flex justify-center gap-8 px-[5%]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="w-[368px] flex-shrink-0"
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative group mb-4">
              <div className="absolute inset-0 rounded-sm z-10 bg-gradient-to-b from-[#E30615]/40 to-transparent transition-opacity duration-300 ease-in-out group-hover:opacity-0 h-[100px]" />
              <div className="absolute inset-0 rounded-sm z-10 bg-gradient-to-b from-black/30 to-transparent transition-opacity duration-300 ease-in-out group-hover:opacity-0 h-[150px]" />
              <Image
                src={item.imgSrc}
                height={368}
                width={368}
                alt={`Property showcase image ${index + 1}`}
                className="object-cover rounded-sm w-full h-auto transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] group-hover:[mask-image:none]"
              />
            </div>

            <p className="font-chronicle text-[40px] text-white">
              {item.title}
            </p>

            <p className="font-lato text-[22px] leading-[30px] italic break-words text-white">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyCarousel;
