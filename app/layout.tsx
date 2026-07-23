import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noise } from "@/components/premium/Noise";
import { Navbar } from "@/components/premium/Navbar";
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
  metadataBase: new URL('https://nph-studio.com'), // Placeholder, can be updated later
  title: {
    default: "NPH Studio | Premium Web Design & Full-Stack Development Agency",
    template: "%s | NPH Studio"
  },
  description: "NPH Studio is an elite digital agency specializing in high-performance web applications, premium landing pages, and AI/RAG integrations for ambitious founders.",
  keywords: ["Web Development", "UI/UX Design", "Next.js Agency", "ReactJS", "MERN Stack", "AI Integration", "Full-stack Engineering", "Landing Pages", "Narvdeshwar"],
  authors: [{ name: "Narvdeshwar", url: "https://www.linkedin.com/in/narvdeshwar/" }],
  creator: "Narvdeshwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nph-studio.com",
    title: "NPH Studio | Premium Web Design & Full-Stack Development",
    description: "We design, build, and ship full-stack products. Elevate your brand with our premium digital engineering.",
    siteName: "NPH Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "NPH Studio | Premium Web Design & Full-Stack Development",
    description: "We design, build, and ship full-stack products. Elevate your brand with our premium digital engineering.",
    creator: "@Eternal_Dev_IO",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
