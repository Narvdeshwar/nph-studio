'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurTextProps {
  children: string;
  delay?: number;
  className?: string;
}

export function BlurText({ children, delay = 0, className = '' }: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = children.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
            delay: delay + (i * 0.1),
          }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
