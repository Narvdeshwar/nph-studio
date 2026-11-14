'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  IconArrowUpRight,
  IconArrowLeft,
  IconArrowRight,
  IconLayoutGrid,
  IconDeviceTv,
  IconSparkles,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconRocket,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { TextMask } from '@/components/premium/TextMask';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  filterCat: 'all' | 'ai' | 'saas' | 'web';
  tagline: string;
  problem: string;
  solution: string;
  link: string;
  color: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  features: string[];
  results: string[];
  mockupType: 'hospital' | 'aibulletin' | 'edtech' | 'jspark-ai' | 'jspark-prime' | 'ssslux';
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'care-well',
    name: 'Care Well Hospital',
    category: 'Healthcare Platform',
    filterCat: 'web',
    tagline: 'Modern emergency healthcare portal with 24/7 care access and PMJAY Ayushman scheme integration.',
    problem: 'The hospital needed an ultra-reliable, high-accessibility web platform to connect critical trauma patients with 24/7 emergency lines, doctor schedules, and government schemes.',
    solution: 'Engineered a sub-second Next.js SSR architecture with high-accessibility emergency UI, doctor directories, and instant appointment routing.',
    link: 'https://care-well-hospital-six.vercel.app/',
    color: '#EF4444',
    metrics: [
      { label: 'Page Load', value: '< 1.0s' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Accessibility', value: '100 / 100' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    features: ['24/7 Trauma Emergency Hotline', 'Department & Specialist Directory', 'Government Health Scheme Integration'],
    results: [
      'Digitized emergency contact access for thousands of regional patients.',
      'Achieved a perfect 100/100 Lighthouse accessibility rating across mobile and desktop.',
    ],
    mockupType: 'hospital',
  },
  {
    id: 'aibulletin',
    name: 'AIBulletin',
    category: 'AI News & Intelligence Engine',
    filterCat: 'ai',
    tagline: 'High-throughput AI news aggregation engine processing 100s of research feeds.',
    problem: 'Tech founders needed a signal-dense, noise-free source for AI research and startup updates without generic tech news clutter.',
    solution: 'Architected an automated RSS parsing pipeline with Supabase vector storage and Next.js static generation for sub-50ms page transitions.',
    link: 'https://aibulletin.in/',
    color: '#8B5CF6',
    metrics: [
      { label: 'Search Impressions', value: '71.7K' },
      { label: 'Active Users', value: '1.2K' },
      { label: 'Google Rank', value: 'Avg 9.2' },
    ],
    techStack: ['Next.js', 'Supabase', 'Golang', 'Tailwind', 'RSS Pipeline'],
    features: ['Automated Research Aggregator', 'Semantic Tagging & Filtering', 'Zero-Latency Static Generation'],
    results: [
      'Ranked organically on Google Search with over 71.7K search impressions.',
      'Grew to 1,200+ monthly active developers and founders with high recurring retention.',
    ],
    mockupType: 'aibulletin',
  },
  {
    id: 'edtech',
    name: 'SSS Online Academy',
    category: 'EdTech Streaming Platform',
    filterCat: 'saas',
    tagline: 'High-concurrency video learning LMS replacing legacy slow course software.',
    problem: 'Client faced high platform subscription fees and laggy video playback on legacy platforms (Teachable/Kajabi), increasing student drop-off.',
    solution: 'Engineered a bespoke video learning platform using Next.js, Mux Video streaming, and Stripe integration with sub-second lesson load times.',
    link: 'https://courses.sachinnssharma.com/',
    color: '#F59E0B',
    metrics: [
      { label: 'Enrolled Students', value: '1,000+' },
      { label: 'Video Playback', value: '< 250ms' },
      { label: 'Platform Fee Cut', value: '0% Rev-Share' },
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Mux Video', 'Stripe', 'AWS S3'],
    features: ['Adaptive Bitrate Video Streaming', 'Student Telemetry & Progress Engine', 'Automated Certificate Generation'],
    results: [
      'Eliminated monthly platform subscription fees, saving thousands of dollars annually.',
      'Sub-second video playback reduced lesson abandonment by over 40%.',
    ],
    mockupType: 'edtech',
  },
  {
    id: 'jspark-ai',
    name: 'JSpark AI',
    category: 'Generative AI Platform',
    filterCat: 'ai',
    tagline: 'Autonomous AI workflow automation and multimodal prompt synthesis.',
    problem: 'Enterprise teams needed automated AI workflows connected directly to their private data lakes without security risks or model hallucination.',
    solution: 'Designed and shipped a low-latency enterprise RAG platform with isolated vector clusters, structured JSON outputs, and guardrails.',
    link: 'https://jspark.ai/',
    color: '#06B6D4',
    metrics: [
      { label: 'Vector Indexing', value: '100k chunks' },
      { label: 'Response Latency', value: '380 ms' },
      { label: 'Accuracy Score', value: '99.4%' },
    ],
    techStack: ['Next.js', 'Python', 'FastAPI', 'Pinecone', 'OpenAI'],
    features: ['Private Document Vectorization', 'Multi-Model Routing & Fallbacks', 'Enterprise Role-Based Access Control'],
    results: [
      'Cut enterprise document search and synthesis time from hours to seconds.',
      'Zero hallucinations via strict reciprocal rank fusion (RRF) retrieval.',
    ],
    mockupType: 'jspark-ai',
  },
  {
    id: 'jspark-prime',
    name: 'JSpark Prime',
    category: 'B2B Analytics & SaaS',
    filterCat: 'saas',
    tagline: 'High-density mission-critical data visualization and B2B workflow intelligence.',
    problem: 'B2B executives struggled with fragmented data across multiple SaaS tools and lacked real-time visibility into operational bottlenecks.',
    solution: 'Built a centralized analytics dashboard with high-density interactive charts, live WebSockets streaming, and automated executive reports.',
    link: 'https://jsparkprime.com/',
    color: '#3B82F6',
    metrics: [
      { label: 'Stream Latency', value: '< 50 ms' },
      { label: 'Data Points', value: '1M+ / sec' },
      { label: 'Security', value: 'SOC 2 Ready' },
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Recharts'],
    features: ['Real-Time WebSocket Ingestion', 'Interactive KPI Explorers', 'Automated Daily Slack/Email Digests'],
    results: [
      'Unified 8 fragmented enterprise data sources into a single responsive pane of glass.',
      'Achieved sub-50ms data refresh rates under peak enterprise query loads.',
    ],
    mockupType: 'jspark-prime',
  },
  {
    id: 'ssslux',
    name: 'SSSLux Luxury',
    category: 'Luxury E-Commerce & 3D',
    filterCat: 'web',
    tagline: 'Immersive luxury shopping experience with interactive 3D product previews.',
    problem: 'High-end luxury brands struggle to convey tactile craftsmanship through flat 2D photography, leading to buyer hesitation.',
    solution: 'Created a bespoke headless commerce storefront with interactive 3D product inspection in Three.js and lightning-fast Shopify checkout.',
    link: 'https://ssslux.vercel.app/',
    color: '#EC4899',
    metrics: [
      { label: '3D Configurator', value: '60 FPS' },
      { label: 'Checkout Hops', value: '1-Click' },
      { label: 'Mobile Optimized', value: '100%' },
    ],
    techStack: ['Next.js', 'Three.js', 'Shopify API', 'Tailwind CSS'],
    features: ['Interactive 3D Material Inspector', 'Headless Cart & Fast Checkout', 'Cinematic Fluid Page Transitions'],
    results: [
      'Increased user time-on-page by 3.2x through interactive 3D product engagement.',
      'Eliminated checkout friction with headless Shopify Storefront API integration.',
    ],
    mockupType: 'ssslux',
  },
];

// Helper to render digital software interface mockups instead of amateur room photos
function ProjectDigitalMockup({ project }: { project: ProjectItem }) {
  switch (project.mockupType) {
    case 'hospital':
      return (
        <div className="w-full h-full bg-[#080B11] p-5 sm:p-6 flex flex-col justify-between font-sans select-none text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold uppercase tracking-wider text-white">Care Well Trauma Center</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              24/7 Emergency Active
            </span>
          </div>

          <div className="my-auto py-4 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400">Emergency Care Routing</span>
                <div className="text-xl sm:text-2xl font-black text-white">Super Speciality Hospital</div>
              </div>
              <span className="text-xs text-red-400 font-mono font-bold">Priority Triage</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 block">Cardiology</span>
                <span className="text-emerald-400 font-bold">Doctor Available</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 block">ICU Beds</span>
                <span className="text-cyan-400 font-bold">14 Open Units</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 block">Gov Scheme</span>
                <span className="text-amber-400 font-bold">PMJAY Active</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-transparent border border-red-500/30 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Trauma Hotline: +91 87872 05784</span>
              <span className="text-[10px] text-red-300 font-mono">Instant Dispatch</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
            <span>Lighthouse: 100/100 Accessibility</span>
            <span className="text-emerald-400">Response: 0.8s</span>
          </div>
        </div>
      );

    case 'aibulletin':
      return (
        <div className="w-full h-full bg-[#0B0914] p-5 sm:p-6 flex flex-col justify-between font-sans select-none text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="font-bold uppercase tracking-wider text-white">AIBulletin • Intelligence Feed</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              71.7K Google Impressions
            </span>
          </div>

          <div className="my-auto py-3 space-y-2">
            {[
              { title: 'DeepSeek-V3 Open Architecture Analysis', tag: 'Architecture', time: '12m ago' },
              { title: 'Claude 3.7 Hybrid Reasoning Benchmarks', tag: 'Reasoning', time: '1h ago' },
              { title: 'Llama-3 Edge Quantization on Apple M4', tag: 'Edge AI', time: '3h ago' },
            ].map((item, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs hover:border-purple-500/40 transition-colors">
                <div className="truncate pr-2">
                  <span className="text-white font-medium block truncate">{item.title}</span>
                  <span className="text-[9px] font-mono text-purple-400 uppercase">{item.tag}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
            <span>Static Cache: Zero Latency</span>
            <span className="text-purple-400">1.2K Monthly Developers</span>
          </div>
        </div>
      );

    case 'edtech':
      return (
        <div className="w-full h-full bg-[#0F0B06] p-5 sm:p-6 flex flex-col justify-between font-sans select-none text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-bold uppercase tracking-wider text-white">SSS Online Academy</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              1,000+ Enrolled Students
            </span>
          </div>

          <div className="my-auto py-4 space-y-3">
            <div className="relative aspect-[16/8] rounded-xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-black">
                  <IconPlayerPlay size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">Advanced Full-Stack Engineering</span>
                  <span className="text-[10px] text-amber-300 font-mono">Module 04: Next.js SSR &amp; Supabase</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="w-2/3 h-full bg-amber-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                <span className="text-zinc-500">Video Latency:</span>
                <span className="text-amber-400 font-bold">&lt; 250ms</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex justify-between">
                <span className="text-zinc-500">Student Rating:</span>
                <span className="text-emerald-400 font-bold">4.9 ★★★★★</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
            <span>Platform Fee: 0% Rev-Share</span>
            <span className="text-amber-400">Bespoke Mux Video</span>
          </div>
        </div>
      );

    case 'jspark-ai':
      return (
        <div className="w-full h-full bg-[#050C11] p-5 sm:p-6 flex flex-col justify-between font-sans select-none text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="font-bold uppercase tracking-wider text-white">JSpark AI • Enterprise RAG</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              380ms Latency
            </span>
          </div>

          <div className="my-auto py-3 space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-300">
              <span className="text-cyan-400 font-bold block mb-1">PROMPT QUERY:</span>
              <span>&ldquo;Synthesize multi-tenant compliance policies across 40,000 PDF pages...&rdquo;</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 block">Vector Index:</span>
                <span className="text-white font-bold">100k Chunks (HNSW)</span>
              </div>
              <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 block">Accuracy Metric:</span>
                <span className="text-emerald-400 font-bold">99.4% Factual Grounding</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
            <span>Model: GPT-4o / Claude 3.5 Fallback</span>
            <span className="text-cyan-400">Zero Hallucinations</span>
          </div>
        </div>
      );

    case 'jspark-prime':
      return (
        <div className="w-full h-full bg-[#050914] p-5 sm:p-6 flex flex-col justify-between font-sans select-none text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="font-bold uppercase tracking-wider text-white">JSpark Prime • B2B Analytics</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              SOC 2 Compliant
            </span>
          </div>

          <div className="my-auto py-3 space-y-3 font-mono text-xs">
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 block">MRR Stream</span>
                <span className="text-white font-bold text-sm">$128,450</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 block">Active Nodes</span>
                <span className="text-blue-400 font-bold text-sm">64 Shards</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 block">Sync Latency</span>
                <span className="text-emerald-400 font-bold text-sm">&lt; 50 ms</span>
              </div>
            </div>

            <div className="h-16 w-full rounded-xl bg-black/40 border border-white/5 p-2 flex items-end gap-1">
              {[30, 45, 60, 40, 75, 90, 65, 80, 95, 70, 85, 100, 90, 80, 95, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-blue-500/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
            <span>Throughput: 1M+ Points / Sec</span>
            <span className="text-blue-400">PostgreSQL + WebSockets</span>
          </div>
        </div>
      );

    case 'ssslux':
      return (
        <div className="w-full h-full bg-[#0F050B] p-5 sm:p-6 flex flex-col justify-between font-sans select-none text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span className="font-bold uppercase tracking-wider text-white">SSSLux • 3D Luxury Commerce</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
              60 FPS WebGL
            </span>
          </div>

          <div className="my-auto py-3 space-y-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-white font-bold block text-sm">Titanium Chronograph</span>
                <span className="text-[10px] text-pink-400 font-mono">Interactive 3D Material Inspector</span>
              </div>
              <span className="text-base font-black text-white">$4,850</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="text-zinc-500">Materials:</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white">Obsidian Chrome</span>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">Rose Gold</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white">Titanium</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
            <span>Checkout: 1-Click Headless</span>
            <span className="text-pink-400">Shopify Storefront API</span>
          </div>
        </div>
      );
  }
}

export function WorkPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'cinema' | 'grid'>('cinema');
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'saas' | 'web'>('all');
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Auto-play timer for cinema mode
  useEffect(() => {
    if (isPaused || viewMode !== 'cinema') return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [isPaused, currentIndex, viewMode]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterCat === activeFilter);

  const currentProject = PROJECTS[currentIndex];

  return (
    <section id="work" className="w-full py-16 sm:py-24 bg-background text-foreground relative z-10 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER WITH VIEW SWITCHER */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4 pb-4 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-2.5">
              <IconSparkles size={14} />
              Production Case Studies
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase">
              <TextMask>Selected</TextMask> <TextMask delay={0.1}>Works.</TextMask>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center p-1 rounded-full bg-surface border border-border">
              <button
                onClick={() => setViewMode('cinema')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  viewMode === 'cinema'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <IconDeviceTv size={14} />
                <span>Spotlight</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <IconLayoutGrid size={14} />
                <span>Grid</span>
              </button>
            </div>

            <Magnetic>
              <Link
                href="/work"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-md"
              >
                <span>All Projects</span>
                <IconArrowUpRight size={14} />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW MODE 1: SPOTLIGHT CINEMA (COMPACT, HIGH CONTRAST, ZERO OVERFLOW) */}
        {/* ========================================================================= */}
        {viewMode === 'cinema' && (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex flex-col gap-6"
          >
            {/* Main Stage: Deep Obsidian Card with Balanced Height */}
            <div className="relative w-full rounded-3xl bg-[#090A0F] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl text-white overflow-hidden">
              {/* Subtle Ambient Color Glow Matching the Active Project */}
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-40 transition-all duration-700"
                style={{ backgroundColor: currentProject.color }}
              />

              {/* Top Meta Line: Index, Category, Progress Indicator */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    0{currentIndex + 1} / 0{PROJECTS.length}
                  </span>
                  <span className="h-3 w-px bg-white/20" />
                  <span
                    className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono"
                    style={{
                      backgroundColor: `${currentProject.color}20`,
                      color: currentProject.color,
                      border: `1px solid ${currentProject.color}40`,
                    }}
                  >
                    {currentProject.category}
                  </span>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Switch to project ${i + 1}`}
                      className="group p-1"
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === i
                            ? 'w-7 bg-primary'
                            : 'w-2 bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Stage Grid: Left Details + Right Digital Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Column: Project Details (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProject.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-2.5 leading-none">
                        {currentProject.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mb-5">
                        {currentProject.tagline}
                      </p>

                      {/* 3 Impact Proof Metrics */}
                      <div className="grid grid-cols-3 gap-2.5 mb-5">
                        {currentProject.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-white/[0.04] border border-white/10"
                          >
                            <span className="text-[10px] text-zinc-400 uppercase font-mono block mb-0.5">
                              {m.label}
                            </span>
                            <span
                              className="text-base sm:text-xl font-black tracking-tight"
                              style={{ color: currentProject.color }}
                            >
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Stack Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase pr-1">Stack:</span>
                        {currentProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action CTAs */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Magnetic>
                          <a
                            href={currentProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Launch ${currentProject.name} live in new tab`}
                            className="px-6 py-3 rounded-full bg-primary hover:bg-[#E04D2D] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/25 flex items-center gap-2 group cursor-pointer"
                          >
                            <span>Launch Live Site</span>
                            <IconArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </Magnetic>

                        <button
                          onClick={() => setActiveModalProject(currentProject)}
                          className="px-5 py-3 rounded-full bg-white/[0.06] border border-white/15 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                          <IconInfoCircle size={15} />
                          <span>Case Study Specs</span>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Column: High-End Digital Mockup Window (6 cols) */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl bg-[#0F1017] border border-white/15 overflow-hidden shadow-2xl">
                    {/* Browser Chrome Header */}
                    <div className="px-4 py-2.5 bg-[#171822] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>

                      <div className="px-3 py-0.5 rounded-full bg-black/40 border border-white/10 text-[10px] font-mono text-zinc-400 truncate max-w-[200px]">
                        {currentProject.link.replace(/^https?:\/\//, '')}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">
                          Live
                        </span>
                      </div>
                    </div>

                    {/* Digital Interface Screen Preview */}
                    <div className="aspect-[16/10] w-full overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentProject.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                        >
                          <ProjectDigitalMockup project={currentProject} />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Thumbnail Strip & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                {PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all text-left shrink-0 ${
                      currentIndex === idx
                        ? 'bg-surface border-primary text-foreground shadow-sm'
                        : 'bg-background border-border text-muted hover:text-foreground hover:border-foreground/30'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: proj.color }}
                    />
                    <span className="text-xs font-bold leading-none">{proj.name}</span>
                  </button>
                ))}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Project"
                  className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <IconArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Project"
                  className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <IconArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 2: INTERACTIVE GRID & BENTO */}
        {/* ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="flex flex-col gap-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-1">
              {[
                { id: 'all', label: 'All Works' },
                { id: 'ai', label: 'AI & Research' },
                { id: 'saas', label: 'Full-Stack SaaS' },
                { id: 'web', label: 'Web & E-Commerce' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id as 'all' | 'ai' | 'saas' | 'web')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface border border-border text-muted hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 3-Column Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-surface border border-border hover:border-foreground/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl"
                >
                  {/* Top Preview Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0C0D13] border-b border-border">
                    <ProjectDigitalMockup project={proj} />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                          {proj.metrics[0].value} {proj.metrics[0].label}
                        </span>
                      </div>

                      <h4 className="text-xl font-black uppercase tracking-tight text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        {proj.name}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
                        {proj.tagline}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {proj.techStack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-background border border-border text-foreground/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <button
                        onClick={() => setActiveModalProject(proj)}
                        className="text-xs font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <IconInfoCircle size={14} />
                        <span>Specs &amp; Impact</span>
                      </button>

                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-surface border border-border group-hover:bg-primary group-hover:text-white transition-colors"
                        aria-label={`Open ${proj.name} live`}
                      >
                        <IconArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY DEEP DIVE MODAL / DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div>
                  <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                    {activeModalProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Close Case Study Details"
                >
                  <IconX size={18} />
                </button>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {activeModalProject.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-background border border-border text-center">
                    <span className="text-[10px] font-mono text-muted uppercase block mb-1">
                      {m.label}
                    </span>
                    <span
                      className="text-lg sm:text-xl font-black"
                      style={{ color: activeModalProject.color }}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-background border border-border">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted mb-1">
                    The Challenge:
                  </h5>
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {activeModalProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-background border border-border">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                    Our Engineering Solution:
                  </h5>
                  <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Core Features */}
              <div className="mb-6">
                <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3 font-mono">
                  Engineered Features:
                </h5>
                <div className="space-y-2">
                  {activeModalProject.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                      <IconCheck size={16} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Outcomes */}
              <div className="mb-8">
                <h5 className="text-xs font-bold uppercase tracking-widest text-muted mb-3 font-mono">
                  Key Outcomes:
                </h5>
                <div className="space-y-2">
                  {activeModalProject.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
                      <IconRocket size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-background border border-border text-[10px] font-mono text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={activeModalProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-primary hover:bg-[#E04D2D] text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 shrink-0 shadow-lg"
                >
                  <span>Launch Live</span>
                  <IconArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
