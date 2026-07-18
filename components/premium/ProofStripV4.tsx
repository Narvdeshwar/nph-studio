'use client';
import { motion } from 'framer-motion';

export function ProofStripV4() {
  return (
    <section className="w-full py-24 bg-background border-b border-border relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-xs font-bold uppercase tracking-widest text-muted mb-12"
        >
          Trusted by founders & teams behind
        </motion.p>
        
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          {['AIBulletin', 'JSPARK.AI', 'JSPARK Prime', 'LMS Project'].map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
