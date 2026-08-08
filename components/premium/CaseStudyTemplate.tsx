'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconArrowUpRight, IconCheck, IconRocket, IconCode } from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { CaseStudyData } from '@/data/case-studies';

export function CaseStudyTemplate({ study }: { study: CaseStudyData }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 sm:p-10 z-50 mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <Magnetic>
            <Link href="/" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors group">
              <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Magnetic>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center p-8 sm:p-20 overflow-hidden" style={{ backgroundColor: study.bg }}>
        {/* Glow */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] opacity-30"
            style={{ background: `radial-gradient(circle, ${study.color} 0%, transparent 70%)` }}
          />
        </motion.div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-20"
        >
          <span className="font-bold uppercase tracking-widest text-sm mb-6 inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md" style={{ color: study.color }}>
            {study.category}
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
            {study.title}
          </h1>
          <p className="text-xl sm:text-2xl text-white/70 max-w-2xl leading-relaxed font-medium">
            {study.overview}
          </p>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="relative z-20 bg-background pt-32 pb-40 rounded-t-[40px] -mt-10 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto px-8 sm:px-20 space-y-40">
          
          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-500/10 text-red-500">
                  <IconArrowUpRight size={24} className="rotate-45" />
                </span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">The Challenge</h2>
              </div>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-medium">{study.problem}</p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${study.color}15`, color: study.color }}>
                  <IconCheck size={24} />
                </span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">The Solution</h2>
              </div>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-medium">{study.solution}</p>
            </div>
          </div>

          {/* Key Features & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-8 flex items-center gap-4">
                <IconRocket size={20} />
                Key Capabilities
              </h2>
              <ul className="space-y-6">
                {study.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1" style={{ color: study.color }}><IconCheck size={20} /></span>
                    <span className="text-lg text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-5 bg-surface border border-border p-8 rounded-3xl h-fit">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-8 flex items-center gap-4">
                <IconCode size={20} />
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {study.techStack?.map((tech, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Impact */}
          {((study.metrics && study.metrics.length > 0) || (study.results && study.results.length > 0)) && (
            <div className="bg-surface border border-border p-10 sm:p-16 rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3" style={{ background: `radial-gradient(circle, ${study.color}, transparent)` }} />
              
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-12">Impact & Results</h2>
              
              {study.metrics && study.metrics.length > 0 && (
                <div className="flex flex-wrap gap-12 sm:gap-24 mb-16">
                  {study.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className="text-5xl sm:text-7xl font-black tracking-tighter mb-2" style={{ color: study.color }}>
                        {metric.value}
                      </p>
                      <p className="text-sm font-bold text-white/50 uppercase tracking-widest">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {study.results && study.results.length > 0 && (
                <ul className="space-y-6 max-w-2xl">
                  {study.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1" style={{ color: study.color }}><IconCheck size={20} /></span>
                      <span className="text-lg text-white/90 leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col items-center text-center pt-20 border-t border-white/5">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-8">
              Want similar results?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {study.link && (
                <Magnetic>
                  <a 
                    href={study.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                  >
                    View Live Site <IconArrowUpRight size={18} />
                  </a>
                </Magnetic>
              )}
              <Magnetic>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-colors"
                >
                  Start a Project
                </Link>
              </Magnetic>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
