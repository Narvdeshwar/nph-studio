'use client';
import { motion } from 'framer-motion';
import { BlurText } from '@/components/premium/BlurText';
import { IconArrowUpRight, IconCheck } from '@tabler/icons-react';

const pillars = [
  {
    num: "01",
    title: "Full-Stack Web & SaaS MVPs",
    subtitle: "Turnkey Product Engineering",
    timeline: "4–6 Weeks",
    desc: "Complete product engineering from database schema to cloud deployment. We build scalable Next.js architectures with secure auth, payment gateways, and custom admin portals.",
    deliverables: ["Next.js App Router & Server Actions", "PostgreSQL / Supabase Architecture", "RBAC Auth & Session Security", "Payment & Subscription Integration", "Custom Admin Dashboard"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=75&w=800&auto=format&fit=crop",
    serviceKey: "Full-Stack MVP"
  },
  {
    num: "02",
    title: "Applied AI & Custom RAG Pipelines",
    subtitle: "Enterprise Knowledge Retrieval",
    timeline: "3–5 Weeks",
    desc: "Empower your application with context-aware AI. We engineer custom vector retrieval pipelines, semantic search, and autonomous LLM agents that query your private knowledge base.",
    deliverables: ["Vector Database Setup (pgvector / Pinecone)", "Custom Chunking & RAG Retrieval", "Private Knowledge Base Connectors", "Sub-Second Streaming Latency", "Cost & Rate-Limit Controls"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=75&w=800&auto=format&fit=crop",
    serviceKey: "AI / RAG Integration"
  },
  {
    num: "03",
    title: "High-Impact Digital Presence & UI/UX",
    subtitle: "Brand & Conversion Engine",
    timeline: "1–2 Weeks",
    desc: "Bespoke, cinematic marketing websites designed to convert cold visitors into high-ticket inbound clients. Built with fluid Framer Motion animations and 100/100 Core Web Vitals.",
    deliverables: ["Custom UI/UX & Art Direction", "Framer Motion Fluid Interactions", "100/100 Core Web Vitals Optimization", "Technical SEO & Schema Markup", "Lead Capture & Telemetry"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=75&w=800&auto=format&fit=crop",
    serviceKey: "Landing Page"
  },
  {
    num: "04",
    title: "Dedicated Engineering Squad",
    subtitle: "Fractional Senior Product Team",
    timeline: "Monthly Sprints",
    desc: "A dedicated senior engineering team plugged into your company. Continuous feature shipping, architecture scaling, performance tuning, and on-call reliability.",
    deliverables: ["Dedicated Senior Engineers Only", "Weekly Live Sprint Demos & Deploys", "Direct Slack / WhatsApp Channel", "Architecture & Code Reviews", "Priority Bug Fixes & SLAs"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=75&w=800&auto=format&fit=crop",
    serviceKey: "Custom Development"
  }
];

export function Services() {
  const handleStartProject = (serviceName: string) => {
    window.dispatchEvent(new CustomEvent('open-inquiry-modal', { detail: { service: serviceName } }));
  };

  return (
    <section className="w-full py-28 sm:py-36 bg-background relative z-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3 block">
              Core Offerings
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter uppercase flex flex-col">
              <BlurText delay={0.1}>What We</BlurText>
              <BlurText delay={0.2}>Engineer & Ship.</BlurText>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted max-w-md leading-relaxed">
            Transparent sprint packages designed for venture-backed startups and growing businesses.
          </p>
        </div>

        <div className="flex flex-col gap-12 sm:gap-20">
          {pillars.map((pillar) => (
            <motion.div 
              key={pillar.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="group flex flex-col xl:flex-row xl:items-start gap-8 xl:gap-16 border-t border-border pt-12"
            >
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
                <div className="text-lg font-mono font-bold text-primary w-10 shrink-0 pt-1">
                  {pillar.num}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {pillar.timeline}
                    </span>
                    <span className="text-xs text-muted font-medium uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed mb-6">
                    {pillar.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {pillar.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/80 font-medium">
                        <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <IconCheck size={12} />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartProject(pillar.serviceKey)}
                    aria-label={`Start ${pillar.title} project`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors cursor-pointer group/btn"
                  >
                    <span>Start This Project</span>
                    <IconArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
              
              <div className="w-full xl:w-[420px] h-[220px] sm:h-[260px] shrink-0 rounded-[24px] overflow-hidden relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 shadow-xl border border-border">
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
