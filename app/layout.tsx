import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MorphicNavbar from "@/components/kokonutui/morphic-navbar";
import ScrollReset from "@/components/Background/scrollreset";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryaraj",
  description:
    "Portfolio of Arya, an AI/ML engineer specializing in computer vision and uncertainty-aware deep learning.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <SpeedInsights />
      <Analytics />
      <body className="bg-background font-sans text-foreground antialiased">
        <ScrollReset />
        <MorphicNavbar />
        {children}
      </body>
    </html>
  );
}