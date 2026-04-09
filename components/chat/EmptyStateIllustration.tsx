"use client";

export function EmptyStateIllustration() {
  return (
    <div className="relative w-[120px] h-[120px] animate-pulse-soft">
      {/* Outer ring */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background circles */}
        <circle cx="60" cy="60" r="56" fill="#E6F7F6" />
        <circle cx="60" cy="60" r="44" fill="#CCF0EE" />
        <circle cx="60" cy="60" r="32" fill="#00B5AD" fillOpacity="0.15" />

        {/* Stethoscope icon — simplified inline SVG path */}
        {/* Circle/head of stethoscope */}
        <circle cx="60" cy="52" r="10" fill="#00B5AD" fillOpacity="0.25" stroke="#00B5AD" strokeWidth="2" />
        {/* Stethoscope tube */}
        <path
          d="M54 52 C54 64 48 70 48 76 C48 81 52 84 56 84 C60 84 63 81 63 77 C63 73 60 70 60 67"
          stroke="#00B5AD"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Earpieces */}
        <path
          d="M51 46 C49 42 46 42 45 44"
          stroke="#00B5AD"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M69 46 C71 42 74 42 75 44"
          stroke="#00B5AD"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Earbud dots */}
        <circle cx="45" cy="44" r="2.5" fill="#00B5AD" />
        <circle cx="75" cy="44" r="2.5" fill="#00B5AD" />
        {/* Chest piece */}
        <circle cx="60" cy="77" r="4" fill="#00B5AD" />
        <circle cx="60" cy="77" r="2" fill="white" />

        {/* Decoration dots */}
        <circle cx="18" cy="42" r="4" fill="#00B5AD" fillOpacity="0.3" />
        <circle cx="102" cy="42" r="3" fill="#00B5AD" fillOpacity="0.25" />
        <circle cx="14" cy="70" r="2.5" fill="#00B5AD" fillOpacity="0.2" />
        <circle cx="106" cy="72" r="2" fill="#00B5AD" fillOpacity="0.2" />
        <circle cx="30" cy="22" r="3" fill="#00B5AD" fillOpacity="0.2" />
        <circle cx="92" cy="20" r="2.5" fill="#00B5AD" fillOpacity="0.15" />
        <circle cx="24" cy="94" r="2" fill="#00B5AD" fillOpacity="0.2" />
        <circle cx="98" cy="96" r="3" fill="#00B5AD" fillOpacity="0.15" />

        {/* Subtle cross/plus accent top-right */}
        <path
          d="M92 30 V36 M89 33 H95"
          stroke="#00B5AD"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
