import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', '"EB Garamond"', "Georgia", "serif"],
        sans:  ['"Inter"', "ui-sans-serif", "system-ui"],
        mono:  ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        cardFloat: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-14px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%,49%":   { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
      },
      animation: {
        cardFloat: "cardFloat 9s ease-in-out infinite",
        marquee:   "marquee 36s linear infinite",
        fadeIn:    "fadeIn 0.2s ease-out forwards",
        blink:     "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
