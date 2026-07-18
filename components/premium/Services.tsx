'use client';
import { motion } from 'framer-motion';
import { TextMask } from '@/components/premium/TextMask';


const pillars = [
  {
    num: "01",
    title: "Frontend & UI",
    desc: "Next.js App Router, Framer Motion, and Tailwind CSS. We build interfaces that feel alive.",
  },
  {
    num: "02",
    title: "Backend & Infra",
    desc: "Scalable Go microservices, robust databases, and secure authentication. The invisible heavy lifting.",
  },
  {
    num: "03",
    title: "AI & RAG",
    desc: "Connecting your product to the latest LLMs. Intelligent agents and vector search. (Coming soon)",
  }
];

export function Services() {
  return (
    <section className="w-full py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        
        <div className="mb-24">
          <h2 className="text-[6vw] sm:text-[5vw] font-bold leading-none tracking-tighter uppercase mb-6">
            <TextMask>Capability</TextMask><br/>
            <TextMask delay={0.1}>Pillars</TextMask>
          </h2>
        </div>

        <div className="flex flex-col gap-12 sm:gap-24">
          {pillars.map((pillar) => (
            <motion.div 
              key={pillar.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="group flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-20 border-t border-border pt-8"
            >
              <div className="text-xl font-medium text-primary w-12 shrink-0">
                {pillar.num}
              </div>
              <div className="flex-1">
                <h3 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 group-hover:text-primary transition-colors duration-500">
                  {pillar.title}
                </h3>
                <p className="text-lg text-muted max-w-md">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
