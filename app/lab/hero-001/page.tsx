'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconFingerprint,
  IconShieldCheck,
  IconMenu,
  IconChevronDown,
  IconX,
  IconTerminal2,
  IconCpu,
  IconActivity,
  IconLayersLinked,
  IconShieldLock,
  IconCopy,
  IconCheck,
  IconFlame,
  IconRefresh,
  IconPlayerPlay,
  IconArrowRight,
  IconSparkles,
  IconWorld,
  IconServer,
  IconBolt,
} from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { LiquidAurora } from '@/components/premium/LiquidAurora';

type PaletteKey = 'emerald' | 'cyan' | 'violet' | 'amber';

interface PaletteConfig {
  name: string;
  badge: string;
  baseColor: string;
  wireframeColor: string;
  lightColor: string;
  glowClass: string;
  accentClass: string;
  textAccentClass: string;
  borderClass: string;
}

const PALETTES: Record<PaletteKey, PaletteConfig> = {
  emerald: {
    name: 'Aurora Emerald',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    baseColor: '#064e3b',
    wireframeColor: '#10b981',
    lightColor: '#10b981',
    glowClass: 'from-emerald-500/20 to-teal-500/0',
    accentClass: 'bg-emerald-500',
    textAccentClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/40',
  },
  cyan: {
    name: 'Cyber Cyan',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    baseColor: '#083344',
    wireframeColor: '#06b6d4',
    lightColor: '#38bdf8',
    glowClass: 'from-cyan-500/20 to-blue-500/0',
    accentClass: 'bg-cyan-500',
    textAccentClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/40',
  },
  violet: {
    name: 'Solar Violet',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    baseColor: '#2e1065',
    wireframeColor: '#a855f7',
    lightColor: '#c084fc',
    glowClass: 'from-purple-500/20 to-pink-500/0',
    accentClass: 'bg-purple-500',
    textAccentClass: 'text-purple-400',
    borderClass: 'border-purple-500/40',
  },
  amber: {
    name: 'Neon Amber',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    baseColor: '#451a03',
    wireframeColor: '#f59e0b',
    lightColor: '#fbbf24',
    glowClass: 'from-amber-500/20 to-orange-500/0',
    accentClass: 'bg-amber-500',
    textAccentClass: 'text-amber-400',
    borderClass: 'border-amber-500/40',
  },
};

interface TerminalEntry {
  type: 'cmd' | 'output' | 'success' | 'warn';
  text: string;
}

