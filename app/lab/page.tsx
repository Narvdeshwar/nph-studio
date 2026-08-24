'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/premium/Footer';
import { TabSwitcher } from '@/components/premium/TabSwitcher';
import { IconFlask, IconArrowUpRight, IconLayoutDashboard } from '@tabler/icons-react';

const spatialExperiments = [
  {
    id: 'holographic',
    name: 'Holographic UI',
    desc: 'Spatial Web Interface',
    color: '#3B82F6',
    status: 'Active'
  },
  {
    id: 'torus',
    name: 'Magnetic Torus',
    desc: 'Physics & Particles',
    color: '#F97316',
    status: 'Active'
  },
];

export const heroVault = [
  {
    id: 'hero-001',
    name: 'Aurora OS',
    desc: 'Week 1: Dark-mode aurora gradients & glassmorphism.',
    color: '#10B981',
    status: 'Active',
    slug: '/lab/hero-001'
  }
];

export default function LabIndexPage() {
  const [activeTab, setActiveTab] = useState<'3d' | 'hero'>('3d');

  const currentItems = activeTab === '3d' ? spatialExperiments : heroVault;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

      <div className="flex-1 pt-32 pb-24 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <IconFlask className="text-primary" size={32} />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">The Lab</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.9] max-w-3xl mb-8">
              Experimental <br />
              <span className="text-muted">Interfaces</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed">
              A collection of exploratory web experiences. Spatial 3D physics simulations and high-end, weekly hero sections.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mb-12">
            <TabSwitcher
              tabs={[
                { id: '3d', label: 'Spatial & 3D', icon: <IconFlask size={18} /> },
                { id: 'hero', label: 'Hero Vault', icon: <IconLayoutDashboard size={18} /> }
              ]}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id as '3d' | 'hero')}
              layoutId="lab-tabs"
            />
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {currentItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                >
                  <Link href={activeTab === '3d' ? `/lab/${item.id}` : (item as { slug?: string }).slug || '#'}>
                    <div className="group relative bg-surface border border-border rounded-3xl p-8 h-[300px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer">
                      {/* Glow */}
                      <div
                        className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 pointer-events-none"
                        style={{ backgroundColor: item.color }}
                      />

                      <div className="flex justify-between items-start relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted border border-border px-3 py-1 rounded-full">
                          {item.status}
                        </span>
                        <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300">
                          <IconArrowUpRight size={20} />
                        </span>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-muted text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
