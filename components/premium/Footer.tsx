'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';
import { TextMask } from '@/components/premium/TextMask';
import { IconArrowRight } from '@tabler/icons-react';

export function Footer() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  // Parallax reveal effect - moves from top to bottom as you scroll in
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  return (
    <footer ref={containerRef} className="relative h-screen w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[#0A0A0A] text-white flex flex-col justify-between pt-32 pb-8 px-8 sm:px-20"
      >

        <div className="flex flex-col sm:flex-row justify-between items-start w-full max-w-[1400px] mx-auto gap-20">

          <div className="flex-1">
            <h2 className="text-[10vw] sm:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase mb-12">
              <TextMask>Let&apos;s Build</TextMask><br/>
              <TextMask delay={0.1}>Something</TextMask><br/>
              <TextMask delay={0.2}>Epic.</TextMask>
            </h2>

            <Magnetic>
              <button className="group flex items-center justify-center w-40 h-40 bg-primary rounded-full text-white font-bold uppercase tracking-widest text-sm hover:scale-110 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,90,54,0.3)]">
                Start Now
                <IconArrowRight size={20} className="absolute opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-12 transition-all duration-300" />
              </button>
            </Magnetic>
          </div>

          <div className="flex gap-16 text-sm uppercase tracking-widest font-medium text-zinc-500">
            <div className="flex flex-col gap-6">
              <span className="text-white">Navigation</span>
              <a href="/work" className="hover:text-primary transition-colors">Work</a>
              <a href="/services" className="hover:text-primary transition-colors">Services</a>
              <a href="/team" className="hover:text-primary transition-colors">Team</a>
              <a href="/process" className="hover:text-primary transition-colors">Process</a>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-white">Socials</span>
              <a href="#" className="hover:text-primary transition-colors">Twitter (X)</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>

        </div>

        {/* Massive Bottom Text */}
        <div className="w-full mt-20 flex justify-center overflow-hidden">
          <svg viewBox="0 0 1000 120" className="w-full max-w-[1400px] fill-zinc-800 pointer-events-none select-none">
            <text x="50%" y="100" textAnchor="middle" fontSize="130" fontWeight="900" fontFamily="sans-serif" letterSpacing="-2">
              NPH STUDIO
            </text>
          </svg>
        </div>

        <div className="flex justify-between items-center text-xs text-zinc-600 font-bold uppercase tracking-widest max-w-[1400px] w-full mx-auto mt-8 border-t border-zinc-800 pt-8">
          <span>© {new Date().getFullYear()} NPH Studio</span>
          <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
        </div>

      </motion.div>
    </footer>
  );
}
