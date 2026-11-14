import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteLayout } from "@/components/SiteLayout";

const googleSans = localFont({
  src: [
    {
      path: "./fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nph-studio.in'),
  title: {
    default: "NPH Studio | Full-Stack Digital Product & AI Engineering Agency",
    template: "%s | NPH Studio"
  },
  description: "NPH Studio is a digital engineering agency building production-grade web applications, SaaS MVPs, and proprietary AI/RAG systems for high-growth startups.",
  keywords: ["Digital Product Agency", "Web Development Agency", "Next.js Engineering Agency", "SaaS MVP Development", "AI Integration Agency", "Full-Stack Software Engineering", "RAG Pipeline Development"],
  authors: [{ name: "NPH Studio", url: "https://www.linkedin.com/company/nph-studio" }],
  creator: "NPH Studio",
  alternates: {
    canonical: 'https://www.nph-studio.in',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nph-studio.in",
    title: "NPH Studio | Digital Engineering Agency for Startups",
    description: "We build turnkey full-stack web applications, MVPs, and enterprise AI integrations. Engineered for speed, stability, and scale.",
    siteName: "NPH Studio",
    images: [
      {
        url: 'https://www.nph-studio.in/og-image.webp', // Assumed asset, replace if necessary
        width: 1200,
        height: 630,
        alt: 'NPH Studio Digital Engineering Agency',
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NPH Studio | Digital Product & AI Engineering Agency",
    description: "Transform your startup with production-grade web development, custom SaaS MVPs, and AI engineering.",
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
      className={`${googleSans.variable} h-full antialiased`}
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
