'use client';
import { motion } from 'framer-motion';
import { Magnetic } from '@/components/premium/Magnetic';
import { IconArrowUpRight, IconSparkles } from '@tabler/icons-react';

const services = [
  {
    title: 'Landing Page',
    subtitle: 'Marketing Site',
    timeline: '1–2 weeks',
    price: 'Starting at ₹40,000',
    description: 'High-conversion, ultra-premium landing pages designed to turn your visitors into customers. Perfect for pre-launch or single-product campaigns.',
    features: ['Custom UI/UX Design', 'Framer Motion Animations', 'Mobile Responsive', 'SEO Optimization', 'Fast Load Times'],
    color: '#FF5A36',
    popular: false,
    available: true
  },
  {
    title: 'Full-Stack MVP',
    subtitle: 'Web Application',
    timeline: '4–8 weeks',
    price: 'Starting at ₹1,50,000',
    description: 'Complete product engineering from database to deployment. We build scalable, production-ready web applications for founders ready to scale.',
    features: ['Next.js App Router', 'Custom Database Architecture', 'Authentication & Auth', 'Payment Integration', 'Admin Dashboard'],
    color: '#7C3AED',
    popular: true,
    available: true
  },
  {
    title: 'AI / RAG Integration',
    subtitle: 'Intelligent Add-on',
    timeline: 'Custom Timeline',
    price: 'Early Access',
    description: 'Supercharge your existing product with custom Large Language Models, semantic search, and intelligent AI agents.',
    features: ['Vector Database Setup', 'Custom LLM Pipelines', 'Automated Workflows', 'Chatbot Integration', 'Data Privacy Focused'],
    color: '#161616',
    popular: false,
    available: false
  }
];

interface ServiceData {
  title: string;
  subtitle: string;
  timeline: string;
  price: string;
  description: string;
  features: string[];
  color: string;
  popular: boolean;
  available: boolean;
}

function ServiceCard({ service, index }: { service: ServiceData, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative rounded-[32px] p-8 sm:p-12 border ${service.popular ? 'border-primary' : 'border-border'} ${!service.available ? 'bg-zinc-100 opacity-80' : 'bg-surface'} flex flex-col h-full group overflow-hidden`}
    >
      {/* Background Hover Glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${service.color}, transparent 70%)` }}
      />

      {service.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-b-lg">
          Most Popular
        </div>
      )}

      {!service.available && (
        <div className="absolute top-8 right-8 flex items-center gap-2 text-muted text-xs font-bold uppercase tracking-widest bg-white py-2 px-4 rounded-full border border-border">
          <IconSparkles size={14} />
          Coming Soon
        </div>
      )}

      <div className="mb-12">
        <span className="text-muted text-sm font-bold uppercase tracking-widest mb-2 block">{service.subtitle}</span>
        <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-4 text-foreground">{service.title}</h3>
        <p className="text-muted leading-relaxed min-h-[80px]">{service.description}</p>
      </div>

      <div className="mb-12">
        <div className="text-3xl font-black text-foreground mb-2">{service.price}</div>
        <div className="text-sm font-bold uppercase tracking-widest text-primary">{service.timeline}</div>
      </div>

      <div className="flex-1">
        <ul className="flex flex-col gap-4">
          {service.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center gap-4 text-sm font-medium text-foreground">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <Magnetic>
          <button
            className={`w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 px-3
              ${service.popular
                ? 'bg-foreground text-background hover:bg-primary hover:text-white'
                : 'bg-white border border-border text-foreground hover:border-foreground'}
              ${!service.available ? 'cursor-not-allowed opacity-50' : ''}
            `}
            disabled={!service.available}
          >
            {service.available ? 'Start Project' : 'Join Waitlist'}
            {service.available && <IconArrowUpRight size={18} />}
          </button>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export function ServicesList() {
  return (
    <section className="w-full bg-background relative z-10 py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
