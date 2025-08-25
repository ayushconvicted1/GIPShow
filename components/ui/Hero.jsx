import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import Timer from "@/components/ui/Timer";
import ScrollToFormButton from "@/components/ui/ScrollToForm";

const MergedHeroPropertyComponent = () => {
  const { scrollYProgress } = useScroll();

  // Property Festival render items data
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

  // HERO SECTION ANIMATIONS (0 to 0.5 scroll progress)
  // Hero internal animations
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.3], [1.43, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 0]);

  // New content animations (date and timer)
  const newContentOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const newContentY = useTransform(scrollYProgress, [0.2, 0.3], [200, -150]);

  // Building animation from bottom
  const buildingY = useTransform(scrollYProgress, [0.25, 0.35], [600, 200]);
  const buildingOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  // Button position animation
  const buttonY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  // ENTIRE HERO SECTION SLIDE UP ANIMATION (0.35 to 0.5 scroll progress)
  const heroSectionY = useTransform(scrollYProgress, [0.35, 0.5], [0, -window.innerHeight]);
  const heroSectionOpacity = useTransform(scrollYProgress, [0.45, 0.5], [1, 0]);

  // PROPERTY LOOT SECTION - Attached below hero section, follows it up
  // Starts at bottom of screen (window.innerHeight), moves up as hero moves up
  const lootSectionY = useTransform(scrollYProgress, [0.35, 0.5], [window.innerHeight, 0]);
  const lootSectionOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  // Property Loot internal animations (start when section reaches top of screen at 50%)
  const lootTextY = useTransform(scrollYProgress, [0.5, 0.65, 0.75], [0, -50, -400]);
  const lootTextScale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const lootTextOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.72, 0.75], [0, 1, 1, 1]);

  // Image scale animations - zooms in then stops at 70% size
  const lootImageScale = useTransform(scrollYProgress, [0.5, 0.7, 1], [0.8, 2.5, 0.7]);
  const lootImageOpacity = useTransform(scrollYProgress, [0.45, 0.55, 1], [0, 0.9, 0.4]);

  // Play button animations - appears when section is in position
  const playButtonScale = useTransform(scrollYProgress, [0.5, 0.7, 0.75], [1, 3, 0]);
  const playButtonOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.75], [0, 1, 0]);
  // Add this new animation - Property Loot section slides up to reveal Festival section
  // Add these new animations for Property Loot section to slide up
  const lootSectionSlideUpY = useTransform(scrollYProgress, [0.7, 0.85], [0, -window.innerHeight]);
  const lootSectionSlideUpOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);

  // PROPERTY FESTIVAL SECTION ANIMATIONS (75% to 100% scroll progress)
  // Change from [0.75, 0.9] to [0.8, 0.9]
  const festivalSectionY = useTransform(scrollYProgress, [0.75, 0.9], [window.innerHeight, 0]);
  // Change from [0.75, 0.85] to [0.8, 0.85] 
  const festivalSectionOpacity = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);

  // Individual item animations - first and third slide from sides
  const leftItemX = useTransform(scrollYProgress, [0.85, 1], [-800, -300]);
  const rightItemX = useTransform(scrollYProgress, [0.85, 1], [800, 300]);

  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      {/* HERO SECTION CONTAINER - Slides up as a whole */}
      <motion.div
        className="fixed inset-0 w-full h-full z-10"
        style={{
          y: heroSectionY,
          opacity: heroSectionOpacity
        }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full origin-center"
          style={{ scale: backgroundScale }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://s3.ap-south-1.amazonaws.com/jkare.data/5.webp')"
            }}
          />
        </motion.div>

        {/* Black Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* Hero Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Hero Logo */}
          <Image
            src="/HeroLogo.png"
            alt="Hero Logo"
            width={100}
            height={50}
            className="w-[100px] sm:w-[120px] lg:w-[280px] h-auto mb-2 sm:mb-6"
          />

          {/* Hero Text */}
          <p className="text-white text-[18px] lg:text-[30px] font-light mb-2 sm:mb-4 sm:max-w-3xl leading-relaxed font-lato italic text-center px-4">
            This is not just another real estate event.
          </p>

          <p className="text-white text-[32px] lg:text-[52px] font-bold mb-4 sm:mb-8 leading-tight font-chronicle text-center px-4">
            This is "India's Biggest Property Show"
          </p>
        </motion.div>

        {/* New Content - Date and Timer */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{
            opacity: newContentOpacity,
            y: newContentY
          }}
        >
          {/* Date Section */}
          <div className="flex items-center relative justify-between gap-2 mb-4 sm:mb-8">
            <p className="font-agency font-bold text-[28px] sm:text-[32px] text-white mr-[10px]">
              September
            </p>
            <div className="pr-[22px] pl-[10px] border-x-2 h-[60px] sm:h-[70px] flex items-center pt-[8px] justify-center relative">
              <p className="font-agency font-bold text-[60px] sm:text-[70px] text-white">
                28{" "}
                <sup className="text-[18px] sm:text-[20px] absolute top-4 sm:top-5">
                  th
                </sup>
              </p>
            </div>
            <div className="text-left font-lato font-[400] italic text-[16px] sm:text-[18px] text-white">
              The Mayfair Grand <br />
              Sector 134 Noida
            </div>
          </div>

          {/* Timer Component */}
          <Timer />
        </motion.div>

        {/* Building Image Rising from Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            y: buildingY,
            opacity: buildingOpacity
          }}
        >
          <div
            className="w-full h-[400px] sm:h-[500px] lg:h-[1000px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://s3.ap-south-1.amazonaws.com/jkare.data/buildings-min.png')",
              backgroundPosition: 'bottom'
            }}
          />
        </motion.div>

        {/* Register Button */}
        <motion.div
          className="absolute left-[42%] mt-2"
          style={{
            y: buttonY,
            top: '75%',
          }}
        >
          <ScrollToFormButton
            className="absolute -top-18 bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] 
               hover:opacity-90 hover:scale-105 transition-transform text-[#2F2F2F] 
               px-6 py-2 text-[22px] sm:px-8 sm:py-3 sm:text-[28px] 
               font-chronicle rounded-md shadow-lg whitespace-nowrap">
            Register Now
          </ScrollToFormButton>
        </motion.div>
      </motion.div>

      {/* PROPERTY LOOT SECTION CONTAINER - Slides up from bottom */}
      <motion.div
        className="fixed inset-0 w-full h-full z-20"
        style={{
          y: useTransform(scrollYProgress,
            [0.35, 0.5, 0.7, 0.85],
            [window.innerHeight, 0, 0, -window.innerHeight]
          ),
          opacity: useTransform(scrollYProgress,
            [0.4, 0.5, 0.75, 0.85],
            [0, 1, 1, 0]
          )
        }}
      >
        {/* Property Loot Background Image Section - BOTTOM LAYER */}
        <motion.div
          className="absolute inset-0 z-1"
          style={{ opacity: lootImageOpacity }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ scale: lootImageScale }}
            >
              <div
                className="w-full h-[80vh] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/Section2Top.png')",
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)"
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Blue Background Overlay - MIDDLE LAYER */}
        <div className="absolute inset-0 bg-[#17203d]/60 z-5"></div>

        {/* Property Loot Text Section - TOP LAYER */}
        <motion.section
          className="absolute inset-0 text-white flex items-center justify-center px-4 z-20"
          style={{
            y: lootTextY,
            opacity: lootTextOpacity,
            scale: lootTextScale
          }}
        >
          <div className="text-center relative">
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] font-chronicle mt-6">
              India's{" "}
              <span className="relative inline-block">
                <span className="font-bold">Biggest Property Loot!</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
              </span>
            </h2>
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] font-chronicle">
              Only on{" "}
              <span className="relative inline-block">
                <span className="font-bold">28th September!</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>
              </span>
            </h2>
          </div>
        </motion.section>

        {/* Play Button - TOP LAYER */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{
            scale: playButtonScale,
            opacity: playButtonOpacity
          }}
        >
          <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] relative">
            {/* Play button background circle */}
            <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/40"></div>
            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content spacer to enable scrolling */}
      <div className="h-[500vh]" />
      <motion.div
        className="fixed inset-0 w-full h-full z-25 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e]"
        style={{
          y: festivalSectionY,
          opacity: festivalSectionOpacity
        }}
      >
        <div className="h-full flex flex-col items-center justify-center px-4">
          {/* Main Heading */}
          <div className="mt-20 mb-[10px]">
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
          </div>

          {/* Feature Items */}
          <div className="flex flex-col sm:flex-row items-center justify-around mt-[50px] gap-10 sm:gap-4">
            {renderItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex w-full max-w-[250px] items-center flex-col"
                style={{
                  x: index === 0 ? leftItemX : index === 2 ? rightItemX : 0,
                  // Center item (index === 1) has no y animation - stays in place
                }}
              >
                <Image
                  src={item.imgSrc}
                  height={120}
                  width={120}
                  alt="Feature Icon"
                  className="pb-[10px] w-[120px] h-[120px] lg:w-[175px] lg:h-[175px]"
                />
                <p className="text-center font-lato text-[20px] leading-[26px] lg:text-[30px] lg:leading-[32px] italic text-white">
                  {item.oneText} <br />
                  <span className="font-bold">{item.twoText}</span>
                  {item?.lineBreak && <br />}
                  {item.threeText}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default MergedHeroPropertyComponent;