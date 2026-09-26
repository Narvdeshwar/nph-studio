'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { TextMask } from '@/components/premium/TextMask';
import { Magnetic } from '@/components/premium/Magnetic';
import { ScrollVelocity } from '@/components/premium/ScrollVelocity';
import { IconArrowUpRight } from '@tabler/icons-react';

const projects = [
  { name: 'Care Well', category: 'Healthcare Platform', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600&auto=format&fit=crop', link: 'https://care-well-hospital-six.vercel.app/', metric: '< 1s Load Time' },
  { name: 'AIBulletin', category: 'AI News Platform', image: '/aibulletin.png', link: 'https://aibulletin.in/', metric: '71K Impressions' },
  { name: 'Sachin Sharma LMS', category: 'EdTech Platform', image: '/work/edtech.webp', link: 'https://courses.sachinnssharma.com', metric: '1.2K Active Users' },
  { name: 'JSpark AI', category: 'Generative AI', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop', link: 'https://jspark.ai/', metric: 'AI SaaS' },
  { name: 'JSpark Prime', category: 'Enterprise SaaS', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop', link: 'https://jsparkprime.com/', metric: 'B2B Analytics' },
  { name: 'SSSLux', category: 'Luxury E-Commerce', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop', link: 'https://ssslux.vercel.app/', metric: 'Under Development' }
];

export function WorkPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseZone, setMouseZone] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Story Timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      progressRef.current += 1; // 1% every 50ms = 5000ms total duration
      
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else {
        setProgress(progressRef.current);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    setMouseZone(x < rect.width * 0.33 ? 'left' : 'right');
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="w-full py-24 sm:py-32 bg-background text-foreground relative z-10 overflow-hidden">
      {/* Scroll Velocity Background (Subtle) */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.02] pointer-events-none">
        <ScrollVelocity
          text="NPH STUDIO — SELECTED WORKS — NPH STUDIO — SELECTED WORKS —"
          baseVelocity={2}
          className="text-[15vw] font-black uppercase tracking-tighter"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-12 lg:px-20 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-6">
          <h2 className="text-[12vw] sm:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase">
            <TextMask>Selected</TextMask>
            
            <TextMask delay={0.1}>Works</TextMask>
          </h2>
          <Magnetic>
            <a
              href="work"
              className="border border-foreground/10 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              View All Work
            </a>
          </Magnetic>
        </div>

        {/* Story Carousel UI */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setMouseZone(null);
          }}
          className="relative w-full h-[60vh] sm:h-[80vh] bg-zinc-900 rounded-[24px] sm:rounded-[48px] overflow-hidden shadow-2xl group cursor-none select-none"
        >
          {/* Image Background */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${currentProject.image}')` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            />
          </AnimatePresence>

          {/* Vignette Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

          {/* Instagram-Style Progress Bars */}
          <div className="absolute top-6 left-6 right-6 sm:top-10 sm:left-10 sm:right-10 flex gap-2 sm:gap-4 z-30 pointer-events-none">
            {projects.map((_, i) => (
              <div key={i} className="h-1 sm:h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
                <motion.div
                  className="h-full bg-white"
                  style={{
                    width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Navigation Click Zones */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 z-20"
            onClick={handlePrev}
          />
          <div
            className="absolute inset-y-0 right-0 w-2/3 z-20"
            onClick={handleNext}
          />

          {/* Project Details */}
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-16 sm:left-16 sm:right-16 z-30 pointer-events-none flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="flex-1">
              <motion.p
                key={`cat-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-primary uppercase text-xs sm:text-sm font-bold tracking-widest mb-2 sm:mb-4 drop-shadow-md"
              >
                {currentProject.category}
              </motion.p>
              <motion.h3
                key={`name-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-none"
              >
                {currentProject.name}
              </motion.h3>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-4">
              {currentProject.metric && (
                <motion.div
                  key={`metric-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl"
                >
                  {currentProject.metric}
                </motion.div>
              )}
              {currentProject.link && (
                <motion.a
                  key={`link-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors shadow-2xl flex items-center gap-2 group"
                >
                  Launch Project
                  <IconArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Custom Floating Cursor */}
          <motion.div
            className="pointer-events-none absolute z-50 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest text-center leading-tight shadow-2xl hidden sm:flex"
            animate={{
              x: mousePos.x - 48,
              y: mousePos.y - 48,
              scale: mouseZone ? 1 : 0,
              opacity: mouseZone ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
          >
            {mouseZone === 'left' ? 'Prev' : 'Next'}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
