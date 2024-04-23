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
          contrasttext: "#000000",
        },
        secondary: {
          DEFAULT: "#61286C",
          light: "#AB49BF",
          dark: "#210E25",
        },
        success: {
          DEFAULT: "#14f736",
          contrasttext: "#16A34A",
        },
        error: {
          DEFAULT: "#FF1616",
          constrasttext: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FFC72B",
          contrasttext: "#000000",
        },
        idle: {
          DEFAULT: "#959596",
          contrasttext: "#000000",
        },
        background: {
          DEFAULT: "#fdfad8",
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
