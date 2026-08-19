'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';

import { DecryptedText } from '@/components/premium/DecryptedText';

import { ProofStrip } from '@/components/premium/ProofStrip';
import { Services } from '@/components/premium/Services';
import { WorkPreview } from '@/components/premium/WorkPreview';
import { Process } from '@/components/premium/Process';
import { Testimonials } from '@/components/premium/Testimonials';
import { Sparkles } from '@/components/premium/Sparkles';
import { Footer } from '@/components/premium/Footer';
import { CapabilitiesBento } from '@/components/premium/CapabilitiesBento';
import { TechStack } from '@/components/premium/TechStack';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-[200vh] font-sans">



      {/* Hero Section */}
      <section className="relative min-h-[100vh] h-[100vh] flex flex-col justify-center p-6 sm:p-12 md:p-20 pt-28 sm:pt-32 md:pt-40 z-10 overflow-hidden">

        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 z-[-2] opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Cinematic Sparkles Background */}
        <div className="absolute inset-0 z-[-2] opacity-80 mix-blend-screen pointer-events-none">
          <Sparkles particleColor="#FF5A36" particleDensity={30} minSize={0.5} maxSize={2.5} className="opacity-60" />
          <Sparkles particleColor="#7C3AED" particleDensity={50} minSize={0.3} maxSize={1.5} className="opacity-50" />
          <Sparkles particleColor="#FFFFFF" particleDensity={120} minSize={0.1} maxSize={1.2} className="opacity-40" />
        </div>

        {/* Parallax Background Glow */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-[-1] pointer-events-none"
        >
          <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] opacity-[0.15]" style={{ background: 'radial-gradient(circle at center, var(--primary), transparent 70%)' }} />
          <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] opacity-[0.10]" style={{ background: 'radial-gradient(circle at center, var(--secondary), transparent 70%)' }} />
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto relative mt-8 sm:mt-16 md:mt-20">

          {/* Sleek Technical Status Badge (Replaced old border-l text) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-8 md:mb-12 inline-flex items-center gap-3 sm:gap-4 bg-surface border border-border rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg backdrop-blur-md max-w-full"
          >
            <div className="flex items-center justify-center relative flex-shrink-0">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full absolute animate-ping opacity-75" />
            </div>
            <p className="text-foreground text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest break-words overflow-hidden text-ellipsis line-clamp-2">
              Landing pages, MVPs, and RAG-powered AI — engineered by a founder-led team.
            </p>
          </motion.div>

          {/* Main Typography */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter uppercase max-w-7xl flex flex-col gap-1 sm:gap-2">
            <DecryptedText text="We Build" delay={0.1} className="block" />
            <DecryptedText text="Full-Stack Products" delay={0.3} className="block" />
            <span className="text-primary block">
              <DecryptedText text="& AI Systems." delay={0.5} className="block" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl sm:text-3xl lg:text-4xl mt-6 sm:mt-8 md:mt-12 text-foreground/70 tracking-tight font-medium max-w-4xl"
          >
            For founders who need to ship fast, in weeks, not quarters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16"
          >
            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="bg-foreground text-background px-6 sm:px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-transparent hover:bg-primary hover:text-white hover:shadow-[0_0_40px_rgba(255,90,54,0.4)] w-full sm:w-auto text-center"
              >
                Get a Free Estimate
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="work"
                className="bg-surface border border-border px-6 sm:px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white/5 active:scale-95 transition-all text-foreground/80 hover:text-foreground w-full sm:w-auto text-center block"
              >
                See Our Work
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Bento Grid */}
      <CapabilitiesBento />
      <TechStack />

      <ProofStrip />
      <Services />
      <WorkPreview />
      <Process />
      <Testimonials />
      <Footer />

    </div>
  );
}
