'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

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
    <footer ref={containerRef} className="relative h-screen min-h-[600px] w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[#0A0A0A] text-white flex flex-col justify-between pt-24 sm:pt-32 pb-8 px-6 sm:px-12 md:px-20"
      >

        <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-[1400px] mx-auto gap-12 md:gap-20">

          <div className="flex-1 w-full">
            <h2 className="text-5xl sm:text-7xl md:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase mb-12">
              <TextMask>Let&apos;s Build</TextMask><br />
              <TextMask delay={0.1}>Something</TextMask><br />
              <TextMask delay={0.2}>Epic.</TextMask>
            </h2>

            <Magnetic>
              <a
                href="https://wa.me/918787205784"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-green-500 rounded-full text-white font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-110 active:scale-95 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.3)]"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">WhatsApp</span>
                  <div className="absolute opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                    <IconBrandWhatsapp size={24} />
                  </div>
                </div>
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 text-sm uppercase tracking-widest font-medium text-zinc-500 w-full md:w-auto">
            <div className="flex flex-col gap-4 sm:gap-6">
              <span className="text-white mb-2 text-xs sm:text-sm">Navigation</span>
              {['Work', 'Services', 'Team', 'Process'].map((item) => (
                <Magnetic key={item}>
                  <a href={`/${item.toLowerCase()}`} className="hover:text-primary transition-colors block w-fit text-xs sm:text-sm">
                    {item}
                  </a>
                </Magnetic>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              <span className="text-white mb-2 text-xs sm:text-sm">Socials & Contact</span>
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
                    className="hover:text-primary transition-colors block w-fit text-xs sm:text-sm"
                  >
                    {social.name}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

        </div>

        {/* Massive Bottom Text Tracking Mouse */}
        <div className="w-full mt-auto pt-12 sm:pt-20 flex justify-center overflow-hidden">
          <svg viewBox="0 0 1000 120" className="w-full max-w-[1400px] h-12 sm:h-24 md:h-auto fill-zinc-800/80 pointer-events-none select-none">
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-zinc-600 font-bold uppercase tracking-widest max-w-[1400px] w-full mx-auto mt-8 border-t border-zinc-800 pt-8 text-center sm:text-left">
          <span>© {new Date().getFullYear()} NPH Studio</span>
          <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
        </div>

      </motion.div>
    </footer>
  );
}
