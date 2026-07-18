'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextMask } from '@/components/premium/TextMask';
import { Magnetic } from '@/components/premium/Magnetic';

const projects = [
  { name: 'AIBulletin', category: 'AI News Platform' },
  { name: 'JSPARK.AI', category: 'Enterprise AI' },
  { name: 'LMS Platform', category: 'EdTech MVP' }
];

interface ProjectData {
  name: string;
  category: string;
}

function FuturisticCard({ project, index }: { project: ProjectData, index: number }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative w-full h-[400px] sm:h-[600px] flex items-center justify-center group cursor-pointer">
      
      {/* Step 1: Laser Lines combine in the center */}
      <motion.div 
        className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-primary z-20 origin-left"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={isInView ? { scaleX: [0, 1, 1, 0], opacity: [1, 1, 0, 0] } : {}}
        transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.3 }}
      />
      <motion.div 
        className="absolute top-1/2 right-0 w-1/2 h-[2px] bg-primary z-20 origin-right"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={isInView ? { scaleX: [0, 1, 1, 0], opacity: [1, 1, 0, 0] } : {}}
        transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.3 }}
      />

      {/* Step 2: The container expands from the center collision line */}
      <motion.div
        className="absolute inset-0 bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: (index * 0.3) + 0.8 }}
        style={{ originY: 0.5 }}
      >
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
        
        {/* Step 3: Text reveals after expansion */}
        <div className="relative z-10 text-center pointer-events-none">
          <motion.div className="overflow-hidden">
            <motion.h3 
              initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
              animate={isInView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: (index * 0.3) + 1.2, ease: "easeOut" }}
              className="text-4xl sm:text-7xl font-black uppercase tracking-tighter mb-4 group-hover:scale-110 group-hover:text-primary transition-all duration-700"
            >
              {project.name}
            </motion.h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0px" }}
            animate={isInView ? { opacity: 1, letterSpacing: "8px" } : {}}
            transition={{ duration: 1, delay: (index * 0.3) + 1.4, ease: "easeOut" }}
            className="text-zinc-400 uppercase text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            {project.category}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export function WorkPreview() {
  return (
    <section className="w-full py-32 bg-foreground text-background relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-24 gap-8">
          <h2 className="text-[6vw] sm:text-[5vw] font-bold leading-none tracking-tighter uppercase">
            <TextMask>Selected</TextMask><br/>
            <TextMask delay={0.1}>Works</TextMask>
          </h2>
          <Magnetic>
            <button className="border border-border/20 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              View All Work
            </button>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-8 relative">
          {projects.map((project, i) => (
            <FuturisticCard key={project.name} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
