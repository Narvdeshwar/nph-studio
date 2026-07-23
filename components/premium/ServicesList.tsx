import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '@/components/premium/Magnetic';
import { IconArrowUpRight, IconPlus, IconMinus } from '@tabler/icons-react';

const services = [
  {
    title: 'Landing Page',
    subtitle: 'Marketing Site',
    timeline: '1–2 weeks',
    price: 'Starting at ₹20,000',
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
    price: 'Starting at ₹1,00,000',
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

function ServiceAccordion({ service, index, isOpen, toggleOpen }: { service: ServiceData, index: number, isOpen: boolean, toggleOpen: () => void }) {
  return (
    <div className="border-b border-border last:border-b-0 py-8">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
          <span className="text-muted font-mono text-sm">0{index + 1}</span>
          <h3 className={`text-4xl sm:text-5xl font-black uppercase tracking-tighter transition-colors ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary/70'}`}>
            {service.title}
          </h3>
          {service.popular && (
            <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest py-1.5 px-3 rounded-full hidden sm:block">
              Most Popular
            </span>
          )}
        </div>
        <div className={`p-4 rounded-full transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-surface text-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
          {isOpen ? <IconMinus /> : <IconPlus />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-12 pb-4 flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <p className="text-xl text-muted leading-relaxed mb-8">{service.description}</p>
                <div className="flex items-center gap-8 mb-8">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Timeline</div>
                    <div className="font-medium">{service.timeline}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Starting At</div>
                    <div className="font-medium">{service.price}</div>
                  </div>
                </div>
                <Magnetic>
                  {service.available ? (
                    <a
                      href={`https://wa.me/918787205784?text=${encodeURIComponent(`Hi, I'm interested in starting a new project for: ${service.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 w-fit bg-foreground text-background hover:bg-primary hover:text-white"
                    >
                      Start Project
                      <IconArrowUpRight size={18} />
                    </a>
                  ) : (
                    <button
                      className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 w-fit bg-zinc-100 text-muted cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </Magnetic>
              </div>

              <div className="w-full lg:w-1/3 bg-surface rounded-3xl p-8 border border-border">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">What&apos;s Included</h4>
                <ul className="flex flex-col gap-4">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-muted">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServicesList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full relative z-10 py-32">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        <div className="flex flex-col lg:flex-row gap-20">

          <div className="lg:w-1/3 relative">
            <div className="sticky top-40">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Our Services</h2>
              <p className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-foreground leading-[0.9] mb-8">
                What We<br/>Do Best.
              </p>
              <p className="text-muted text-lg max-w-sm">
                We specialize in building premium digital products that stand out. From high-converting landing pages to robust full-stack SaaS platforms.
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="border-t border-border">
              {services.map((service, i) => (
                <ServiceAccordion
                  key={service.title}
                  service={service}
                  index={i}
                  isOpen={openIndex === i}
                  toggleOpen={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
