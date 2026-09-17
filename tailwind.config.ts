import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#faf7f0",
        ink: "#1a1a1a",
        rule: "#dedad0",
        accent: "#8a3b2c",
        gain: "#1e6b3c",
        loss: "#a3312a",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "Times", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        brief: "1040px",
      },
    },
  },
  plugins: [],
};

export default config;
