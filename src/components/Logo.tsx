"use client";

import React from "react";

interface LogoProps {
  width?: string | number;
  height?: string | number;
  showSlogan?: boolean;
  responsiveColor?: boolean;
}

export default function Logo({ 
  width = "180px", 
  height = "auto", 
  showSlogan = false,
  responsiveColor = true 
}: LogoProps) {
  // Use responsive colors if requested, otherwise use official brand colors
  // LINEA is black in light mode / white in dark mode, or absolute black (#000000)
  const lineacolor = responsiveColor ? "var(--foreground)" : "#000000";
  const verdecolor = "var(--primary)"; // Responsive brand teal
  const sloganColor = "var(--muted)";

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", width: width, height: height }}>
      <svg 
        viewBox="0 0 260 98" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ width: "100%", height: "100%" }}
      >
        {/* Geometric Star/Leaf Symbol (Left Side of Star) */}
        <g transform="translate(10, 8) scale(0.68)" style={{ color: verdecolor }}>
          {/* Top-Left Branch */}
          <path d="M 50 45 L 30 10 L 22 15 L 42 50 Z" fill="currentColor" />
          
          {/* Top-Right Stub */}
          <path d="M 55 48 L 65 30 L 70 33 L 60 51 Z" fill="currentColor" />
          
          {/* Middle-Left Branch (Curved bottom leaf) */}
          <path d="M 45 50 L 5 50 C 5 60 20 62 30 62 L 45 54 Z" fill="currentColor" />
          
          {/* Bottom-Left Branch */}
          <path d="M 48 55 L 25 90 L 32 94 L 55 59 Z" fill="currentColor" />
          
          {/* Bottom-Right Branch */}
          <path d="M 52 55 L 75 90 L 68 94 L 45 59 Z" fill="currentColor" />
        </g>

        {/* Text "LINEA" with styled Lambda 'Λ' */}
        <text 
          x="88" 
          y="38" 
          fill={lineacolor} 
          fontFamily="Outfit, var(--font-sans), sans-serif" 
          fontWeight="800" 
          fontSize="36" 
          letterSpacing="0.08em"
        >
          LINEΛ
        </text>

        {/* Text "VERDE" */}
        <text 
          x="88" 
          y="72" 
          fill={verdecolor} 
          fontFamily="Outfit, var(--font-sans), sans-serif" 
          fontWeight="800" 
          fontSize="36" 
          letterSpacing="0.08em"
        >
          VERDE
        </text>

        {/* Optional Slogan */}
        {showSlogan && (
          <text 
            x="88" 
            y="92" 
            fill={sloganColor} 
            fontFamily="Outfit, var(--font-sans), sans-serif" 
            fontWeight="500" 
            fontSize="10" 
            letterSpacing="0.32em"
          >
            Diseño que transforma
          </text>
        )}
      </svg>
    </div>
  );
}
