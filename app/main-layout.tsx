"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { APIProvider } from "@vis.gl/react-google-maps";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AppRouterCacheProvider>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SessionProvider>
                  <APIProvider
                    apiKey={process.env.NEXT_PUBLIC_API_GMAPS ?? ""}
                    onLoad={() => console.log("Maps API has loaded.")}
                  >
                    <div>{children}</div>
                  </APIProvider>
                </SessionProvider>
              </ThemeProvider>
            </StyledEngineProvider>
          </AppRouterCacheProvider>
        </main>
      </body>
    </html>
  );
}
