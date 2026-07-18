'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const chars = '!@#$%^&*()_+{}:"<>?|~[]\\;\',./`1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface DecryptedTextProps {
  text: string;
  speed?: number; // ms per frame
  maxIterations?: number; // how many random chars before solving
  className?: string;
  delay?: number;
}

export function DecryptedText({ text, speed = 30, maxIterations = 10, className = '', delay = 0 }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>('');
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const iterationsRef = useRef<number[]>(new Array(text.length).fill(0));

  useEffect(() => {
    if (isInView && !started) {
      setTimeout(() => setStarted(true), delay * 1000);
    }
  }, [isInView, started, delay]);

  useEffect(() => {
    if (!started) return;

    let animationFrameId: number;
    let lastTime = 0;

    const tick = (time: number) => {
      if (time - lastTime >= speed) {
        let updatedText = '';
        let allFinished = true;

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            updatedText += ' ';
            continue;
          }

          if (iterationsRef.current[i] >= maxIterations + (i * 2)) {
            updatedText += text[i];
          } else {
            updatedText += chars[Math.floor(Math.random() * chars.length)];
            iterationsRef.current[i]++;
            allFinished = false;
          }
        }

        setDisplayText(updatedText);
        lastTime = time;

        if (allFinished) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [started, text, speed, maxIterations]);

  return (
    <motion.span 
      ref={containerRef} 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay }}
    >
      {started ? displayText : text.replace(/./g, ' ')}
    </motion.span>
  );
}
