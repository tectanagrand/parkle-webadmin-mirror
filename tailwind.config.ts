import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#02A105",
          light: "#3B5836",
          dark: "#027904",
        },
        secondary: {
          DEFAULT: "#AC0C9C",
          light: "#B422A5",
          dark: "#800974",
        },
        success: {
          DEFAULT: "#4AADD2",
        },
        error: {
          DEFAULT: "#FF1616",
        },
        warning: {
          DEFAULT: "#FFC72B",
        },
        background: {
          default: "#fdfad8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
