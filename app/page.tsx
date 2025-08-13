"use client";

import React, { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import MultiStepForm from "@/components/ui/Form";
import FocusProjectCarousel from "@/components/ui/HomeCarousel";
import Timer from "@/components/ui/Timer";
import ScrollToFormButton from "@/components/ui/ScrollToForm";
import PropertyCarousel from "@/components/ui/PropertyCarousel";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

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

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#171A34]">
      <Image
        src={"/Confetti.webp"}
        quality={100}
        fill
        priority
        alt="Confetti Background"
        className="object-cover z-[10]" // Adjusted z-index for confetti
      />

      {/* Content Wrapper to lift all content above the confetti */}
      <div className="relative z-1">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-[99] flex justify-between items-center pl-4 sm:pl-6 h-[60px] sm:h-[85px] text-white bg-[#fff] bg-opacity-25 backdrop-blur-md">
          <div className="flex items-center w-[100px] xs:w-[120px] sm:w-[172px]">
            <Image
              src="/HamburgerIcon.svg"
              alt="Menu"
              width={40}
              height={14}
              className="w-[40px] sm:w-[57px] h-[14px] sm:h-[18px]"
            />
          </div>
          <h3 className="font-lato text-[14px] text-center lg:text-[28px] font-bold">
            One Day. Endless Choices. Unbeatable Offers.
          </h3>
          <ScrollToFormButton className="h-full bg-gradient-to-r from-[#2597EF] to-[#A14EFF] hover:opacity-90 text-white font-medium w-[100px] xs:w-[120px] sm:w-[172px] text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 transition-opacity">
            Register Now
          </ScrollToFormButton>
        </header>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative w-full min-h-screen pt-[80px] sm:pt-[120px] px-4 sm:px-6 overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/HeroPurpleBG.png"
              alt="Hero Background"
              layout="fill"
              objectFit="fill"
              quality={100}
              priority
            />
            <Image
              src="/GoldenGlow.png"
              alt="Hero Background"
              layout="fill"
              objectFit="fill"
              quality={100}
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <AnimatedSection delay={0.2} yOffset={20}>
              <p className="text-white text-[20px] lg:text-[30px] font-light mb-6 sm:mb-8 max-w-[90%] sm:max-w-3xl leading-relaxed font-lato italic">
                This is not just another real estate event.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.4} yOffset={20}>
              <p className="text-white text-[42px] lg:text-[52px] font-bold mb-6 sm:mb-8 leading-tight font-chronicle">
                This is “India’s Biggest Property Show”
              </p>
            </AnimatedSection>
            <Image
              src="/HeroLogo.png"
              alt="Hero Logo"
              width={90}
              height={45}
              className="w-[45px] sm:w-[120px] lg:w-[240px] h-auto mb-6 sm:mb-8"
            />
            <div className="flex items-center relative justify-between gap-2 mb-6 sm:mb-8">
              <p className="font-agency font-bold text-[32px] text-white mr-[10px]">
                September
              </p>
              <div className="pr-[22px] pl-[10px] border-x-2 h-[70px] flex items-center pt-[8px] justify-center relative">
                <p className="font-agency font-bold text-[70px] text-white">
                  14 <sup className="text-[20px] absolute top-5">th</sup>
                </p>
              </div>
              <div className="text-left font-lato font-[400] italic text-[18px] text-white">
                <p>Radisson Blu</p>
                <p>Noida Sector 18</p>
              </div>
            </div>
            <Timer />
          </div>
          <div className="relative z-10 flex flex-col items-center -translate-y-10 sm:-translate-y-12 lg:-translate-y-18">
            <div
              style={{ perspective: "1000px" }}
              className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto"
            >
              <motion.div style={{ rotateY }}>
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
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                  }}
                />
              </motion.div>
            </div>
            <div className="relative z-10 flex flex-col items-center mt-6 sm:mt-8">
              <ScrollToFormButton className="absolute -top-20 bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] hover:opacity-90 hover:scale-105 transition-transform text-[#2F2F2F] px-8 py-3 text-[28px] font-chronicle rounded-md shadow-lg">
                Register Now
              </ScrollToFormButton>
              <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
                Now or Never.{" "}
                <span className="underline-gold-gradient font-bold">
                  Everything You Want.
                </span>
              </h2>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="text-white text-lg sm:text-2xl overflow-hidden">
          <div className="w-full z-10 relative">
            <div className="absolute left-[45%] sm:left-[49%] top-[50%] transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/PlayBtn.svg"
                height={40}
                width={40}
                alt="Play"
                className="sm:w-[62px] sm:h-[62px]"
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
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 60%, black 100%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
          </div>
        </section>

        {/* Event Section */}
        <section className="text-white pt-[40px] sm:pt-[80px]">
          <AnimatedSection>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
              India's{" "}
              <span className="underline-gold-gradient font-bold">
                Biggest Property Loot!
              </span>
            </h2>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle sm:w-auto">
              Only on{" "}
              <span className="underline-gold-gradient font-bold">
                14th September!
              </span>
            </h2>
          </AnimatedSection>
          <div className="flex justify-around mt-[50px]">
            {renderItems.map((item, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.2}
                className="flex w-[250px] items-center flex-col"
              >
                <Image
                  src={item.imgSrc}
                  height={175}
                  width={175}
                  alt="Feature Icon"
                  className="pb-[10px] h-[120px] w-[120px] lg:w-[175px] lg:h-[175px]"
                />
                <p className="text-center font-lato text-[24px] leading-[28px] lg:text-[30px] lg:leading-[32px] italic">
                  {item.oneText} <br />
                  <span className="font-bold">{item.twoText}</span>
                  {item?.lineBreak && <br />}
                  {item.threeText}
                </p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-20 mb-[10px] z-[10]">
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle sm:w-auto">
              This Is Not Just a Site Visit. <br />
              <span className="text-[45px]">
                This is a{" "}
                <span className="underline-gold-gradient font-bold">
                  Property Festival.
                </span>
              </span>
            </h2>
          </AnimatedSection>

          <PropertyCarousel />

          <AnimatedSection>
            <h2 className="text-white text-[26px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
              <span className="underline-gold-gradient font-bold">
                Developers
              </span>{" "}
              You trust.
            </h2>
            <h2 className="text-white text-[30px] sm:text-[36px] md:text-[46px] text-center font-chronicle sm:w-auto">
              Offers{" "}
              <span className="underline-gold-gradient font-bold">
                You Can't Miss.
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection className="relative w-full mt-[40px] sm:mt-[72px] mb-[80px] sm:mb-[144px]">
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
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
              One Event.{" "}
              <span className="underline-gold-gradient font-bold">
                Unlimited Possibilities.
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[40px] sm:mt-[80px] px-[5%] sm:px-[10%]">
            {["4", "3", "2", "1"].map((i) => (
              <AnimatedSection key={i} delay={parseInt(i) * 0.1}>
                <Image
                  src={`/Possibilities${i}.png`}
                  height={300}
                  width={180}
                  alt="Possibilities"
                  className="w-full h-[300px] sm:h-[450px] object-cover"
                />
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Focus Projects, Form, Testimonials */}
        <section className="relative text-white pt-[40px] sm:pt-[80px] flex flex-col items-center">
          <AnimatedSection>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
              Our{" "}
              <span className="underline-gold-gradient font-bold">
                Focus Projects.
              </span>
            </h2>
          </AnimatedSection>

          <div className="my-[40px] sm:my-[85px] w-full px-[5%] sm:px-0">
            <FocusProjectCarousel />
          </div>

          <AnimatedSection className="w-full">
            <div id="registration-form">
              <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
                Don't Miss,{" "}
                <span className="underline-gold-gradient font-bold">
                  Register
                </span>{" "}
                Yourself.
              </h2>
              <div className="pt-[40px] sm:pt-[70px] flex w-full justify-center mb-[40px] sm:mb-[70px] px-[5%] sm:px-0">
                <div className="flex flex-col sm:flex-row w-full sm:w-[80%] relative items-center justify-between gap-6 sm:gap-0 lg:pr-[10%]">
                  <div className="absolute inset-0 rounded-sm z-10 bg-gradient-to-l from-[#FF6767]/40 via-[#2F2A4F] to-transparent" />
                  <div
                    className="w-full sm:w-[50%] h-[300px] sm:h-[580px] bg-[#171a34] overflow-hidden"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, black 70%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to right, black 70%, transparent 100%)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
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
                  <div className="w-full sm:w-[35%] font-lato italic text-white z-20">
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
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] text-center font-chronicle mt-6 sm:w-auto">
              <span className="underline-gold-gradient font-bold">Voices</span>{" "}
              That Matter
            </h2>
          </AnimatedSection>
          <div className=" w-full px-[5%] sm:px-[10%] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <motion.div
              className="hidden sm:flex items-center"
              whileHover={{ scale: 1.2 }}
            >
              <IoIosStar size={24} color="#fff" />
            </motion.div>
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-end max-w-[1000px] transition-transform hover:-translate-y-2">
              <Image
                src="/DLFCEO.png"
                alt="person"
                height={290}
                width={223}
                className="w-[150px] sm:w-[300px] h-[200px] sm:h-[420px] object-cover z-0"
              />
              <div className="w-full sm:w-[65%] sm:ml-[-40px] mt-6 sm:mt-[180px] pt-[30px] sm:pt-[40px] bg-white rounded-md px-6 sm:px-8 shadow-md">
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
            <motion.div
              className="hidden sm:flex items-center"
              whileHover={{ scale: 1.2 }}
            >
              <IoIosStar size={24} color="#fff" />
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="relative w-full mt-[80px] lg:px-[10%] sm:mt-[150px] text-white">
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
                width={250}
                height={80}
                className="object-contain w-[200px] sm:w-[250px]"
              />
              <nav className="flex flex-wrap justify-center gap-x-8 sm:gap-x-14 font-lato italic text-base">
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
              <p className="mt-4 sm:mt-0">All copyright reserved @2025</p>
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
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1024px] z-0 pointer-events-none">
        <Image
          src={"/BottomGlow.png"}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Bottom Glow"
        />
      </div>
    </div>
  );
};

export default Home;
