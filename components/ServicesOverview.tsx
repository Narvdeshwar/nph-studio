'use client';
import { motion } from 'framer-motion';
import { IconRocket, IconCode, IconBrain } from '@tabler/icons-react';

const services = [
  {
    title: 'Landing Pages',
    description: 'High-converting marketing sites built in 1-2 weeks. Fast, SEO-optimized, and beautiful.',
    icon: <IconRocket size={24} color="var(--color-primary)" />,
    delay: 0.1,
  },
  {
    title: 'Full-Stack MVPs',
    description: 'Production-ready web apps built in 4-8 weeks. Frontend, backend, and database included.',
    icon: <IconCode size={24} color="var(--color-secondary)" />,
    delay: 0.3,
  },
  {
    title: 'AI / RAG Integration',
    description: 'Add AI capabilities to your existing product. Early access, coming soon.',
    icon: <IconBrain size={24} color="var(--color-coral-icon)" />,
    delay: 0.5,
  }
];

export function ServicesOverview() {
  return (
    <section className="w-full py-24 bg-surface/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] sm:text-[40px] font-medium text-foreground mb-4">What we build</h2>
          <p className="text-[16px] text-muted max-w-[500px] mx-auto">
            From your first landing page to a fully-scaled AI product, we handle the entire technical lifecycle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: service.delay }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
              }}
              className="bg-white p-8 rounded-2xl border border-border flex flex-col items-start transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-[20px] font-medium text-foreground mb-3">{service.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative blurred background shapes */}
      <motion.div 
        className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
        style={{ background: 'var(--color-primary)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
}
