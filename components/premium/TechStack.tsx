'use client';
import { motion } from 'framer-motion';

const techStack = ['ReactJS', 'Next.js', 'MERN', 'Node.js', 'NestJS', 'HTML/CSS', 'JavaScript', 'PostgreSQL', 'MongoDB', 'WordPress', 'Shopify'];
const marqueeItems = [...techStack, ...techStack, ...techStack];

export function TechStack() {
  return (
    <section className="w-full py-16 border-b border-t border-border relative z-10 overflow-hidden bg-background mt-32">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 relative mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
          Our Tech Stack
        </h2>
      </div>
      
      {/* Edge Gradients for Masking */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="flex w-[400vw] sm:w-[200vw]">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
          className="flex gap-12 md:gap-24 px-12 hover:[animation-play-state:paused] items-center"
        >
          {marqueeItems.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground/20 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
