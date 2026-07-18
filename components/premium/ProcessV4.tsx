'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TextMask } from '@/components/premium/TextMask';

const steps = [
  { num: "01", title: "Discovery", desc: "We map out the exact scope, requirements, and tech stack needed to launch your product." },
  { num: "02", title: "Proposal", desc: "Clear timeline and upfront costs. No hidden fees." },
  { num: "03", title: "Execution", desc: "We build rapidly with weekly staging deployments so you can see the progress live." },
  { num: "04", title: "Launch", desc: "Deployment to production, scaling infrastructure, and complete handover." }
];

export function ProcessV4() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="w-full py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 flex flex-col md:flex-row gap-20">
        
        <div className="md:w-1/3 sticky top-32 h-fit">
          <h2 className="text-[6vw] sm:text-[4vw] font-bold leading-none tracking-tighter uppercase mb-6">
            <TextMask>The</TextMask><br/>
            <TextMask delay={0.1}>Process</TextMask>
          </h2>
          <p className="text-muted text-lg">Predictable, transparent, and built for speed.</p>
        </div>

        <div className="md:w-2/3 relative">
          {/* Animated vertical line */}
          <div className="absolute left-[24px] top-4 bottom-4 w-[2px] bg-border z-0">
            <motion.div className="w-full bg-primary" style={{ height }} />
          </div>

          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex gap-8 sm:gap-16 items-start group"
              >
                <div className="w-12 h-12 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary font-bold shrink-0 transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                  {step.num}
                </div>
                <div>
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
