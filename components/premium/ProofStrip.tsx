'use client';
import { motion } from 'framer-motion';
import { IconBuildingSkyscraper, IconSchool, IconLayoutDashboard } from '@tabler/icons-react';

const clients = [
  { name: 'AIBulletin', icon: IconBuildingSkyscraper },
  { name: 'LMS Project', icon: IconSchool },
  { name: 'NextGen UI', icon: IconLayoutDashboard },
];

export function ProofStrip() {
  return (
    <section className="w-full py-24 border-b border-border relative z-10 bg-background">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20 relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-xs font-bold uppercase tracking-widest text-muted mb-12 text-center md:text-left"
        >
          Trusted by founders & teams behind
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-colors"
            >
              <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">
                {client.name}
              </span>
              <client.icon className="text-muted/50 group-hover:text-primary transition-colors" size={32} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
