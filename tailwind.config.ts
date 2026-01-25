import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-deep": "var(--color-primary-deep)",
        lavender: "var(--color-lavender)",
        lilac: "var(--color-lilac)",
        gold: "var(--color-gold)",
        slate: "var(--color-slate)",
        muted: "var(--color-muted)",
        white: "var(--color-white)",
        border: "var(--color-border)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        soft: "0 12px 30px -20px rgba(122, 3, 164, 0.35)",
        lift: "0 16px 40px -20px rgba(122, 3, 164, 0.4)"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      spacing: {
        2: "0.5rem",
        4: "1rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        24: "6rem",
        32: "8rem",
        48: "12rem",
        64: "16rem"
      }
    }
  },
  plugins: []
};

export default config;
