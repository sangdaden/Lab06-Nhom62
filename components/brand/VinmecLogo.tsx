interface VinmecLogoProps {
  size?: number;
  variant?: "light" | "dark";
}

export function VinmecLogo({ size = 40, variant = "light" }: VinmecLogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#00B5AD";
  const bgColor = variant === "light" ? "#00B5AD" : "#FFFFFF";
  const taglineColor = variant === "light" ? "rgba(255,255,255,0.8)" : "#6B7885";

  return (
    <svg
      width={size * 2.8}
      height={size}
      viewBox="0 0 112 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vinmec Logo"
    >
      {/* Circle background */}
      <circle cx="20" cy="20" r="20" fill={bgColor} />
      {/* V shape inside circle */}
      <path
        d="M10 10 L20 28 L30 10"
        stroke={textColor === "#FFFFFF" ? "#00B5AD" : "#FFFFFF"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* VINMEC text */}
      <text
        x="46"
        y="17"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill={textColor}
        letterSpacing="1"
      >
        VINMEC
      </text>
      {/* Tagline */}
      <text
        x="46"
        y="29"
        fontFamily="system-ui, sans-serif"
        fontSize="7"
        fontWeight="400"
        fill={taglineColor}
        letterSpacing="0.5"
      >
        INTERNATIONAL HOSPITAL
      </text>
    </svg>
  );
}
