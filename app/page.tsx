"use client";

import React, { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MultiStepForm from "@/components/ui/Form";
import FocusProjectCarousel from "@/components/ui/HomeCarousel";
import Timer from "@/components/ui/Timer";
import ScrollToFormButton from "@/components/ui/ScrollToForm";
import PropertyCarousel from "@/components/ui/PropertyCarousel";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import ScrollReveal from "@/components/ui/ScrollReveal"; // Using our perfected ScrollReveal component
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

interface RenderItem {
  imgSrc: string;
  oneText?: string;
  twoText: string;
  threeText?: string;
  lineBreak?: boolean;
}

const renderItems: RenderItem[] = [
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
    threeText: `${"\n"} On Every Booking`,
    lineBreak: true,
  },
  {
    imgSrc: "/WinIphoneImg.svg",
    oneText: "Win an",
    twoText: "iPhone",
    threeText: "",
  },
];

// A simple animation variant for timed entrances
const timedEntrance = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#171A34]">
      {/* Confetti Image */}
      <Image
        src={"/Confetti.webp"}
        quality={100}
        fill
        objectFit="cover"
        priority
        alt="Confetti Background"
        className="object-cover z-[2] pointer-events-none"
      />
      {/* Main Content Wrapper */}
      <div className="relative z-[1]">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-[99] flex justify-between items-center pl-[20px] sm:pl-6 h-[60px] sm:h-[85px] text-white bg-[#fff] bg-opacity-25 backdrop-blur-md">
          <div className="flex items-center w-[80px] lg:w-[130px]">
            {/* <Image
              src="/HamburgerIcon.svg"
              alt="Menu"
              width={24}
              height={14}
              className="w-[24px] sm:w-[40px] h-auto"
            /> */}
          </div>
          <h3 className="font-lato text-[12px] text-center sm:text-[14px] lg:text-[22px] font-bold px-2">
            One Day. Endless Choices. Unbeatable Offers.
          </h3>
          <ScrollToFormButton className="h-full bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] hover:opacity-90 text-[#2F2F2F] font-chronicle font-medium w-[100px] lg:w-[150px] text-md lg:text-md px-2 py-1 sm:px-4 sm:py-2 transition-opacity">
            Register Now
          </ScrollToFormButton>
        </header>

        {/* Hero Section */}
        <section className="relative w-full min-h-screen pt-[80px] sm:pt-[120px] px-4 sm:px-6 overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 z-0">
            <Image
              src="/HeroPurpleBG.png"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
            <Image
              src="/GoldenGlow.png"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Timed entrance animation for content visible on load */}

            <p className="text-white text-[18px] lg:text-[30px] font-light mb-4 sm:mb-8 sm:max-w-3xl leading-relaxed font-lato italic">
              This is not just another real estate event.
            </p>

            <p className="text-white text-[32px] lg:text-[52px] font-bold mb-4 sm:mb-8 leading-tight font-chronicle">
              This is “India’s Biggest Property Show”
            </p>

            <Image
              src="/HeroLogo.png"
              alt="Hero Logo"
              width={90}
              height={45}
              className="w-[90px] sm:w-[120px] lg:w-[240px] h-auto mb-4 sm:mb-8"
            />

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
                Sectory 134 Noida
              </div>
            </div>
            <Timer />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center -translate-y-10 sm:-translate-y-12 lg:-translate-y-18">
            {/* Scroll-reveal animation for the hero people image */}
            <ScrollReveal>
              <div className="flex justify-center w-full">
                <Image
                  src="/HeroPeopleBG.png"
                  alt="People Foreground"
                  width={1000}
                  height={200}
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 80%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 80%, transparent 100%)",
                  }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative z-10 flex flex-col items-center mt-6 sm:mt-8">
                <ScrollToFormButton className="absolute -top-16 bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] hover:opacity-90 hover:scale-105 transition-transform text-[#2F2F2F] px-6 py-2 text-[22px] sm:px-8 sm:py-3 sm:text-[28px] font-chronicle rounded-md shadow-lg">
                  Register Now
                </ScrollToFormButton>
                <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
                  Now or Never.{" "}
                  <span className="underline-gold-gradient font-bold">
                    Everything You Want.
                  </span>
                </h2>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* --- All sections below use ScrollReveal for a consistent feel --- */}

        <ScrollReveal>
          <section className="bg-[#17203d]/80 text-white text-lg sm:text-2xl overflow-hidden">
            <div className="w-full z-10 relative">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/PlayBtn.svg"
                  height={40}
                  width={40}
                  alt="Play"
                  className="w-[40px] h-[40px] sm:w-[62px] sm:h-[62px]"
                />
              </div>
              <Image
                src="/Section2Top.png"
                layout="responsive"
                width={1920}
                height={150}
                objectFit="cover"
                alt="Section Transition"
                className="w-full opacity-70"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
                }}
              />
            </div>
          </section>
        </ScrollReveal>

        <section className="bg-[#171a34]/80 text-white pt-[40px] sm:pt-[80px] px-4">
          <ScrollReveal>
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6">
              India's{" "}
              <span className="underline-gold-gradient font-bold">
                Biggest Property Loot!
              </span>
            </h2>
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle">
              Only on{" "}
              <span className="underline-gold-gradient font-bold">
                14th September!
              </span>
            </h2>
          </ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-around mt-[50px] gap-10 sm:gap-4">
            {renderItems.map((item, index) => (
              <ScrollReveal
                key={index}
                className="flex w-full max-w-[250px] items-center flex-col"
              >
                <Image
                  src={item.imgSrc}
                  height={120}
                  width={120}
                  alt="Feature Icon"
                  className="pb-[10px] w-[120px] h-[120px] lg:w-[175px] lg:h-[175px]"
                />
                <p className="text-center font-lato text-[20px] leading-[26px] lg:text-[30px] lg:leading-[32px] italic">
                  {item.oneText} <br />
                  <span className="font-bold">{item.twoText}</span>
                  {item?.lineBreak && <br />}
                  {item.threeText}
                </p>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="mt-20 mb-[10px]">
              <h2 className="text-white text-[24px] sm:text-[32px] md:text-[40px] text-center font-chronicle">
                This Is Not Just a Site Visit. <br />
                <span className="text-[30px] sm:text-[45px]">
                  This is a{" "}
                  <span className="underline-gold-gradient font-bold">
                    Property Festival.
                  </span>
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <PropertyCarousel />
          </ScrollReveal>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[40px] sm:mt-[80px] px-[5%]">
            {["4", "3", "2", "1"].map((i) => (
              <ScrollReveal key={i}>
                <Image
                  src={`/Possibilities${i}.png`}
                  height={300}
                  width={180}
                  alt="Possibilities"
                  className="w-full h-auto object-cover"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="relative z-10 text-white pt-[40px] sm:pt-[80px] flex flex-col items-center">
          <ScrollReveal>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 px-4">
              Our{" "}
              <span className="underline-gold-gradient font-bold">
                Focus Projects.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="my-[40px] sm:my-[85px] w-full">
              <FocusProjectCarousel />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div id="registration-form">
              <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 px-4">
                Don't Miss,{" "}
                <span className="underline-gold-gradient font-bold">
                  Register
                </span>{" "}
                Yourself.
              </h2>
              <div className="pt-[40px] sm:pt-[70px] flex w-full justify-center mb-[40px] sm:mb-[70px] px-[5%]">
                <div className="flex flex-col sm:flex-row w-full sm:w-[80%] relative items-center justify-between gap-6 sm:gap-0 lg:pr-[10%]">
                  <div className="absolute inset-0 rounded-sm z-10 bg-gradient-to-l from-[#FF6767]/40 lg:via-[#2F2A4F] to-transparent" />
                  <div
                    className="w-full sm:w-[50%] h-[300px] sm:h-[580px] bg-[#171a34] overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(to right, black 70%, transparent 100%)",
                    }}
                  >
                    <Image
                      src="/RegistrationImage.png"
                      alt="Register"
                      width={1000}
                      height={663}
                      className="w-full h-full object-cover object-left opacity-50"
                    />
                  </div>
                  <div className="w-full sm:w-[45%] lg:w-[35%] font-lato italic text-white z-20 px-4 sm:px-0">
                    <p className="text-left text-lg sm:text-[30px] mb-6 sm:mb-8 leading-relaxed">
                      Let's Make Your <br />
                      Dream Home Reality!
                    </p>
                    <Suspense
                      fallback={
                        <div className="text-center">Loading Form...</div>
                      }
                    >
                      <MultiStepForm />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

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

          {/* Footer */}
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
          <div className="w-full px-[5%] sm:px-[10%] mt-6 mb-4">
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
        </section>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 w-full h-[512px] sm:h-[1024px] z-0 pointer-events-none">
          <Image
            src={"/BottomGlow.png"}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Bottom Glow"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
