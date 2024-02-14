// src/theme.ts
"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#02A105",
      light: "#C8FFBE",
      dark: "#027904",
    },
    secondary: {
      main: "#AC0C9C",
      light: "#B422A5",
      dark: "#800974",
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
      default: "#faf7f0",
    },
    grey: {
      50: "#F0F0F0",
      100: "#C3C3C3",
      200: "#959595",
    },
  },
});

export default theme;
