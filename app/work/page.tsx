'use client';
import { NavbarV4 } from '@/components/premium/NavbarV4';
import { Cursor } from '@/components/premium/Cursor';
import { FooterV4 } from '@/components/premium/FooterV4';
import { WorkListV4 } from '@/components/premium/WorkListV4';
import { TextMask } from '@/components/premium/TextMask';

export default function WorkPage() {
  return (
    <div className="relative bg-background text-foreground min-h-screen cursor-none font-sans">
      <Cursor />
      <NavbarV4 />

      {/* Work Page Header - Normal document flow */}
      <section className="relative pt-[25vh] pb-[10vh] px-8 sm:px-20 text-center bg-background z-20">
        <h1 className="text-[12vw] sm:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-6 flex flex-col items-center">
          <TextMask>Selected</TextMask>
          <TextMask delay={0.1}>Case Studies</TextMask>
        </h1>
        <p className="text-muted text-xl max-w-2xl mx-auto uppercase tracking-widest font-medium">
          Real products we've designed and shipped for founders worldwide.
        </p>
      </section>

      {/* Z-Axis Interactive Tunnel */}
      <WorkListV4 />

      <FooterV4 />
    </div>
  );
}
