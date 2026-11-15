'use client';
import { motion } from 'framer-motion';
import { IconBuildingSkyscraper, IconSchool, IconLayoutDashboard, IconBrain } from '@tabler/icons-react';

const clients = [
  { name: 'Care Well Health', category: 'Healthcare Platform', metric: '< 1s Load Time', icon: IconBuildingSkyscraper },
  { name: 'SSS Education', category: 'EdTech Streaming', metric: '1000+ Students', icon: IconSchool },
  { name: 'AIBulletin', category: 'AI Intelligence', metric: '71K+ Impressions', icon: IconLayoutDashboard },
  { name: 'JSpark AI', category: 'Generative AI SaaS', metric: 'Enterprise LLM', icon: IconBrain },
];

export function ProofStrip() {
  return (
    <section className="w-full py-16 sm:py-20 border-b border-t border-border relative z-10 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-neutral-600"
          >
            Trusted By Fast-Growing Startups & Regional Leaders
          </motion.p>
          <span className="text-xs text-neutral-600 font-mono hidden sm:block">Proven Production Outcomes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-surface/50 border border-border hover:border-primary/50 hover:bg-surface transition-all duration-300"
            >
              <div>
                <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors block">
                  {client.name}
                </span>
                <span className="text-xs text-muted font-medium uppercase tracking-wider block mt-0.5">
                  {client.category}
                </span>
                <span className="inline-block mt-2 text-[11px] font-mono font-semibold text-primary/90 bg-primary/10 px-2 py-0.5 rounded">
                  {client.metric}
                </span>
              </div>
              <client.icon className="text-muted/40 group-hover:text-primary transition-colors shrink-0 ml-3" size={28} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
