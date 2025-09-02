"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Timer from "@/components/ui/Timer";
import ScrollToFormButton from "@/components/ui/ScrollToForm";
import PropertyCarousel from "./PropertyCarousel";
import ScrollReveal from "./ScrollReveal";
import MultiStepForm from "./Form";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaRegClock,
} from "react-icons/fa";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import PossibilitiesGrid from "./PossibilitiesGrid";
import LogoCarousel from "./LogoCarousel";

const MergedHeroPropertyComponent = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const finalSectionRef = useRef < HTMLDivElement > null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const { scrollYProgress } = useScroll();

  // REMOVED useSpring for a more direct 1-to-1 scroll mapping
  const smoothScrollYProgress = scrollYProgress;

  const sectionSpringConfig = {
    mass: 0.5,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  };

  // --- RE-ARCHITECTED ANIMATION TIMELINE ---

  // Hero Section Animations (On screen from 0 to 0.125)
  const heroScale = useTransform(smoothScrollYProgress, [0, 0.05], [1, 0.3]);
  const heroOpacityInitial = useTransform(
    smoothScrollYProgress,
    [0, 0.04],
    [1, 0]
  );
  const backgroundScale = useTransform(
    smoothScrollYProgress,
    [0, 0.05],
    [1.43, 1]
  );
  const overlayOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.06],
    [0.5, 0]
  );
  const newContentOpacity = useTransform(
    smoothScrollYProgress,
    [0.03, 0.04],
    [0, 1]
  );
  const newContentY = useTransform(
    smoothScrollYProgress,
    [0.03, 0.04],
    [200, 0]
  );
  const buildingY = useTransform(
    smoothScrollYProgress,
    [0.03, 0.05],
    [isMobile ? 300 : 600, isMobile ? 0 : 350]
  );
  const buildingOpacity = useTransform(
    smoothScrollYProgress,
    [0.03, 0.05],
    [0, 1]
  );
  const buttonY = useTransform(smoothScrollYProgress, [0, 0.01], [0, 100]);
  const heroSectionTransform = useTransform(
    smoothScrollYProgress,
    [0.08, 0.125],
    [0, -windowHeight]
  );
  const heroSectionSpring = useSpring(
    heroSectionTransform,
    sectionSpringConfig
  );
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const heroSectionY = heroSectionSpring;
  const heroSectionOpacity = useTransform(
    smoothScrollYProgress,
    [0.08, 0.125],
    [1, 0]
  );

  // Property Loot Section (On screen from 0.125 to 0.25)
  const lootContainerTransform = useTransform(
    smoothScrollYProgress,
    [0.1, 0.15, 0.22, 0.25],
    [windowHeight, 0, 0, -windowHeight]
  );
  const lootContainerSpring = useSpring(
    lootContainerTransform,
    sectionSpringConfig
  );
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const lootContainerY = lootContainerSpring;
  const lootContainerOpacity = useTransform(
    smoothScrollYProgress,
    [0.1, 0.15, 0.22, 0.25],
    [0, 1, 1, 0]
  );
  const lootTextY = useTransform(
    smoothScrollYProgress,
    [0.12, 0.17],
    [300, -200]
  );
  const lootTextOpacity = useTransform(
    smoothScrollYProgress,
    [0.12, 0.14],
    [0, 1]
  );
  const lootImageScale = useTransform(
    smoothScrollYProgress,
    [0.12, 0.22, 0.25],
    [1, 1.2, 0.6]
  );
  const lootImageOpacity = useTransform(
    smoothScrollYProgress,
    [0.12, 0.17, 0.25],
    [0, 0.9, 0.4]
  );
  const playButtonScale = lootImageScale;
  const playButtonOpacity = useTransform(
    smoothScrollYProgress,
    [0.17, 0.2, 0.22, 0.25],
    [0, 1, 1, 0]
  );

  // Property Festival Section (On screen from 0.25 to 0.375)
  const festivalSectionTransform = useTransform(
    smoothScrollYProgress,
    [0.22, 0.27, 0.345, 0.375],
    [windowHeight, 0, 0, -windowHeight]
  );
  const festivalSectionSpring = useSpring(
    festivalSectionTransform,
    sectionSpringConfig
  );
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const festivalSectionY = festivalSectionSpring;
  const festivalSectionOpacity = useTransform(
    smoothScrollYProgress,
    [0.22, 0.27, 0.345, 0.375],
    [0, 1, 1, 0]
  );
  const itemSpringOptions = { stiffness: 200, damping: 50 };
  const leftItemX = useSpring(
    useTransform(smoothScrollYProgress, [0.25, 0.32], [-800, 0]),
    itemSpringOptions
  );
  const rightItemX = useSpring(
    useTransform(smoothScrollYProgress, [0.25, 0.32], [800, 0]),
    itemSpringOptions
  );
  const middleItemY = useSpring(
    useTransform(smoothScrollYProgress, [0.25, 0.32], [300, 0]),
    itemSpringOptions
  );

  // Property Carousel (On screen from 0.375 to 0.5)
  const section1Transform = useTransform(
    smoothScrollYProgress,
    [0.345, 0.395, 0.47, 0.5],
    [windowHeight, 0, 0, -windowHeight]
  );
  const section1Spring = useSpring(section1Transform, sectionSpringConfig);
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const section1Y = section1Spring;
  const section1Opacity = useTransform(
    smoothScrollYProgress,
    [0.345, 0.395, 0.47, 0.5],
    [0, 1, 1, 0]
  );

  // Developers Section (On screen from 0.5 to 0.625)
  const section2Transform = useTransform(
    smoothScrollYProgress,
    [0.47, 0.52, 0.595, 0.625],
    [windowHeight, 0, 0, -windowHeight]
  );
  const section2Spring = useSpring(section2Transform, sectionSpringConfig);
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const section2Y = section2Spring;
  const section2Opacity = useTransform(
    smoothScrollYProgress,
    [0.47, 0.52, 0.595, 0.625],
    [0, 1, 1, 0]
  );
  const section2ContentY = useTransform(
    smoothScrollYProgress,
    [0.52, 0.595],
    [0, -500]
  );

  // Focus Projects Section (On screen from 0.625 to 0.75)
  const section3Transform = useTransform(
    smoothScrollYProgress,
    [0.595, 0.645, 0.72, 0.75],
    [windowHeight, 0, 0, -windowHeight]
  );
  const section3Spring = useSpring(section3Transform, sectionSpringConfig);
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const section3Y = section3Spring;
  const section3Opacity = useTransform(
    smoothScrollYProgress,
    [0.595, 0.645, 0.72, 0.75],
    [0, 1, 1, 0]
  );
  const section3ContentY = useTransform(
    smoothScrollYProgress,
    [0.645, 0.72],
    [0, isMobile ? -200 : -500]
  );
  const image1X = useSpring(
    useTransform(smoothScrollYProgress, [0.6, 0.65], [-300, 0]),
    itemSpringOptions
  );
  const image1Opacity = useTransform(
    smoothScrollYProgress,
    [0.6, 0.65],
    [0, 1]
  );
  const image2X = useSpring(
    useTransform(smoothScrollYProgress, [0.6, 0.65], [300, 0]),
    itemSpringOptions
  );
  const image2Opacity = useTransform(
    smoothScrollYProgress,
    [0.6, 0.65],
    [0, 1]
  );
  const image3X = useSpring(
    useTransform(smoothScrollYProgress, [0.64, 0.69], [-300, 0]),
    itemSpringOptions
  );
  const image3Opacity = useTransform(
    smoothScrollYProgress,
    [0.64, 0.69],
    [0, 1]
  );
  const image4X = useSpring(
    useTransform(smoothScrollYProgress, [0.64, 0.69], [300, 0]),
    itemSpringOptions
  );
  const image4Opacity = useTransform(
    smoothScrollYProgress,
    [0.64, 0.69],
    [0, 1]
  );

  // Form Section (On screen from 0.75 to 0.875)
  const section4Transform = useTransform(
    smoothScrollYProgress,
    [0.72, 0.77, 0.845, 0.875],
    [windowHeight, 0, 0, -windowHeight]
  );
  const section4Spring = useSpring(section4Transform, sectionSpringConfig);
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const section4Y = section4Spring;
  const section4Opacity = useTransform(
    smoothScrollYProgress,
    [0.72, 0.77, 0.845, 0.875],
    [0, 1, 1, 0]
  );

  // Final Section (On screen from 0.875 to 1.0)
  const finalSectionTransform = useTransform(
    smoothScrollYProgress,
    [0.845, 0.9],
    [windowHeight, 0]
  );
  const finalSectionSpring = useSpring(
    finalSectionTransform,
    sectionSpringConfig
  );
  // ✅ FIX: Applied spring to all devices for a smoother animation.
  const finalSectionY = finalSectionSpring;
  const finalSectionOpacity = useTransform(
    smoothScrollYProgress,
    [0.845, 0.9],
    [0, 1]
  );

  // --- END OF RE-ARCHITECTED TIMELINE ---

  const renderItems = [
    {
      imgSrc: "/Hand1CrImg.svg",
      oneText: "Up to",
      twoText: "1 Cr" + " ",
      threeText: " Off",
    },
    {
      imgSrc: "/AssuredGiftIcon.svg",
      oneText: "",
      twoText: "Assured Gift",
      threeText: "On Every Booking",
      lineBreak: true,
    },
    {
      imgSrc: "/WinIphoneImg.svg",
      oneText: "Win an",
      twoText: "iPhone",
      threeText: "",
    },
  ];
  const possibilitiedData = [
    { id: 1, imgNo: 1, text: "Meet 30+ Top Developers" },
    { id: 2, imgNo: 2, text: "On-Spot Exclusive Deals" },
    { id: 3, imgNo: 3, text: "All Luxury Projects Under One Roof" },
    { id: 4, imgNo: 4, text: "Discover Your Dream Home" },
  ];
  const testimonials = [
    {
      name: "Mr. Vihaan Jain",
      title: "CEO, DLF",
      image: "/DLFCEO.png",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      name: "Ms. Anika Sharma",
      title: "Architect, Godrej Properties",
      image: "/DLFCEO.png",
      text: "A fantastic event that brought together the best in the industry. The opportunities and deals available were unparalleled. Highly recommended for any serious homebuyer.",
    },
    {
      name: "Mr. Rohan Gupta",
      title: "Real Estate Investor",
      image: "/DLFCEO.png",
      text: "As an investor, finding all the top developers under one roof was incredibly efficient. The insights and exclusive offers made it a very profitable day.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      className="relative min-h-[100vh] bg-[#171A34]"
      initial={{ opacity: 0 }}
      animate={{ opacity: windowHeight > 0 ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="fixed inset-0 w-full h-full z-10"
        style={{
          y: heroSectionY,
          opacity: heroSectionOpacity,
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full origin-center"
          style={{ scale: backgroundScale, willChange: "transform" }}
        >
          <Image
            priority
            fill
            src="https://s3.ap-south-1.amazonaws.com/jkare.data/5.webp"
            alt="Cityscape background"
            quality={80}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ scale: heroScale, opacity: heroOpacityInitial }}
        >
          <Image
            src="/HeroLogo.png"
            alt="Hero Logo"
            width={280}
            height={140}
            className="w-[100px] sm:w-[120px] lg:w-[280px] h-auto mb-2 sm:mb-6"
          />
          <p className="text-white text-base lg:text-[30px] font-light mb-4 sm:mb-6 lg:mb-2 leading-relaxed font-lato italic text-center px-4">
            This is not just another real estate event.
          </p>
          <p className="text-white text-[28px] sm:text-[32px] lg:text-[52px] font-bold mb-4 sm:mb-8 leading-tight font-chronicle text-center px-4">
            This is "India's Biggest Property Show"
          </p>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex flex-col items-center pt-[50%] lg:pt-[10%] px-4"
          style={{ opacity: newContentOpacity, y: newContentY }}
        >
          <div>
            <div className="flex items-center justify-center relative gap-1 sm:gap-2 mb-4 sm:mb-8 w-full">
              <p className="font-agency font-bold text-2xl sm:text-[40px] text-white mr-1 sm:mr-[10px]">
                September
              </p>
              <div className="px-2 pl-[10px] pr-6 sm:pr-8 border-x-2 h-[50px] sm:h-[70px] flex items-center justify-center relative">
                <p className="font-agency font-bold text-[45px] sm:text-[70px] text-white">
                  28
                  <sup className="text-xs sm:text-[20px] absolute top-1 sm:top-5">
                    th
                  </sup>
                </p>
              </div>
              <div className="ml-1 sm:ml-0">
                <div className="font-lato italic text-xs sm:text-[20px] pl-1 sm:pl-[5px] font-bold flex items-center text-white">
                  <FaRegClock size={16} color="#fff" className="mr-1 sm:mr-2" />
                  <p>10AM Onwards</p>
                </div>
                <div className="font-lato italic text-xs sm:text-[20px] leading-tight mt-1 sm:mt-[5px] pl-1 sm:pl-[5px] font-bold flex items-start text-white">
                  <IoLocationOutline
                    size={16}
                    color="#fff"
                    className="mr-1 sm:mr-2 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p>Gaur Sarovar Portico</p>
                    <p className="font-[400] text-[10px] sm:text-[14px]">
                      Sector 4, Greater Noida, UP
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Timer />
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-0 lg:bottom-[10%] left-0 w-full pointer-events-none"
          style={{ y: buildingY, opacity: buildingOpacity }}
        >
          <div
            className="w-full h-[500px] lg:h-[1000px] bg-cover bg-bottom bg-no-repeat"
            style={{ backgroundImage: "url('/BuildingsBG.webp')" }}
          />
        </motion.div>
        <motion.div
          className="absolute w-full flex flex-col items-center mt-2"
          style={{ y: buttonY, top: isMobile ? "70%" : "75%" }}
        >
          <ScrollToFormButton className="absolute -top-18 bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] hover:opacity-90 hover:scale-105 transition-transform text-[#2F2F2F] px-6 py-2 text-xl sm:px-8 sm:py-3 sm:text-[28px] font-chronicle rounded-md shadow-lg whitespace-nowrap">
            Register Now
          </ScrollToFormButton>
        </motion.div>
      </motion.div>

      {/* All subsequent sections follow the same JSX structure, only the style props are changed above */}

      <motion.div
        className="fixed inset-0 w-full h-full z-20"
        style={{
          y: lootContainerY,
          opacity: lootContainerOpacity,
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: lootImageOpacity, willChange: "opacity" }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute w-full h-full"
              style={{ scale: lootImageScale, willChange: "transform" }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/Section2Top.png')",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[#171A34]/60 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
          <motion.div
            className="text-center"
            style={{
              y: lootTextY,
              opacity: lootTextOpacity,
              willChange: "transform, opacity",
            }}
          >
            <h2 className="text-white text-2xl sm:text-[32px] md:text-[40px] font-chronicle">
              India's{" "}
              <span className="relative inline-block">
                <span className="font-bold lg:leading-[55px]">
                  Biggest Property Loot!
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
              </span>
            </h2>
            <h2 className="text-white text-2xl sm:text-[32px] md:text-[40px] font-chronicle">
              Only on{" "}
              <span className="relative inline-block">
                <span className="font-bold lg:leading-[55px]">
                  28th September!
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
              </span>
            </h2>
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{
            scale: playButtonScale,
            opacity: playButtonOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] relative">
            <div className="absolute inset-0 bg-white/30 rounded-full backdrop-blur-sm border-2 border-white/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed inset-0 w-full h-full z-30 bg-[#171A34]"
        style={{
          y: festivalSectionY,
          opacity: festivalSectionOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="h-full flex flex-col items-center justify-center px-4">
          <div className="mt-12 mb-8 sm:mt-20 sm:mb-12">
            <h2 className="text-white text-xl sm:text-[32px] md:text-[40px] leading-tight md:leading-tight text-center font-chronicle">
              This Is Not Just a Site Visit. <br />
              <span className="text-[26px] sm:text-[45px] leading-tight">
                This is a{" "}
                <span className="relative inline-block font-bold">
                  Property Festival.
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
                </span>
              </span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center mt-8 gap-6 lg:w-[70%]">
            {renderItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex w-full max-w-[250px] items-center flex-col"
                style={{
                  x: index === 0 ? leftItemX : index === 2 ? rightItemX : 0,
                  y: index === 1 ? middleItemY : 0,
                  willChange: "transform",
                }}
              >
                <Image
                  src={item.imgSrc}
                  height={120}
                  width={120}
                  alt="Feature Icon"
                  className="pb-[10px] w-[100px] h-[100px] lg:w-[175px] lg:h-[175px]"
                />
                <p className="text-center font-lato text-base leading-snug lg:text-[30px] lg:leading-[34px] italic text-white px-4">
                  {item.oneText}{" "}
                  <span className="font-bold">{item.twoText}</span>
                  {item?.lineBreak} {item.threeText}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed inset-0 w-full h-full z-40 bg-[#171A34]"
        style={{
          y: section1Y,
          opacity: section1Opacity,
          willChange: "transform, opacity",
        }}
      >
        <PropertyCarousel />
      </motion.div>

      <motion.div
        className="fixed inset-0 z-50 bg-[#171A34] pt-12 sm:pt-[70px]"
        style={{
          y: section2Y,
          opacity: section2Opacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="w-full h-full relative">
          <motion.div style={{ y: section2ContentY, willChange: "transform" }}>
            <ScrollReveal>
              <h2 className="text-white text-xl sm:text-[32px] md:text-[40px] text-center font-chronicle mt-8">
                <span className="underline-gold-gradient font-bold">
                  Developers
                </span>{" "}
                You trust.
              </h2>
              <h2 className="text-white text-[24px] sm:text-[36px] md:text-[46px] text-center font-chronicle">
                Offers{" "}
                <span className="underline-gold-gradient font-bold">
                  You Can't Miss.
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative w-full mt-6 sm:mt-10 mb-6 sm:mb-10">
                <Image
                  src="/LogosBG.png"
                  alt="Logos Background"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  className="z-[0]"
                />
                <LogoCarousel />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-white text-xl sm:text-[32px] md:text-[40px] text-center font-chronicle mt-4">
                One Event.{" "}
                <span className="underline-gold-gradient font-bold">
                  Unlimited Possibilities.
                </span>
              </h2>
            </ScrollReveal>
            <PossibilitiesGrid data={possibilitiedData} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="fixed inset-0 h-full w-full z-60 bg-[#171A34]"
        style={{
          y: section3Y,
          opacity: section3Opacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="w-full relative flex flex-col pt-12 sm:pt-[70px] items-center">
          <motion.div
            className="text-center text-white p-4 sm:p-8 flex flex-col items-center w-full"
            style={{ y: section3ContentY, willChange: "transform" }}
          >
            <ScrollReveal>
              <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle px-4">
                Our{" "}
                <span className="underline-gold-gradient font-bold">
                  Focus Projects.
                </span>
              </h2>
            </ScrollReveal>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-8 w-full max-w-screen-xl px-4">
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                style={{
                  x: image1X,
                  opacity: image1Opacity,
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src="/FocusProject1.png"
                  alt="Focus Project 1"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-start"
                style={{
                  x: image2X,
                  opacity: image2Opacity,
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src="/FocusProject2.png"
                  alt="Focus Project 2"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </motion.div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-6 lg:mt-10 w-full max-w-screen-xl px-4">
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                style={{
                  x: image3X,
                  opacity: image3Opacity,
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src="/FocusProject3.png"
                  alt="Focus Project 3"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-start"
                style={{
                  x: image4X,
                  opacity: image4Opacity,
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src="/FocusProject4.png"
                  alt="Focus Project 4"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        id="form-section"
        className="fixed inset-0 h-full w-full z-70"
        style={{
          y: section4Y,
          opacity: section4Opacity,
          willChange: "transform, opacity",
        }}
      >
        <div
          id="registration-form"
          className="w-full h-full bg-[url(/FormBG.png)] bg-cover bg-center flex justify-between flex-col lg:flex-row p-4 pt-16 sm:pt-28 lg:px-[8%]"
        >
          <div className="lg:w-[50%] mb-8 lg:mb-0">
            <p className="flex items-center font-lato text-sm md:text-[18px] lg:max-w-[70%] text-white font-[700] mb-4">
              <IoLocationOutline
                size={24}
                className="md:size-[40px] flex-shrink-0 mr-1"
                color="#fff"
              />
              <span>
                GH-01, Greater Noida W Rd, E Block, Gaur City 1, Sector 04,
                Sector 4, Greater Noida
              </span>
            </p>
            <p className="flex items-center font-lato italic text-base text-white font-[700] gap-1 mb-4 lg:pl-[5px]">
              <FaRegClock size={24} className="flex-shrink" color="#fff" />
              <span>10AM Onwards</span>
            </p>
            <div className="text-white font-chronicle mt-4">
              <p className="text-[28px] lg:text-[42px] leading-tight">
                The Gaurs
              </p>
              <p className="text-[42px] lg:text-[64px] leading-tight">
                Sarovar Premiere
              </p>
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col items-center justify-between">
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-4 px-4 drop-shadow-md">
              Don't Miss,{" "}
              <span className="underline-gold-gradient font-bold">
                Register
              </span>{" "}
              Yourself.
            </h2>
            <div className="w-full max-w-sm mx-auto lg:max-w-[60%] bg-white/15 backdrop-blur-sm p-4 sm:p-[5%] font-lato italic text-white z-20 rounded-md mt-6">
              <div>
                <p className="text-left text-base sm:text-[22px] mb-4 sm:mb-6 leading-relaxed">
                  Let's Make Your <br />
                  Dream Home Reality!
                </p>
                <MultiStepForm />
              </div>
            </div>
            <div className="h-4 sm:h-8" />
          </div>
        </div>
      </motion.div>

      {/* This div creates the scrollable space. Its height is now calculated
           to provide a much better pacing for the number of sections you have. */}
      <div style={{ height: "800vh" }} />

      <motion.div
        className="fixed inset-0 w-full z-80 bg-[#171A34]"
        style={{
          y: finalSectionY,
          opacity: finalSectionOpacity,
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          ref={finalSectionRef}
          className="w-full h-full flex flex-col p-4 pt-16 sm:pt-4 overflow-y-scroll no-scrollbar"
        >
          <div className="w-full flex flex-col items-center justify-start max-w-7xl mx-auto mb-10">
            <ScrollReveal>
              <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle px-4">
                <span className="underline-gold-gradient font-bold">
                  Voices
                </span>{" "}
                That Matter
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="w-full px-2 sm:px-[10%] flex flex-row items-center justify-center gap-2 sm:gap-10 mt-8">
                <FaRegArrowAltCircleLeft
                  size={24}
                  color="#fff"
                  className="cursor-pointer flex-shrink-0"
                  onClick={prevTestimonial}
                />
                <div className="w-full flex items-center justify-center transition-transform relative overflow-hidden min-h-[380px] sm:min-h-0 sm:h-[290px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center sm:items-end"
                    >
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt="person"
                        height={320}
                        width={250}
                        className="w-[120px] sm:w-[223px] h-auto object-cover z-10"
                        quality={75}
                      />
                      <div className="w-full sm:w-[65%] sm:ml-[-40px] mt-[-30px] sm:mt-0 pt-[40px] sm:pt-[40px] bg-white rounded-md px-4 py-4 sm:px-8 shadow-md z-0">
                        <p className="font-chronicle text-base sm:text-[28px] text-[#0F0F0F] mb-1 pl-[5%]">
                          {testimonials[currentTestimonial].name}{" "}
                          <span className="text-xs sm:text-[15px] italic">
                            {testimonials[currentTestimonial].title}
                          </span>
                        </p>
                        <p className="font-lato italic text-xs sm:text-[16px] text-[#888888] font-light pl-[5%]">
                          {testimonials[currentTestimonial].text}
                        </p>
                        <div className="flex mt-3 sm:mt-6 mb-2 justify-end">
                          {[...Array(5)].map((_, i) => (
                            <IoIosStar key={i} size={12} color="#E2B110" />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <FaRegArrowAltCircleRight
                  size={24}
                  color="#fff"
                  className="cursor-pointer flex-shrink-0"
                  onClick={nextTestimonial}
                />
              </div>
            </ScrollReveal>
          </div>
          <div className="mt-auto">
            <footer className="relative w-full">
              <Image
                src="/FooterBG.png"
                alt="Footer Background"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className="z-0"
                quality={70}
              />
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center w-full px-[5%] py-6 sm:px-[10%] sm:py-8 gap-4 sm:gap-6">
                <Image
                  src="/HeroLogo.png"
                  alt="Logo"
                  width={200}
                  height={100}
                  className="object-contain w-[120px] sm:w-[200px]"
                />
                <nav className="flex flex-wrap justify-center sm:justify-between grow gap-x-4 sm:gap-x-10 font-lato italic text-sm lg:pr-[10%] lg:pl-[5%] text-white ">
                  {["Event", "Gallery", "Location", "Contact Us"].map(
                    (text, i) => (
                      <a
                        key={i}
                        href="#"
                        className="hover:underline transition-colors text-base"
                      >
                        {text}
                      </a>
                    )
                  )}
                </nav>
              </div>
            </footer>
            <div className="relative z-10 w-full px-[5%] sm:px-[10%] bg-[#171A34]">
              <div className="flex flex-col-reverse sm:flex-row w-full justify-between items-center text-white text-sm gap-3 py-3">
                <p className="mt-3 sm:mt-0 text-center text-xs sm:text-sm">
                  All copyright reserved @2025
                </p>
                <div className="flex gap-x-4">
                  {[FiFacebook, FiInstagram, FiLinkedin, FiTwitter].map(
                    (Icon, idx) => (
                      <a
                        key={idx}
                        href="https://bop.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <Icon size={18} />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MergedHeroPropertyComponent;
