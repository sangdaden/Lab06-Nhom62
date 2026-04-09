import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        vinmec: {
          primary: "#00B5AD",
          "primary-dark": "#00918A",
          "primary-light": "#E6F7F6",
          "primary-50": "#F0FBFA",
          bg: "#FFFFFF",
          surface: "#F7F9FA",
          "surface-2": "#EEF2F5",
          text: "#1A2B3C",
          "text-muted": "#6B7885",
          "text-subtle": "#9AA5B1",
          border: "#E5E9ED",
          "border-strong": "#CED4DA",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "chat-bubble": "20px",
        "chat-input": "24px",
      },
      boxShadow: {
        "chat-bubble": "0 2px 8px rgba(0, 181, 173, 0.08)",
        "chat-input": "0 2px 12px rgba(26, 43, 60, 0.06)",
        "card-soft":
          "0 1px 3px rgba(26, 43, 60, 0.04), 0 4px 16px rgba(26, 43, 60, 0.04)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.3s ease-out",
        "typing-dot": "typingDot 1.4s infinite ease-in-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.25s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typingDot: {
          "0%, 80%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
