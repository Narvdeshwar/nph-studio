'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies } from '@/data/case-studies';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
} from '@tabler/icons-react';

export function WorkShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = caseStudies.length;
  const activeStudy = caseStudies[currentIndex];

  // Auto-cycle through projects every 6.5 seconds, paused when hovering
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  // Extract clean domain for browser mockup header
  const getCleanUrl = (url?: string) => {
    if (!url) return 'nph-studio.in/work';
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '') + (parsed.pathname !== '/' ? parsed.pathname : '/');
    } catch {
      return url.replace(/^https?:\/\//, '');
    }
  };

  return (
    <div
      className="relative w-full min-h-screen bg-[#FAF7F2] text-neutral-900 font-sans overflow-x-hidden selection:bg-orange-500/20 pt-28 pb-16 flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Dynamic Ambient Color Tint in Background */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-1000 -z-0"
        style={{
          background: `radial-gradient(circle, ${activeStudy.color || '#FF5A36'}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Project Details (approx 55% on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* TOP BAR: Project Index + Category Pill + Dash Pagination */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-wider text-neutral-500">
                  PROJ 0{currentIndex + 1} / 0{total}
                </span>

                <span
                  className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border transition-colors duration-500"
                  style={{
                    backgroundColor: `${activeStudy.color}15`,
                    color: activeStudy.color,
                    borderColor: `${activeStudy.color}35`,
                  }}
                >
                  {activeStudy.category}
                </span>
              </div>

              {/* Slide Pagination Indicator (Dash for active, dots for rest) */}
              <div className="flex items-center gap-1.5" aria-label="Project pagination">
                {caseStudies.map((_, i) => {
                  const isActive = i === currentIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      aria-label={`Go to project ${i + 1}`}
                      className="group p-1 focus:outline-none"
                    >
                      {isActive ? (
                        <motion.div
                          layoutId="activeSlideIndicator"
                          className="w-7 h-1.5 rounded-full transition-all duration-300"
                          style={{ backgroundColor: activeStudy.color || '#FF5A36' }}
                        />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-500 transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ANIMATED PROJECT BODY */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`project-body-${currentIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* HUGE BOLD TITLE (Google Sans uppercase) */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95] uppercase mb-4">
                  {activeStudy.title}
                </h1>

                {/* Subtitle / Overview */}
                <p className="text-neutral-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed mb-6">
                  {activeStudy.overview}
                </p>

                {/* CHALLENGE & SOLUTION CARD */}
                <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
                      The Challenge:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {activeStudy.problem}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/[0.04]">
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest uppercase block mb-1"
                      style={{ color: activeStudy.color }}
                    >
                      Our Engineering Solution:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                      {activeStudy.solution}
                    </p>
                  </div>
                </div>

                {/* VERIFIED PERFORMANCE METRICS (3 COLUMNS) */}
                {activeStudy.metrics && activeStudy.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {activeStudy.metrics.slice(0, 3).map((metric, i) => (
                      <div
                        key={i}
                        className="bg-white/90 rounded-xl p-3 sm:p-4 border border-black/[0.05] shadow-xs flex flex-col justify-between"
                      >
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1 truncate">
                          {metric.label}
                        </span>
                        <span
                          className="text-lg sm:text-2xl font-black tracking-tight"
                          style={{ color: activeStudy.color }}
                        >
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* TECH STACK CHIPS */}
                {activeStudy.techStack && (
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <span className="text-[11px] font-mono text-neutral-400 font-bold uppercase mr-1">
                      Stack:
                    </span>
                    {activeStudy.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-mono bg-white rounded-lg border border-neutral-200/90 text-neutral-700 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* CALL TO ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-4">
                  {activeStudy.link && (
                    <a
                      href={activeStudy.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-black text-white transition-all shadow-md hover:scale-[1.02]"
                    >
                      <span>Visit Live Platform</span>
                      <IconArrowUpRight
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  )}

                  <Link
                    href={`/work/${activeStudy.slug}`}
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-neutral-900 transition-all shadow-2xs"
                  >
                    <span>Full Case Study</span>
                    <IconArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous project"
                      className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center transition-all shadow-2xs active:scale-95"
                    >
                      <IconChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next project"
                      className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center transition-all shadow-2xs active:scale-95"
                    >
                      <IconChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: Browser Window Mockup (approx 45% on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`browser-mockup-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl"
              >
                {/* Browser Frame Window */}
                <div className="relative rounded-2xl bg-[#0F1117] p-2.5 sm:p-3 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] border border-neutral-800/90 overflow-hidden">
                  
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between pb-2.5 px-2 border-b border-white/5">
                    {/* Traffic Light Window Controls */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 max-w-[240px] mx-3">
                      <div className="bg-black/60 rounded-full px-3 py-1 border border-white/10 text-center truncate">
                        <span className="font-mono text-[10px] text-neutral-400 select-all">
                          {getCleanUrl(activeStudy.link)}
                        </span>
                      </div>
                    </div>

                    {/* Live Status Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Browser Viewport with Realistic Visual */}
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 mt-2.5 border border-white/5 group">
                    {activeStudy.image ? (
                      <div className="relative w-full h-full">
                        {activeStudy.image.startsWith('http') ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={activeStudy.image}
                            alt={`${activeStudy.title} Preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <Image
                            src={activeStudy.image}
                            alt={`${activeStudy.title} Preview`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        )}
                        {/* Soft Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                      </div>
                    ) : (
                      /* Fallback Software Visual if image not provided */
                      <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-neutral-900 to-black text-white">
                        <div className="space-y-2">
                          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                            Digital Product Architecture
                          </span>
                          <h3 className="text-2xl font-black">{activeStudy.title}</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-neutral-300">
                          {activeStudy.clientOutcome || 'Engineered for sub-second response times'}
                        </div>
                      </div>
                    )}

                    {/* Floating Client Outcome Badge (Bottom-Left) */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <div className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white shadow-xl flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: activeStudy.color || '#22C55E' }}
                        />
                        <span className="font-mono text-[10px] sm:text-xs font-medium text-neutral-200">
                          {activeStudy.clientOutcome || 'Client Outcome: Sub-second Page Load'}
                        </span>
                      </div>
                    </div>

                    {/* Hover Link Overlay */}
                    {activeStudy.link && (
                      <a
                        href={activeStudy.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
                        aria-label={`Open ${activeStudy.title} in new tab`}
                      >
                        <span className="bg-white text-neutral-900 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <span>Inspect Live</span>
                          <IconExternalLink size={14} />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM PROJECT SWITCHER STRIP (Horizontal list of all projects) */}
        <div className="mt-14 pt-8 border-t border-neutral-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-neutral-400">
              Browse All Production Engagements
            </span>
            <span className="font-mono text-[10px] text-neutral-400">
              {currentIndex + 1} of {total} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {caseStudies.map((study, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={study.slug}
                  onClick={() => handleSelect(idx)}
                  className={`text-left p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-neutral-900/80 shadow-sm ring-1 ring-neutral-900/10'
                      : 'bg-white/50 hover:bg-white border-neutral-200/70 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        isSelected ? 'text-neutral-900' : 'text-neutral-400'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    {isSelected && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: study.color }}
                      />
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold truncate ${
                      isSelected ? 'text-neutral-900' : 'text-neutral-600'
                    }`}
                  >
                    {study.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
