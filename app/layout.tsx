import type { Metadata } from "next";
import { Comfortaa, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/providers";
import { Analytics } from "@vercel/analytics/next";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "esun",
  description: "Putting trading back in TCGs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${geist.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
