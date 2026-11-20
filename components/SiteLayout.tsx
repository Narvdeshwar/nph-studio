'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Noise } from "@/components/premium/Noise";
import { Navbar } from "@/components/premium/Navbar";
import { Curtain } from "@/components/premium/Curtain";
import { WhatsAppWidget } from "@/components/premium/WhatsAppWidget";
import { Sparkles } from "@/components/premium/Sparkles";
// import { LabFloatingButton } from "@/components/premium/LabFloatingButton";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Silence upstream Three.js r183+ deprecation warning used internally by @react-three/fiber
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('THREE.Clock: This module has been deprecated') ||
          args[0].includes('Clock: This module has been deprecated'))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  // If we are on any admin route, just render the children without the marketing site's global components
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  // When inside any lab experiment (lab/* subpage), hide the main navbar and provide the floating lab return button
  const isLabSubpage = pathname !== '/lab' && Boolean(pathname?.startsWith('/lab'));

  return (
    <>
      <Curtain />
      {!isLabSubpage && <Navbar />}
      {/* {isLabSubpage && <LabFloatingButton />} */}
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
