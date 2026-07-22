import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noise } from "@/components/premium/Noise";
import { Navbar } from "@/components/premium/Navbar";
import { ThemeCursor } from "@/components/premium/ThemeCursor";
import { Curtain } from "@/components/premium/Curtain";
import { WhatsAppWidget } from "@/components/premium/WhatsAppWidget";
import { Sparkles } from "@/components/premium/Sparkles";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NPH Studio | Full-stack engineering",
  description: "We design, build, and ship full-stack products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        <Curtain />
        <ThemeCursor />
        <Navbar />
        {/* Global Sparkles Background */}
        <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
          <Sparkles
            particleColor="#FF5A36"
            minSize={0.5}
            maxSize={1.5}
            particleDensity={15}
          />
        </div>
        <Noise opacity={0.03} />
        <main className="flex-1 flex flex-col relative z-10">{children}</main>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
