'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';
import { IconArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';

import { caseStudies, CaseStudyData } from '@/data/case-studies';

function HorizontalCard({ study, index }: { study: CaseStudyData, index: number }) {
  return (
    <div className="w-screen h-full flex-shrink-0 flex items-center justify-center p-8 sm:p-20">
      <div
        className="w-full max-w-[1400px] h-[80vh] rounded-[40px] overflow-hidden relative shadow-2xl flex flex-col md:flex-row border border-white/5"
        style={{ backgroundColor: study.bg }}
      >
        {/* Glow - Optimized for low-end devices using radial-gradient instead of CSS blur */}
        <div
          className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${study.color}, transparent 70%)`
          }}
        />

        {/* Content */}
        <div className="flex-1 p-12 sm:p-20 flex flex-col justify-between z-10 text-white">
          <div>
            <span
              className="font-bold uppercase tracking-widest text-sm mb-6 block"
              style={{ color: study.color }}
            >
              0{index + 1} — {study.category}
            </span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
              {study.title}
            </h2>

            <div className="flex flex-col gap-8 mb-12">
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">The Problem</h3>
                <p className="text-white/90 text-lg max-w-md leading-relaxed">{study.problem}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">The Solution</h3>
                <p className="text-white/90 text-lg max-w-md leading-relaxed">{study.solution}</p>
              </div>
            </div>

            {study.metrics && (
              <div className="flex gap-12 mb-12 border-t border-white/10 pt-8">
                {study.metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black tracking-tighter" style={{ color: study.color }}>{metric.value}</p>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Magnetic>
            {study.slug ? (
              <a href={`/work/${study.slug}`} className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider group hover:text-white/80 transition-colors self-start">
                Read Full Case Study
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <IconArrowUpRight size={20} />
                </span>
              </a>
            ) : (
              <button className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider group hover:text-white/80 transition-colors self-start cursor-not-allowed opacity-50">
                Coming Soon
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <IconArrowUpRight size={20} />
                </span>
              </button>
            )}
          </Magnetic>
        </div>

        {/* Image / Visual Asset */}
        <div className="flex-1 bg-black/50 border-l border-white/5 relative overflow-hidden flex items-center justify-center">
          {study.image ? (
            <>
              {/* Ambient Glow Background Layer */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={study.image} 
                  alt="" 
                  fill
                  className="object-cover opacity-30 blur-3xl scale-125"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              {/* Sharp Foreground Image */}
              <div className="relative w-full h-full p-8 sm:p-16 pointer-events-none">
                <div className="relative w-full h-full pointer-events-auto">
                  <Image 
                    src={study.image} 
                    alt={`${study.title} visual asset`} 
                    fill
                    className="object-contain object-top rounded-[32px] shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
              <span className="text-white/20 font-bold tracking-widest uppercase text-sm z-10">Visual Asset</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkList() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Map scroll progress to a horizontal translation
  // 3 items = total width is 300vw. We want to translate by -200vw to reach the last item.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  return (
    <section ref={containerRef} className="w-full h-[400vh] relative z-10">

      {/* Sticky container that holds the viewport */}
      <div className="sticky top-3 w-full h-screen overflow-hidden flex items-center">

        {/* The Horizontal Track */}
        <motion.div
          style={{ x }}
          className="flex h-full w-[300vw] items-center will-change-transform"
        >
          {caseStudies.map((study, i) => (
            <HorizontalCard
              key={study.title}
              study={study}
              index={i}
            />
          ))}
        </motion.div>

        {/* Scroll Instruction Overlay */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/40 text-sm font-bold uppercase tracking-widest flex flex-col items-center gap-2 pointer-events-none"
        >
          <span>Scroll down to explore</span>
        </motion.div>

      </div>
    </section>
  );
}
