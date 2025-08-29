import React from "react";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

const PossibilitiesGrid = React.memo(({ data }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 my-10 sm:mt-[80px] lg:px-[10%] px-[5%]">
      {data.map((i: any) => (
        <ScrollReveal key={i.id}>
          <div className="relative w-full flex justify-center group overflow-hidden rounded-md">
            <Image
              src={`/Possibilities${i.imgNo}.png`}
              height={280}
              width={160}
              alt="Possibilities"
              className="w-full h-auto object-cover"
            />
            {/* --- Gradient Overlay --- */}
            <div
              className="absolute inset-0 
                         bg-gradient-to-t from-black/80 to-transparent
                         transition-opacity duration-300"
            ></div>

            {/* --- Text --- */}
            {/* ✅ RESPONSIVE FIX: Font size now scales with screen size */}
            <p className="absolute top-[45%] px-[10%] text-center text-white italic font-lato z-10 text-lg sm:text-xl md:text-2xl lg:text-[30px] leading-tight">
              {i.text}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
});

PossibilitiesGrid.displayName = "PossibilitiesGrid";

export default PossibilitiesGrid;
