import FocusProjectCarousel from "@/components/ui/HomeCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import Timer from "@/components/ui/Timer";
import Image from "next/image";
import React from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-[#171A34]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-30 flex justify-between items-center px-4 sm:px-6 h-[60px] sm:h-[85px] text-white bg-[#fff] bg-opacity-25 backdrop-blur-md">
        <div className="w-[120px]">
          <Image
            src="/HamburgerIcon.svg"
            alt="Menu"
            width={40}
            height={14}
            className="sm:w-[57px] sm:h-[18px]"
          />
        </div>
        <Image
          src="/HeaderLogo.png"
          alt="HeaderLogo"
          width={60}
          height={45}
          className="my-[5px] sm:w-[80px] sm:h-[60px] sm:my-[7px]"
        />
        <button className="h-full bg-[#5F5AF7] hover:bg-[#4c47d1] text-white font-medium w-[120px] sm:w-[172px] text-xs sm:text-sm bg-gradient-to-r from-[#2597EF] to-[#A14EFF] px-2 py-1 sm:px-4 sm:py-2">
          Inquire Now
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-[80px] sm:pt-[120px] text-center px-4 sm:px-6 overflow-hidden">
        {/* Purple Background */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/HeroPurpleBG.png"
            alt="Hero Background"
            layout="fill"
            objectFit="fill"
            quality={100}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-white text-sm sm:text-lg md:text-xl font-light mb-4 sm:mb-6 max-w-[90%] sm:max-w-3xl leading-relaxed font-lato italic">
            Experience premium living, curated deals, and direct access to top
            developers — all in one place.
          </p>
          <Timer />
        </div>

        {/* CTA */}
        <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-center space-y-4 w-[90%] sm:w-auto">
          <button className="bg-gradient-to-r from-[#5F5AF7] to-[#AC87F7] hover:opacity-90 text-white px-4 sm:px-6 py-2 lg:mb-[100px] sm:py-3 text-xs sm:text-sm font-medium rounded-md shadow-lg">
            Register Now
          </button>
          <div className="text-white text-[32px] md:text-[40px] font-light text-center font-chronicle">
            A{" "}
            <span className="font-semibold underline decoration-[#2597EF] decoration-4 underline-offset-[6px]">
              Glimpse
            </span>{" "}
            of Unlimited Possibilities.
          </div>
        </div>

        {/* People Image */}
        <div className="absolute lg:bottom-0 sm:bottom-[50%] left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[56%] z-10">
          <Image
            src="/HeroPeopleBG.png"
            width={1000}
            height={200}
            layout="intrinsic"
            objectFit="contain"
            alt="People Foreground"
            className="w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
        </div>
      </section>

      {/* Section 2 - Transition Image & Content */}
      <section className="bg-[#17203d]/80 text-white text-lg sm:text-2xl overflow-hidden">
        {/* Fade-in Section Image */}
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

      <section className="bg-[#171a34]/80 text-white text-lg sm:text-2xl overflow-hidden pt-[40px] sm:pt-[80px]">
        <SectionHeading
          leadingText="Our Event."
          highlightText="Unlimited Possibilities"
        />
        <div className="flex flex-wrap justify-center gap-4 sm:gap-0 sm:justify-between mt-[40px] sm:mt-[80px] px-[5%] sm:px-[10%]">
          <Image
            src="/Possibilities4.png"
            height={300}
            width={180}
            alt="Possibilities"
            className="w-[45%] sm:w-[270px] h-[300px] sm:h-[450px] object-cover"
          />
          <Image
            src="/Possibilities3.png"
            height={300}
            width={180}
            alt="Possibilities"
            className="w-[45%] sm:w-[270px] h-[300px] sm:h-[450px] object-cover"
          />
          <Image
            src="/Possibilities2.png"
            height={300}
            width={180}
            alt="Possibilities"
            className="w-[45%] sm:w-[270px] h-[300px] sm:h-[450px] object-cover"
          />
          <Image
            src="/Possibilities1.png"
            height={300}
            width={180}
            alt="Possibilities"
            className="w-[45%] sm:w-[270px] h-[300px] sm:h-[450px] object-cover"
          />
        </div>
      </section>

      <section className="bg-[#171a34]/80 text-white text-lg sm:text-2xl overflow-hidden pt-[40px] sm:pt-[80px] flex flex-col items-center">
        <SectionHeading
          leadingText="10+ Iconic Real Estate Brands"
          highlightText="Under One Roof"
        />
        <div className="relative w-full overflow-x-visible mt-[40px] sm:mt-[72px] mb-[80px] sm:mb-[144px] flex justify-center">
          <Image
            src="/BuilderLogos.png"
            alt="BuilderLogos"
            height={150}
            width={520}
            className="w-[150%] sm:w-[780px] h-[150px] sm:h-[225px] object-contain"
          />
        </div>
        <SectionHeading leadingText="Our" highlightText="Focus Projects" />
        <div className="my-[40px] sm:my-[85px] w-full px-[5%] sm:px-0">
          <FocusProjectCarousel />
        </div>
        <SectionHeading
          leadingText="Don't Miss,"
          highlightText="Register Yourself."
        />
        <div className="pt-[40px] sm:pt-[70px] flex w-full justify-center mb-[40px] sm:mb-[70px] px-[5%] sm:px-0">
          <div className="flex flex-col sm:flex-row w-full sm:w-[80%] items-center justify-between gap-6 sm:gap-0">
            <div
              className="w-full sm:w-[60%] h-[300px] sm:h-[580px] bg-[#171a34] overflow-hidden"
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
            <div className="w-full sm:w-[35%] font-lato italic text-white">
              <p className="text-left text-lg sm:text-[25px] mb-6 sm:mb-8 leading-relaxed">
                Let’s Make Your <br />
                Dream Home Reality!
              </p>
              <form className="flex flex-col space-y-5 w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
                />
                <input
                  type="tel"
                  placeholder="Phone No"
                  className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 sm:py-2.5 bg-white text-[#171A34] font-medium rounded-md hover:opacity-90 flex justify-center items-center gap-2 text-sm sm:text-[16px] font-lato italic"
                >
                  Next <span className="text-base sm:text-lg">➜</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <SectionHeading
          leadingText="Voices"
          highlightText="That Matter"
          underlineLeading
        />
        <div className="mt-[40px] sm:mt-[61px] w-full px-[5%] sm:px-[10%] flex justify-between items-center">
          <FaRegArrowAltCircleLeft
            size={16}
            color="#fff"
            className="mt-[15%] sm:mt-[15%]"
          />
          <div className="w-[90%] sm:w-[70%] flex relative justify-end">
            <Image
              src="/DLFCEO.png"
              alt="person"
              height={290}
              width={223}
              className="absolute left-0 bottom-0 w-[150px] sm:w-[334px] h-[200px] sm:h-[435px] object-cover"
            />
            <div className="mt-[150px] sm:mt-[220px] w-full sm:w-[85%] pl-[30%] sm:pl-[20%] pt-[30px] sm:pt-[50px] bg-white rounded-md">
              <p className="font-chronicle text-xl sm:text-[32px] text-[#0F0F0F] mb-[8px] sm:mb-[10px] px-4 sm:px-0">
                Mr. Vihaan Jain{" "}
                <span className="text-xs sm:text-[15px] italic">CEO, DLF</span>
              </p>
              <p className="font-lato italic text-sm sm:text-[18px] text-[#888888] font-light pr-[5%] sm:pr-[10%] px-4 sm:px-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <div className="flex justify-self-end mt-[20px] sm:mt-[30px] mb-[15px] sm:mb-[20px] pr-[5%]">
                <IoIosStar size={9} color="#E2B110" />
                <IoIosStar size={9} color="#E2B110" />
                <IoIosStar size={9} color="#E2B110" />
                <IoIosStar size={9} color="#E2B110" />
                <IoIosStar size={9} color="#E2B110" />
              </div>
            </div>
          </div>
          <FaRegArrowAltCircleRight
            size={16}
            color="#fff"
            className="mt-[15%] sm:mt-[15%]"
          />
        </div>
        {/* Footer */}
        <footer className="w-full mt-[80px] sm:mt-[150px] bg-white py-[15px] sm:py-[20px] px-[5%] sm:px-[15%] flex flex-col sm:flex-row justify-between items-center text-[#0F0F0F] gap-4 sm:gap-0">
          <div className="flex items-center">
            <Image
              src="/ColorLogo.png"
              alt="Logo"
              width={150}
              height={50}
              className="object-contain sm:w-[220px] sm:h-[80px]"
            />
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-[56px] font-lato italic text-sm sm:text-[16px]">
            <a
              href="#about"
              className="hover:text-[#2597EF] transition-colors duration-200"
            >
              About Us
            </a>
            <a
              href="#event"
              className="hover:text-[#2597EF] transition-colors duration-200"
            >
              Event
            </a>
            <a
              href="#gallery"
              className="hover:text-[#2597EF] transition-colors duration-200"
            >
              Gallery
            </a>
            <a
              href="#location"
              className="hover:text-[#2597EF] transition-colors duration-200"
            >
              Location
            </a>
            <a
              href="#contact"
              className="hover:text-[#2597EF] transition-colors duration-200"
            >
              Contact Us
            </a>
          </nav>
          <div />
        </footer>
        <div className="flex flex-col sm:flex-row w-full justify-between px-[5%] sm:px-[10%] py-[8px] sm:py-[10px] items-center text-white gap-2 sm:gap-0">
          <p className="text-xs sm:text-[15px]">All copyright reserved @2025</p>
          <div className="flex w-[30%] sm:w-[7%] justify-between">
            <FiFacebook size={16} color="#fff" className="sm:w-[20px]" />
            <FiInstagram size={16} color="#fff" className="sm:w-[20px]" />
            <FiLinkedin size={16} color="#fff" className="sm:w-[20px]" />
            <FiTwitter size={16} color="#fff" className="sm:w-[20px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
