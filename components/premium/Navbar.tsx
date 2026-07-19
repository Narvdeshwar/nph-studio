'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionLink } from '@/components/premium/TransitionLink';
import { Logo } from '@/components/premium/Logo';
import { Magnetic } from '@/components/premium/Magnetic';

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTheme, setMenuTheme] = useState<'dark' | 'light'>('dark');

  const handleMenuClick = () => {
    if (!isOpen) {
      // Check background color at the center of the screen right below the header
      const el = document.elementFromPoint(window.innerWidth / 2, 100);
      let isDarkBg = false;
      if (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        const rgb = bg.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          // Ignore transparent backgrounds
          if (rgb.length === 3 || parseFloat(rgb[3]) !== 0) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            isDarkBg = brightness < 128;
          }
        }
      }
      // If background is dark, menu opens in light mode. If background is light, menu opens in dark mode.
      setMenuTheme(isDarkBg ? 'light' : 'dark');
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Header */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 p-6 sm:p-8 flex justify-between items-center pointer-events-none ${scrolled ? 'py-4' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <Magnetic>
          <TransitionLink href="/" className="pointer-events-auto mix-blend-difference text-white z-[60]">
            <div className="relative group">
              <Logo className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            </div>
          </TransitionLink>
        </Magnetic>

        <Magnetic>
          <button
            onClick={handleMenuClick}
            className="relative z-50 w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 shadow-lg bg-[#161616] text-white hover:bg-primary pointer-events-auto"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
              className="w-6 h-[2px] bg-current origin-center"
            />
            <motion.div
              animate={{ width: isOpen ? 0 : 24, opacity: isOpen ? 0 : 1 }}
              className="w-6 h-[2px] bg-current"
            />
            <motion.div
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
              className="w-6 h-[2px] bg-current origin-center"
            />
          </button>
        </Magnetic>
      </motion.header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 4rem) 4rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 4rem) 4rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 4rem) 4rem)' }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className={`fixed inset-0 z-40 flex items-center justify-center transition-colors duration-500 ${menuTheme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#FDFCFB] text-[#161616]'}`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-8 flex flex-col sm:flex-row justify-between items-start">

              <div className="flex flex-col gap-4 sm:gap-8">
                <span className={`uppercase tracking-widest text-sm font-bold mb-4 ${menuTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Navigation</span>
                {menuLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.6, delay: 0.1 + (i * 0.05), ease: [0.33, 1, 0.68, 1] }}
                    >
                      <TransitionLink
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-5xl sm:text-7xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-4 group"
                      >
                        <span className={`text-xl sm:text-3xl font-medium transition-colors ${menuTheme === 'dark' ? 'text-zinc-600 group-hover:text-primary/50' : 'text-zinc-300 group-hover:text-primary/50'}`}>0{i + 1}</span>
                        {link.name}
                      </TransitionLink>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="mt-20 sm:mt-0 flex flex-col gap-12 sm:max-w-xs">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className={`uppercase tracking-widest text-sm font-bold block mb-6 ${menuTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Contact Info</span>
                  <a href="mailto:hello@nph.studio" className="text-xl hover:text-primary transition-colors block mb-2">hello@nph.studio</a>
                  <p className={menuTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}>Building products worldwide.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <span className={`uppercase tracking-widest text-sm font-bold block mb-6 ${menuTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Socials</span>
                  <div className="flex gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
