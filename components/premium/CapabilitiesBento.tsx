'use client';
import { motion } from 'framer-motion';
import { IconCpu, IconDatabase, IconLayoutDashboard, IconRocket } from '@tabler/icons-react';

export function CapabilitiesBento() {
  return (
    <section className="py-32 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-20">
        
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Core Capabilities</h2>
          <p className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
            Full-Stack Firepower.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Bento Box 1: Frontend (Spans 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-surface border border-border rounded-[32px] p-10 relative overflow-hidden group hover:border-primary/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <IconLayoutDashboard className="text-primary mb-6" size={32} />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Frontend Engineering</h3>
            <p className="text-muted text-lg max-w-md">Pixel-perfect, ultra-responsive user interfaces built with React, Next.js, and Framer Motion. We don&apos;t just build websites; we build cinematic experiences.</p>
            
            {/* Decorative UI element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-48 bg-background border border-border rounded-tl-3xl shadow-2xl group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-500 flex flex-col gap-4 p-6">
              <div className="w-full h-4 bg-zinc-100 rounded-full" />
              <div className="w-3/4 h-4 bg-zinc-100 rounded-full" />
              <div className="w-1/2 h-4 bg-primary rounded-full mt-4" />
            </div>
          </motion.div>

          {/* Bento Box 2: Performance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface border border-border rounded-[32px] p-10 relative overflow-hidden group hover:border-secondary/50 transition-colors flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <IconRocket className="text-secondary mb-6" size={32} />
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Ship Faster</h3>
            </div>
            <p className="text-muted">Optimized CI/CD pipelines, edge caching, and zero-downtime deployments.</p>
          </motion.div>

          {/* Bento Box 3: Backend */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-foreground text-background border border-foreground rounded-[32px] p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
            <IconDatabase className="text-background opacity-50 mb-6" size={32} />
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Robust Backends</h3>
            <p className="text-background/70">Scalable Go and Node.js microservices handling millions of requests with custom Postgres architectures.</p>
          </motion.div>

          {/* Bento Box 4: AI/RAG (Spans 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-[#0A0A0A] border border-zinc-800 rounded-[32px] p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <IconCpu className="text-purple-400 mb-6" size={32} />
            <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">Applied AI & RAG</h3>
            <p className="text-zinc-400 text-lg max-w-md">Integrating intelligent agents and semantic search into your product. Custom LLM pipelines tailored to your proprietary data.</p>
            
            {/* Decorative Code block */}
            <div className="absolute -bottom-16 -right-4 w-72 h-56 bg-black border border-zinc-800 rounded-tl-xl shadow-2xl p-6 font-mono text-xs text-green-400 opacity-50 group-hover:-translate-y-4 transition-transform duration-500">
              <p>{`import { generateText } from 'ai';`}</p>
              <p className="mt-2">{`const response = await generateText({`}</p>
              <p className="ml-4">{`model: customLLM,`}</p>
              <p className="ml-4">{`prompt: "Optimize scale"`}</p>
              <p>{`});`}</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
