'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconFingerprint, IconLock, IconShieldCheck, IconCpu, IconActivity, IconMenu, IconArrowUpRight, IconBrandApple, IconChevronDown } from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { LiquidAurora } from '@/components/premium/LiquidAurora';
import { useRef } from 'react';

export default function AuroraOSPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  
  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* WebGL 3D Liquid Orb Background */}
      <div className="absolute inset-0 z-0 mix-blend-screen opacity-80">
        <LiquidAurora />
      </div>

      {/* Cyber Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50" />

      {/* Extreme Glassy Premium Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference"
      >
        <Link href="/lab" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <IconArrowLeft size={20} />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-500">Lab Vault</span>
        </Link>

        <div className="hidden md:flex items-center gap-12 text-xs font-black uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-emerald-400 transition-colors">Vision</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Neural Engine</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Security</a>
        </div>

        <Magnetic>
          <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
            <IconMenu size={20} />
          </button>
        </Magnetic>
      </motion.nav>

      {/* HUD Overlays (Top Right & Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-32 right-12 z-20 hidden lg:flex flex-col gap-4"
      >
        <div className="w-64 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">System Status</span>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div className="text-3xl font-black tracking-tighter">100%</div>
          <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-400" />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-12 z-20 hidden lg:flex flex-col gap-4"
      >
        <div className="w-64 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <IconShieldCheck className="text-emerald-400 mb-4" size={24} />
          <div className="text-sm font-bold uppercase tracking-widest mb-1">Quantum Encryption</div>
          <div className="text-xs text-slate-400">Military-grade protection active on all spatial endpoints.</div>
        </div>
      </motion.div>

      {/* Center 3D Typography Intersecting the Orb */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pointer-events-none">
        
        <motion.div style={{ y: y1 }} className="flex flex-col items-center">
          {/* Solid Top Text */}
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[200px] font-black tracking-tighter leading-[0.75] z-20 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]"
          >
            AURORA
          </motion.h1>

          {/* Hollow Outline Text (Orb will be visible through and behind it) */}
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[15vw] md:text-[200px] font-black tracking-tighter leading-[0.75] z-0 text-transparent relative mix-blend-overlay"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
          >
            SYSTEM
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 blur-2xl z-[-1]" />
          </motion.h1>
        </motion.div>

        {/* Floating Action Button overlapping both layers */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1, type: "spring", bounce: 0.5 }}
          className="absolute bottom-1/4 z-30 pointer-events-auto"
        >
          <Magnetic>
            <button className="group relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-black/40 border border-white/20 backdrop-blur-xl hover:bg-white hover:text-black hover:border-white transition-all duration-700 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex flex-col items-center gap-2 relative z-10">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Initialize</span>
                <IconFingerprint size={32} className="group-hover:scale-110 transition-transform duration-500" />
              </div>
            </button>
          </Magnetic>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <IconChevronDown size={16} className="animate-bounce" />
      </motion.div>

    </main>
  );
}
