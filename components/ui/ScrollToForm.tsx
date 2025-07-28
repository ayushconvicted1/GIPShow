// /components/ui/ScrollToFormButton.tsx
"use client";

import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ScrollToFormButton = ({ children, className, ...props }: Props) => {
  const handleScroll = () => {
    // We target the element with the id 'registration-form'
    const formSection = document.getElementById("registration-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button onClick={handleScroll} className={className} {...props}>
      {children}
    </button>
  );
};

export default ScrollToFormButton;
