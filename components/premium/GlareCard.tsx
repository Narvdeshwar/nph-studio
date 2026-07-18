'use client';
import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import { useRef, MouseEvent, ReactNode } from 'react';

export function GlareCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Smooth spring physics for the glare and tilt
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Rotation springs
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  
  // Opacity of the glare effect
  const opacity = useSpring(0, { stiffness: 300, damping: 30 });

  function handleMouseMove({ clientX, clientY }: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Relative position inside the card
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    // Calculate rotation (-10 to 10 degrees max)
    const rotX = ((y / height) - 0.5) * -15; // Invert Y
    const rotY = ((x / width) - 0.5) * 15;
    
    rotateX.set(rotX);
    rotateY.set(rotY);
    opacity.set(1);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    opacity.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`relative rounded-[32px] overflow-hidden group ${className}`}
    >
      {/* Glare Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay rounded-[32px]"
        style={{
          opacity,
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 40%)`
        }}
      />
      {/* Inner Border Glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-40 rounded-[32px] border-2 mix-blend-overlay"
        style={{
          opacity,
          borderColor: useMotionTemplate`rgba(255,255,255,0.3)`,
          maskImage: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`
        }}
      />
      
      {children}
    </motion.div>
  );
}
