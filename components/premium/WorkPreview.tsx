'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TextMask } from '@/components/premium/TextMask';
import { Magnetic } from '@/components/premium/Magnetic';
import { ScrollVelocity } from '@/components/premium/ScrollVelocity';

const projects = [
  { name: 'AIBulletin', category: 'AI News Platform', image: '/aibulletin.png', link: 'http://aibulletin.in/' },
  { name: 'LMS Platform', category: 'EdTech MVP', image: '/lms.png' }
];

interface ProjectData {
  name: string;
  category: string;
  image: string;
  link?: string;
}

function FuturisticCard({ project, index }: { project: ProjectData, index: number }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <a
      href={project.link || '#'}
      target={project.link ? '_blank' : undefined}
      rel={project.link ? 'noopener noreferrer' : undefined}
      ref={containerRef}
      className="relative block w-full h-[400px] sm:h-[600px] flex items-center justify-center group cursor-pointer overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => !project.link && e.preventDefault()}
    >

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
        className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center border border-zinc-800 transition-transform duration-1000 group-hover:scale-95 rounded-2xl"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: (index * 0.3) + 0.8 }}
        style={{ originY: 0.5 }}
      >
        {/* Hover Gradient Effect - Adjusted to darken image for text legibility */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

        {/* Actual Project Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-top opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${project.image}')` }}
        />

        {/* Dark overlay specifically behind text for maximum contrast */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" /> */}

        {/* Step 3: Text reveals after expansion */}
        <div className="relative z-10 text-center pointer-events-none">
          <motion.div className="overflow-hidden px-4 py-8 -my-8">
            <motion.h3
              initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
              animate={isInView ? { y: "0%", opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: (index * 0.3) + 1.2, ease: "easeOut" }}
              className="text-4xl sm:text-7xl font-black uppercase tracking-tighter mb-4 group-hover:scale-110 group-hover:text-red-400 transition-all duration-700 drop-shadow-2xl text-zinc-300"
            >
              {project.name}
            </motion.h3>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0px" }}
            animate={isInView ? { opacity: 1, letterSpacing: "8px" } : {}}
            transition={{ duration: 1, delay: (index * 0.3) + 1.4, ease: "easeOut" }}
            className="text-primary uppercase text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-md"
          >
            {project.category}
          </motion.p>
        </div>
      </motion.div>

      {/* Localized "View Project" Cursor Morph */}
      <motion.div
        className="pointer-events-none absolute z-50 flex items-center justify-center w-24 h-24 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-widest text-center leading-tight shadow-2xl mix-blend-normal"
        animate={{
          x: mousePos.x - 48,
          y: mousePos.y - 48,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        View<br />Project
      </motion.div>

    </a>
  );
}

export function WorkPreview() {
  return (
    <section className="w-full py-32 bg-foreground text-background relative z-10 overflow-hidden">

      {/* Scroll Velocity Background */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-5 pointer-events-none">
        <ScrollVelocity
          text="NPH STUDIO — SELECTED WORKS — NPH STUDIO — SELECTED WORKS —"
          baseVelocity={2}
          className="text-[15vw] font-black uppercase tracking-tighter"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 relative z-10">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-24 gap-8">
          <h2 className="text-[6vw] sm:text-[5vw] font-bold leading-none tracking-tighter uppercase">
            <TextMask>Selected</TextMask><br />
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
