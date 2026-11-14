'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconBrain,
  IconDatabase,
  IconSparkles,
  IconBolt,
  IconPlayerPlay,
  IconTerminal2,
  IconCheck,
  IconCopy,
  IconWorld,
} from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { NeuralSynapseScene, NEURAL_NODES, NeuralNodeData } from '@/components/premium/3d/NeuralSynapseScene';

interface StimulusPreset {
  id: string;
  title: string;
  prompt: string;
  category: string;
  color: string;
  primaryNodeId: string;
  thoughtTrace: string[];
}

const STIMULI: StimulusPreset[] = [
  {
    id: 'reasoning',
    title: 'Chain-of-Thought Deep Planning',
    prompt: 'Derive non-blocking distributed consensus over 64 spatial agent shards.',
    category: 'Cognitive Engine',
    color: '#8B5CF6',
    primaryNodeId: 'reasoning',
    thoughtTrace: [
      'Decomposing spatial state vector into 8 orthogonal sub-spaces...',
      'Monte Carlo tree search evaluated 1,280 branching rollout paths.',
      'Selecting lock-free ring buffer consensus protocol (0.14ms latency).',
      'Consensus confirmed across all 64 node quorums with zero state divergence.',
    ],
  },
  {
    id: 'rag',
    title: 'Realtime 10M Vector Traversal',
    prompt: 'Execute semantic similarity search across enterprise documentation embeddings.',
    category: 'Spatial RAG',
    color: '#06B6D4',
    primaryNodeId: 'vector-rag',
    thoughtTrace: [
      'Tokenizing user query into 1536-dimensional normalized vector.',
      'HNSW graph traversal traversed 4 hierarchy layers in 0.08ms.',
      'Top-10 semantic chunks reranked with cross-encoder attention.',
      'Context compression retrieved 99.4% relevant factual groundings.',
    ],
  },
  {
    id: 'swarm',
    title: 'Autonomous Multi-Agent Orchestration',
    prompt: 'Dispatch parallel code generation, security audit, and unit test agents.',
    category: 'Agent Swarm',
    color: '#F59E0B',
    primaryNodeId: 'agent-swarm',
    thoughtTrace: [
      'Leader agent partitioned objective into 3 concurrent micro-tasks.',
      'Agent-Alpha (CodeGen) emitted typed WebAssembly interface definitions.',
      'Agent-Beta (SecOps) passed Kyber-1024 memory boundary verification.',
      'Agent-Gamma (QA) completed 140 synthetic fuzz tests in parallel.',
    ],
  },
  {
    id: 'guardrails',
    title: 'Post-Quantum Lattice Verification',
    prompt: 'Enforce NIST FIPS 203 constitutional boundaries on generated tool invocations.',
    category: 'Security Enclave',
    color: '#6366F1',
    primaryNodeId: 'alignment',
    thoughtTrace: [
      'Intercepting outgoing tool execution payload at kernel level.',
      'Validating ML-KEM-1024 lattice signature against hardware root of trust.',
      'Constitutional safety scan detected 0 prompt-injection attack vectors.',
      'Secure signed execution sandbox initialized with zero bypass risk.',
    ],
  },
];

