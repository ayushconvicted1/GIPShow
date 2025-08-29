"use client";
import { useEffect, useState } from "react";

const Timer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-09-24T00:00:00") - +new Date();
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

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const padded: any = (n: any) => String(n).padStart(2, "0");

  const keys = ["Days", "Hours", "Minutes", "Seconds"];

  return (
    <div className="flex flex-row flex-wrap justify-center text-white mt-2 px-2 sm:px-4 lg:px-6 gap-2 sm:gap-4 items-center">
      <div className="flex flex-row gap-0 sm:gap-4">
        {keys.map((label, index) => (
          <div key={label} className="flex flex-col items-center relative">
            {label === "Days" && (
              <span className="text-white font-lato italic text-xs sm:text-sm mb-1 absolute left-2 sm:left-4 -top-5 sm:-top-6">
                Days
              </span>
            )}
            <div className="flex flex-row font-agency items-center">
              <div className="bg-[#fff] bg-opacity-20 backdrop-blur-sm w-[70px] sm:w-[80px] lg:w-[162px] h-[100px] sm:h-[140px] lg:h-[227px] text-[35px] sm:text-[60px] lg:text-[100px] font-bold flex items-center justify-center rounded-[15px] sm:rounded-[30px]">
                {padded(timeLeft[label])}
              </div>
              {index !== keys.length - 1 && (
                <p className="w-[14px] sm:w-[20px] lg:w-[30px] items-center flex justify-center text-[35px] sm:text-[50px] lg:text-[80px] ml-1 sm:ml-2">
                  :
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
