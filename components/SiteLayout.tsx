'use client';

import { usePathname } from 'next/navigation';
import { Noise } from "@/components/premium/Noise";
import { Navbar } from "@/components/premium/Navbar";
import { Curtain } from "@/components/premium/Curtain";
import { WhatsAppWidget } from "@/components/premium/WhatsAppWidget";
import { Sparkles } from "@/components/premium/Sparkles";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // If we are on any admin route, just render the children without the marketing site's global components
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
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
      {children}
      <WhatsAppWidget />
    </>
  );
}