export default function AuroraOSPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  // Interactivity States
  const [activePalette, setActivePalette] = useState<PaletteKey>('emerald');
  const [isBooted, setIsBooted] = useState(false);
  const [bootingProgress, setBootingProgress] = useState(0);
  const [isBooting, setIsBooting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fps, setFps] = useState(60);
  const [neuralLatency, setNeuralLatency] = useState(0.38);
  const [benchmarking, setBenchmarking] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(100);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([
    { type: 'output', text: 'AURORA MICRO-KERNEL v2.4.9-spatial [Kyber-1024 Locked]' },
    { type: 'output', text: 'Type "help" or click one of the quick command buttons below.' },
  ]);

  const palette = useMemo(() => PALETTES[activePalette], [activePalette]);

  // Live Telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 2.2));
      setNeuralLatency(parseFloat((0.35 + Math.random() * 0.08).toFixed(2)));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // System Boot Sequence
  const handleBoot = () => {
    if (isBooted) return;
    setIsBooting(true);
    setBootingProgress(0);

    const interval = setInterval(() => {
      setBootingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBooting(false);
          setIsBooted(true);
          setTerminalHistory((curr) => [
            ...curr,
            { type: 'cmd', text: 'aurora --initialize-kernel' },
            { type: 'success', text: '⚡ KERNEL BOOTSTRAP COMPLETE: 128 Spatial Shards Online' },
            { type: 'success', text: '✓ Neural IPC Bus: 0.38ms | Memory Allocator: Zero-Copy Active' },
          ]);
          return 100;
        }
        return prev + 20;
      });
    }, 180);
  };

  // Terminal execution
  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newEntries: TerminalEntry[] = [{ type: 'cmd', text: rawCmd }];

    switch (cmd) {
      case 'help':
        newEntries.push(
          { type: 'output', text: 'AVAILABLE COMMANDS:' },
          { type: 'output', text: '  status       - Inspect kernel telemetry, memory & thread map' },
          { type: 'output', text: '  benchmark    - Measure spatial IPC throughput vs monolithic kernels' },
          { type: 'output', text: '  neofetch     - Display ASCII hardware architecture specs' },
          { type: 'output', text: '  agents       - Enumerate active autonomous runtime micro-agents' },
          { type: 'output', text: '  boot         - Re-initialize cold kernel boot sequence' },
          { type: 'output', text: '  clear        - Reset terminal console screen' }
        );
        break;
      case 'status':
        newEntries.push(
          { type: 'success', text: `SYSTEM STATUS: ${isBooted ? 'OPTIMAL (ONLINE)' : 'STANDBY'}` },
          { type: 'output', text: `  Active Palette : ${palette.name}` },
          { type: 'output', text: `  Neural Latency : ${neuralLatency} ms (Zero-jitter)` },
          { type: 'output', text: `  Framerate      : ${fps} FPS (Hardware sync)` },
          { type: 'output', text: `  Encryption     : Kyber-1024 Lattice Cryptography Active` }
        );
        break;
      case 'benchmark':
        newEntries.push(
          { type: 'output', text: 'Running realtime spatial IPC benchmark...' },
          { type: 'success', text: '✓ Context Switch Latency: 0.12 μs (94% faster than Linux 6.8)' },
          { type: 'success', text: '✓ Cold Boot Runtime: 12.4 ms (98% faster than macOS Sonoma)' },
          { type: 'success', text: '✓ Inference Throughput: 1,840 tokens/sec across 16 micro-shards' }
        );
        break;
      case 'neofetch':
        newEntries.push(
          { type: 'output', text: '         /\\         OS: Aurora OS 2.4-spatial x86_64 / arm64' },
          { type: 'output', text: '        /  \\        Kernel: Aurora Microkernel 2.4.9-kyber' },
          { type: 'output', text: '       / /\\ \\       Uptime: 99.999% Spatial Telemetry' },
          { type: 'output', text: '      / ____ \\      Display: WebGL 3D Distort Engine' },
          { type: 'output', text: '     /_/    \\_\\     Memory: 8.2MB Kernel / 1.28GB Sharded Pool' }
        );
        break;
      case 'agents':
        newEntries.push(
          { type: 'success', text: 'ACTIVE AUTONOMOUS MICRO-AGENTS:' },
          { type: 'output', text: '  [01] GC-Zero        - Autonomous lock-free memory reclaiming (IDLE)' },
          { type: 'output', text: '  [02] Neural-Balancer - Thread load distribution via RL matrix (ACTIVE)' },
          { type: 'output', text: '  [03] Lattice-Guard  - Post-quantum handshake verifier (ACTIVE)' }
        );
        break;
      case 'boot':
        handleBoot();
        newEntries.push({ type: 'output', text: 'Triggering kernel bootstrap sequence...' });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newEntries.push({
          type: 'warn',
          text: `Command not recognized: "${rawCmd}". Type "help" for a list of commands.`,
        });
    }

    setTerminalHistory((prev) => [...prev, ...newEntries]);
    setTerminalInput('');

    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('curl -fsSL https://aurora.nph-studio.in/install.sh | bash');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerBenchmarkSweep = () => {
    setBenchmarking(true);
    setBenchmarkProgress(15);
    const t1 = setTimeout(() => setBenchmarkProgress(65), 400);
    const t2 = setTimeout(() => {
      setBenchmarkProgress(100);
      setBenchmarking(false);
    }, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b ${palette.glowClass} blur-[140px] pointer-events-none z-0 transition-all duration-1000`}
      />

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      {/* ========================================================================= */}
      {/* TOP ULTRA-GLASS NAVBAR */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 backdrop-blur-2xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Back & Badge */}
          <div className="flex items-center gap-4">
            <Link
              href="/lab"
              className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <IconArrowLeft size={16} />
              </div>
              <span className="hidden sm:inline">Lab Vault</span>
            </Link>

            <span className="h-4 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight uppercase">Aurora OS</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${palette.badge}`}>
                v2.4-spatial
              </span>
            </div>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <a href="#hero" className="hover:text-white transition-colors">Kernel</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#terminal" className="hover:text-white transition-colors">Terminal</a>
            <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
            <a href="#deploy" className="hover:text-white transition-colors">Deploy</a>
          </nav>

          {/* Right: Live Telemetry Pill & CTAs */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {fps} FPS
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{neuralLatency}ms</span>
            </div>

            <button
              onClick={handleBoot}
              disabled={isBooted || isBooting}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                isBooted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : isBooting
                  ? 'bg-white/10 text-zinc-300 border border-white/20 animate-pulse'
                  : 'bg-white text-black hover:scale-105 active:scale-95 shadow-lg shadow-white/10'
              }`}
            >
              {isBooted ? (
                <>
                  <IconShieldCheck size={14} className="text-emerald-400" />
                  Kernel Active
                </>
              ) : isBooting ? (
                <>
                  <IconRefresh size={14} className="animate-spin" />
                  Booting {bootingProgress}%
                </>
              ) : (
                <>
                  <IconBolt size={14} />
                  Initialize
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <IconX size={18} /> : <IconMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 mt-3 pt-4 flex flex-col gap-3 pb-2 text-xs font-bold uppercase tracking-widest"
            >
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Kernel</a>
              <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Architecture</a>
              <a href="#terminal" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Interactive Terminal</a>
              <a href="#benchmarks" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Performance Benchmarks</a>
              <a href="#deploy" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Deploy Kernel</a>
              <div className="pt-2">
                <button
                  onClick={() => {
                    handleBoot();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white text-black font-black uppercase text-xs"
                >
                  {isBooted ? 'Kernel Active' : 'Initialize Kernel'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH WEBGL 3D LIQUID ORB */}
      {/* ========================================================================= */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
        {/* Interactive 3D WebGL Liquid Aurora Orb */}
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-85 pointer-events-auto">
          <LiquidAurora
            baseColor={palette.baseColor}
            wireframeColor={palette.wireframeColor}
            lightColor={palette.lightColor}
          />
        </div>

        {/* HUD Overlay: Top Right Live System Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-28 right-6 lg:right-12 z-20 hidden lg:flex flex-col gap-3 w-64 pointer-events-none"
        >
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <span className={`text-[10px] font-black uppercase tracking-widest ${palette.textAccentClass}`}>
                Neural Telemetry
              </span>
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${palette.accentClass}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${palette.accentClass}`} />
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-black tracking-tight">{isBooted ? '99.98%' : '100%'}</span>
              <span className="text-xs text-zinc-400 font-mono">128 Shards</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isBooted ? '100%' : '84%' }}
                transition={{ duration: 1 }}
                className={`h-full ${palette.accentClass}`}
              />
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-[10px] font-mono text-zinc-400">
              <span>Lattice Key: Kyber-1024</span>
              <span>0.12 μs IPC</span>
            </div>
          </div>
        </motion.div>

        {/* HUD Overlay: Bottom Left Quantum Security Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-12 left-6 lg:left-12 z-20 hidden lg:flex flex-col gap-3 w-72 pointer-events-none"
        >
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${palette.textAccentClass}`}>
                <IconShieldLock size={20} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider">Spatial Enclave</div>
                <div className="text-[10px] text-zinc-400">Zero-Trust Memory Guard</div>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Post-quantum lattice signatures isolate each memory page across spatial WebGL coordinates.
            </p>
          </div>
        </motion.div>

        {/* Center Typography & Interactivity */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto pointer-events-none"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 pointer-events-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl text-[11px] font-bold uppercase tracking-widest text-zinc-200 shadow-lg">
              <IconSparkles size={14} className={palette.textAccentClass} />
              Post-Silicon Spatial Micro-Kernel
            </span>
          </motion.div>

          {/* Dual Layer 3D Typography */}
          <div className="relative my-2 select-none">
            {/* Top Solid Layer */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16vw] sm:text-[140px] md:text-[190px] font-black tracking-tighter leading-[0.78] z-20 drop-shadow-[0_0_80px_rgba(16,185,129,0.35)]"
            >
              AURORA
            </motion.h1>

            {/* Hollow Backing Layer (Orb shines through) */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[16vw] sm:text-[140px] md:text-[190px] font-black tracking-tighter leading-[0.78] z-0 text-transparent mix-blend-overlay"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}
            >
              SYSTEM
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed mt-4 px-4"
          >
            A high-concurrency micro-kernel engineered for distributed spatial computing, autonomous AI agents, and sub-millisecond neural inference.
          </motion.p>

          {/* Color Palette Switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 mt-8 p-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl pointer-events-auto"
          >
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest pl-3 pr-1">Orb Mode:</span>
            {(['emerald', 'cyan', 'violet', 'amber'] as PaletteKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActivePalette(key)}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                  activePalette === key
                    ? `${PALETTES[key].accentClass} text-black font-black shadow-lg`
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {key}
              </button>
            ))}
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto"
          >
            <Magnetic>
              <button
                onClick={handleBoot}
                disabled={isBooted || isBooting}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.25)] cursor-pointer"
              >
                <IconFingerprint size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>{isBooted ? 'Kernel Telemetry Online' : isBooting ? `Booting (${bootingProgress}%)` : 'Initialize Kernel'}</span>
                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="#terminal"
                className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md"
              >
                <IconTerminal2 size={18} className={palette.textAccentClass} />
                <span>Launch Shell</span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#architecture"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 hover:opacity-100 transition-opacity z-20 cursor-pointer"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore</span>
          <IconChevronDown size={16} className="animate-bounce" />
        </motion.a>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: SPATIAL ARCHITECTURE BENTO GRID */}
      {/* ========================================================================= */}
      <section id="architecture" className="relative z-10 py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-zinc-400">
              <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
              Kernel Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-2xl">
              Engineered For The <span className={palette.textAccentClass}>Zero-Latency</span> Era.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Every layer of Aurora OS decouples monolithic operating system bottlenecks into autonomous, hardware-accelerated spatial micro-kernels.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Sub-Millisecond Neural IPC */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${palette.glowClass} blur-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${palette.textAccentClass}`}>
                  <IconCpu size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Sub-Millisecond Neural IPC</h3>
                  <span className="text-xs text-zinc-500 font-mono">Lock-free ring buffers on shared L3 cache</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                0.12 μs Latency
              </span>
            </div>

            {/* Real-time simulated pulse wave */}
            <div className="w-full h-32 rounded-2xl bg-black/50 border border-white/5 p-4 flex flex-col justify-between mb-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>CHANNEL_01: INFERENCE_PIPELINE</span>
                <span className="text-emerald-400">STATUS: SATURATED (48.2 GB/s)</span>
              </div>
              <div className="flex items-end gap-1 h-16 w-full">
                {[45, 60, 30, 80, 95, 40, 70, 85, 90, 65, 55, 75, 100, 85, 60, 70, 90, 100, 80, 60, 75, 90, 85, 95, 70, 80, 60, 90, 100, 75].map((val, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${val}%`, `${(val + 30) % 100}%`, `${val}%`] }}
                    transition={{ duration: 1.5 + (i % 5) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`flex-1 rounded-t-sm ${palette.accentClass} opacity-80`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>0.00ms</span>
                <span>0.25ms</span>
                <span>0.50ms</span>
                <span>0.75ms</span>
                <span>1.00ms</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Eliminates traditional Unix socket and pipe overhead. Zero context switches during agent-to-agent vector message exchanges.
            </p>
          </div>

          {/* Card 2: Quantum-Safe Lattice Security */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${palette.textAccentClass}`}>
                  <IconShieldCheck size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-white">
                  NIST FIPS 203
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Kyber-1024 Lattice Guard</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Full cryptographic immunity against quantum computer Shor attacks via Module-Lattice Key Encapsulation.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-[11px] font-mono space-y-1.5 text-zinc-400">
              <div className="flex justify-between">
                <span>Algorithm:</span>
                <span className="text-white">ML-KEM-1024</span>
              </div>
              <div className="flex justify-between">
                <span>Key Size:</span>
                <span className="text-white">1,568 bytes</span>
              </div>
              <div className="flex justify-between">
                <span>Hardware Trust:</span>
                <span className="text-emerald-400">Enclave Verified</span>
              </div>
            </div>
          </div>

          {/* Card 3: Autonomous Runtime Agents */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${palette.textAccentClass}`}>
                  <IconActivity size={24} />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">3 Online</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Self-Organizing Micro-Agents</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                No centralized cron or scheduler daemon. Runtime micro-agents self-balance memory heaps and inference priorities.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Memory Optimizer', status: 'GC-Zero • Active' },
                { name: 'Neural Quantizer', status: 'FP8 Matrix Engine' },
                { name: 'Telemetry Probe', status: '60 FPS Hardware Sync' },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                  <span className="font-bold">{agent.name}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{agent.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: WebGPU & Spatial 3D Pipeline */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${palette.textAccentClass}`}>
                  <IconLayersLinked size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Direct WebGPU Spatial Pipeline</h3>
                  <span className="text-xs text-zinc-500 font-mono">Zero driver hops for browser and native render paths</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                120 FPS Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Cold Startup</div>
                <div className="text-2xl font-black tracking-tight text-white">12 ms</div>
                <div className="text-[10px] text-emerald-400 mt-1">98% vs Linux container</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Memory Overhead</div>
                <div className="text-2xl font-black tracking-tight text-white">8.2 MB</div>
                <div className="text-[10px] text-emerald-400 mt-1">Zero virtual page bloat</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Distributed Sync</div>
                <div className="text-2xl font-black tracking-tight text-white">Global</div>
                <div className="text-[10px] text-cyan-400 mt-1">Edge CRDT consensus</div>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Run full 3D spatial simulations inside lightweight browser sandboxes without dropping frames or requesting root privileges.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTERACTIVE CYBERPUNK TERMINAL */}
      {/* ========================================================================= */}
      <section id="terminal" className="relative z-10 py-24 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-3">
            <IconTerminal2 size={14} className={palette.textAccentClass} />
            Interactive Kernel Shell
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Execute In-Browser <span className={palette.textAccentClass}>Telemetry</span>.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2">
            Try real commands in the live terminal below or click one of the quick buttons.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl bg-[#080808] border border-white/15 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 text-[11px] text-zinc-400 font-bold">aurora-kernel-sh (tty0)</span>
            </div>
            <div className="text-[10px] text-zinc-500">
              Host: <span className="text-emerald-400">nph-studio.in/lab</span>
            </div>
          </div>

          {/* Quick-action buttons */}
          <div className="p-3 bg-white/[0.02] border-b border-white/5 flex flex-wrap gap-2 text-[10px]">
            <span className="text-zinc-500 self-center pl-1 font-bold">Quick Run:</span>
            {['help', 'status', 'benchmark', 'neofetch', 'agents', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/15 hover:text-white transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Output Screen */}
          <div className="p-6 min-h-[300px] max-h-[420px] overflow-y-auto space-y-2 select-text">
            {terminalHistory.map((item, index) => (
              <div key={index} className="leading-relaxed">
                {item.type === 'cmd' ? (
                  <div className="flex items-center gap-2 text-zinc-300 font-bold">
                    <span className={palette.textAccentClass}>aurora-os $</span>
                    <span>{item.text}</span>
                  </div>
                ) : item.type === 'success' ? (
                  <div className="text-emerald-400">{item.text}</div>
                ) : item.type === 'warn' ? (
                  <div className="text-amber-400">{item.text}</div>
                ) : (
                  <div className="text-zinc-400 whitespace-pre-wrap">{item.text}</div>
                )}
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Active Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(terminalInput);
            }}
            className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center gap-3"
          >
            <span className={`font-bold ${palette.textAccentClass}`}>aurora-os $</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder='Type "help", "status", "benchmark" or "neofetch"...'
              className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-zinc-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-bold transition-colors"
            >
              Run ↵
            </button>
          </form>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: PERFORMANCE BENCHMARKS VS TRADITIONAL OS */}
      {/* ========================================================================= */}
      <section id="benchmarks" className="relative z-10 py-24 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-zinc-400">
              <IconFlame size={16} className="text-orange-400" />
              Realtime Synthetic Benchmarks
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Aurora OS vs <span className="text-zinc-500">Legacy Monoliths</span>.
            </h2>
          </div>

          <button
            onClick={triggerBenchmarkSweep}
            disabled={benchmarking}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <IconPlayerPlay size={14} className={benchmarking ? 'animate-spin' : ''} />
            <span>{benchmarking ? 'Sweeping Latency...' : 'Run Benchmarks'}</span>
          </button>
        </div>

        {/* Benchmarks Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cold Boot Latency */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black uppercase">Cold Boot Time</span>
              <span className="text-xs font-mono text-emerald-400">Lower is better</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
                    Aurora OS v2.4
                  </span>
                  <span className="text-emerald-400 font-bold">12.4 ms</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${palette.accentClass}`} style={{ width: `${benchmarkProgress > 50 ? '3%' : '3%'}` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-zinc-400">
                  <span>Alpine Linux 3.19</span>
                  <span>420 ms</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-zinc-600" style={{ width: '38%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-zinc-400">
                  <span>macOS Sonoma (Darwin)</span>
                  <span>1,420 ms</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-zinc-700" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Context Switch Overhead */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black uppercase">Thread Context Switch</span>
              <span className="text-xs font-mono text-emerald-400">Lower is better</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
                    Aurora OS v2.4
                  </span>
                  <span className="text-emerald-400 font-bold">0.14 μs</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${palette.accentClass}`} style={{ width: '4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-zinc-400">
                  <span>Linux 6.8 (PREEMPT)</span>
                  <span>2.10 μs</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-zinc-600" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-zinc-400">
                  <span>Windows 11 (NT Kernel)</span>
                  <span>3.40 μs</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-zinc-700" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Neural Inference Throughput */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black uppercase">Neural Token Output</span>
              <span className="text-xs font-mono text-emerald-400">Higher is better</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
                    Aurora Spatial IPC
                  </span>
                  <span className="text-emerald-400 font-bold">1,840 tok/s</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${palette.accentClass}`} style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-zinc-400">
                  <span>Traditional gRPC IPC</span>
                  <span>410 tok/s</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-zinc-600" style={{ width: '22%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Memory Footprint */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black uppercase">Kernel RAM Footprint</span>
              <span className="text-xs font-mono text-emerald-400">Lower is better</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
                    Aurora Micro-Kernel
                  </span>
                  <span className="text-emerald-400 font-bold">8.2 MB</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${palette.accentClass}`} style={{ width: '2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-zinc-400">
                  <span>Vanilla Linux Server</span>
                  <span>148 MB</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-zinc-600" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DEPLOYMENT & QUICK INSTALL */}
      {/* ========================================================================= */}
      <section id="deploy" className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b ${palette.glowClass} blur-3xl pointer-events-none`} />

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 mb-6">
            <IconServer size={14} className={palette.textAccentClass} />
            Instant Distribution
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Deploy The <span className={palette.textAccentClass}>Aurora Kernel</span>.
          </h2>

          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Install the lightweight Aurora daemon locally on Apple Silicon, Linux x86_64, or deploy straight to edge WebAssembly containers.
          </p>

          {/* 1-Click Copy Install Block */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-4 font-mono text-xs text-left mb-6">
            <span className="text-zinc-300 truncate select-all">
              curl -fsSL https://aurora.nph-studio.in/install.sh | bash
            </span>
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans font-bold transition-all shrink-0"
            >
              {copied ? (
                <>
                  <IconCheck size={14} className="text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <IconCopy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <IconWorld size={14} /> WebAssembly 2.0
            </span>
            <span className="flex items-center gap-1.5">
              <IconCpu size={14} /> ARM64 & x86_64
            </span>
            <span className="flex items-center gap-1.5">
              <IconShieldCheck size={14} /> Kyber-1024 Certified
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LAB VAULT NAVIGATION FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020202] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-white">NPH Studio Lab</span>
              <span className="text-xs text-zinc-600 font-mono">/ Experiment #001</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              Aurora OS is an open exploratory prototype built to test spatial computing UX and WebGL 3D micro-kernel workflows.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <IconArrowLeft size={16} />
              All Experiments
            </Link>
            <Link href="/lab/holographic" className="text-zinc-400 hover:text-white transition-colors">
              Holographic UI →
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              NPH Studio Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
