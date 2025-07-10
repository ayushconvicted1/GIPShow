"use client";
import { useEffect, useState } from "react";

const Timer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-08-30T00:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padded = (n: any) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-wrap justify-center text-white mt-[8px] sm:mt-[10px] gap-2 sm:gap-0">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center relative">
          {label === "Days" && (
            <span className="text-white text-xs sm:text-sm mb-1 absolute left-3 sm:left-5 -top-5 sm:-top-6">
              Days
            </span>
          )}
          <div className="flex flex-row items-center">
            <div className="bg-[#fff] bg-opacity-20 backdrop-blur-sm w-[100px] sm:w-[162px] h-[140px] sm:h-[227px] text-[50px] sm:text-[80px] font-bold flex items-center justify-center rounded-[20px] sm:rounded-[30px]">
              {padded(value)}
            </div>
            {label !== "Seconds" && (
              <p className="w-[20px] sm:w-[30px] text-[50px] sm:text-[80px] ml-1 sm:ml-2">
                :
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timer;
