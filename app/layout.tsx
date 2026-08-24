import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteLayout } from "@/components/SiteLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nph-studio.in'),
  title: {
    default: "NPH Studio | Award-Winning Digital Agency & Next.js Experts",
    template: "%s | NPH Studio"
  },
  description: "Stop losing customers to bad design. NPH Studio is an elite digital agency building blazing-fast, Awwwards-level web apps and AI integrations for visionary founders.",
  keywords: ["Web Development Agency", "Premium UI/UX Design", "Next.js Experts", "ReactJS", "WebGL Portfolio", "AI Integration", "Full-stack Engineering", "Landing Pages", "Narvdeshwar"],
  authors: [{ name: "Narvdeshwar", url: "https://www.linkedin.com/company/nph-studio" }],
  creator: "Narvdeshwar",
  alternates: {
    canonical: 'https://www.nph-studio.in',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nph-studio.in",
    title: "NPH Studio | We Build Unfair Digital Advantages",
    description: "Transform your startup with elite web development, 3D interactive experiences, and AI engineering. Engineered fast. Shipped transparently.",
    siteName: "NPH Studio",
    images: [
      {
        url: 'https://www.nph-studio.in/og-image.webp', // Assumed asset, replace if necessary
        width: 1200,
        height: 630,
        alt: 'NPH Studio Premium Digital Agency',
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NPH Studio | Elite Next.js & WebGL Agency",
    description: "Transform your startup with elite web development, 3D interactive experiences, and AI engineering.",
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

import { InquiryModal } from "@/components/premium/InquiryModal";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebDesignAgency",
    "name": "NPH Studio",
    "url": "https://www.nph-studio.in",
    "logo": "https://www.nph-studio.in/logo.png",
    "image": "https://www.nph-studio.in/og-image.webp",
    "description": "Premium digital agency specializing in high-performance web applications, 3D web experiences, and AI integrations for ambitious founders.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "founder": {
      "@type": "Person",
      "name": "Narvdeshwar"
    },
    "sameAs": [
      "https://www.linkedin.com/company/nph-studio"
    ],
    "priceRange": "$$$",
    "knowsAbout": [
      "Web Development",
      "UI/UX Design",
      "WebGL Development",
      "AI/RAG Systems",
      "Next.js"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        <InquiryModal />
        <SiteLayout>
          <main className="flex-1 flex flex-col relative z-10">{children}</main>
        </SiteLayout>
        
        {/* Advanced SEO Structured Data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </body>
    </html>
  );
}
