import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Timer from "@/components/ui/Timer";
import ScrollToFormButton from "@/components/ui/ScrollToForm";

const MergedHeroPropertyComponent = () => {
  const { scrollYProgress } = useScroll();

  const springOptions = { stiffness: 200, damping: 50 };

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

  // HERO SECTION ANIMATIONS (NOW WITH SPRINGS)
  const heroScaleRaw = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const heroScale = useSpring(heroScaleRaw, springOptions); // Elastic scale
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const backgroundScaleRaw = useTransform(scrollYProgress, [0, 0.3], [1.43, 1]);
  const backgroundScale = useSpring(backgroundScaleRaw, springOptions); // Elastic background scale
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 0]);

  const newContentOpacity = useTransform(scrollYProgress, [0.2, 0.22], [0, 1]);
  const newContentYRaw = useTransform(
    scrollYProgress,
    [0.2, 0.22],
    [200, -150]
  );
  const newContentY = useSpring(newContentYRaw, springOptions); // Elastic timer/date

  const buildingYRaw = useTransform(scrollYProgress, [0.25, 0.27], [600, 200]);
  const buildingY = useSpring(buildingYRaw, springOptions); // Elastic building
  const buildingOpacity = useTransform(scrollYProgress, [0.25, 0.27], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0, 0.05], [0, 100]);

  const heroSectionYRaw = useTransform(
    scrollYProgress,
    [0.35, 0.5],
    [0, -window.innerHeight]
  );
  const heroSectionY = useSpring(heroSectionYRaw, springOptions);
  const heroSectionOpacity = useTransform(scrollYProgress, [0.45, 0.5], [1, 0]);

  // PROPERTY LOOT SECTION ANIMATIONS
  const lootTextYRaw = useTransform(scrollYProgress, [0.5, 0.58], [300, -200]);
  const lootTextY = useSpring(lootTextYRaw, springOptions);
  const lootTextOpacity = useTransform(scrollYProgress, [0.5, 0.55], [0, 1]);

  const lootImageScaleRaw = useTransform(
    scrollYProgress,
    [0.5, 0.7, 0.85],
    [1, 1.2, 0.6]
  );
  const lootImageScale = useSpring(lootImageScaleRaw, springOptions);
  const lootImageOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 1],
    [0, 0.9, 0.4]
  );

  const playButtonScale = lootImageScale;

  const playButtonOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.55, 0.68, 0.75],
    [0, 1, 1, 0]
  );

  // PROPERTY FESTIVAL SECTION ANIMATIONS
  const festivalSectionYRaw = useTransform(
    scrollYProgress,
    [0.75, 0.9],
    [window.innerHeight, 0]
  );
  const festivalSectionY = useSpring(festivalSectionYRaw, springOptions);
  const festivalSectionOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    [0, 1]
  );

  const leftItemXRaw = useTransform(scrollYProgress, [0.85, 1], [-800, 0]);
  const rightItemXRaw = useTransform(scrollYProgress, [0.85, 1], [800, 0]);
  const leftItemX = useSpring(leftItemXRaw, springOptions);
  const rightItemX = useSpring(rightItemXRaw, springOptions);

  const middleItemYRaw = useTransform(scrollYProgress, [0.85, 1], [300, 0]);
  const middleItemY = useSpring(middleItemYRaw, springOptions);

  const lootContainerYRaw = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.7, 0.85],
    [window.innerHeight, 0, 0, -window.innerHeight]
  );
  const lootContainerY = useSpring(lootContainerYRaw, springOptions);
  const lootContainerOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.75, 0.85],
    [0, 1, 1, 0]
  );

  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      {/* HERO SECTION CONTAINER */}
      <motion.div
        className="fixed inset-0 w-full h-full z-10"
        style={{
          y: heroSectionY,
          opacity: heroSectionOpacity,
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full origin-center"
          style={{ scale: backgroundScale }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://s3.ap-south-1.amazonaws.com/jkare.data/5.webp')",
            }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <Image
            src="/HeroLogo.png"
            alt="Hero Logo"
            width={100}
            height={50}
            className="w-[100px] sm:w-[120px] lg:w-[280px] h-auto mb-2 sm:mb-6"
          />
          <p className="text-white text-[18px] lg:text-[30px] font-light mb-2 sm:mb-4 sm:max-w-3xl leading-relaxed font-lato italic text-center px-4">
            This is not just another real estate event.
          </p>
          <p className="text-white text-[32px] lg:text-[52px] font-bold mb-4 sm:mb-8 leading-tight font-chronicle text-center px-4">
            This is "India's Biggest Property Show"
          </p>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          style={{ opacity: newContentOpacity, y: newContentY }}
        >
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
              The Mayfair Grand <br /> Sector 134 Noida
            </div>
          </div>
          <Timer />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ y: buildingY, opacity: buildingOpacity }}
        >
          <div
            className="w-full h-[400px] sm:h-[500px] lg:h-[1000px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://s3.ap-south-1.amazonaws.com/jkare.data/buildings-min.png')",
              backgroundPosition: "bottom",
            }}
          />
        </motion.div>
        <motion.div
          className="absolute w-full flex flex-col items-center mt-2"
          style={{ y: buttonY, top: "75%" }}
        >
          <ScrollToFormButton className="absolute -top-18 bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] hover:opacity-90 hover:scale-105 transition-transform text-[#2F2F2F] px-6 py-2 text-[22px] sm:px-8 sm:py-3 sm:text-[28px] font-chronicle rounded-md shadow-lg whitespace-nowrap">
            Register Now
          </ScrollToFormButton>
        </motion.div>
      </motion.div>

      {/* PROPERTY LOOT SECTION CONTAINER */}
      <motion.div
        className="fixed inset-0 w-full h-full z-20"
        style={{
          y: lootContainerY,
          opacity: lootContainerOpacity,
        }}
      >
        <motion.div
          className="absolute inset-0 z-1"
          style={{ opacity: lootImageOpacity }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute w-full h-full"
              style={{ scale: lootImageScale }}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/Section2Top.png')",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[#17203d]/60 z-5"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div
            className="text-center"
            style={{
              y: lootTextY,
              opacity: lootTextOpacity,
              transform: "translateZ(0)",
            }}
          >
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] font-chronicle">
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
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ scale: playButtonScale, opacity: playButtonOpacity }}
        >
          <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] relative">
            <div className="absolute inset-0 bg-white/30 rounded-full backdrop-blur-sm border-2 border-white/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-2"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content spacer to enable scrolling */}
      <div className="h-[500vh]" />

      {/* PROPERTY FESTIVAL SECTION */}
      <motion.div
        className="fixed inset-0 w-full h-full z-25 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e]"
        style={{
          y: festivalSectionY,
          opacity: festivalSectionOpacity,
        }}
      >
        <div className="h-full flex flex-col items-center justify-center px-4">
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
          <div className="flex flex-col sm:flex-row justify-around mt-[50px] gap-8 lg:w-[70%]">
            {renderItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex w-full max-w-[250px] items-center flex-col"
                style={{
                  x: index === 0 ? leftItemX : index === 2 ? rightItemX : 0,
                  y: index === 1 ? middleItemY : 0,
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
