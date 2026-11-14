'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconChartDots3,
  IconSparkles,
  IconBolt,
  IconCheck,
  IconCopy,
  IconTrendingUp,
  IconShieldLock,
  IconCurrencyDollar,
  IconFlame,
} from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { QuantumVolatilityScene, STRIKE_POINTS, StrikePoint } from '@/components/premium/3d/QuantumVolatilityScene';

interface MarketPair {
  symbol: string;
  price: string;
  change: string;
  volume: string;
  ivAtm: string;
}

const MARKETS: MarketPair[] = [
  { symbol: 'BTC/USD', price: '$94,250.00', change: '+4.82%', volume: '$2.84B', ivAtm: '61.8%' },
  { symbol: 'ETH/USD', price: '$3,418.50', change: '+3.14%', volume: '$1.42B', ivAtm: '58.4%' },
  { symbol: 'SOL/USD', price: '$218.40', change: '+8.90%', volume: '$840M', ivAtm: '72.1%' },
  { symbol: 'NVDA/USD', price: '$142.20', change: '+2.05%', volume: '$420M', ivAtm: '46.2%' },
];

export default function QuantumExchangePage() {
  const [selectedMarket, setSelectedMarket] = useState<MarketPair>(MARKETS[0]);
  const [selectedStrike, setSelectedStrike] = useState<StrikePoint>(STRIKE_POINTS[2]);
  const [isShockwave, setIsShockwave] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [latencyUs, setLatencyUs] = useState<number>(0.38);
  const [orderCount, setOrderCount] = useState<number>(142980);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Live Jitter
  useEffect(() => {
    const timer = setInterval(() => {
      setLatencyUs(parseFloat((0.36 + Math.random() * 0.05).toFixed(2)));
      setOrderCount((prev) => prev + Math.floor(Math.random() * 8 + 2));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const playSynthesizerPing = (frequency = 660) => {
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio autoplay fallback
    }
  };

  const triggerVolatilityShock = () => {
    if (isShockwave) return;
    setIsShockwave(true);
    playSynthesizerPing(880);
    setTimeout(() => {
      setIsShockwave(false);
      playSynthesizerPing(550);
    }, 900);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm i @nph-studio/quantum-ex');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#02050b] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Dynamic Ambient Radiant Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-[160px] pointer-events-none z-0" />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-30" />

      {/* ========================================================================= */}
      {/* TOP GLASS NAV */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 backdrop-blur-2xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/lab"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <IconArrowLeft size={16} />
              </div>
              <span className="hidden sm:inline">Lab Vault</span>
            </Link>

            <span className="h-4 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight uppercase">Quantum-EX</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                Lab 05 • 3D Volatility
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Fill: {latencyUs} μs
              </span>
              <span className="text-zinc-600">|</span>
              <span>Orders: #{orderCount}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-cyan-400">MEV-Shield Active</span>
            </div>

            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              >
                Fintech Inquiries
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH 3D VOLATILITY SURFACE */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8">
        {/* Full-Screen 3D Volatility Surface */}
        <div className="absolute inset-0 z-0">
          <QuantumVolatilityScene
            isShockwave={isShockwave}
            selectedStrike={selectedStrike.strike}
            onSelectStrike={(pt) => setSelectedStrike(pt)}
          />
        </div>

        {/* Top Floating Telemetry & Title Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-start justify-between gap-6 pointer-events-none mt-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-auto max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-3">
              <IconSparkles size={12} />
              Lab 05 • High-Frequency Spatial Liquidity Matrix
            </div>

            <div className="relative select-none my-1">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white drop-shadow-[0_0_60px_rgba(6,182,212,0.35)]">
                QUANTUM
              </h1>
              <h1
                className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] text-transparent mix-blend-overlay"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}
              >
                SURFACE 3D
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed max-w-md">
              Real-time 3D implied volatility surface, cross-margin Greeks telemetry, and sub-microsecond matching engine execution.
            </p>
          </motion.div>

          {/* Real-time Greeks Telemetry HUD (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-auto w-full sm:w-80 p-5 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Strike Analytics</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                {selectedStrike.strike} Strike
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-zinc-500 block">Delta (Δ):</span>
                  <span className="text-emerald-400 font-bold text-xs">{selectedStrike.delta}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-zinc-500 block">Gamma (Γ):</span>
                  <span className="text-cyan-400 font-bold text-xs">{selectedStrike.gamma}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-zinc-500 block">Implied Vol:</span>
                  <span className="text-purple-400 font-bold text-xs">{selectedStrike.iv}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-zinc-500 block">24h Depth:</span>
                  <span className="text-white font-bold text-xs">{selectedStrike.volume}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-[10px] space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Underlying:</span>
                  <span className="text-white font-bold">{selectedMarket.symbol} ({selectedMarket.price})</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Match Protocol:</span>
                  <span className="text-emerald-400 font-bold">Lock-Free FIFO</span>
                </div>
              </div>
            </div>

            {/* Depth Bar */}
            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono">
              <span className="text-zinc-500">Liquidity Density:</span>
              <span className="text-emerald-400 font-bold">Saturated ($142M Depth)</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Market Pair Switcher & Volatility Shock Trigger */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto pt-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-black/75 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 shrink-0">
                Market Surface:
              </span>
              <div className="flex flex-wrap gap-2">
                {MARKETS.map((market) => (
                  <button
                    key={market.symbol}
                    onClick={() => setSelectedMarket(market)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      selectedMarket.symbol === market.symbol
                        ? 'bg-white text-black font-black shadow-lg scale-105'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {market.symbol} <span className="opacity-60 text-[10px]">{market.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <Magnetic>
                <button
                  onClick={triggerVolatilityShock}
                  disabled={isShockwave}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  <IconFlame size={14} className={isShockwave ? 'animate-bounce text-red-300' : ''} />
                  <span>{isShockwave ? 'Liquidity Shocking...' : 'Simulate Shockwave'}</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: HIGH FREQUENCY FINTECH ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-cyan-400">
              <IconTrendingUp size={16} />
              Quantitative Fintech Engineering
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-2xl">
              Sub-Microsecond Latency <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                For Next-Gen Trading Venues.
              </span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            NPH Studio architects ultra-low latency matching engines, 3D risk visualizers, and decentralized derivatives platforms for institutional fintech founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <IconBolt size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Sub-Microsecond Matching</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Lock-free single-threaded ring buffer matching cores processing over 2.5 million order submissions per second on bare-metal kernels.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>99th% Latency:</span>
                <span className="text-white">0.42 μs deterministic</span>
              </div>
              <div className="flex justify-between">
                <span>Throughput:</span>
                <span className="text-cyan-400 font-bold">2.5M orders/sec</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
              <IconChartDots3 size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Monte Carlo 3D Volatility</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              WebGL GPU accelerated options pricing grids computing Black-Scholes and Heston stochastic volatility surfaces in real-time.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Simulation Count:</span>
                <span className="text-white">100,000 paths/sec</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Render:</span>
                <span className="text-indigo-400 font-bold">60 FPS Hardware Sync</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <IconShieldLock size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">MEV-Shielded Dark Pools</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Threshold encryption and commit-reveal batch auctions preventing sandwich attacks, predatory latency arbitrage, and toxic flow extraction.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Slippage Reduction:</span>
                <span className="text-white">94% vs AMMs</span>
              </div>
              <div className="flex justify-between">
                <span>Frontrun Protection:</span>
                <span className="text-blue-400 font-bold">Zero Toxic MEV</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SDK & FINTECH CONSULTATION */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-6">
            <IconCurrencyDollar size={14} className="text-cyan-400" />
            Fintech Engineering & Market Infrastructure
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Build Institutional <span className="text-cyan-400">Trading Platforms</span>.
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            From crypto derivatives exchanges and options analytics terminals to algorithmic order management systems, we engineer turnkey fintech software.
          </p>

          <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between font-mono text-xs mb-8">
            <span className="text-zinc-300">npm i @nph-studio/quantum-ex</span>
            <button
              onClick={handleCopyInstall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans font-bold transition-all"
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

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Schedule Fintech Sprint
              </button>
            </Magnetic>
            <Magnetic>
              <Link
                href="/lab/hero-004"
                className="px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                View Genome-X (Lab 04) →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LAB VAULT FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020308] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-white">NPH Studio Lab</span>
              <span className="text-xs text-zinc-600 font-mono">/ Experiment #005 (Quantum-EX)</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              Exploring cutting-edge quantitative finance, 3D options volatility modeling, and high-frequency order book topologies.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <IconArrowLeft size={16} />
              All Experiments
            </Link>
            <Link href="/lab/hero-004" className="text-zinc-400 hover:text-white transition-colors">
              Genome-X (Lab 04)
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Agency Home
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
