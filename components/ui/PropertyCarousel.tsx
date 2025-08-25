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

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const PropertyCarousel = () => {
  return (
    <div className="w-full py-16 z-[20]">
      <div className={`overflow-x-auto pb-4 `}>

        <motion.div
          className="flex gap-8 px-8 sm:px-16 md:px-24"
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

              <p className="font-chronicle text-[40px]">{item.title}</p>

              <p className="font-lato text-[22px] leading-[30px] italic break-words">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyCarousel;
