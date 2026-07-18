'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';
import { TextMask } from '@/components/premium/TextMask';
import { Cursor } from '@/components/premium/Cursor';
import { Navbar } from '@/components/premium/Navbar';
import { ProofStrip } from '@/components/premium/ProofStrip';
import { Services } from '@/components/premium/Services';
import { WorkPreview } from '@/components/premium/WorkPreview';
import { Process } from '@/components/premium/Process';
import { Footer } from '@/components/premium/Footer';
import { CapabilitiesBento } from '@/components/premium/CapabilitiesBento';
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
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center p-8 sm:p-20 z-10 overflow-hidden">
        
        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 z-[-2] opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Parallax Background Glow */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-[-1] pointer-events-none"
        >
          <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] opacity-[0.15]" style={{ background: 'radial-gradient(circle at center, var(--primary), transparent 70%)' }} />
          <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] opacity-[0.10]" style={{ background: 'radial-gradient(circle at center, var(--secondary), transparent 70%)' }} />
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto relative mt-20">
          
          {/* Sleek Technical Status Badge (Replaced old border-l text) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12 inline-flex items-center gap-4 bg-surface border border-border rounded-full px-6 py-3 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center justify-center relative">
              <span className="w-2.5 h-2.5 bg-primary rounded-full" />
              <span className="w-2.5 h-2.5 bg-primary rounded-full absolute animate-ping opacity-75" />
            </div>
            <p className="text-foreground text-sm font-bold uppercase tracking-widest">
              We engineer digital experiences that blur the line between design and deep tech.
            </p>
          </motion.div>

          {/* Main Typography */}
          <h1 className="text-[12vw] sm:text-[11vw] font-black leading-[0.85] tracking-tighter uppercase flex flex-col">
            <TextMask delay={0.1}>We Build</TextMask>
            <span className="flex items-center gap-6">
              <TextMask delay={0.2}>Products</TextMask>
              
              {/* Upgraded Text Pill - Animated Gradient Mesh */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "16vw" }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className="h-[8vw] hidden sm:block rounded-[4vw] overflow-hidden relative shadow-inner border border-black/5"
              >
                {/* Animated Gradient inside the pill */}
                <div 
                  className="absolute inset-[-100%] opacity-90"
                  style={{
                    background: 'linear-gradient(45deg, #FF5A36, #7C3AED, #FF5A36, #3B82F6)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 8s ease infinite'
                  }}
                />
              </motion.div>
            </span>
            <TextMask delay={0.3}>That Ship.</TextMask>
          </h1>
        </div>

        {/* Premium Floating CTA */}
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 z-50">
          <Magnetic>
            <button className="w-36 h-36 rounded-full bg-foreground/95 backdrop-blur-xl border border-white/10 text-background flex flex-col items-center justify-center font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:bg-primary hover:border-primary active:scale-95 group shadow-2xl">
              <span className="group-hover:-translate-y-2 transition-transform duration-300">Start</span>
              <IconArrowUpRight size={24} className="absolute opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-3 transition-all duration-300" />
            </button>
          </Magnetic>
        </div>
      </section>

      {/* Core Capabilities Bento Grid */}
      <CapabilitiesBento />

      <ProofStrip />
      <Services />
      <WorkPreview />
      <Process />
      <Footer />

    </div>
  );
}
