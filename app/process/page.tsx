'use client';
import { Navbar } from '@/components/premium/Navbar';
import { Cursor } from '@/components/premium/Cursor';
import { Footer } from '@/components/premium/Footer';
import { Process } from '@/components/premium/Process';
import { TextMask } from '@/components/premium/TextMask';

export default function ProcessPage() {
  return (
    <div className="relative bg-background text-foreground min-h-screen cursor-none font-sans">
      <Cursor />
      <Navbar />

      {/* Process Page Header */}
      <section className="relative pt-[25vh] pb-[5vh] px-8 sm:px-20 text-center bg-background z-20">
        <h1 className="text-[12vw] sm:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-6 flex flex-col items-center">
          <TextMask>How We</TextMask>
          <TextMask delay={0.1}>Build It</TextMask>
        </h1>
        <p className="text-muted text-xl max-w-2xl mx-auto uppercase tracking-widest font-medium">
          Zero guesswork. Total transparency. Our proven 4-step framework.
        </p>
      </section>

      {/* Reusing the highly-polished Process component from the homepage */}
      <Process />

      <Footer />
    </div>
  );
}
