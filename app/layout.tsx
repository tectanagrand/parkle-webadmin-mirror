import type { Metadata } from "next";
import MainLayout from "./main-layout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <div className="h-screen max-w-full">{children}</div>
    </MainLayout>
  );
}
