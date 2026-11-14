'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconDna,
  IconSparkles,
  IconPlayerPlay,
  IconCheck,
  IconCopy,
  IconDatabase,
  IconMicroscope,
  IconVaccine,
  IconShieldCheck,
} from '@tabler/icons-react';
import { Magnetic } from '@/components/premium/Magnetic';
import { DNAHelixScene, BasePairInfo } from '@/components/premium/3d/DNAHelixScene';

interface CRISPRProtocol {
  id: string;
  name: string;
  targetGene: string;
  chromosome: string;
  targetIdx: number;
  condition: string;
  action: string;
  beforeSeq: string;
  afterSeq: string;
  fidelity: string;
}

const PROTOCOLS: CRISPRProtocol[] = [
  {
    id: 'brca1',
    name: 'BRCA1 Homology Repair',
    targetGene: 'BRCA1 (DNA Repair Protein)',
    chromosome: 'Chr 17q21.31',
    targetIdx: 14,
    condition: 'Hereditary Oncogenic Double-Strand Defect',
    action: 'Single-Base Transition (c.5266dupC Deletion Repair)',
    beforeSeq: '5\'-G-A-T-C-T-A-3\'',
    afterSeq: '5\'-G-A-T-C-C-A-3\'',
    fidelity: '99.98%',
  },
  {
    id: 'hbb',
    name: 'Sickle Cell HBB Substitution',
    targetGene: 'HBB (Beta-Globin Subunit)',
    chromosome: 'Chr 11p15.4',
    targetIdx: 8,
    condition: 'Sickle Cell Anemia (Val6Glu Missense)',
    action: 'Prime-Editing Correction (GTG -> GAG Adenine Base Swap)',
    beforeSeq: '5\'-C-T-G-A-C-T-3\'',
    afterSeq: '5\'-C-T-G-A-G-T-3\'',
    fidelity: '99.94%',
  },
  {
    id: 'tert',
    name: 'TERT Telomerase Re-Activation',
    targetGene: 'TERT (Telomerase Reverse Transcriptase)',
    chromosome: 'Chr 5p15.33',
    targetIdx: 18,
    condition: 'Replicative Cellular Senescence',
    action: 'Epigenetic Promoter Demethylation Insertion',
    beforeSeq: '5\'-C-C-C-G-G-A-3\'',
    afterSeq: '5\'-C-C-C-T-T-A-3\'',
    fidelity: '99.89%',
  },
  {
    id: 'pcsk9',
    name: 'PCSK9 Exon Inactivation',
    targetGene: 'PCSK9 (LDL Receptor Degradation)',
    chromosome: 'Chr 1p32.3',
    targetIdx: 4,
    condition: 'Hypercholesterolemia Cardiovascular Risk',
    action: 'Targeted Non-Homologous End Joining (NHEJ) Knockout',
    beforeSeq: '5\'-A-T-C-G-G-C-3\'',
    afterSeq: '5\'-A-T-C---G-C-3\'',
    fidelity: '99.97%',
  },
];

