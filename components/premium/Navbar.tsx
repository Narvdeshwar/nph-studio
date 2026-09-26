'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionLink } from '@/components/premium/TransitionLink';
import { Logo } from '@/components/premium/Logo';
import { Magnetic } from '@/components/premium/Magnetic';

const menuLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Team', href: '/team' },
  { name: 'Lab (3D)', href: '/lab' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuTheme, setMenuTheme] = useState<'dark' | 'light'>('dark');

  const handleMenuClick = () => {
    if (!isOpen) {
      // Light/dark detection for full-screen overlay (mostly for mobile now)
      const el = document.elementFromPoint(window.innerWidth / 2, 100);
      let isDarkBg = false;
      if (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        const rgb = bg.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          if (rgb.length === 3 || parseFloat(rgb[3]) !== 0) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            isDarkBg = brightness < 128;
          }
        }
      }
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
      {/* Floating Pill Navbar */}
      <motion.header
        className={`fixed left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-[1400px] transition-all duration-500 pointer-events-none ${scrolled ? 'top-2' : 'top-3'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="bg-surface/50 backdrop-blur-2xl backdrop-saturate-150 border border-white/50 rounded-[2rem] sm:rounded-full px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.04)] pointer-events-auto">

          {/* Logo - Left */}
          <Magnetic>
            <TransitionLink href="/" className="z-[60] flex items-center px-2">
              <div className="relative group flex items-center">
                <Logo className="text-xl sm:text-2xl text-foreground" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              </div>
            </TransitionLink>
          </Magnetic>

          {/* Desktop Links - Center */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {menuLinks.map((link) => (
              <Magnetic key={link.name}>
                <TransitionLink
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1.5 left-1/2 w-0 h-px bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
                </TransitionLink>
              </Magnetic>
            ))}
          </div>

          {/* CTA & Mobile Toggle - Right */}
          <div className="flex items-center gap-3 sm:gap-4 z-[60]">
            <div className="hidden md:block">
              <Magnetic>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                  className="bg-primary text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-full px-8 py-3.5 hover:scale-105 hover:bg-foreground transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  Let&apos;s Talk
                </button>
              </Magnetic>
            </div>

            {/* Hamburger Menu (Visible on Mobile) */}
            <Magnetic>
              <button
                onClick={handleMenuClick}
                className="md:hidden relative w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 bg-foreground text-background hover:bg-primary pointer-events-auto cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
                  className="w-5 h-[2px] bg-current origin-center"
                />
                <motion.div
                  animate={{ width: isOpen ? 0 : 20, opacity: isOpen ? 0 : 1 }}
                  className="h-[2px] bg-current w-5"
                />
                <motion.div
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
                  className="w-5 h-[2px] bg-current origin-center"
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Overlay Menu (For Mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className={`fixed inset-0 z-40 flex items-center justify-center transition-colors duration-500 overflow-y-auto md:hidden ${menuTheme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#FDFCFB] text-[#161616]'}`}
          >
            <div className="w-full max-w-7xl px-6 py-24 min-h-screen flex flex-col justify-between items-start gap-12">
              <div className="flex flex-col gap-6 w-full">
                <span className={`uppercase tracking-widest text-xs font-bold mb-4 ${menuTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Navigation</span>
                {[{ name: 'Home', href: '/' }, ...menuLinks, { name: 'Contact', href: '/contact' }].map((link, i) => (
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
                        className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-4 group w-fit"
                      >
                        <span className={`text-lg font-medium transition-colors ${menuTheme === 'dark' ? 'text-zinc-600 group-hover:text-primary/50' : 'text-zinc-300 group-hover:text-primary/50'}`}>0{i + 1}</span>
                        {link.name}
                      </TransitionLink>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-8 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <button
                    onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent('open-inquiry-modal')); }}
                    className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs w-full text-center"
                  >
                    Start a Project
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
