'use client';
import { motion } from 'framer-motion';
import { IconCode, IconRocket, IconBrain, IconArrowRight, IconChecks } from '@tabler/icons-react';

export function BentoHero() {
  return (
    <section className="w-full min-h-screen bg-[#FDFCFB] flex flex-col items-center pt-24 pb-20 px-4 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF5A36] opacity-5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#7C3AED] opacity-5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        
        {/* Header Text */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-surface text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Now taking new projects
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            We build products <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">that actually ship.</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Stop waiting months for your MVP. Our full-stack agency designs, codes, and launches your idea in weeks.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Main Card - Spans 2 cols */}
          <motion.div 
            className="md:col-span-2 bg-white rounded-3xl p-8 border border-border/50 shadow-sm relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)" }}
          >
            <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <IconRocket className="w-10 h-10 text-primary mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-3">From Zero to Production</h2>
                <p className="text-muted mb-6 max-w-md">We handle the entire stack. Frontend, backend, database, and deployment. You just focus on the business.</p>
              </div>
              <button className="self-start flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium transition-transform active:scale-95 group-hover:bg-primary">
                Start building <IconArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* AI Card */}
          <motion.div 
            className="bg-black text-white rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col">
              <IconBrain className="w-10 h-10 text-secondary mb-6" />
              <h2 className="text-2xl font-bold mb-3">AI & RAG Ready</h2>
              <p className="text-zinc-400 mb-6 flex-1">Integrate cutting-edge LLMs and vector databases directly into your product.</p>
              <div className="mt-auto inline-flex items-center text-sm font-medium text-secondary">
                Coming soon <IconArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </motion.div>

          {/* Code Quality Card */}
          <motion.div 
            className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)" }}
          >
            <IconCode className="w-10 h-10 text-[#993C1D] mb-6" />
            <h2 className="text-xl font-bold text-foreground mb-2">Clean Stack</h2>
            <ul className="space-y-3 mt-4">
              {['Next.js App Router', 'Golang Microservices', 'Tailwind CSS'].map((tech, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <IconChecks size={14} />
                  </div>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Wide Metric Card */}
          <motion.div 
            className="md:col-span-2 bg-[#FFF1EC] rounded-3xl p-8 border border-[#FAECE7] relative overflow-hidden group cursor-pointer flex flex-col sm:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-6 sm:mb-0">
              <h2 className="text-3xl font-bold text-[#993C1D] mb-2">Fast Execution</h2>
              <p className="text-[#993C1D]/70 font-medium">Average time from discovery to launch.</p>
            </div>
            <div className="text-6xl md:text-8xl font-black text-[#FF5A36] tracking-tighter">
              4 wks
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
