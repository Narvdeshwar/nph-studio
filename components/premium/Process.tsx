'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BlurText } from '@/components/premium/BlurText';

const steps = [
  { num: "01", title: "Discovery", desc: "We map out the exact scope, requirements, and tech stack needed to launch your product." },
  { num: "02", title: "Proposal", desc: "Clear timeline and upfront costs. No hidden fees." },
  { num: "03", title: "Execution", desc: "We build rapidly with weekly staging deployments so you can see the progress live." },
  { num: "04", title: "Launch", desc: "Deployment to production, scaling infrastructure, and complete handover." }
];

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate height progress for each of the 3 connecting lines
  const height1 = useTransform(scrollYProgress, [0.3, 0.45], ["0%", "100%"]);
  const height2 = useTransform(scrollYProgress, [0.45, 0.6], ["0%", "100%"]);
  const height3 = useTransform(scrollYProgress, [0.6, 0.75], ["0%", "100%"]);
  const heights = [height1, height2, height3];

  return (
    <section ref={containerRef} className="w-full py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 flex flex-col md:flex-row gap-20">
        
        <div className="md:w-1/3 sticky top-0 md:top-32 h-fit z-30 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md pt-24 pb-6 -mx-8 px-8 sm:-mx-20 sm:px-20 md:bg-transparent md:backdrop-blur-none md:py-0 md:mx-0 md:px-0 mb-12 md:mb-0 border-b border-border/40 md:border-none">
          <h2 className="text-[12vw] sm:text-[8vw] md:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-2 md:mb-6 flex flex-col">
            <BlurText delay={0.1}>The</BlurText>
            <BlurText delay={0.3}>Process</BlurText>
          </h2>
          <p className="text-muted text-sm sm:text-base md:text-lg">Predictable, transparent, and built for speed.</p>
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex gap-8 sm:gap-16 items-stretch group"
              >
                {/* Timeline Column */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary font-bold transition-colors duration-500 group-hover:bg-primary group-hover:text-white relative z-10">
                    {step.num}
                  </div>
                  
                  {/* Connecting Line Segment with Scroll Scrubbing */}
                  {index !== steps.length - 1 && (
                    <div className="w-[2px] flex-1 bg-border my-2 overflow-hidden">
                      <motion.div 
                        className="w-full bg-primary origin-top"
                        style={{ height: heights[index] }}
                      />
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className={`pt-2 ${index !== steps.length - 1 ? 'pb-24' : ''}`}>
                  <h3 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
