'use client';
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
    timeline: '3–6 weeks',
    price: 'Starting at ₹1,00,000',
    description: 'Give your product an AI assistant that can search and answer questions from your own data — documents, database, or knowledge base — instead of hallucinating generic answers.',
    features: ['Vector Database Setup', 'Custom RAG Pipelines', 'Automated Workflows', 'Chatbot Integration', 'Data Privacy Focused'],
    color: '#161616',
    popular: false,
    available: true
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
    <div className="border border-border rounded-3xl p-8 sm:p-12 bg-surface mb-8 last:mb-0 relative overflow-hidden group">
      {/* Decorative gradient */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-0 group-hover:opacity-5 transition-opacity duration-1000 pointer-events-none rounded-full blur-[100px]"
        style={{ backgroundColor: service.color }}
      />
      
      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-muted font-mono text-sm">0{index + 1}</span>
            {service.popular && (
              <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">
                Most Popular
              </span>
            )}
          </div>
          
          <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-2 text-foreground">
            {service.title}
          </h3>
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-8">
            {service.subtitle}
          </h4>
          
          <p className="text-xl text-muted leading-relaxed mb-8 max-w-2xl">
            {service.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-8 mb-10 p-6 bg-background rounded-2xl border border-border inline-flex">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Timeline</div>
              <div className="font-medium text-lg">{service.timeline}</div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block"></div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Starting At</div>
              <div className="font-medium text-lg">{service.price}</div>
            </div>
          </div>
          
          <div>
            <Magnetic>
              {service.available ? (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal', { detail: { service: service.title } }))}
                  className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 w-full sm:w-fit bg-foreground text-background hover:bg-primary hover:text-white"
                >
                  Start Project
                  <IconArrowUpRight size={18} />
                </button>
              ) : (
                <button
                  className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 w-full sm:w-fit bg-zinc-100 text-muted cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
              )}
            </Magnetic>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-background rounded-3xl p-8 border border-border flex flex-col justify-center">
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">What&apos;s Included</h4>
          <ul className="flex flex-col gap-4">
            {service.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-4 text-sm font-medium text-muted">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ServicesList() {
  return (
    <section className="w-full relative z-10 py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-16">

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
            <div className="flex flex-col">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={i}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
