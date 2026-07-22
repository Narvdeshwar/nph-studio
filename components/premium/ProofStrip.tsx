'use client';
import { motion } from 'framer-motion';

const clients = ['AIBulletin', 'LMS Project', 'NextGen UI'];
// Duplicate array for seamless looping
const marqueeItems = [...clients, ...clients, ...clients];

export function ProofStrip() {
  return (
    <section className="w-full py-24 border-b border-border relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-xs font-bold uppercase tracking-widest text-muted mb-12"
        >
          Trusted by founders & teams behind
        </motion.p>
      </div>

      {/* Edge Gradients for Masking */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="flex w-[300vw] sm:w-[200vw]">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
          className="flex gap-16 md:gap-32 px-16 hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground/20 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
