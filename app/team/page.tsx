'use client';
import { Navbar } from '@/components/premium/Navbar';
import { Cursor } from '@/components/premium/Cursor';
import { Footer } from '@/components/premium/Footer';
import { TeamList } from '@/components/premium/TeamList';
import { TextMask } from '@/components/premium/TextMask';

export default function TeamPage() {
  return (
    <div className="relative bg-background text-foreground min-h-screen cursor-none font-sans">
      <Cursor />
      <Navbar />

      {/* Team Page Header */}
      <section className="relative pt-[25vh] pb-[5vh] px-8 sm:px-20 text-center bg-background z-20">
        <h1 className="text-[12vw] sm:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-6 flex flex-col items-center">
          <TextMask>The</TextMask>
          <TextMask delay={0.1}>Engineers</TextMask>
        </h1>
        <p className="text-muted text-xl max-w-2xl mx-auto uppercase tracking-widest font-medium">
          A highly specialized, full-stack team building products that scale.
        </p>
      </section>

      {/* Team Roster */}
      <TeamList />

      <Footer />
    </div>
  );
}
