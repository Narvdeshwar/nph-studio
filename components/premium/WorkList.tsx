'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';

import { caseStudies } from '@/data/case-studies';

export function WorkList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse tracking for floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for buttery smooth follow
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height of the floating image (e.g. 400x500 -> 200x250)
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 250);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full z-10 pb-32 bg-background overflow-hidden cursor-crosshair">
      
      {/* Floating Image Reveal (Hidden on mobile) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-50 overflow-hidden rounded-[30px] hidden lg:block shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
        style={{
          x: springX,
          y: springY,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: hoveredIndex !== null ? 1 : 0, 
          scale: hoveredIndex !== null ? 1 : 0.5,
          rotate: hoveredIndex !== null ? (hoveredIndex % 2 === 0 ? 4 : -4) : 0,
          filter: hoveredIndex !== null ? 'blur(0px)' : 'blur(20px)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {hoveredIndex !== null && caseStudies[hoveredIndex].image ? (
          <div className="relative w-full h-full bg-black">
            <Image 
              src={caseStudies[hoveredIndex].image!} 
              alt="Preview" 
              fill 
              className="object-cover opacity-90 scale-105"
            />
            {/* Inner glow to make it look premium */}
            <div className="absolute inset-0 border-[2px] border-white/20 mix-blend-overlay rounded-[30px]" />
          </div>
        ) : (
          <div className="w-full h-full bg-black/80 backdrop-blur-xl flex items-center justify-center">
            <span className="text-white/20 font-bold tracking-widest uppercase text-xs">No Asset</span>
          </div>
        )}
      </motion.div>

      {/* Typography List Container */}
      <div 
        className="flex flex-col items-center justify-center w-full px-4 sm:px-12 md:px-24"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {caseStudies.map((study, i) => {
          const isHovered = hoveredIndex === i;
          const isAnyHovered = hoveredIndex !== null;
          
          return (
            <Link href={`/work/${study.slug || '#'}`} key={i} className="w-full group/row">
              <div 
                onMouseEnter={() => setHoveredIndex(i)}
                className="w-full flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-20 border-b border-foreground/10 hover:border-foreground/30 transition-colors relative"
              >
                {/* Hover Background Highlight */}
                <div 
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500" 
                />

                {/* Number & Category */}
                <div className="flex items-center gap-6 mb-6 md:mb-0 md:w-1/4">
                  <span 
                    className="text-sm font-black uppercase tracking-widest transition-colors duration-500"
                    style={{ color: isHovered ? study.color : 'rgba(255,255,255,0.2)' }}
                  >
                    0{i + 1}
                  </span>
                  <span 
                    className="text-xs font-bold uppercase tracking-[0.3em] transition-colors duration-500" 
                    style={{ color: isHovered ? 'white' : 'rgba(255,255,255,0.3)' }}
                  >
                    {study.category}
                  </span>
                </div>

                {/* Massive Typography Title */}
                <div className="flex-1 text-left relative z-10 w-full">
                  <h2 
                    className="text-5xl sm:text-7xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-700"
                    style={{ 
                      color: isHovered ? 'white' : 'transparent',
                      WebkitTextStroke: isHovered ? '0px transparent' : `1px ${isAnyHovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.3)'}`,
                      transform: isHovered ? 'translateX(20px)' : 'translateX(0px)'
                    }}
                  >
                    {study.title}
                  </h2>
                </div>

                {/* Call to action arrow */}
                <div className="hidden md:flex flex-col items-end w-1/4">
                  <div 
                    className="w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={{ 
                      borderColor: isHovered ? study.color : 'rgba(255,255,255,0.1)',
                      backgroundColor: isHovered ? study.color : 'transparent',
                      color: isHovered ? '#000' : 'rgba(255,255,255,0.3)'
                    }}
                  >
                    <IconArrowUpRight size={24} className={`transition-transform duration-500 ${isHovered ? 'rotate-45 scale-125' : 'rotate-0'}`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
