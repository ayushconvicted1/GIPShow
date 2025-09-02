"use client";

import dynamic from "next/dynamic";
import Image from "next/image"; // Import the Next.js Image component

const Hero = dynamic(() => import("@/components/ui/Hero"), { ssr: false });
const ScrollToFormButton = dynamic(
  () => import("@/components/ui/ScrollToForm"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#171A34]">
      {/* --- REFINED RESPONSIVE HEADER --- */}
      <header
        className="
    fixed top-0 left-0 w-full z-[99] 
    flex items-center justify-between 
    h-16 px-4 sm:px-6 lg:px-8
    text-white bg-black/25 backdrop-blur-lg
    transition-all duration-300
  "
      >
        {/* LEFT SIDE: Title + Slogan */}
        <div className="flex flex-col">
          <h1 className="text-lg sm:text-xl font-lato font-bold tracking-wide">
            Big Festival Event
          </h1>
          <p className="hidden sm:block text-xs text-white/70 italic">
            One Day. Endless Choices. Unbeatable Offers.
          </p>
        </div>

        {/* RIGHT SIDE: Call to Action Button */}
        <ScrollToFormButton
          className="
      flex-shrink-0 whitespace-nowrap
      bg-gradient-to-r from-[#FBF09C] via-[#C6932F] to-[#FBF09C] 
      hover:opacity-90 text-[#2F2F2F] 
      font-chronicle font-semibold text-sm 
      px-4 py-2 md:px-5 rounded-md 
      transition-transform duration-200 ease-in-out hover:scale-105
    "
        >
          Register Now
        </ScrollToFormButton>
      </header>

      {/* --- END OF HEADER --- */}

      <Hero />
    </div>
  );
}
