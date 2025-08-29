"use client";

import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ScrollToFormButton = ({ children, className, ...props }: Props) => {
  const handleScroll = () => {
    // The form section is designed to be visible at 90% scroll progress (0.9).
    // We calculate this target position and use window.scrollTo.
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Target a scroll progress of 0.9, where the form is fully visible.
    const targetScrollY = scrollableHeight * 0.9;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <button onClick={handleScroll} className={className} {...props}>
      {children}
    </button>
  );
};

export default ScrollToFormButton;
