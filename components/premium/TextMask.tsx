'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextMaskProps {
  children: string;
  delay?: number;
}

export function TextMask({ children, delay = 0 }: TextMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const slideUp = {
    initial: { y: "100%" },
    enter: { 
      y: "0%", 
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay } 
    }
  };

  return (
    <div ref={ref} className="overflow-hidden inline-block relative">
      <motion.div
        variants={slideUp}
        initial="initial"
        animate={isInView ? "enter" : "initial"}
        className="inline-block origin-bottom"
      >
        {children}
      </motion.div>
    </div>
  );
}
