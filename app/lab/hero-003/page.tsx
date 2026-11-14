'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconSparkles,
  IconBolt,
  IconFlame,
  IconWaveSine,
  IconCopy,
  IconCheck,
  IconRotateClockwise,
  IconVolume,
  IconVolumeOff,
  IconCpu,
  IconLayersLinked,
} from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { ChromaFluidScene, CHROMA_THEMES, ChromaTheme } from '@/components/premium/3d/ChromaFluidScene';

export default function ChromaFluidPage() {
  const [activeTheme, setActiveTheme] = useState<ChromaTheme>('prismatic');
  const [speed, setSpeed] = useState<number>(1.0);
  const [isShockwave, setIsShockwave] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [surfaceTension, setSurfaceTension] = useState<number>(72.8);
  const [reynolds, setReynolds] = useState<number>(2840);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Dynamic Telemetry Jitter
  useEffect(() => {
    const timer = setInterval(() => {
      setSurfaceTension(parseFloat((72.0 + Math.random() * 1.6).toFixed(1)));
      setReynolds(Math.floor(2800 + Math.random() * 80));
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  // Web Audio Harmonic Tone Generator
  const playHarmonicSound = (freq = 432) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Trigger Shockwave Action
  const triggerShockwave = () => {
    setIsShockwave(true);
    playHarmonicSound(528);
    setTimeout(() => setIsShockwave(false), 600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('npm i @nph-studio/chroma-fluid');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentThemeConfig = CHROMA_THEMES[activeTheme];

  return (
    <main className="relative min-h-screen bg-[#030306] text-white selection:bg-pink-500/30 font-sans overflow-x-hidden">
      {/* Dynamic Ambient Glow matching active theme */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] blur-[150px] pointer-events-none z-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${currentThemeConfig.accentHex}25 0%, transparent 70%)`,
        }}
      />

      {/* Cyber Grid */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-35" />

      {/* ========================================================================= */}
      {/* TOP GLASS HEADER */}
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
              <span className="text-sm font-black tracking-tight uppercase">Chroma Fluid</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 uppercase tracking-wider">
                Lab 03 • 3D Physics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playHarmonicSound(432);
              }}
              className={`p-2 rounded-full border transition-all ${
                soundEnabled
                  ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              title={soundEnabled ? 'Mute Spatial Sound' : 'Enable Spatial Synth Sound'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <IconVolume size={16} /> : <IconVolumeOff size={16} />}
            </button>

            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              >
                Hire Us
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH 3D CHROMA FLUID TORUS */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8">
        {/* Full-Screen 3D Torus Knot Canvas */}
        <div className="absolute inset-0 z-0">
          <ChromaFluidScene
            themeKey={activeTheme}
            speedMultiplier={speed}
            isShockwave={isShockwave}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest text-pink-300 mb-3">
              <IconSparkles size={12} />
              Lab 03 • Non-Newtonian Spatial Fluid
            </div>

            <div className="relative select-none my-1">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white drop-shadow-[0_0_60px_rgba(236,72,153,0.3)]">
                CHROMA
              </h1>
              <h1
                className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] text-transparent mix-blend-overlay"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}
              >
                FLUID 3D
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed max-w-md">
              Real-time raymarched liquid metal and optical thin-film interference simulated directly on the GPU using WebGL 2.0.
            </p>
          </motion.div>

          {/* Realtime Fluid CFD Telemetry HUD (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-auto w-full sm:w-80 p-5 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-300">CFD Dynamics</span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${currentThemeConfig.accentHex}20`,
                  color: currentThemeConfig.accentHex,
                  border: `1px solid ${currentThemeConfig.accentHex}40`,
                }}
              >
                {currentThemeConfig.name}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Surface Tension:</span>
                <span className="text-white font-bold">{surfaceTension} mN/m</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Reynolds Number:</span>
                <span className="text-pink-400 font-bold">Re {reynolds}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Refraction IOR:</span>
                <span className="text-cyan-400 font-bold">1.62 Prismatic</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-zinc-400">Render Pipeline:</span>
                <span className="text-emerald-400 font-bold">Physical Raytrace</span>
              </div>
            </div>

            {/* Simulated Audio Frequency Visualizer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-end justify-between gap-1 h-8">
              {[40, 80, 50, 95, 30, 70, 90, 60, 85, 100, 45, 65, 80, 95, 50].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                  transition={{ duration: 1.2 + (i % 4) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 rounded-t-sm"
                  style={{ backgroundColor: currentThemeConfig.accentHex }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Interactive Knobs & Controls */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto pt-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-black/75 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Theme Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 pr-1">
                Chroma Material:
              </span>
              {(['prismatic', 'mercury', 'obsidian', 'neon'] as ChromaTheme[]).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => {
                    setActiveTheme(themeKey);
                    playHarmonicSound(440);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTheme === themeKey
                      ? 'bg-white text-black font-black shadow-lg scale-105'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {CHROMA_THEMES[themeKey].name}
                </button>
              ))}
            </div>

            {/* Velocity Multiplier & Shockwave */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
                <span className="text-zinc-500">Speed:</span>
                {[0.5, 1.0, 2.0].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSpeed(s);
                      playHarmonicSound(380 + s * 80);
                    }}
                    className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                      speed === s ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              <Magnetic>
                <button
                  onClick={triggerShockwave}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(236,72,153,0.4)]"
                >
                  <IconRotateClockwise size={14} className={isShockwave ? 'animate-spin' : ''} />
                  <span>Pulse Shockwave</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: SPATIAL SHADER INNOVATIONS */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-pink-400">
              <IconWaveSine size={16} />
              WebGL Shader Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-2xl">
              High-Precision Physics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                In The Browser Viewport.
              </span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Harnessing physical light refraction, thin-film interference, and hardware-accelerated vertex shaders to deliver immersive 3D digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6">
              <IconFlame size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Thin-Film Iridescence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Calculates constructive and destructive light wave interference across microscopic metallic layers, mimicking liquid mercury and oil slicks.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Phase Shift:</span>
                <span className="text-white">λ / 4 Dispersion</span>
              </div>
              <div className="flex justify-between">
                <span>Fresnel Curve:</span>
                <span className="text-pink-400 font-bold">Schlick Approximation</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <IconCpu size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">GPU Particle Vortices</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Hundreds of instanced micro-sparkles dynamically pulled into logarithmic spiral orbits around the central liquid knot via compute gravity.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Active Swarms:</span>
                <span className="text-white">360 Instanced Points</span>
              </div>
              <div className="flex justify-between">
                <span>Memory Overhead:</span>
                <span className="text-cyan-400 font-bold">&lt; 1.4 MB VRAM</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <IconLayersLinked size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Dynamic Web Audio Coupling</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Synthesizer audio nodes mapped directly to vertex velocity and light refraction parameters for a multi-sensory spatial feedback loop.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Audio Engine:</span>
                <span className="text-white">Web Audio Oscillators</span>
              </div>
              <div className="flex justify-between">
                <span>Harmonic Scale:</span>
                <span className="text-purple-400 font-bold">432 Hz Pythagorean</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SDK INSTALLATION */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-6">
            <IconBolt size={14} className="text-pink-400" />
            Creative Agency 3D Delivery
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Build Award-Winning <span className="text-pink-400">WebGL Experiences</span>.
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            We build high-performance 3D landing pages, interactive product configurators, and brand experiences that convert.
          </p>

          <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between font-mono text-xs mb-8">
            <span className="text-zinc-300">npm i @nph-studio/chroma-fluid</span>
            <button
              onClick={handleCopyCode}
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
                Start a 3D Web Project
              </button>
            </Magnetic>
            <Magnetic>
              <Link
                href="/lab/hero-002"
                className="px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Explore NeuroSpatial (Hero-002) →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LAB VAULT FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020204] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-white">NPH Studio Lab</span>
              <span className="text-xs text-zinc-600 font-mono">/ Experiment #003 (Chroma Fluid)</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              Exploring cutting-edge WebGL, creative engineering, and non-Newtonian spatial physics.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <IconArrowLeft size={16} />
              All Experiments
            </Link>
            <Link href="/lab/hero-001" className="text-zinc-400 hover:text-white transition-colors">
              Hero-001
            </Link>
            <Link href="/lab/hero-002" className="text-zinc-400 hover:text-white transition-colors">
              Hero-002
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
