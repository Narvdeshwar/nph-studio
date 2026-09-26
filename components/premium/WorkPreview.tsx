'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TextMask } from '@/components/premium/TextMask';
import { Magnetic } from '@/components/premium/Magnetic';
import { ScrollVelocity } from '@/components/premium/ScrollVelocity';

const projects = [
  { name: 'Care Well', category: 'Healthcare Platform', image: '/carewell.png', link: 'https://care-well-hospital-six.vercel.app/', metric: '< 1s Load Time' },
  { name: 'AIBulletin', category: 'AI News Platform', image: '/aibulletin.png', link: 'http://aibulletin.in/', metric: '71K Impressions' },
  { name: 'LMS Platform', category: 'EdTech MVP', image: '/lms.png', metric: '1.2K Active Users' }
];

interface ProjectData {
  name: string;
  category: string;
  image: string;
  link?: string;
  metric?: string;
}

function ProjectCard({ project, index }: { project: ProjectData, index: number }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isFeatured = index === 0;

  return (
    <motion.a
      href={project.link || '#'}
      target={project.link ? '_blank' : undefined}
      rel={project.link ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className={`flex flex-col group cursor-none sm:cursor-pointer ${isFeatured ? 'md:col-span-12 mb-8 sm:mb-16' : 'md:col-span-6'}`}
      onClick={(e) => !project.link && e.preventDefault()}
    >
      {/* Editorial Image Container */}
      <div 
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full overflow-hidden bg-zinc-900 mb-6 sm:mb-8 ${isFeatured ? 'h-[50vh] sm:h-[75vh] rounded-[24px] sm:rounded-[40px]' : 'h-[40vh] sm:h-[55vh] rounded-[20px] sm:rounded-[32px]'}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-top transition-transform duration-[1.5s] ease-[0.25,1,0.5,1] group-hover:scale-105 opacity-90 group-hover:opacity-100"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        
        {/* Very subtle vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Floating Custom Cursor (Only visible inside image on desktop) */}
        <motion.div
          className="pointer-events-none absolute z-50 flex items-center justify-center w-28 h-28 rounded-full bg-foreground text-background font-bold text-xs uppercase tracking-widest text-center leading-tight shadow-2xl mix-blend-difference hidden sm:flex"
          animate={{
            x: mousePos.x - 56,
            y: mousePos.y - 56,
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
        >
          View<br />Project
        </motion.div>
      </div>

      {/* Clean Typography Block Below Image */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-2 sm:px-4">
        <div>
          <h3 className={`${isFeatured ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-4xl'} font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500`}>
            {project.name}
          </h3>
          <p className="text-muted uppercase text-xs sm:text-sm font-bold tracking-widest mt-2 sm:mt-3">
            {project.category}
          </p>
        </div>
        
        {project.metric && (
          <div className="flex-shrink-0 mt-2 sm:mt-0">
            <span className="inline-block border border-border/50 text-foreground px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary transition-all duration-500">
              {project.metric}
            </span>
          </div>
        )}
      </div>
    </motion.a>
  );
}

export function WorkPreview() {
  return (
    <section className="w-full py-32 bg-background text-foreground relative z-10 overflow-hidden">
      {/* Scroll Velocity Background (Subtle) */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.02] pointer-events-none">
        <ScrollVelocity
          text="NPH STUDIO — SELECTED WORKS — NPH STUDIO — SELECTED WORKS —"
          baseVelocity={2}
          className="text-[15vw] font-black uppercase tracking-tighter"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-24 gap-8">
          <h2 className="text-[12vw] sm:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase">
            <TextMask>Selected</TextMask>
            <br />
            <TextMask delay={0.1}>Works</TextMask>
          </h2>
          <Magnetic>
            <a
              href="work"
              className="border border-foreground/10 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              View All Work
            </a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12 relative">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
