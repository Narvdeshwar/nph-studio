'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies } from '@/data/case-studies';
import Link from 'next/link';

export function WorkShowcase() {
  const [rotationCount, setRotationCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationCount((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const safeIndex = ((rotationCount % caseStudies.length) + caseStudies.length) % caseStudies.length;
  const activeStudy = caseStudies[safeIndex];
  const handleSelect = (index: number) => {
    const diff = index - safeIndex;
    let shortestDiff = diff;
    if (diff > caseStudies.length / 2) shortestDiff -= caseStudies.length;
    if (diff < -caseStudies.length / 2) shortestDiff += caseStudies.length;
    setRotationCount(prev => prev + shortestDiff);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col md:flex-row overflow-hidden text-slate-900 font-sans relative z-10 pt-24 md:pt-0">
      
      {/* LEFT SIDE: Minimal Editorial Info */}
      <div className="w-full md:w-[55%] h-[50vh] md:h-full relative flex flex-col justify-center p-8 md:p-24 z-10 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
        
        {/* Subtle Accent Glow based on Project Color */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`glow-left-${safeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full blur-[120px] pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at 20% 30%, ${activeStudy.color}, transparent 60%)` 
            }}
          />
        </AnimatePresence>

        {/* Dynamic Content Container */}
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${safeIndex}`}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-6 mb-8">
                <span 
                  className="text-[10px] uppercase tracking-[0.4em] font-bold" 
                  style={{ color: activeStudy.color || '#888' }}
                >
                  {activeStudy.category}
                </span>
                <div className="flex-1 h-[1px] bg-slate-200" />
                <span className="text-slate-400 text-[10px] font-mono tracking-widest">
                  0{safeIndex + 1} <span className="mx-2">/</span> 0{caseStudies.length}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-[70px] lg:text-[90px] font-serif italic tracking-tight leading-[1] mb-10">
                {activeStudy.title}
              </h1>
              
              <p className="text-slate-600 text-sm md:text-base max-w-lg leading-relaxed mb-12 font-light">
                {activeStudy.overview}
              </p>

              {activeStudy.metrics && (
                <div className="flex gap-12 mb-14 pt-8 border-t border-slate-100">
                  {activeStudy.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">{metric.value}</span>
                      <span className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-[0.3em] font-semibold">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link 
                href={`/work/${activeStudy.slug}`}
                className="group inline-flex items-center gap-4 text-slate-900 text-xs uppercase tracking-[0.2em] font-bold"
              >
                <span className="border-b border-slate-300 pb-1 group-hover:border-slate-900 transition-colors duration-300">
                  Explore Project
                </span>
                <span className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT SIDE: Dynamic Color Block Menu */}
      <motion.div 
        className="w-full md:w-[45%] h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-24 overflow-y-auto relative"
        animate={{ backgroundColor: activeStudy.color || '#111111' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Subtle noise/texture overlay for a premium print feel */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise-lines.png")' }} 
        />

        <div className="flex flex-col gap-6 relative z-10 w-full max-w-lg mx-auto">
          {caseStudies.map((study, index) => {
            const isActive = index === safeIndex;
            
            return (
              <div 
                key={study.slug}
                className="flex flex-col w-full"
              >
                <div 
                  onClick={() => handleSelect(index)}
                  className="group cursor-pointer flex items-center gap-6"
                >
                  <span className={`font-mono text-sm tracking-widest transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40'}`}>
                    0{index + 1}
                  </span>

                  <h2 
                    className={`text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter transition-all duration-700 ${
                      isActive 
                        ? 'font-black text-white translate-x-4' 
                        : 'font-light text-white/40 group-hover:text-white/70 group-hover:translate-x-2'
                    }`}
                  >
                    {study.title}
                  </h2>
                </div>

                {/* Animated Progress Bar for Auto-Play indicating time remaining */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="ml-[3.25rem] overflow-hidden"
                    >
                      <div className="w-full max-w-[200px] h-[2px] bg-white/20 mt-5 rounded-full overflow-hidden">
                        <motion.div 
                          key={`progress-${safeIndex}`} // Forces animation restart on index change
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 6, ease: "linear" }}
                          className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}
