'use client';
import { Magnetic } from '@/components/premium/Magnetic';
import { IconArrowUpRight } from '@tabler/icons-react';

const services = [
  {
    title: 'High-Impact Web Presence',
    subtitle: 'Brand & Conversion Engine',
    timeline: '1–2 weeks',
    price: 'Starting at ₹25,000',
    description: 'Bespoke, cinematic marketing websites designed to convert cold visitors into high-ticket inbound clients. Built with Next.js, Framer Motion, and technical SEO baked in.',
    features: ['Custom UI/UX & Art Direction', 'Framer Motion Fluid Interactions', '100/100 Core Web Vitals Optimization', 'Technical SEO & JSON-LD Structured Data', 'Analytics & Lead Capture Integration', 'Full Codebase Ownership & IP Transfer'],
    color: '#FF5A36',
    popular: false,
    available: true
  },
  {
    title: 'Full-Stack MVP Sprint',
    subtitle: 'Turnkey Product Launch',
    timeline: '4–6 weeks',
    price: 'Starting at ₹1,50,000',
    description: 'From wireframes to live users. We engineer production-grade web applications with scalable databases, role-based auth, payment gateways, and custom admin portals.',
    features: ['Next.js App Router & Server Actions', 'PostgreSQL / Supabase Data Architecture', 'Secure Auth & RBAC Permissions', 'Stripe / Razorpay Payment Integration', 'Custom Admin Management Portal', 'Automated CI/CD & Cloud Deployment'],
    color: '#7C3AED',
    popular: true,
    available: true
  },
  {
    title: 'AI / RAG Integration',
    subtitle: 'Intelligent Automation & Retrieval',
    timeline: '3–5 weeks',
    price: 'Starting at ₹1,00,000',
    description: 'Empower your application with intelligent context-aware AI. We engineer custom vector retrieval pipelines, semantic search, and autonomous LLM agents that query your private knowledge.',
    features: ['Vector Database Setup (pgvector / Pinecone)', 'Custom Chunking & RAG Retrieval Pipelines', 'Private Knowledge Base Connectors', 'Latency-Optimized Stream Responses', 'Guardrails, Cost & Rate Limit Controls', 'Post-Launch Tuning & Evaluation'],
    color: '#161616',
    popular: false,
    available: true
  },
  {
    title: 'Dedicated Engineering Squad',
    subtitle: 'Monthly Product Retainer',
    timeline: 'Ongoing / Monthly Sprints',
    price: 'Custom / Monthly',
    description: 'A dedicated senior engineering team plugged into your company. Continuous feature shipping, architecture scaling, performance tuning, and on-call reliability.',
    features: ['Dedicated Full-Stack & Systems Engineers', 'Weekly Live Sprint Demo & Deployments', 'Direct Slack / WhatsApp Executive Channel', 'Architecture Advisory & Code Reviews', 'Priority Bug Fixing & SLAs', 'Flexible Resource Allocation'],
    color: '#059669',
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
