'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Magnetic } from '@/components/premium/Magnetic';
import { IconCode, IconBrain, IconRocket } from '@tabler/icons-react';

import { ProofStrip } from '@/components/premium/ProofStrip';
import { Services } from '@/components/premium/Services';
import { WorkPreview } from '@/components/premium/WorkPreview';
import { Process } from '@/components/premium/Process';
import { Testimonials } from '@/components/premium/Testimonials';
import { Sparkles } from '@/components/premium/Sparkles';
import { Footer } from '@/components/premium/Footer';
import { CapabilitiesBento } from '@/components/premium/CapabilitiesBento';
import { TechStack } from '@/components/premium/TechStack';
import { AgencyCTA } from '@/components/premium/AgencyCTA';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div ref={containerRef} className="relative bg-background text-foreground w-full min-h-screen font-sans">

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6 sm:px-12 md:px-20 pt-24 sm:pt-28 pb-12 sm:pb-16 z-10 overflow-hidden">

        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 z-[-2] opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden="true" />

        {/* Cinematic Sparkles Background */}
        <div className="absolute inset-0 z-[-2] opacity-80 mix-blend-screen pointer-events-none" aria-hidden="true">
          <Sparkles particleColor="#FF5A36" particleDensity={35} minSize={0.4} maxSize={2.0} className="opacity-70" />
        </div>

        {/* Parallax Warm Brand Background Glow (Warm Coral & Soft Violet, Zero Dirty Smudge) */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-[-1] pointer-events-none"
        >
          <div className="absolute top-[10%] right-[10%] w-[550px] h-[550px] opacity-[0.14]" style={{ background: 'radial-gradient(circle at center, #FF5A36, transparent 70%)' }} />
          <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] opacity-[0.08]" style={{ background: 'radial-gradient(circle at center, #7C3AED, transparent 70%)' }} />
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto relative">

          {/* Sleek Agency Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 sm:mb-6 inline-flex items-center gap-2.5 bg-surface border border-border rounded-full px-4 py-2 shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-foreground/90 text-xs sm:text-sm font-semibold tracking-wide">
              Web Apps • SaaS MVPs • Applied AI &amp; RAG
            </span>
          </motion.div>

          {/* Main Direct Headline - Ultra Punchy, Displays What We Actually Do */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.93] tracking-tighter uppercase max-w-5xl"
          >
            <span>We Engineer</span><br />
            <span className="text-primary">High-Performance</span><br />
            <span>Web Apps &amp; AI.</span>
          </motion.h1>

          {/* Concise 1-Sentence Subline - Low Cognitive Load, High Authority */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-muted font-medium max-w-2xl leading-relaxed mt-4 sm:mt-6"
          >
            A founder-led digital engineering studio designing and building production-ready software in weeks, not quarters.
          </motion.p>

          {/* Action Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mt-6 sm:mt-8"
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                aria-label="Start Your Project →"
                className="bg-primary hover:bg-[#E04D2D] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(255,90,54,0.35)] w-full sm:w-auto text-center cursor-pointer"
              >
                Start Your Project →
              </button>
            </Magnetic>
            <Magnetic>
              <Link
                href="/work"
                aria-label="Explore Client Work - NPH Studio Projects"
                className="bg-surface border border-border px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white/5 active:scale-95 transition-all text-foreground/80 hover:text-foreground w-full sm:w-auto text-center block"
              >
                Explore Client Work
              </Link>
            </Magnetic>
          </motion.div>

          {/* Micro Trust Pills - Compact, Fits Within Viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 sm:mt-8 text-xs font-semibold text-foreground/80"
          >
            <span className="inline-flex items-center gap-1.5 bg-surface/80 border border-border px-3.5 py-1.5 rounded-full backdrop-blur-sm">
              <IconRocket size={14} className="text-primary" />
              <span>3–5 Week Sprints</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface/80 border border-border px-3.5 py-1.5 rounded-full backdrop-blur-sm">
              <IconCode size={14} className="text-secondary" />
              <span>100% Code &amp; IP Ownership</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface/80 border border-border px-3.5 py-1.5 rounded-full backdrop-blur-sm">
              <IconBrain size={14} className="text-emerald-600" />
              <span>Senior Founder-Led</span>
            </span>
          </motion.div>

        </div>
      </section>

      {/* Immediate Trust & Client Proof Strip directly after Hero */}
      <ProofStrip />

      {/* Featured Client Work & Case Studies */}
      <WorkPreview />

      {/* What We Engineer & Ship - Core Agency Service Packages */}
      <Services />

      {/* The Agency Advantage Bento Grid - Why Founders Choose Us */}
      <CapabilitiesBento />

      {/* Modern Production Tech Stack */}
      <TechStack />

      {/* The 4-Step Agency Framework */}
      <Process />

      {/* Real Client Outcomes & Feedback */}
      <Testimonials />

      {/* High-Impact Pre-Footer Conversion Section */}
      <AgencyCTA />

      {/* Agency Dark Footer */}
      <Footer />
    </div>
  );


}
