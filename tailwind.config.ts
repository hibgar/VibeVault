import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },
      // Keep your extended color and animation settings here
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
