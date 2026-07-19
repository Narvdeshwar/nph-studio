'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

export function Curtain() {
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const trigger = () => setIsAnimating(true);
    window.addEventListener('route-change-start', trigger);
    return () => window.removeEventListener('route-change-start', trigger);
  }, []);

  useEffect(() => {
    // When route actually changes, finish the animation
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, isAnimating]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] bg-primary flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-white flex items-center gap-4"
          >
            <Logo className="w-12 h-12" />
            <span className="text-3xl font-black uppercase tracking-widest">NPH Studio</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
