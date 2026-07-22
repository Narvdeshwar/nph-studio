'use client';
import { motion } from 'framer-motion';
import { BlurText } from '@/components/premium/BlurText';


const pillars = [
  {
    num: "01",
    title: "Frontend & UI",
    desc: "Next.js App Router, Framer Motion, and Tailwind CSS. We build interfaces that feel alive.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "02",
    title: "Backend & Infra",
    desc: "Scalable Go microservices, robust databases, and secure authentication. The invisible heavy lifting.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "AI & RAG",
    desc: "Connecting your product to the latest LLMs. Intelligent agents and vector search. (Coming soon)",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
  }
];

export function Services() {
  return (
    <section className="w-full py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        
        <div className="mb-24">
          <h2 className="text-[6vw] sm:text-[5vw] font-bold leading-none tracking-tighter uppercase mb-6 flex flex-col">
            <BlurText delay={0.1}>Capability</BlurText>
            <BlurText delay={0.3}>Pillars</BlurText>
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
              className="group flex flex-col xl:flex-row xl:items-center gap-12 xl:gap-20 border-t border-border pt-12"
            >
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-16">
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
              </div>
              
              <div className="w-full xl:w-[450px] h-[250px] shrink-0 rounded-[20px] overflow-hidden relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                  style={{ backgroundImage: `url('${pillar.image}')` }} 
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
