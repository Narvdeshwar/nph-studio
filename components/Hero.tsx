'use client';
import { motion } from 'framer-motion';
import { IconSparkles, IconArrowRight, IconCode, IconLayout2, IconRobot } from '@tabler/icons-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background font-sans flex flex-col items-center flex-1">
      {/* Background Blobs */}
      <motion.div 
        className="absolute -top-[60px] -right-[40px] w-[260px] h-[260px] rounded-full opacity-20 blur-[40px]"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-[80px] -left-[60px] w-[220px] h-[220px] rounded-full opacity-15 blur-[40px]"
        style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))' }}
        animate={{ x: [0, 12, 0], y: [0, -14, 0] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="relative px-10 pt-[100px] pb-12 text-center flex flex-col items-center justify-center max-w-4xl mx-auto w-full z-10">
        
        {/* Chip */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-[6px] bg-surface text-coral-icon text-xs py-[5px] px-3 rounded-full mb-[18px]"
          style={{ color: 'var(--color-coral-icon)' }}
        >
          <IconSparkles size={14} />
          Full-stack team, AI/RAG launching soon
        </motion.div>

        {/* Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-[42px] sm:text-[56px] font-medium text-foreground leading-[1.15] tracking-tight mb-[14px]">
            We design, build, and ship<br/>full-stack products
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[16px] sm:text-[18px] text-muted max-w-[480px] mx-auto mb-10 leading-relaxed">
            Frontend, backend and AI integration under one roof. From landing page to production MVP.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="flex items-center justify-center gap-2 bg-primary text-white border-none py-[12px] px-6 rounded-lg text-[15px] font-medium cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(255,90,54,0.35)] active:scale-95">
            Book a call <IconArrowRight size={16} />
          </button>
          <button className="bg-transparent text-foreground border border-border py-[12px] px-6 rounded-lg text-[15px] font-medium cursor-pointer transition-colors hover:bg-surface active:scale-95">
            See our work
          </button>
        </motion.div>

        {/* Capability Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center w-full max-w-[500px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.div 
            className="bg-white border border-border rounded-xl p-[16px] text-left shadow-sm"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
          >
            <div className="w-[32px] h-[32px] rounded-lg bg-surface flex items-center justify-center mb-3">
              <IconCode size={18} color="var(--color-coral-icon)" />
            </div>
            <div className="text-[14px] font-medium text-foreground mb-1">Backend</div>
            <div className="text-[13px] text-muted">Go, RAG, infra</div>
          </motion.div>

          <motion.div 
            className="bg-white border border-border rounded-xl p-[16px] text-left shadow-sm"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
            whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
          >
            <div className="w-[32px] h-[32px] rounded-lg bg-[var(--color-violet-tint)] flex items-center justify-center mb-3">
              <IconLayout2 size={18} color="var(--color-violet-icon)" />
            </div>
            <div className="text-[14px] font-medium text-foreground mb-1">Frontend</div>
            <div className="text-[13px] text-muted">UI, motion, UX</div>
          </motion.div>

          <motion.div 
            className="bg-white border border-border rounded-xl p-[16px] text-left shadow-sm"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
            whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
          >
            <div className="w-[32px] h-[32px] rounded-lg bg-[var(--color-coral-tint)] flex items-center justify-center mb-3">
              <IconRobot size={18} color="#D85A30" />
            </div>
            <div className="text-[14px] font-medium text-foreground mb-1">AI / RAG</div>
            <div className="text-[13px] text-muted">Coming soon</div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
