import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm)", "sans-serif"],
      },
      colors: {
        "accent-cyan": "#00e5ff",
        "accent-violet": "#7b5ea7",
        "bg-primary": "#050508",
        "bg-surface": "#0c0c14",
        "bg-card": "#10101a",
        "bg-elevated": "#15151f",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-dot": "pulseDot 2s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
