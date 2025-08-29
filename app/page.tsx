"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/ui/Hero"), { ssr: false });
const ScrollToFormButton = dynamic(
  () => import("@/components/ui/ScrollToForm"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#171A34]">
      {/* <header className="fixed top-0 left-0 w-full z-[99] flex justify-between items-center pl-[20px] sm:pl-6 h-[60px] sm:h-[85px] text-white bg-[#fff] bg-opacity-25 backdrop-blur-md">
        <div className="flex items-center w-[80px] lg:w-[130px]"></div>
        <h3 className="font-lato text-[12px] text-center sm:text-[14px] lg:text-[22px] font-bold px-2">
          One Day. Endless Choices. Unbeatable Offers.
        </h3>
        <ScrollToFormButton className="h-full bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] hover:opacity-90 text-[#2F2F2F] font-chronicle font-medium w-[100px] lg:w-[150px] text-md lg:text-md px-2 py-1 sm:px-4 sm:py-2 transition-opacity">
          Register Now
        </ScrollToFormButton>
      </header> */}
      <Hero />
    </div>
  );
}
