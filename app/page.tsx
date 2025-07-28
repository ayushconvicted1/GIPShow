import MultiStepForm from "@/components/ui/Form";
import FocusProjectCarousel from "@/components/ui/HomeCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import Timer from "@/components/ui/Timer";
import Image from "next/image";
import React, { Suspense } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import ScrollToFormButton from "@/components/ui/ScrollToForm";

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-[#171A34]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-30 flex justify-between items-center pl-4 sm:pl-6 h-[60px] sm:h-[85px] text-white bg-[#fff] bg-opacity-25 backdrop-blur-md">
        <div className="flex items-center">
          <Image
            src="/HamburgerIcon.svg"
            alt="Menu"
            width={40}
            height={14}
            className="w-[40px] sm:w-[57px] h-[14px] sm:h-[18px]"
          />
        </div>
        <Image
          src="/HeaderLogo.png"
          alt="HeaderLogo"
          width={60}
          height={45}
          className="my-[5px] w-[60px] sm:w-[80px] h-[45px] sm:h-[60px] sm:my-[7px]"
        />
        <ScrollToFormButton className="h-full bg-gradient-to-r from-[#2597EF] to-[#A14EFF] hover:opacity-90 text-white font-medium w-[100px] xs:w-[120px] sm:w-[172px] text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2">
          Inquire Now
        </ScrollToFormButton>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-[80px] sm:pt-[120px] text-center px-4 sm:px-6 overflow-hidden flex flex-col">
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

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-white text-sm sm:text-lg md:text-xl font-light mb-[15%] sm:mb-6 max-w-[90%] sm:max-w-3xl leading-relaxed font-lato italic">
            Experience premium living, curated deals, and direct access to top
            developers — all in one place.
          </p>
          <Timer />
        </div>

        {/* Mobile-only centered content */}
        <div className="sm:hidden flex flex-col items-center z-50 justify-start flex-grow">
          <div className="w-full absolute bottom-0 px-4">
            <Image
              src="/HeroPeopleBG.png"
              alt="People Foreground"
              width={1000}
              height={600}
              layout="intrinsic"
              objectFit="contain"
              className="w-full h-auto"
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

          <div className="relative mt-[22%] z-20 flex flex-col items-center space-y-6 mb-4 sm:mb-6 w-full">
            <ScrollToFormButton className="bg-gradient-to-r from-[#5F5AF7] to-[#AC87F7] hover:opacity-90 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-md shadow-lg">
              Register Now
            </ScrollToFormButton>
            <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] font-light text-center font-chronicle w-[90%] sm:w-auto">
              A{" "}
              <span className="font-semibold underline decoration-[#2597EF] decoration-4 underline-offset-[6px]">
                Glimpse
              </span>{" "}
              of Unlimited Possibilities.
            </h2>
          </div>
        </div>

        {/* Desktop content */}
        <div className="hidden sm:flex flex-grow"></div>

        <div className="hidden sm:block relative z-20 flex-col items-center justify-end space-y-6 mb-4 sm:mb-6">
          <ScrollToFormButton className="bg-gradient-to-r from-[#5F5AF7] to-[#AC87F7] hover:opacity-90 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-md shadow-lg">
            Register Now
          </ScrollToFormButton>
          <h2 className="text-white text-[28px] sm:text-[32px] md:text-[40px] font-light text-center font-chronicle w-[90%] sm:w-auto">
            A{" "}
            <span className="font-semibold underline decoration-[#2597EF] decoration-4 underline-offset-[6px]">
              Glimpse
            </span>{" "}
            of Unlimited Possibilities.
          </h2>
        </div>

        {/* Desktop-only People Image (bottom of hero section) */}
        <div className="hidden sm:block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full px-4 sm:px-0 people-image-wrapper">
          <div className="mx-auto w-full sm:w-[52%]">
            <Image
              src="/HeroPeopleBG.png"
              alt="People Foreground"
              width={1000}
              height={600}
              layout="intrinsic"
              objectFit="contain"
              className="w-full h-auto"
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
        </div>
      </section>

      {/* Event Section */}
      <section className="bg-[#171a34]/80 text-white pt-[40px] sm:pt-[80px]">
        <SectionHeading
          leadingText="Our Event."
          highlightText="Unlimited Possibilities"
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[40px] sm:mt-[80px] px-[5%] sm:px-[10%]">
          {["4", "3", "2", "1"].map((i) => (
            <Image
              key={i}
              src={`/Possibilities${i}.png`}
              height={300}
              width={180}
              alt="Possibilities"
              className="w-full h-[300px] sm:h-[450px] object-cover"
            />
          ))}
        </div>
      </section>

      {/* Logos & Focus Projects */}
      <section className="bg-[#171a34]/80 text-white pt-[40px] sm:pt-[80px] flex flex-col items-center">
        <SectionHeading
          leadingText="10+ Iconic Real Estate Brands"
          highlightText="Under One Roof"
        />
        <div className="relative w-full mt-[40px] sm:mt-[72px] mb-[80px] sm:mb-[144px] flex justify-center overflow-x-visible px-[4%]">
          <Image
            src="/BuilderLogos.png"
            alt="BuilderLogos"
            height={150}
            width={520}
            className="w-full sm:w-[780px] max-w-full h-[150px] sm:h-[225px] object-contain"
          />
        </div>
        <div className="my-[40px] sm:my-[85px] w-full px-[5%] sm:px-0">
          <FocusProjectCarousel />
        </div>

        {/* Registration Form */}
        <div id="registration-form" className="w-full">
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
                  Let's Make Your <br />
                  Dream Home Reality!
                </p>
                <Suspense fallback={<div>Loading...</div>}>
                  <MultiStepForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Voices Section */}
        <SectionHeading
          leadingText="Voices"
          highlightText="That Matter"
          underlineLeading
        />
        <div className="mt-[40px] sm:mt-[61px] w-full px-[5%] sm:px-[10%] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div className="hidden sm:flex items-center">
            <FaRegArrowAltCircleLeft size={24} color="#fff" />
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-end max-w-[1000px]">
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
                <span className="text-xs sm:text-[15px] italic">CEO, DLF</span>
              </p>
              <p className="font-lato italic text-sm sm:text-[16px] text-[#888888] font-light pl-[5%]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <div className="flex mt-4 sm:mt-6 mb-3 justify-end">
                {[...Array(5)].map((_, i) => (
                  <IoIosStar key={i} size={14} color="#E2B110" />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <FaRegArrowAltCircleRight size={24} color="#fff" />
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full mt-[80px] sm:mt-[150px] bg-white py-[15px] sm:py-[20px] px-[5%] sm:px-[15%] flex flex-col sm:flex-row justify-between items-center text-[#0F0F0F] gap-4 sm:gap-0">
          <Image
            src="/ColorLogo.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain sm:w-[220px] sm:h-[80px]"
          />
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-[56px] font-lato italic text-sm sm:text-[16px]">
            {["About Us", "Event", "Gallery", "Location", "Contact Us"].map(
              (text, i) => (
                <a
                  key={i}
                  href="https://bop.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2597EF] transition-colors duration-200"
                >
                  {text}
                </a>
              )
            )}
          </nav>
        </footer>
        <div className="flex flex-col sm:flex-row w-full justify-between px-[5%] sm:px-[10%] py-[8px] sm:py-[10px] items-center text-white gap-2 sm:gap-0">
          <p className="text-xs sm:text-[15px]">All copyright reserved @2025</p>
          <div className="flex w-[30%] sm:w-[7%] justify-between">
            {[FiFacebook, FiInstagram, FiLinkedin, FiTwitter].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="https://bop.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon key={idx} size={16} className="sm:w-[20px]" />
                </a>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
