'use client';
import { motion } from 'framer-motion';
import { IconArrowUpRight, IconBrandWhatsapp, IconClock, IconShieldCheck, IconCode, IconRocket } from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';

export function AgencyCTA() {
  const handleOpenInquiry = () => {
    window.dispatchEvent(new CustomEvent('open-inquiry-modal'));
  };

  return (
    <section className="w-full py-24 sm:py-32 bg-background relative z-10 border-t border-border overflow-hidden">
      {/* Background radial gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.08] pointer-events-none rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--primary), var(--secondary))' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="bg-surface border border-border rounded-[36px] p-8 sm:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now Booking Q1/Q2 Sprint Cycles
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-foreground leading-[0.92] max-w-4xl mx-auto mb-6"
          >
            Ready To Ship Your <br />
            <span className="text-primary">Next Digital Advantage?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            We take on a limited number of clients per sprint to guarantee senior technical attention, weekly live staging demos, and rapid turnaround.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12"
          >
            <Magnetic>
              <button
                type="button"
                onClick={handleOpenInquiry}
                aria-label="Start your project with NPH Studio"
                className="w-full sm:w-auto bg-primary hover:bg-[#E04D2D] text-white px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,90,54,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Your Project</span>
                <IconArrowUpRight size={18} />
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="https://wa.me/918787205784"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with NPH Studio on WhatsApp"
                className="w-full sm:w-auto bg-surface border border-border px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-green-500/10 hover:border-green-500 hover:text-green-600 active:scale-95 transition-all text-foreground/80 hover:text-foreground flex items-center justify-center gap-2"
              >
                <IconBrandWhatsapp size={18} className="text-green-500" />
                <span>Chat on WhatsApp</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Agency Guarantees Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-border/70 text-left sm:text-center">
            <div className="flex items-center gap-2.5 justify-start sm:justify-center">
              <IconClock size={18} className="text-primary shrink-0" />
              <span className="text-xs font-mono font-medium text-foreground/80">Response &lt; 4 Hours</span>
            </div>
            <div className="flex items-center gap-2.5 justify-start sm:justify-center">
              <IconRocket size={18} className="text-primary shrink-0" />
              <span className="text-xs font-mono font-medium text-foreground/80">3–5 Week Launch</span>
            </div>
            <div className="flex items-center gap-2.5 justify-start sm:justify-center">
              <IconCode size={18} className="text-primary shrink-0" />
              <span className="text-xs font-mono font-medium text-foreground/80">100% Code Ownership</span>
            </div>
            <div className="flex items-center gap-2.5 justify-start sm:justify-center">
              <IconShieldCheck size={18} className="text-primary shrink-0" />
              <span className="text-xs font-mono font-medium text-foreground/80">NDA Upon Request</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
