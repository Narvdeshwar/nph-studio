'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function GhostCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // High stiffness spring for fast trailing effect
  const cursorX = useSpring(0, { stiffness: 800, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 40 });
  
  // Slower spring for the trailing ghost
  const ghostX = useSpring(0, { stiffness: 200, damping: 30 });
  const ghostY = useSpring(0, { stiffness: 200, damping: 30 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Hide default cursor on desktop
    document.body.style.cursor = 'none';
    
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Update primary dot immediately
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      
      // Target elements (buttons, links)
      const target = e.target as HTMLElement;
      const isTarget = target.closest('button, a, input, select, textarea, [data-magnetic]') !== null;
      setIsHovering(isTarget);

      if (isTarget) {
        // If targeting, snap the ghost cursor faster to the center of the element or mouse
        ghostX.set(e.clientX - 24);
        ghostY.set(e.clientY - 24);
      } else {
        // Follow with delay
        ghostX.set(e.clientX - 16);
        ghostY.set(e.clientY - 16);
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, ghostX, ghostY, isVisible, mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Ghost Trail Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-primary rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-300"
        style={{
          x: ghostX,
          y: ghostY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? (isHovering ? 0.8 : 0.3) : 0,
          backgroundColor: isHovering ? 'rgba(255, 90, 54, 0.1)' : 'transparent',
          scale: isHovering ? 1.5 : 1
        }}
      />
    </>
  );
}
