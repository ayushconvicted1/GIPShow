"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  // HERO SECTION ANIMATIONS
  const heroScaleRaw = useTransform(scrollYProgress, [0, 0.05], [1, 0.3]);
  const heroScale = useSpring(heroScaleRaw, springOptions);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  const backgroundScaleRaw = useTransform(
    scrollYProgress,
    [0, 0.05],
    [1.43, 1]
  );
  const backgroundScale = useSpring(backgroundScaleRaw, springOptions);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.06], [0.5, 0]);

  const newContentOpacity = useTransform(scrollYProgress, [0.03, 0.04], [0, 1]);
  const newContentYRaw = useTransform(
    scrollYProgress,
    [0.03, 0.04],
    [200, -150]
  );
  const newContentY = useSpring(newContentYRaw, springOptions);

  const buildingYRaw = useTransform(scrollYProgress, [0.04, 0.05], [600, 200]);
  const buildingY = useSpring(buildingYRaw, springOptions);
  const buildingOpacity = useTransform(scrollYProgress, [0.04, 0.05], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0, 0.01], [0, 100]);

  const heroSectionYRaw = useTransform(
    scrollYProgress,
    [0.05, 0.1],
    [0, -window.innerHeight]
  );
  const heroSectionY = useSpring(heroSectionYRaw, springOptions);
  const heroSectionOpacity = useTransform(scrollYProgress, [0.08, 0.1], [1, 0]);

  // PROPERTY LOOT SECTION ANIMATIONS
  const lootTextYRaw = useTransform(scrollYProgress, [0.1, 0.15], [300, -200]);
  const lootTextY = useSpring(lootTextYRaw, springOptions);
  const lootTextOpacity = useTransform(scrollYProgress, [0.1, 0.12], [0, 1]);

  const lootImageScaleRaw = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.25],
    [1, 1.2, 0.6]
  );
  const lootImageScale = useSpring(lootImageScaleRaw, springOptions);
  const lootImageOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.25],
    [0, 0.9, 0.4]
  );

  const playButtonScale = lootImageScale;
  const playButtonOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.18, 0.22, 0.25],
    [0, 1, 1, 0]
  );

  const lootContainerYRaw = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.25],
    [window.innerHeight, 0, -window.innerHeight]
  );
  const lootContainerY = useSpring(lootContainerYRaw, springOptions);
  const lootContainerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.15, 0.23, 0.25],
    [0, 1, 1, 0]
  );

  // PROPERTY FESTIVAL SECTION ANIMATIONS
  const festivalSectionYRaw = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.4],
    [window.innerHeight, 0, -window.innerHeight]
  );
  const festivalSectionY = useSpring(festivalSectionYRaw, springOptions);
  const festivalSectionOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.3, 0.38, 0.4],
    [0, 1, 1, 0]
  );

  const leftItemXRaw = useTransform(scrollYProgress, [0.28, 0.35], [-800, 0]);
  const rightItemXRaw = useTransform(scrollYProgress, [0.28, 0.35], [800, 0]);
  const leftItemX = useSpring(leftItemXRaw, springOptions);
  const rightItemX = useSpring(rightItemXRaw, springOptions);

  const middleItemYRaw = useTransform(scrollYProgress, [0.28, 0.35], [300, 0]);
  const middleItemY = useSpring(middleItemYRaw, springOptions);

  // Section 1
  const section1Y = useSpring(
    useTransform(
      scrollYProgress,
      [0.4, 0.45, 0.47, 0.52],
      [window.innerHeight, 0, 0, -window.innerHeight]
    ),
    springOptions
  );
  const section1Opacity = useTransform(
    scrollYProgress,
    [0.43, 0.45, 0.47, 0.52],
    [0, 1, 1, 0]
  );

  // Section 2 (with scrolling content)
  const section2Y = useTransform(
    scrollYProgress,
    [0.53, 0.58, 0.7, 0.75], // Enters, Pinned from 0.58 to 0.70, Exits
    [window.innerHeight, 0, 0, -window.innerHeight]
  );

  // Opacity and ContentY remain the same as the previous fix
  const section2Opacity = useTransform(
    scrollYProgress,
    [0.55, 0.58, 0.7, 0.75],
    [0, 1, 1, 0]
  );
  const section2ContentY = useTransform(
    scrollYProgress,
    [0.58, 0.7], // Content scrolls ONLY when the section is pinned
    [0, -700]
  );

  // Section 3 (with scrolling content for images and text)
  const section3Y = useSpring(
    useTransform(
      scrollYProgress,
      [0.75, 0.8, 0.9, 0.94], // Pinned from 0.76 to 0.90
      [window.innerHeight, 0, 0, -window.innerHeight]
    ),
    springOptions
  );
  const section3Opacity = useTransform(
    scrollYProgress,
    [0.77, 0.8, 0.9, 0.94],
    [0, 1, 1, 0]
  );
  const section3ContentY = useTransform(
    scrollYProgress,
    [0.8, 0.9], // Adjust scroll range to match the new pinned state
    [0, -500]
  );

  // Animations for images in Section 3
  const image1X = useSpring(
    useTransform(scrollYProgress, [0.74, 0.77], [-300, 0]),
    springOptions
  );
  const image1Opacity = useTransform(scrollYProgress, [0.74, 0.77], [0, 1]);

  const image2X = useSpring(
    useTransform(scrollYProgress, [0.74, 0.77], [300, 0]),
    springOptions
  );
  const image2Opacity = useTransform(scrollYProgress, [0.74, 0.77], [0, 1]);

  const image3X = useSpring(
    useTransform(scrollYProgress, [0.78, 0.81], [-300, 0]),
    springOptions
  );
  const image3Opacity = useTransform(scrollYProgress, [0.78, 0.81], [0, 1]);

  const image4X = useSpring(
    useTransform(scrollYProgress, [0.78, 0.81], [300, 0]),
    springOptions
  );
  const image4Opacity = useTransform(scrollYProgress, [0.78, 0.81], [0, 1]);

  // Section 4 (FORM SECTION) - MODIFIED FOR DIRECT "DRAG" EFFECT
  // We removed useSpring here to create a tight, non-bouncy stickiness.
  const section4Y = useTransform(
    scrollYProgress,
    // Enters at 0.95, then from 0.95 to 1.0 it slowly moves up by 350px.
    [0.92, 0.95, 1.0],
    [window.innerHeight, 0, -350]
  );
  const section4Opacity = useTransform(
    scrollYProgress,
    // Fades in, stays, and then fades out towards the end.
    [0.93, 0.95, 0.98, 1.0],
    [0, 1, 1, 0]
  );

  // FINAL CTA SECTION (Section 5)
  const ctaSectionY = useSpring(
    useTransform(
      scrollYProgress,
      [0.95, 1.0], // Starts coming in as Section 4 becomes sticky.
      [window.innerHeight, 0]
    ),
    springOptions
  );
  const ctaSectionOpacity = useTransform(scrollYProgress, [0.97, 1.0], [0, 1]);

  const possibilitiedData = [
    { id: 1, imgNo: 1, text: "Meet 30+ Top Developers" },
    { id: 2, imgNo: 2, text: "On-Spot Exclusive Deals" },
    { id: 3, imgNo: 3, text: "All Luxury Projects Under One Roof" },
    { id: 4, imgNo: 4, text: "Discover Your Dream Home" },
  ];

  return (
    <div className="relative min-h-[100vh] overflow-hidden bg-[#0f0f1e]">
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
          <p className="text-white text-[18px] lg:text-[30px] font-light lg:mb-2 mb-6 sm:max-w-3xl leading-relaxed font-lato italic text-center px-4">
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
              backgroundImage: "url('/BuidingsBG.png')",
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

      {/* PROPERTY FESTIVAL SECTION */}
      <motion.div
        className="fixed inset-0 w-full h-full z-25 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e]"
        style={{
          y: festivalSectionY,
          opacity: festivalSectionOpacity,
        }}
      >
        <div className="h-full flex flex-col items-center justify-center px-4">
          <div className="mt-20 mb-[50px]">
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

      {/* Section 1 */}
      <motion.div
        className="fixed inset-0 w-full h-full z-25 bg-gray-900 flex items-center justify-center"
        style={{
          y: section1Y,
          opacity: section1Opacity,
        }}
      >
        <PropertyCarousel />
      </motion.div>

      {/* Section 2 */}
      <motion.div
        className="fixed inset-0 h-full z-25 bg-gray-900 pt-[70px]"
        style={{
          y: section2Y,
          opacity: section2Opacity,
        }}
      >
        <div className="w-full h-full relative overflow-hidden">
          <motion.div style={{ y: section2ContentY }}>
            <ScrollReveal>
              <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-10">
                <span className="underline-gold-gradient font-bold">
                  Developers
                </span>{" "}
                You trust.
              </h2>
              <h2 className="text-white text-[28px] sm:text-[36px] md:text-[46px] text-center font-chronicle">
                Offers{" "}
                <span className="underline-gold-gradient font-bold">
                  You Can't Miss.
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative w-full mt-[40px] sm:mt-[72px] mb-[80px] sm:mb-[144px]">
                <Image
                  src="/LogosBG.png"
                  alt="Logos Background"
                  layout="fill"
                  objectFit="cover"
                  className="z-[0]"
                />
                <div className="relative z-10 flex justify-center py-10 sm:py-16 px-[4%]">
                  <Image
                    src="/BuilderLogos.png"
                    alt="BuilderLogos"
                    height={225}
                    width={780}
                    className="w-full max-w-full sm:max-w-[780px] h-auto object-contain"
                  />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6">
                One Event.{" "}
                <span className="underline-gold-gradient font-bold">
                  Unlimited Possibilities.
                </span>
              </h2>
            </ScrollReveal>
            <PossibilitiesGrid data={possibilitiedData} />
            <div className="h-48"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 3: Focus Projects */}
      <motion.div
        className="fixed inset-0 h-full w-full z-27 bg-[#1a1a2e]"
        style={{
          y: section3Y,
          opacity: section3Opacity,
        }}
      >
        <div className="w-full relative overflow-hidden flex flex-col pt-[70px] items-center">
          <motion.div
            className="text-center text-white p-8 flex flex-col items-center w-full"
            style={{ y: section3ContentY }}
          >
            <ScrollReveal>
              <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle px-4">
                Our{" "}
                <span className="underline-gold-gradient font-bold">
                  Focus Projects.
                </span>
              </h2>
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-12 w-full max-w-screen-xl px-4">
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                style={{ x: image1X, opacity: image1Opacity }}
              >
                <Image
                  src="/FocusProject1.png"
                  alt="Focus Project 1"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                />
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-start"
                style={{ x: image2X, opacity: image2Opacity }}
              >
                <Image
                  src="/FocusProject2.png"
                  alt="Focus Project 2"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                />
              </motion.div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-12 w-full max-w-screen-xl px-4">
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                style={{ x: image3X, opacity: image3Opacity }}
              >
                <Image
                  src="/FocusProject3.png"
                  alt="Focus Project 3"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                />
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2 flex justify-center lg:justify-start"
                style={{ x: image4X, opacity: image4Opacity }}
              >
                <Image
                  src="/FocusProject4.png"
                  alt="Focus Project 4"
                  width={800}
                  height={500}
                  className="max-w-full h-auto"
                />
              </motion.div>
            </div>
            <div className="h-48"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 4: STICKY FORM SECTION */}
      <motion.div
        id="form-section"
        className="fixed inset-0 h-full w-full z-28"
        style={{
          y: section4Y, // Now using the direct transform value
          opacity: section4Opacity,
        }}
      >
        <div
          id="registration-form"
          className="w-full h-full bg-[url(/FormBG.png)] bg-cover bg-center flex justify-between flex-col lg:flex-row p-4 pt-[140px] lg:px-[8%]"
        >
          <div className="lg:w-[50%]">
            <p className="flex items-center font-lato text-[18px] lg:max-w-[70%] text-white font-[700] gap-1 mb-5">
              <IoLocationOutline size={60} color="#fff" />
              <span>
                GH-01, Greater Noida W Rd, E Block, Gaur City 1, Sector 04,
                Sector 4, Greater Noida
              </span>
            </p>
            <p className="flex items-center font-lato italic text-[18px] text-white font-[700] gap-1 mb-4 lg:pl-[5px]">
              <FaRegClock size={35} color="#fff" />
              <span>10AM Onwards</span>
            </p>
            <div className="w-[50%] h-[50%]">
              {/* <Image
                src={"/FormTextImg.png"}
                layout="fill"
                objectFit="cover"
                alt="Logo"
              /> */}
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col items-center justify-between">
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 px-4">
              Don't Miss,{" "}
              <span className="underline-gold-gradient font-bold">
                Register
              </span>{" "}
              Yourself.
            </h2>
            <div className="w-full lg:w-[60%] bg-white/15 backdrop-blur-sm p-[5%] font-lato italic text-white z-20 rounded-md gradient-border-form">
              <div>
                <p className="text-left text-lg sm:text-[26px] mb-6 sm:mb-8 leading-relaxed">
                  Let's Make Your <br />
                  Dream Home Reality!
                </p>
                <MultiStepForm />
              </div>
            </div>
            <div className="h-[10%]" />
          </div>
        </div>
      </motion.div>

      {/* Spacer to define the total scrollable height */}
      <div className="h-[5000vh]" />

      {/* FINAL CTA SECTION */}
      <motion.div
        className="fixed inset-0 h-full w-full z-27 bg-[#0f0f1e] overflow-y-auto"
        style={{
          y: ctaSectionY,
          opacity: ctaSectionOpacity,
        }}
      >
        <div className="w-full min-h-screen relative pt-[100px] pb-16">
          <ScrollReveal>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 px-4">
              <span className="underline-gold-gradient font-bold">Voices</span>{" "}
              That Matter
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="w-full px-[5%] sm:px-[10%] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-8">
              <FaRegArrowAltCircleLeft size={24} color="#fff" />
              <div className="w-full flex flex-col justify-center sm:flex-row items-center sm:items-end max-w-[1000px] transition-transform">
                <Image
                  src="/DLFCEO.png"
                  alt="person"
                  height={290}
                  width={223}
                  className="w-[150px] sm:w-[223px] h-auto object-cover z-10"
                />
                <div className="w-full sm:w-[65%] sm:ml-[-40px] mt-[-50px] sm:mt-[180px] pt-[60px] sm:pt-[40px] bg-white rounded-md px-6 sm:px-8 shadow-md z-0">
                  <p className="font-chronicle text-xl sm:text-[28px] text-[#0F0F0F] mb-2 pl-[5%]">
                    Mr. Vihaan Jain{" "}
                    <span className="text-xs sm:text-[15px] italic">
                      CEO, DLF
                    </span>
                  </p>
                  <p className="font-lato italic text-sm sm:text-[16px] text-[#888888] font-light pl-[5%]">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                  <div className="flex mt-4 sm:mt-6 mb-3 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <IoIosStar key={i} size={14} color="#E2B110" />
                    ))}
                  </div>
                </div>
              </div>
              <FaRegArrowAltCircleRight size={24} color="#fff" />
            </div>
          </ScrollReveal>
          <footer className="relative w-full mt-[80px] sm:mt-[150px] text-white">
            <Image
              src="/FooterBG.png"
              alt="Footer Background"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center w-full px-[5%] py-8 sm:px-[10%] sm:py-10 gap-8">
              <Image
                src="/HeroLogo.png"
                alt="Logo"
                width={150}
                height={80}
                className="object-contain w-[150px] sm:w-[250px]"
              />
              <nav className="flex flex-wrap justify-center gap-x-6 sm:gap-x-14 font-lato italic text-base">
                {["Event", "Gallery", "Location", "Contact Us"].map(
                  (text, i) => (
                    <a
                      key={i}
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      {text}
                    </a>
                  )
                )}
              </nav>
            </div>
          </footer>
          <div className="relative z-10 w-full px-[5%] sm:px-[10%] mt-6">
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between items-center text-white text-sm gap-4 pt-4">
              <p className="mt-4 sm:mt-0 text-center">
                All copyright reserved @2025
              </p>
              <div className="flex gap-x-5">
                {[FiFacebook, FiInstagram, FiLinkedin, FiTwitter].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="https://bop.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Icon size={20} />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MergedHeroPropertyComponent;
