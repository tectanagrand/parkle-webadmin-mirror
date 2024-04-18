// src/theme.ts
"use client";
import { Roboto, Inter, Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#2F6C5D",
      light: "#53B19A",
      dark: "#235246",
      contrastText: "#F9FAFB",
    },
    secondary: {
      main: "#61286C",
      light: "#AB49BF",
      dark: "#210E25",
      contrastText: "#F9FAFB",
    },
    success: {
      main: "#4AADD2",
    },
    error: {
      main: "#FF1616",
    },
    warning: {
      main: "#FFC72B",
    },
    background: {
      default: "#ffffff",
      paper: "#131629",
    },
    grey: {
      50: "#F0F0F0",
      100: "#C3C3C3",
      200: "#959595",
    },
  },
});

export default theme;
