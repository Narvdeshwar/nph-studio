'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';
import { TextMask } from '@/components/premium/TextMask';
import { Cursor } from '@/components/premium/Cursor';
import { NavbarV4 } from '@/components/premium/NavbarV4';
import { ProofStripV4 } from '@/components/premium/ProofStripV4';
import { ServicesV4 } from '@/components/premium/ServicesV4';
import { WorkPreviewV4 } from '@/components/premium/WorkPreviewV4';
import { ProcessV4 } from '@/components/premium/ProcessV4';
import { FooterV4 } from '@/components/premium/FooterV4';
import { IconArrowUpRight } from '@tabler/icons-react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-[200vh] cursor-none font-sans">
      <Cursor />
      <NavbarV4 />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-end p-8 pb-20 sm:p-20 z-10">
        
        {/* Parallax Background Glow - Optimized for low-end devices */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-[-1] pointer-events-none"
        >
          <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] opacity-[0.12]" style={{ background: 'radial-gradient(circle at center, var(--primary), transparent 70%)' }} />
          <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] opacity-[0.12]" style={{ background: 'radial-gradient(circle at center, var(--secondary), transparent 70%)' }} />
        </motion.div>

        <div className="max-w-[1400px]">
          <div className="mb-12 border-l-2 border-primary pl-6 max-w-sm">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-muted text-lg leading-relaxed"
            >
              We engineer digital experiences that blur the line between design and deep tech.
            </motion.p>
          </div>

          <h1 className="text-[12vw] sm:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase flex flex-col">
            <TextMask delay={0.1}>We Build</TextMask>
            <span className="flex items-center gap-6">
              <TextMask delay={0.2}>Products</TextMask>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "15vw" }}
                transition={{ delay: 0.8, duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="h-[8vw] bg-primary hidden sm:block rounded-full"
              />
            </span>
            <TextMask delay={0.3}>That Ship.</TextMask>
          </h1>
        </div>

        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20">
          <Magnetic>
            <button className="w-32 h-32 rounded-full bg-foreground text-background flex flex-col items-center justify-center font-medium uppercase tracking-wider text-sm transition-transform hover:scale-105 hover:bg-primary hover:text-white active:scale-95 group shadow-xl">
              Start
              <IconArrowUpRight size={24} className="mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Magnetic>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-32 bg-surface text-primary overflow-hidden flex whitespace-nowrap border-y border-border relative z-10">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="text-[12vw] font-black uppercase tracking-tighter flex items-center"
        >
          <span className="mx-8 opacity-30">—</span> FRONTEND <span className="mx-8 opacity-30">—</span> BACKEND <span className="mx-8 opacity-30">—</span> AI/RAG <span className="mx-8 opacity-30">—</span> FRONTEND <span className="mx-8 opacity-30">—</span> BACKEND <span className="mx-8 opacity-30">—</span> AI/RAG
        </motion.div>
      </section>

      <ProofStripV4 />
      <ServicesV4 />
      <WorkPreviewV4 />
      <ProcessV4 />
      <FooterV4 />

    </div>
  );
}
