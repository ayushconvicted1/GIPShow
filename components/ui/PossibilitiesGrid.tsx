import React from "react";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

const PossibilitiesGrid = React.memo(({ data }: any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 my-[40px] sm:mt-[80px] lg:px-[10%] px-[5%]">
      {data.map((i: any) => (
        <ScrollReveal key={i.id}>
          <div className="relative w-full flex justify-center group overflow-hidden">
            <Image
              src={`/Possibilities${i.imgNo}.png`}
              height={280}
              width={160}
              alt="Possibilities"
              className="w-full h-auto object-cover"
            />
            {/* --- FINAL OVERLAY --- */}
            <div
              className="absolute inset-0 
                         bg-gradient-to-t from-black/80 to-transparent  /* Default state has the gradient */
                         group-hover:opacity-0                          /* Gradient fades out on hover */
                         transition-opacity duration-300"
            ></div>
            {/* --- END FINAL OVERLAY --- */}

            {/* --- TEXT (NO HOVER EFFECT) --- */}
            <p className="absolute top-[45%] px-[10%] text-center text-[30px] text-white italic font-lato z-10">
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
