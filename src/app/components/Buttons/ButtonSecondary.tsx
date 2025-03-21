"use client";

import React from "react";

type ButtonSecondaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

export default function ButtonSecondary({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonSecondaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-white text-amber-700 font-semibold rounded-md border border-gray-300 
        hover:bg-gray-100 transition duration-300 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
