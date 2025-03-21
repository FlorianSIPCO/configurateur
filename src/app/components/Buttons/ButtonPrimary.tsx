"use client";

import React from "react";

type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

export default function ButtonPrimary({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-amber-700 text-white font-bold rounded-md border border-amber-700 
        hover:bg-white hover:text-amber-700 transition duration-300 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
