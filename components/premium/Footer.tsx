'use client';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Magnetic } from '@/components/premium/Magnetic';
import { TextMask } from '@/components/premium/TextMask';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const textX = useTransform(springX, [-1, 1], ['48%', '52%']);
  const textY = useTransform(springY, [-1, 1], [90, 110]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);


  return (
    <footer 
      id="site-footer"
      ref={containerRef} 
      className="relative w-full bg-[#0A0A0A] text-white min-h-screen lg:h-screen flex flex-col justify-between pt-16 sm:pt-20 pb-8 sm:pb-10 px-6 sm:px-12 md:px-20 z-10 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-[1400px] mx-auto gap-8 sm:gap-12 md:gap-16">

        <div className="flex-1 w-full">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[0.88] tracking-tighter uppercase mb-6 sm:mb-8">
            <TextMask>Let&apos;s Build</TextMask><br />
            <TextMask delay={0.1}>Something</TextMask><br />
            <TextMask delay={0.2}>Epic.</TextMask>
          </h2>

          <Magnetic>
            <a
              href="https://wa.me/918787205784"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with NPH Studio on WhatsApp"
              className="group relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-green-500 rounded-full text-white font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform shadow-[0_0_35px_rgba(34,197,94,0.35)] cursor-pointer"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span className="transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">WhatsApp</span>
                <div className="absolute opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                  <IconBrandWhatsapp size={22} />
                </div>
              </div>
            </a>
          </Magnetic>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 text-xs sm:text-sm uppercase tracking-widest font-medium text-zinc-500 w-full md:w-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="text-white mb-1 text-xs font-bold tracking-widest">Navigation</span>
            {['Work', 'Services', 'Team', 'Process', 'Lab (R&D)'].map((item) => (
              <Magnetic key={item}>
                <Link href={item.startsWith('Lab') ? '/lab' : `/${item.toLowerCase()}`} className="hover:text-primary transition-colors block w-fit text-xs font-semibold">
                  {item}
                </Link>
              </Magnetic>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="text-white mb-1 text-xs font-bold tracking-widest">Socials & Contact</span>
            {[
              { name: 'Email Us', url: 'mailto:contact@nph-studio.in' },
              { name: 'Twitter (X)', url: 'https://x.com/Eternal_Dev_IO' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/company/nph-studio' },
              { name: 'GitHub (OS)', url: 'https://github.com/Narvdeshwar/nph-open-source' }
            ].map((social) => (
              <Magnetic key={social.name}>
                <a
                  href={social.url}
                  target={social.url !== '#' ? "_blank" : "_self"}
                  rel={social.url !== '#' ? "noopener noreferrer" : ""}
                  aria-label={`Visit our ${social.name}`}
                  className="hover:text-primary transition-colors block w-fit text-xs font-semibold"
                >
                  {social.name}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

      </div>

      {/* Massive Bottom Text Tracking Mouse */}
      <div className="w-full mt-auto pt-6 sm:pt-8 flex justify-center overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1000 120" className="w-full max-w-[1400px] h-14 sm:h-20 md:h-28 fill-zinc-800/80 pointer-events-none select-none">
          <motion.text
            x={textX}
            y={textY}
            textAnchor="middle"
            fontSize="130"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="-2"
          >
            NPH-STUDIO
          </motion.text>
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest max-w-[1400px] w-full mx-auto mt-4 sm:mt-6 border-t border-zinc-800/80 pt-4 sm:pt-6 text-center sm:text-left">
        <span>© {new Date().getFullYear()} NPH Studio</span>
        <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
      </div>

    </footer>
  );
}
