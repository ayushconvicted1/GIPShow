import React from "react";

interface SectionHeadingProps {
  leadingText: string;
  highlightText: string;
  underlineLeading?: boolean; // ← new prop
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  leadingText,
  highlightText,
  underlineLeading = false, // default is false
}) => {
  return (
    <h2 className="text-white text-[32px] md:text-[40px] font-light text-center font-chronicle">
      {underlineLeading ? (
        <>
          <span className="font-semibold underline decoration-[#2597EF] decoration-4 underline-offset-[6px]">
            {leadingText}
          </span>{" "}
          {highlightText}
        </>
      ) : (
        <>
          {leadingText}{" "}
          <span className="font-semibold underline decoration-[#2597EF] decoration-4 underline-offset-[6px]">
            {highlightText}
          </span>
        </>
      )}
    </h2>
  );
};

export default SectionHeading;