export default function GenomeXPage() {
  const [selectedProtocol, setSelectedProtocol] = useState<CRISPRProtocol>(PROTOCOLS[0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editStep, setEditStep] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedBase, setSelectedBase] = useState<BasePairInfo | null>(null);

  // Live Genomics Telemetry Jitter
  const [gcRatio, setGcRatio] = useState<number>(54.2);
  const [meltingTemp, setMeltingTemp] = useState<number>(82.6);

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setGcRatio(parseFloat((53.8 + Math.random() * 0.8).toFixed(1)));
      setMeltingTemp(parseFloat((82.2 + Math.random() * 0.8).toFixed(1)));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const playCellularChime = (frequency = 528) => {
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.8, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const executeCRISPR = () => {
    if (isEditing) return;
    setIsEditing(true);
    setEditStep(1);
    playCellularChime(528);

    setTimeout(() => {
      setEditStep(2);
      playCellularChime(660);
    }, 700);

    setTimeout(() => {
      setEditStep(3);
      playCellularChime(880);
    }, 1400);

    setTimeout(() => {
      setIsEditing(false);
      setEditStep(0);
    }, 2200);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm i @nph-studio/genome-x');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#030508] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Cellular Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-600/15 via-emerald-500/10 to-transparent blur-[160px] pointer-events-none z-0" />
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
              <span className="text-sm font-black tracking-tight uppercase">Genome-X</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                Lab 04 • CRISPR 3D
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PAM: 5&apos;-NGG-3&apos;
              </span>
              <span className="text-zinc-600">|</span>
              <span>GC: {gcRatio}%</span>
              <span className="text-zinc-600">|</span>
              <span>Tm: {meltingTemp}°C</span>
            </div>

            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)]"
              >
                Biotech Inquiries
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH 3D DNA DOUBLE HELIX */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8">
        {/* Full-Screen 3D DNA Canvas Background */}
        <div className="absolute inset-0 z-0">
          <DNAHelixScene
            selectedIdx={selectedBase?.index ?? selectedProtocol.targetIdx}
            targetIdx={selectedProtocol.targetIdx}
            isEditing={isEditing}
            onSelectBase={(bp) => setSelectedBase(bp)}
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
              Lab 04 • CRISPR-Cas9 Molecular Precision
            </div>

            <div className="relative select-none my-1">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white drop-shadow-[0_0_60px_rgba(6,182,212,0.35)]">
                GENOME
              </h1>
              <h1
                className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] text-transparent mix-blend-overlay"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}
              >
                HELIX 3D
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed max-w-md">
              Real-time 3D simulation of molecular base-pair sequencing, Cas9 endonuclease cleavage, and prime-editing homology repair.
            </p>
          </motion.div>

          {/* Real-time Base-Pair / CRISPR Telemetry HUD (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-auto w-full sm:w-80 p-5 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-300">Target Locus</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                {selectedProtocol.chromosome}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-zinc-500 mb-0.5">Target Gene:</div>
                <div className="text-white font-bold text-sm truncate">{selectedProtocol.targetGene}</div>
                <div className="text-[10px] text-cyan-400 mt-1">{selectedProtocol.condition}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block">Wild Sequence:</span>
                  <span className="text-red-400 font-bold">{selectedProtocol.beforeSeq}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block">Edited Target:</span>
                  <span className="text-emerald-400 font-bold">{selectedProtocol.afterSeq}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] pt-1">
                <span className="text-zinc-400">On-Target Fidelity:</span>
                <span className="text-emerald-400 font-bold">{selectedProtocol.fidelity}</span>
              </div>
            </div>

            {/* Sequence Status Bar */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1.5">
                <span>Cas9 Alignment:</span>
                <span className={isEditing ? 'text-red-400 animate-pulse' : 'text-emerald-400'}>
                  {isEditing ? (editStep === 1 ? 'Cleaving Double-Strand...' : editStep === 2 ? 'Annealing Template...' : 'Homology Repair Complete!') : 'Ready (Locus Locked)'}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isEditing ? `${editStep * 33.3}%` : '100%' }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Interactive CRISPR Trigger & Protocol Selector */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto pt-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-black/75 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 shrink-0">
                CRISPR Protocol:
              </span>
              <div className="flex flex-wrap gap-2">
                {PROTOCOLS.map((protocol) => (
                  <button
                    key={protocol.id}
                    onClick={() => {
                      setSelectedProtocol(protocol);
                      setSelectedBase(null);
                    }}
                    disabled={isEditing}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      selectedProtocol.id === protocol.id
                        ? 'bg-white text-black font-black shadow-lg scale-105'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {protocol.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <Magnetic>
                <button
                  onClick={executeCRISPR}
                  disabled={isEditing}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-400 text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  <IconPlayerPlay size={14} className={isEditing ? 'animate-spin' : ''} />
                  <span>{isEditing ? 'Executing Cleavage...' : 'Execute CRISPR'}</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: COMPUTATIONAL BIOLOGY BENTO */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-cyan-400">
              <IconMicroscope size={16} />
              Biotech & Healthcare Engineering
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-2xl">
              Next-Generation Digital Health <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">
                Engineered For Life Sciences.
              </span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            NPH Studio builds production bioinformatics platforms, clinical trial workflow engines, and interactive 3D molecular tools for biotech innovators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <IconDatabase size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Ultra-High-Throughput NGS</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Stream alignment pipelines processing terabytes of whole-genome sequencing (WGS) FASTQ reads into annotated VCF variant calls in minutes.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Alignment Speed:</span>
                <span className="text-white">100 GB in 8.4 mins</span>
              </div>
              <div className="flex justify-between">
                <span>Variant Precision:</span>
                <span className="text-cyan-400 font-bold">99.998% F1 Score</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <IconDna size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">3D AlphaFold Molecular Docking</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Interactive WebGL viewers displaying structural protein-ligand binding pockets, electrostatic potential meshes, and binding affinity predictions.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Docking Time:</span>
                <span className="text-white">0.32 s / Ligand</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Fidelity:</span>
                <span className="text-emerald-400 font-bold">Raymarched Atoms</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6">
              <IconShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">HIPAA & SOC 2 Compliance</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Zero-knowledge encrypted genomic data pipelines built with tenant isolation, audit logging, and FDA Part 11 regulatory compliance.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Encryption:</span>
                <span className="text-white">AES-256-GCM + Kyber</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Logs:</span>
                <span className="text-teal-400 font-bold">Immutable Ledger</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: BIOTECH SDK & INQUIRY */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-6">
            <IconVaccine size={14} className="text-cyan-400" />
            Biotech Engineering & MVP Acceleration
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Build Modern <span className="text-cyan-400">Bio-Informatics</span> Apps.
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
            From genomic sequence analysis dashboards to AI-powered medical diagnostic MVPs, we turn complex scientific IP into intuitive digital products.
          </p>

          <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between font-mono text-xs mb-8">
            <span className="text-zinc-300">npm i @nph-studio/genome-x</span>
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
                Schedule Biotech Consultation
              </button>
            </Magnetic>
            <Magnetic>
              <Link
                href="/lab/hero-003"
                className="px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                View Chroma Fluid (Lab 03) →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LAB VAULT FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020306] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-white">NPH Studio Lab</span>
              <span className="text-xs text-zinc-600 font-mono">/ Experiment #004 (Genome-X DNA)</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              Exploring cutting-edge bioinformatics visualizers, 3D molecular simulation, and CRISPR gene editing UX.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <IconArrowLeft size={16} />
              All Experiments
            </Link>
            <Link href="/lab/hero-003" className="text-zinc-400 hover:text-white transition-colors">
              Chroma Fluid (Lab 03)
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
