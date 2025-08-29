"use client";
import React, { useEffect, useState } from "react";

// Type definition for the component's state for better type safety.
interface TimeLeft {
  Days: number;
  Hours: number;
  Minutes: number;
  Seconds: number;
}

const Timer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date("2025-09-24T00:00:00") - +new Date();

    if (difference > 0) {
      return {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    // Return a zeroed object when the countdown is over.
    return { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const padded = (n: number): string => String(n).padStart(2, "0");

  const keys = Object.keys(timeLeft) as (keyof TimeLeft)[];

  return (
    <div className="flex justify-center w-full max-w-5xl mx-auto px-4 mt-4 lg:mt-8">
      {/* ✅ Main flex container to align timer units and colons. */}
      <div className="flex flex-row items-start justify-center text-white gap-1 sm:gap-2">
        {keys.map((label, index) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              {/* ✅ FIX: Increased size on mobile/tablet to fill space, while preserving original desktop dimensions. */}
              <div className="w-[70px] h-[100px] sm:w-[80px] sm:h-[140px] lg:w-[162px] lg:h-[227px] bg-white/20 backdrop-blur-sm rounded-[15px] lg:rounded-[30px] flex items-center justify-center">
                {/* ✅ Responsive font sizes to match the box sizes. */}
                <span className="font-agency font-bold text-[35px] sm:text-[60px] lg:text-[100px] text-white">
                  {padded(timeLeft[label])}
                </span>
              </div>
              {/* ✅ The label remains centered below for a clean, responsive layout. */}
              <p className="mt-2 text-xs sm:text-sm font-lato italic text-white/80">
                {label}
              </p>
            </div>

            {/* ✅ FIX: Re-added the colon separators with responsive vertical alignment. */}
            {index < keys.length - 1 && (
              <div className="font-agency text-[35px] sm:text-[50px] lg:text-[80px] pt-7 sm:pt-10 lg:pt-[70px]">
                <p>:</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Timer;
