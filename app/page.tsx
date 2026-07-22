'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';

import { DecryptedText } from '@/components/premium/DecryptedText';

import { ProofStrip } from '@/components/premium/ProofStrip';
import { Services } from '@/components/premium/Services';
import { WorkPreview } from '@/components/premium/WorkPreview';
import { Process } from '@/components/premium/Process';
import { Sparkles } from '@/components/premium/Sparkles';
import { Footer } from '@/components/premium/Footer';
import { CapabilitiesBento } from '@/components/premium/CapabilitiesBento';
import { IconArrowUpRight, IconBrandWhatsapp } from '@tabler/icons-react';

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
      <section className="relative min-h-[100vh] h-[100vh] flex flex-col justify-center p-8 sm:p-20 z-10 overflow-hidden">
        
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
            <DecryptedText text="We Build" delay={0.1} className="block" />
            <span className="flex items-center gap-6">
              <span className="text-primary block">
                <DecryptedText text="Products" delay={0.3} className="block" />
              </span>
              
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
            <DecryptedText text="That Ship." delay={0.5} className="block" />
          </h1>
        </div>

        {/* Premium Floating CTA */}
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 z-50">
          <Magnetic>
            <a 
              href="https://wa.me/918787205784"
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 h-36 rounded-full bg-foreground/95 backdrop-blur-xl border border-white/10 text-background flex flex-col items-center justify-center font-bold uppercase tracking-widest text-[10px] text-center transition-all hover:scale-105 hover:bg-green-500 hover:border-green-500 active:scale-95 group shadow-2xl leading-relaxed"
            >
              <span className="group-hover:-translate-y-2 transition-transform duration-300">Start on<br/>WhatsApp</span>
              <IconBrandWhatsapp size={24} className="absolute opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-5 transition-all duration-300" />
            </a>
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
