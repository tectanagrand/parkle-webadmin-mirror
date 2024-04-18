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
          DEFAULT: "#2F6C5D",
          light: "#53B19A",
          dark: "#235246",
        },
        secondary: {
          DEFAULT: "#61286C",
          light: "#AB49BF",
          dark: "#210E25",
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
      dropShadow: {
        component: "10px 10px 10px rgb(230, 242, 233, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
