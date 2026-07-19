'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/premium/Magnetic';
import { IconArrowUpRight } from '@tabler/icons-react';

const caseStudies = [
  {
    title: 'AIBulletin',
    category: 'AI News Platform',
    problem: 'Founders needed a noise-free source for AI news.',
    solution: 'Built a high-performance aggregation engine.',
    color: '#FF5A36',
    bg: '#1A0F0D'
  },
  {
    title: 'JSPARK.AI',
    category: 'Enterprise AI Platform',
    problem: 'Companies struggled to deploy custom AI models.',
    solution: 'A scalable, multi-tenant platform for LLM tools.',
    color: '#7C3AED',
    bg: '#150D22'
  },
  {
    title: 'JSPARK Prime',
    category: 'Premium AI Ecosystem',
    problem: 'Power users required advanced analytics and speed.',
    solution: 'Engineered a premium tier with dedicated compute.',
    color: '#FDFCFB',
    bg: '#161616'
  },
  {
    title: 'LMS Platform',
    category: 'EdTech MVP',
    problem: 'Educators needed a fast, lightweight platform.',
    solution: 'Delivered a sleek MVP with video streaming.',
    color: '#3B82F6',
    bg: '#0D1522'
  },
  {
    title: 'BI Dashboard',
    category: 'Business Intelligence Tool',
    problem: 'Executives were drowning in fragmented data.',
    solution: 'Built a unified dashboard with custom charting.',
    color: '#10B981',
    bg: '#0A1A14'
  }
];

interface StudyData {
  title: string;
  category: string;
  problem: string;
  solution: string;
  color: string;
  bg: string;
}

function HorizontalCard({ study, index }: { study: StudyData, index: number }) {
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
          </div>

          <Magnetic>
            <button className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider group hover:text-white/80 transition-colors self-start">
              View Live Case Study
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <IconArrowUpRight size={20} />
              </span>
            </button>
          </Magnetic>
        </div>

        {/* Image / Visual Asset */}
        <div className="flex-1 bg-black/50 border-l border-white/5 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
          <span className="text-white/20 font-bold tracking-widest uppercase text-sm">Visual Asset</span>
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
  // 5 items = total width is 500vw. We want to translate by -400vw to reach the last item.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  return (
    <section ref={containerRef} className="w-full h-[600vh] relative z-10 bg-red-400">

      {/* Sticky container that holds the viewport */}
      <div className="sticky top-3 w-full h-screen overflow-hidden flex items-center">

        {/* The Horizontal Track */}
        <motion.div
          style={{ x }}
          className="flex h-full w-[500vw] items-center will-change-transform"
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
