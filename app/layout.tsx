import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MorphicNavbar from "@/components/kokonutui/morphic-navbar";
import ScrollReset from "@/components/Background/scrollreset";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import SideRays from "@/components/Background/SideRays";

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
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <SideRays
            speed={2.6}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={2}
            spread={2.2}
            origin="both"
            tilt={0}
            saturation={1.5}
            blend={0.78}
            falloff={2.2}
            opacity={0.7}
          />
        </div>

        <ScrollReset />
        <MorphicNavbar />
        {children}
      </body>
    </html>
  );
}