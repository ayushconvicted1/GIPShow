"use client";

import Image from "next/image";

const logos = Array.from({ length: 15 }, (_, i) => `/Logo${i + 1}.webp`);

export default function LogoCarousel() {
  return (
    <div className="w-full overflow-hidden flex items-center">
      <div className="marquee flex items-center">
        {/* Track duplicated ONCE for seamlessness */}
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-40 py-[30px] flex items-center justify-center mx-8"
          >
            <Image
              src={src}
              alt={`Logo ${i + 1}`}
              width={120}
              height={80}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