export default function NeuroSpatialPage() {
  const [selectedNode, setSelectedNode] = useState<NeuralNodeData>(NEURAL_NODES[0]);
  const [activeStimulus, setActiveStimulus] = useState<StimulusPreset>(STIMULI[0]);
  const [isPropagating, setIsPropagating] = useState(false);
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(94.2);
  const [tokenRate, setTokenRate] = useState(2420);
  const [copied, setCopied] = useState(false);

  const traceContainerRef = useRef<HTMLDivElement>(null);

  // Real-time jitter for telemetry realism
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergyLevel(parseFloat((93.5 + Math.random() * 1.8).toFixed(1)));
      setTokenRate(Math.floor(2380 + Math.random() * 80));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Trigger Thought Propagation
  const handleTriggerStimulus = (stimulus: StimulusPreset) => {
    setActiveStimulus(stimulus);
    const targetNode = NEURAL_NODES.find((n) => n.id === stimulus.primaryNodeId) || NEURAL_NODES[0];
    setSelectedNode(targetNode);
    setIsPropagating(true);
    setThoughtIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setThoughtIndex(step);
      if (step >= stimulus.thoughtTrace.length) {
        clearInterval(interval);
        setTimeout(() => setIsPropagating(false), 800);
      }
    }, 650);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('npm i @nph-studio/neurospatial');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#040407] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
      {/* Ambient Radial Energy Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-purple-600/15 via-cyan-500/10 to-transparent blur-[160px] pointer-events-none z-0" />
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
              <span className="text-sm font-black tracking-tight uppercase">NeuroSpatial</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 uppercase tracking-wider">
                Hero-002 • 3D Synapse
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {tokenRate} tok/s
              </span>
              <span className="text-zinc-600">|</span>
              <span>Flux: {energyLevel}%</span>
            </div>

            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Build With Us
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH 3D NEURAL SYNAPSE CANVAS */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8">
        {/* Full-Screen 3D Synapse Canvas Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <NeuralSynapseScene
            selectedNodeId={selectedNode.id}
            onSelectNode={(node) => setSelectedNode(node)}
            stimulusActive={isPropagating}
          />
        </div>

        {/* Floating Top Telemetry Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-start justify-between gap-4 pointer-events-none mt-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-auto max-w-sm"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest text-purple-300 mb-3">
              <IconSparkles size={12} />
              Spatial AI Engineering Lab
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[0.9] text-white">
              Neural <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                Synapse 3D
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
              Interactive cognitive topology mapping autonomous agents, vector memory traversals, and multi-step Chain-of-Thought reasoning.
            </p>
          </motion.div>

          {/* Real-time Status Card (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-auto w-full sm:w-80 p-5 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold uppercase tracking-widest text-zinc-400">Node Inspector</span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: selectedNode.color, boxShadow: `0 0 16px ${selectedNode.color}` }}
              />
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-white">{selectedNode.name}</h3>
                <span className="text-[10px] text-zinc-500 font-mono">{selectedNode.category}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              {selectedNode.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono p-3 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <span className="text-zinc-500">Latency:</span>
                <span className="text-white block font-bold">{selectedNode.latency}</span>
              </div>
              <div>
                <span className="text-zinc-500">Dimensions:</span>
                <span className="text-cyan-400 block font-bold">{selectedNode.dim}</span>
              </div>
              <div>
                <span className="text-zinc-500">Throughput:</span>
                <span className="text-white block font-bold">{selectedNode.throughput}</span>
              </div>
              <div>
                <span className="text-zinc-500">Active Tags:</span>
                <span className="text-purple-400 block font-bold">{selectedNode.tags.length} Flags</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedNode.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Interactive Stimulus & Thought Stream Console */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto pt-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-black/70 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                  Inject Stimulus to Fire 3D Synapses:
                </span>
                <div className="flex flex-wrap gap-2">
                  {STIMULI.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleTriggerStimulus(s)}
                      disabled={isPropagating}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                        activeStimulus.id === s.id
                          ? 'bg-white text-black font-black shadow-lg scale-105'
                          : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTriggerStimulus(activeStimulus)}
                  disabled={isPropagating}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
                >
                  <IconPlayerPlay size={14} className={isPropagating ? 'animate-spin' : ''} />
                  <span>{isPropagating ? 'Propagating...' : 'Fire Impulse'}</span>
                </button>
              </div>
            </div>

            {/* Live Streaming Thought Trace Output */}
            <div
              ref={traceContainerRef}
              className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-1.5 min-h-[90px]"
            >
              <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-white/10 pb-1.5 mb-2">
                <span>ACTIVE STIMULUS: {activeStimulus.prompt}</span>
                <span className="text-purple-400">STATE: {isPropagating ? 'PROCESSING (TENSOR STREAM)' : 'SYNCHRONIZED'}</span>
              </div>

              {activeStimulus.thoughtTrace.slice(0, thoughtIndex + 1).map((trace, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2.5 text-zinc-300 leading-relaxed"
                >
                  <span className="text-purple-400 shrink-0">[{i + 1}/4]</span>
                  <span className={i === thoughtIndex && isPropagating ? 'text-white font-bold' : ''}>
                    {trace}
                  </span>
                </motion.div>
              ))}

              {isPropagating && (
                <div className="flex items-center gap-2 text-cyan-400 text-[11px] animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Streaming neural tensor activations...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: APPLIED AI ARCHITECTURE BENTO */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-purple-400">
              <IconBrain size={16} />
              Applied AI Engineering
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-2xl">
              Turnkey AI Infrastructure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Engineered For Startups.
              </span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            At NPH Studio, we don&apos;t just wrap APIs. We architect proprietary RAG systems, multi-agent frameworks, and WebGL cognitive interfaces that scale seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Vector RAG Pipelines */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <IconDatabase size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Hybrid Vector & Lexical RAG</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Combining dense semantic vectors (HNSW) with sparse BM25 indexing and cross-encoder reciprocal rank fusion for zero-hallucination document intelligence.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Index Latency:</span>
                <span className="text-white">45 ms / 10k chunks</span>
              </div>
              <div className="flex justify-between">
                <span>Recall Accuracy:</span>
                <span className="text-cyan-400 font-bold">99.2% NDCG@10</span>
              </div>
            </div>
          </div>

          {/* Card 2: Autonomous Agent Swarms */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <IconBolt size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Multi-Agent Swarm Networks</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Autonomous micro-agents that communicate over typed schemas, resolve edge cases independently, and call external tools with transactional rollback protection.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Agent Concurrency:</span>
                <span className="text-white">64 Parallel Workers</span>
              </div>
              <div className="flex justify-between">
                <span>Schema Validation:</span>
                <span className="text-amber-400 font-bold">Zod Strict Typing</span>
              </div>
            </div>
          </div>

          {/* Card 3: 3D Spatial Interfaces */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <IconWorld size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Spatial 3D AI Visualizers</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Immersive WebGL / Three.js frontends that turn abstract neural operations, embedding clusters, and enterprise knowledge graphs into intuitive interactive landscapes.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Render Engine:</span>
                <span className="text-white">Three.js / WebGL 2.0</span>
              </div>
              <div className="flex justify-between">
                <span>Performance:</span>
                <span className="text-purple-400 font-bold">60-120 FPS Locked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTEGRATION CODE SNIPPET */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-6">
            <IconTerminal2 size={14} className="text-purple-400" />
            Developer SDK Integration
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Embed Spatial AI <span className="text-purple-400">In Minutes</span>.
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            Drop modern 3D neural topologies directly into your Next.js and React applications with a single component import.
          </p>

          <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between font-mono text-xs mb-8">
            <span className="text-zinc-300">npm i @nph-studio/neurospatial</span>
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
                Schedule AI Architecture Sprint
              </button>
            </Magnetic>
            <Magnetic>
              <Link
                href="/lab/hero-001"
                className="px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                View Aurora OS (Hero-001) →
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
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-white">NPH Studio Lab</span>
              <span className="text-xs text-zinc-600 font-mono">/ Experiment #002 (NeuroSpatial)</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              Proprietary interactive exploratory prototypes built by NPH Studio for forward-thinking engineering teams.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <IconArrowLeft size={16} />
              All Experiments
            </Link>
            <Link href="/lab/hero-001" className="text-zinc-400 hover:text-white transition-colors">
              Hero-001 (Aurora OS)
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
