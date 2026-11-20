'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
  IconAdjustments,
  IconVolume,
  IconVolumeOff,
  IconCode,
  IconDatabase,
  IconBrain,
  IconRocket,
  IconDeviceDesktopAnalytics,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
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

function CodeHighlighter({ code }: { code: string }) {
  const lines = code.trim().split('\n');

  return (
    <div className="font-mono select-text py-2">
      {lines.map((line, idx) => {
        const lineNum = String(idx + 1).padStart(2, '0');
        const trimmed = line.trimStart();

        // Full line comment
        if (trimmed.startsWith('//')) {
          const indent = line.slice(0, line.indexOf('/'));
          return (
            <div key={idx} className="flex hover:bg-white/[0.04] px-3 sm:px-6 py-0.5 rounded transition-colors group">
              <span className="w-6 sm:w-8 shrink-0 text-right pr-3 sm:pr-4 text-zinc-600 select-none text-[11px] font-mono group-hover:text-zinc-400">
                {lineNum}
              </span>
              <span className="text-zinc-500 italic whitespace-pre text-[11.5px] sm:text-xs">
                {indent}{trimmed}
              </span>
            </div>
          );
        }

        // Inline comment
        const commentIdx = line.indexOf('//');
        const codeText = commentIdx !== -1 ? line.slice(0, commentIdx) : line;
        const commentText = commentIdx !== -1 ? line.slice(commentIdx) : '';

        // Tokenize
        const tokens = codeText.split(
          /('(?:\\'|[^'])*'|"(?:\\"|[^"])*"|`(?:\\`|[^`])*`|\b(?:precision|highp|uniform|float|vec2|vec3|vec4|mat3|mat4|void|return|import|export|from|async|await|const|let|var|function|type|interface|as|default|true|false|in|out|#version|es)\b|\b(?:Request|Response|Promise|Canvas|MeshDistortMaterial|Sphere|Float|SupabaseVectorStore|streamText|THREE|MathUtils|SpotLight|Mesh)\b|\b(?:snoise3D|normalize|cross|dFdx|dFdy|sin|cos|generateVectorEmbedding|toDataStreamResponse|json|hybridSearch|POST|clamp|lerp|dot|floor)\b|\b(?:gl_Position|projectionMatrix|modelViewMatrix|normalMatrix|uTime|uDistort|uSpeed|vNormal|position|normal|displacement|req|query|userSession|embedding|contextChunks)\b|\b\d+(?:\.\d+)?f?\b|[{}()[\];,]|(?:===|==|=>|=|\+|-|\*|\/|>|<|&|\|))/g
        );

        return (
          <div key={idx} className="flex hover:bg-white/[0.04] px-3 sm:px-6 py-0.5 rounded transition-colors group">
            <span className="w-6 sm:w-8 shrink-0 text-right pr-3 sm:pr-4 text-zinc-600 select-none text-[11px] font-mono group-hover:text-zinc-400">
              {lineNum}
            </span>
            <span className="whitespace-pre text-[11.5px] sm:text-xs leading-relaxed">
              {tokens.map((token, tokIdx) => {
                if (!token) return null;
                // String
                if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
                  return <span key={tokIdx} className="text-emerald-300 font-medium">{token}</span>;
                }
                // Keywords & Directives
                if (/^(?:precision|highp|uniform|float|vec2|vec3|vec4|mat3|mat4|void|return|import|export|from|async|await|const|let|var|function|type|interface|as|default|true|false|in|out|#version|es)$/.test(token)) {
                  return <span key={tokIdx} className="text-purple-400 font-semibold">{token}</span>;
                }
                // Types & Classes
                if (/^(?:Request|Response|Promise|Canvas|MeshDistortMaterial|Sphere|Float|SupabaseVectorStore|streamText|THREE|MathUtils|SpotLight|Mesh)$/.test(token)) {
                  return <span key={tokIdx} className="text-yellow-300 font-bold">{token}</span>;
                }
                // Functions
                if (/^(?:snoise3D|normalize|cross|dFdx|dFdy|sin|cos|generateVectorEmbedding|toDataStreamResponse|json|hybridSearch|POST|clamp|lerp|dot|floor)$/.test(token)) {
                  return <span key={tokIdx} className="text-cyan-400 font-medium">{token}</span>;
                }
                // Builtin Variables
                if (/^(?:gl_Position|projectionMatrix|modelViewMatrix|normalMatrix|uTime|uDistort|uSpeed|vNormal|position|normal|displacement|req|query|userSession|embedding|contextChunks)$/.test(token)) {
                  return <span key={tokIdx} className="text-blue-300 font-medium">{token}</span>;
                }
                // Numbers
                if (/^\d+(\.\d+)?f?$/.test(token)) {
                  return <span key={tokIdx} className="text-amber-400 font-mono">{token}</span>;
                }
                // Operators
                if (/^(?:===|==|=>|=|\+|-|\*|\/|>|<|&|\|)$/.test(token)) {
                  return <span key={tokIdx} className="text-pink-400 font-bold">{token}</span>;
                }
                // Punctuation
                if (/^[{}()[\];,]$/.test(token)) {
                  return <span key={tokIdx} className="text-zinc-500">{token}</span>;
                }
                // Default identifier
                return <span key={tokIdx} className="text-zinc-200">{token}</span>;
              })}
              {commentText && <span className="text-zinc-500 italic pl-2">{commentText}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AuroraOSPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  // Interactivity States
  const [activePalette, setActivePalette] = useState<PaletteKey>('emerald');
  const [isBooted, setIsBooted] = useState(false);
  const [bootingProgress, setBootingProgress] = useState(0);
  const [isBooting, setIsBooting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [fps, setFps] = useState(60);
  const [neuralLatency, setNeuralLatency] = useState(0.38);
  const [benchmarking, setBenchmarking] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(100);

  // Video Presenter Mode & Audio
  const [presenterMode, setPresenterMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showControlsDrawer, setShowControlsDrawer] = useState(true);

  // Live 3D Orb Tweaker Knobs
  const [distort, setDistort] = useState(0.5);
  const [speed, setSpeed] = useState(2.0);
  const [wireframeOpacity, setWireframeOpacity] = useState(0.3);
  const [showWireframe, setShowWireframe] = useState(true);
  const [sphereScale, setSphereScale] = useState(1.8);
  const [pulseTrigger, setPulseTrigger] = useState(0);

  // Code Tab state
  const [activeCodeTab, setActiveCodeTab] = useState<'shader' | 'rag' | 'r3f'>('shader');
  const [codeCopied, setCodeCopied] = useState(false);
  const [isCompilingShader, setIsCompilingShader] = useState(false);
  const [compileStatus, setCompileStatus] = useState('✓ Compiled in 0.04ms (WebGPU / WebGL 2.0)');

  // RAG Simulator State
  const [ragQuery, setRagQuery] = useState('How does NPH Studio build sub-millisecond AI RAG pipelines?');
  const [ragStreaming, setRagStreaming] = useState(false);
  const [ragResult, setRagResult] = useState<string | null>(null);
  const [ragMetrics, setRagMetrics] = useState<{ latency: number; tokens: number; score: number } | null>(null);

  // Cyber Audio Synthesizer (pure client-side Web Audio API)
  const playCyberSound = useCallback((freq = 880, type: OscillatorType = 'sine', duration = 0.08) => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted yet
    }
  }, [audioEnabled]);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([
    { type: 'output', text: 'AURORA MICRO-KERNEL v2.4.9-spatial [Kyber-1024 Locked]' },
    { type: 'output', text: 'NPH Studio Lab Vault • Video Demonstration Environment' },
    { type: 'output', text: 'Type "help", "nph", "shader", or "rag" to inspect active subsystems.' },
  ]);

  const palette = useMemo(() => PALETTES[activePalette], [activePalette]);

  // Live Telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 2.2));
      setNeuralLatency(parseFloat((0.35 + Math.random() * 0.08).toFixed(2)));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  // System Boot Sequence
  const handleBoot = () => {
    if (isBooted) return;
    playCyberSound(440, 'sawtooth', 0.15);
    setIsBooting(true);
    setBootingProgress(0);

    const interval = setInterval(() => {
      setBootingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBooting(false);
          setIsBooted(true);
          playCyberSound(880, 'sine', 0.25);
          setPulseTrigger((c) => c + 1);
          setTerminalHistory((curr) => [
            ...curr,
            { type: 'cmd', text: 'aurora --initialize-kernel' },
            { type: 'success', text: '⚡ KERNEL BOOTSTRAP COMPLETE: 128 Spatial Shards Online' },
            { type: 'success', text: '✓ Neural IPC Bus: 0.38ms | Memory Allocator: Zero-Copy Active' },
            { type: 'success', text: '✓ NPH Studio WebGL Engine: Hardware Synced @ 60 FPS' },
          ]);
          return 100;
        }
        playCyberSound(300 + prev * 5, 'triangle', 0.05);
        return prev + 20;
      });
    }, 180);
  };

  // Shockwave trigger
  const triggerShockwave = () => {
    playCyberSound(520, 'sawtooth', 0.2);
    setPulseTrigger((prev) => prev + 1);
  };

  // Terminal execution
  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playCyberSound(740, 'sine', 0.06);
    const newEntries: TerminalEntry[] = [{ type: 'cmd', text: rawCmd }];

    switch (cmd) {
      case 'help':
        newEntries.push(
          { type: 'output', text: 'AVAILABLE COMMANDS:' },
          { type: 'output', text: '  nph          - Display NPH Studio agency capabilities, stack & contact' },
          { type: 'output', text: '  shader       - Print the GLSL vertex simplex noise shader code' },
          { type: 'output', text: '  rag          - Execute live vector search & context synthesis pipeline' },
          { type: 'output', text: '  status       - Inspect kernel telemetry, memory & thread map' },
          { type: 'output', text: '  benchmark    - Measure spatial IPC throughput vs monolithic kernels' },
          { type: 'output', text: '  neofetch     - Display ASCII hardware architecture specs' },
          { type: 'output', text: '  agents       - Enumerate active autonomous runtime micro-agents' },
          { type: 'output', text: '  boot         - Re-initialize cold kernel boot sequence' },
          { type: 'output', text: '  clear        - Reset terminal console screen' }
        );
        break;
      case 'nph':
        newEntries.push(
          { type: 'success', text: '╔═══════════════════════════════════════════════════════════╗' },
          { type: 'success', text: '║                    NPH STUDIO AGENCY                      ║' },
          { type: 'success', text: '║     Full-Stack Web Development • 3D Design • AI/RAG       ║' },
          { type: 'success', text: '╚═══════════════════════════════════════════════════════════╝' },
          { type: 'output', text: '  Domain     : https://www.nph-studio.in' },
          { type: 'output', text: '  Stack      : Next.js 16, React 19, Three.js, R3F, GLSL, Supabase' },
          { type: 'output', text: '  Specialty  : 60 FPS Immersive 3D Web, SaaS MVPs, Custom RAG Systems' },
          { type: 'output', text: '  Contact    : team@nph-studio.in | WhatsApp: +91 87872 05784' }
        );
        break;
      case 'shader':
        newEntries.push(
          { type: 'success', text: '// GLSL SIMPLEX NOISE VERTEX DEFORMATION' },
          { type: 'output', text: 'vec3 distorted = position + normal * snoise(position * 2.4 + time * speed) * distort;' },
          { type: 'output', text: 'gl_Position = projectionMatrix * modelViewMatrix * vec4(distorted, 1.0);' },
          { type: 'output', text: 'vNormal = normalize(normalMatrix * normal);' },
          { type: 'success', text: '✓ 128x128 Subdivisions Compiled: 0.04ms GPU dispatch' }
        );
        break;
      case 'rag':
        newEntries.push(
          { type: 'output', text: 'Executing Vector Query: "NPH Studio Architecture"' },
          { type: 'output', text: '  Embedding    : text-embedding-3-small (1536 dim)' },
          { type: 'output', text: '  Cosine Sim   : 0.9842 (Match: /docs/architecture/micro-kernel.md)' },
          { type: 'success', text: '✓ Generated Context Chunk: 840 tokens in 14.2ms' },
          { type: 'success', text: '✓ Inference Stream: 120 tok/sec through edge WebAssembly runner' }
        );
        break;
      case 'status':
        newEntries.push(
          { type: 'success', text: `SYSTEM STATUS: ${isBooted ? 'OPTIMAL (ONLINE)' : 'STANDBY'}` },
          { type: 'output', text: `  Active Palette : ${palette.name}` },
          { type: 'output', text: `  Neural Latency : ${neuralLatency} ms (Zero-jitter)` },
          { type: 'output', text: `  Framerate      : ${fps} FPS (Hardware sync)` },
          { type: 'output', text: `  Distortion     : ${distort} | Speed: ${speed}x` },
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
          { type: 'output', text: '         /\\         OS: Aurora OS 2.4-spatial (NPH Studio)' },
          { type: 'output', text: '        /  \\        Kernel: Aurora Microkernel 2.4.9-kyber' },
          { type: 'output', text: '       / /\\ \\       Uptime: 99.999% Spatial Telemetry' },
          { type: 'output', text: '      / ____ \\      Display: Three.js WebGL 2.0 / WebGPU' },
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
          text: `Command not recognized: "${rawCmd}". Type "help" or "nph" for available options.`,
        });
    }

    setTerminalHistory((prev) => [...prev, ...newEntries]);
    setTerminalInput('');

    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleCopyInstall = () => {
    playCyberSound(900, 'sine', 0.1);
    navigator.clipboard.writeText('curl -fsSL https://aurora.nph-studio.in/install.sh | bash');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    playCyberSound(900, 'sine', 0.1);
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleRecompile = () => {
    setIsCompilingShader(true);
    playCyberSound(720, 'sawtooth', 0.12);
    setPulseTrigger((prev) => prev + 1);
    setTimeout(() => {
      setIsCompilingShader(false);
      setCompileStatus('✓ Compiled in 0.038ms (32,768 Vertices Saturation)');
      playCyberSound(960, 'sine', 0.15);
    }, 400);
  };

  const triggerBenchmarkSweep = () => {
    playCyberSound(600, 'triangle', 0.15);
    setBenchmarking(true);
    setBenchmarkProgress(15);
    setTimeout(() => setBenchmarkProgress(65), 350);
    setTimeout(() => {
      setBenchmarkProgress(100);
      setBenchmarking(false);
      playCyberSound(880, 'sine', 0.2);
    }, 850);
  };

  // Live RAG Simulator execution
  const runRagSimulation = () => {
    playCyberSound(680, 'sawtooth', 0.12);
    setRagStreaming(true);
    setRagResult('');
    setRagMetrics(null);

    const fullText =
      'NPH Studio builds high-throughput AI RAG architectures combining pgvector embeddings with sub-millisecond edge reranking. By co-locating semantic caching with WebAssembly neural execution, context retrieval drops to under 18ms, preventing hallucination while streaming tokens directly into Next.js React 19 Server Components.';

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 6;
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
        setRagResult(fullText);
        setRagStreaming(false);
        setRagMetrics({ latency: 14.8, tokens: 68, score: 0.984 });
        playCyberSound(1020, 'sine', 0.15);
      } else {
        setRagResult(fullText.slice(0, currentIndex));
      }
    }, 25);
  };

  // Code snippets for the Code Viewer
  const CODE_SNIPPETS = {
    shader: `// GLSL Mesh Distortion Shader - NPH Studio 3D Lab
precision highp float;
uniform float uTime;
uniform float uDistort;
uniform float uSpeed;

// Classical 3D Simplex Noise algorithm
vec3 snoise3D(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  // Simplex lattice coordinate transformation...
  return normalize(cross(dFdx(v), dFdy(v)));
}

void main() {
  vec3 pos = position;
  float displacement = sin(pos.y * 3.0 + uTime * uSpeed) *
                       cos(pos.x * 2.5 + uTime * uSpeed) * uDistort;
  pos += normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,
    rag: `// Multi-Modal RAG Semantic Pipeline - NPH Studio Engineering
import { SupabaseVectorStore } from '@nph-studio/vector-core';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { query, userSession } = await req.json();

  // 1. Generate Sub-10ms Dense Vector Embedding
  const embedding = await generateVectorEmbedding(query, {
    model: 'text-embedding-3-small',
    dimensions: 1536
  });

  // 2. High-Precision Cosine Similarity Match
  const contextChunks = await SupabaseVectorStore.hybridSearch({
    vector: embedding,
    matchThreshold: 0.88,
    limit: 6
  });

  // 3. Low-Latency Token Streaming via React 19 Server Actions
  return streamText({
    model: 'claude-3-5-sonnet',
    system: \`Enterprise RAG Context:\\n\${contextChunks.join('\\n')}\`,
    prompt: query
  }).toDataStreamResponse();
}`,
    r3f: `// React Three Fiber Scene Setup - NPH Studio WebGL Lab
import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';

export function ImmersiveHeroSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} intensity={5} color="#10B981" />
      <Float speed={2} rotationIntensity={0.5}>
        <Sphere args={[1, 128, 128]} scale={1.8}>
          <MeshDistortMaterial
            color="#064e3b"
            distort={0.55}
            speed={2.2}
            metalness={1.0}
            roughness={0.1}
            clearcoat={1.0}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}`,
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#040404] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b ${palette.glowClass} blur-[160px] pointer-events-none z-0 transition-all duration-1000 opacity-70`}
      />

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      {/* ========================================================================= */}
      {/* VIDEO PRESENTER / TOP STUDIO NAVBAR */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3.5 backdrop-blur-2xl bg-black/50 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Back to Lab Vault + Agency Watermark */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/lab"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <IconArrowLeft size={16} />
              </div>
              <span className="hidden sm:inline font-mono">Vault</span>
            </Link>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <a href="#hero" className="hover:text-white transition-colors">3D Orb</a>
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#rag-demo" className="hover:text-white transition-colors">AI & RAG</a>
            <a href="#terminal" className="hover:text-white transition-colors">Terminal</a>
            <a href="#code" className="hover:text-white transition-colors">Code</a>
          </nav>

          {/* Right: Studio Controls (Audio, Telemetry, Clean Mode, Book Studio) */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                if (!audioEnabled) playCyberSound(800, 'sine', 0.1);
              }}
              title={audioEnabled ? 'Sound Effects Active' : 'Sound Effects Muted'}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors"
            >
              {audioEnabled ? <IconVolume size={16} className="text-emerald-400" /> : <IconVolumeOff size={16} />}
            </button>

            {/* Presenter / Clean Mode Toggle */}
            <button
              onClick={() => {
                playCyberSound(650, 'sine', 0.08);
                setPresenterMode(!presenterMode);
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold transition-all ${
                presenterMode
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <IconDeviceDesktopAnalytics size={14} />
              <span>{presenterMode ? 'Presenter: ON' : 'Presenter View'}</span>
            </button>

            {/* Live Telemetry Pill */}
            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {fps} FPS
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{neuralLatency}ms</span>
            </div>

            {/* Quick Boot CTA */}
            <button
              onClick={handleBoot}
              disabled={isBooted || isBooting}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
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
                  <span className="hidden sm:inline">Active</span>
                </>
              ) : isBooting ? (
                <>
                  <IconRefresh size={14} className="animate-spin" />
                  <span>{bootingProgress}%</span>
                </>
              ) : (
                <>
                  <IconBolt size={14} />
                  <span>Boot</span>
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
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">3D Orb Hero</a>
              <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Studio Capabilities</a>
              <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Architecture</a>
              <a href="#rag-demo" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">AI & RAG Simulator</a>
              <a href="#terminal" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Interactive Terminal</a>
              <a href="#code" onClick={() => setMobileMenuOpen(false)} className="py-1 text-zinc-300 hover:text-white">Source Code</a>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="block text-center w-full py-2.5 rounded-xl bg-white text-black font-black uppercase text-xs"
                >
                  Hire NPH Studio
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH WEBGL 3D LIQUID ORB & REAL-TIME SHADER MATRIX */}
      {/* ========================================================================= */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
        {/* Interactive 3D WebGL Liquid Aurora Orb */}
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-90 pointer-events-auto">
          <LiquidAurora
            baseColor={palette.baseColor}
            wireframeColor={palette.wireframeColor}
            lightColor={palette.lightColor}
            distort={distort}
            speed={speed}
            wireframeOpacity={wireframeOpacity}
            showWireframe={showWireframe}
            sphereScale={sphereScale}
            pulseTrigger={pulseTrigger}
          />
        </div>

        {/* HUD: Left Side Telemetry Card (Hidden in Clean Presenter Mode) */}
        {!presenterMode && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-28 left-6 lg:left-12 z-20 hidden lg:flex flex-col gap-3 w-64 pointer-events-none"
          >
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-[10px] font-black uppercase tracking-widest ${palette.textAccentClass}`}>
                  Spatial Telemetry
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
                <span>GPU: WebGL 2.0</span>
                <span>{fps} FPS Lock</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-2.5 mb-2">
                <IconBrain size={16} className={palette.textAccentClass} />
                <span className="text-xs font-bold uppercase tracking-wide">NPH AI Engine</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                Real-time sub-millisecond vector indexing connected to spatial 3D state.
              </p>
            </div>
          </motion.div>
        )}

        {/* HUD: Right Side LIVE 3D SHADER & PHYSICS CONTROLLER (Awesome for Screen Recording!) */}
        {!presenterMode && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-28 right-6 lg:right-12 z-20 hidden lg:flex flex-col gap-3 w-72 pointer-events-auto"
          >
            <div className="p-5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IconAdjustments size={16} className={palette.textAccentClass} />
                  <span className="text-xs font-black uppercase tracking-wider">3D Shader Matrix</span>
                </div>
                <button
                  onClick={() => setShowControlsDrawer(!showControlsDrawer)}
                  className="text-[10px] font-mono text-zinc-400 hover:text-white"
                >
                  {showControlsDrawer ? 'Hide' : 'Expand'}
                </button>
              </div>

              {showControlsDrawer && (
                <div className="space-y-3.5 text-xs">
                  {/* Distortion Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400">
                      <span>Distortion:</span>
                      <span className="text-white font-bold">{distort.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={0.95}
                      step={0.05}
                      value={distort}
                      onChange={(e) => {
                        setDistort(parseFloat(e.target.value));
                        playCyberSound(400 + parseFloat(e.target.value) * 300, 'sine', 0.02);
                      }}
                      className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Speed Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400">
                      <span>Wave Speed:</span>
                      <span className="text-white font-bold">{speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={4.0}
                      step={0.25}
                      value={speed}
                      onChange={(e) => {
                        setSpeed(parseFloat(e.target.value));
                        playCyberSound(500 + parseFloat(e.target.value) * 100, 'sine', 0.02);
                      }}
                      className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Wireframe Opacity */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400">
                      <span>Wireframe Mesh:</span>
                      <span className="text-white font-bold">{showWireframe ? `${Math.round(wireframeOpacity * 100)}%` : 'OFF'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={0.9}
                        step={0.1}
                        value={wireframeOpacity}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setWireframeOpacity(val);
                          setShowWireframe(val > 0.05);
                        }}
                        className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Scale */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400">
                      <span>Orb Scale:</span>
                      <span className="text-white font-bold">{sphereScale.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={1.2}
                      max={2.4}
                      step={0.1}
                      value={sphereScale}
                      onChange={(e) => setSphereScale(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Warp Disruption Button */}
                  <div className="pt-2">
                    <button
                      onClick={triggerShockwave}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
                    >
                      <IconSparkles size={14} className={palette.textAccentClass} />
                      <span>⚡ Warp Shockwave</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

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
              NPH Studio Lab • 3D WebGL & AI Architecture
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
            className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed mt-4 px-4"
          >
            A high-concurrency spatial computing interface powered by Three.js WebGL shaders and autonomous AI micro-agents. Crafted by <strong className="text-white">NPH Studio</strong> for enterprise products.
          </motion.p>

          {/* Color Palette Switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 mt-8 p-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl pointer-events-auto shadow-2xl"
          >
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest pl-3 pr-1">Orb Shader:</span>
            {(['emerald', 'cyan', 'violet', 'amber'] as PaletteKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  playCyberSound(600, 'sine', 0.05);
                  setActivePalette(key);
                }}
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
                <span>{isBooted ? 'Kernel Online (128 Shards)' : isBooting ? `Booting (${bootingProgress}%)` : 'Initialize Kernel'}</span>
                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="#rag-demo"
                className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.06] border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md"
              >
                <IconBrain size={18} className={palette.textAccentClass} />
                <span>Test AI Pipeline</span>
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#terminal"
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-md"
              >
                <IconTerminal2 size={18} />
                <span>Shell</span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#capabilities"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 hover:opacity-100 transition-opacity z-20 cursor-pointer"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore System</span>
          <IconChevronDown size={16} className="animate-bounce" />
        </motion.a>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: NPH STUDIO CAPABILITIES (WHY CLIENTS HIRE US) */}
      {/* ========================================================================= */}
      <section id="capabilities" className="relative z-10 py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-zinc-400">
              <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
              Engineering Pillars
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-2xl">
              What We Build At <span className={palette.textAccentClass}>NPH Studio</span>.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            We architect production-grade software that bridges cinematic 3D graphics, low-latency AI pipelines, and ultra-scalable web platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3D Design & WebGL */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${palette.glowClass} blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <IconSparkles size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">3D Design & WebGL</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Hardware-accelerated Three.js, React Three Fiber, and custom GLSL shaders running smoothly at 60 FPS across desktop and mobile.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex justify-between">
                <span>Shaders:</span>
                <span className="text-white">GLSL / WebGPU</span>
              </div>
              <div className="flex justify-between">
                <span>Render Target:</span>
                <span className="text-emerald-400">60 FPS Hardware Sync</span>
              </div>
            </div>
          </div>

          {/* Card 2: AI & RAG Engineering */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${palette.glowClass} blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-6">
                <IconBrain size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">AI & RAG Systems</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Enterprise retrieval-augmented generation pipelines, vector similarity indexing with pgvector, and low-latency autonomous LLM micro-agents.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex justify-between">
                <span>Retrieval:</span>
                <span className="text-white">Sub-18ms Semantic Latency</span>
              </div>
              <div className="flex justify-between">
                <span>Store:</span>
                <span className="text-cyan-400">Supabase pgvector / Pinecone</span>
              </div>
            </div>
          </div>

          {/* Card 3: Next.js & Full-Stack Apps */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-between">
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${palette.glowClass} blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 mb-6">
                <IconRocket size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">Full-Stack Web Dev</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Production-grade Next.js App Router applications, SaaS MVPs, and ultra-high-converting marketing landing pages with buttery smooth UX.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex justify-between">
                <span>Core:</span>
                <span className="text-white">Next.js 16 + React 19</span>
              </div>
              <div className="flex justify-between">
                <span>Performance:</span>
                <span className="text-purple-400">100/100 Lighthouse Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE AI & RAG SEMANTIC RETRIEVAL SIMULATOR */}
      {/* ========================================================================= */}
      <section id="rag-demo" className="relative z-10 py-24 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-3">
            <IconBrain size={14} className={palette.textAccentClass} />
            Live Retrieval-Augmented Generation (RAG)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Test Our <span className={palette.textAccentClass}>Sub-Millisecond RAG</span> Engine.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-2">
            Watch real-time vector embeddings, cosine similarity ranking, and streaming context retrieval execute live.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#090909] border border-white/15 backdrop-blur-2xl shadow-2xl">
          {/* Query Selection Bar */}
          <div className="mb-6">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2 font-bold">
              Select or Enter Vector Query:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={runRagSimulation}
                disabled={ragStreaming}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shrink-0 cursor-pointer"
              >
                {ragStreaming ? (
                  <>
                    <IconRefresh size={14} className="animate-spin" />
                    <span>Indexing...</span>
                  </>
                ) : (
                  <>
                    <IconPlayerPlay size={14} />
                    <span>Run Query</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Query Pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-[10px] font-mono text-zinc-500 self-center">Presets:</span>
              {[
                'How does Aurora micro-kernel isolate memory?',
                'What are NPH Studio core development services?',
                'What is the cold startup latency of WebGL shaders?',
              ].map((preset, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setRagQuery(preset);
                    playCyberSound(500, 'sine', 0.04);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  &quot;{preset.slice(0, 36)}...&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Streaming Output Box */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 min-h-[160px] font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] text-zinc-500 pb-3 mb-3 border-b border-white/5">
                <span className="flex items-center gap-2">
                  <IconDatabase size={12} className="text-emerald-400" />
                  <span>EMBEDDING: text-embedding-3-small (1536 dim)</span>
                </span>
                <span className="text-emerald-400 font-bold">
                  {ragStreaming ? '● STREAMING CHUNKS' : ragResult ? '✓ RETRIEVAL VERIFIED' : 'READY'}
                </span>
              </div>

              <div className="text-zinc-300 leading-relaxed min-h-[60px]">
                {ragResult ? (
                  <span>
                    {ragResult}
                    {ragStreaming && <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />}
                  </span>
                ) : (
                  <span className="text-zinc-600 italic">Click &quot;Run Query&quot; to inspect streaming RAG vector synthesis...</span>
                )}
              </div>
            </div>

            {/* Metrics Footer */}
            {ragMetrics && (
              <div className="pt-3 mt-3 border-t border-white/5 flex flex-wrap justify-between text-[10px] text-zinc-400">
                <span>Latency: <strong className="text-emerald-400">{ragMetrics.latency} ms</strong></span>
                <span>Tokens Generated: <strong className="text-white">{ragMetrics.tokens}</strong></span>
                <span>Cosine Similarity: <strong className="text-cyan-400">{ragMetrics.score}</strong></span>
                <span>Context Isolation: <strong className="text-purple-400">Enclave Pass</strong></span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: SPATIAL ARCHITECTURE BENTO GRID */}
      {/* ========================================================================= */}
      <section id="architecture" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-zinc-400">
              <span className={`w-2 h-2 rounded-full ${palette.accentClass}`} />
              Hardware Infrastructure
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
                  <IconShieldLock size={24} />
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
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Autonomous Micro-Agents</h3>
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
      {/* SECTION 4: INTERACTIVE CYBERPUNK TERMINAL */}
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
            {['nph', 'shader', 'rag', 'status', 'benchmark', 'neofetch', 'agents', 'clear'].map((cmd) => (
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
              placeholder='Type "help", "nph", "shader", or "rag"...'
              className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
            >
              Run ↵
            </button>
          </form>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: LIVE SOURCE CODE & SHADER INSPECTOR (STUDIO IDE) */}
      {/* ========================================================================= */}
      <section id="code" className="relative z-10 py-28 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/10">
        {/* Ambient Glow behind code */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r ${palette.glowClass} blur-[160px] pointer-events-none opacity-40`} />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest mb-3 text-zinc-400">
              <IconCode size={16} className={palette.textAccentClass} />
              Open Architectural Source
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Under The Hood of <span className={`${palette.textAccentClass} whitespace-nowrap`}>Hero-001</span>.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed font-sans">
            Production algorithms driving our WebGL mesh physics and edge vector retrieval systems.
          </p>
        </div>

        {/* Ultra-Premium Glass IDE Window */}
        <div className="relative z-10 rounded-3xl p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
          <div className="rounded-[23px] bg-[#070709]/95 backdrop-blur-2xl overflow-hidden font-mono text-xs border border-white/5">
            {/* macOS Top Header Bar */}
            <div className="px-5 py-4 bg-white/[0.04] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              {/* Left: Window Controls + Breadcrumb */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-sm inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-sm inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-sm inline-block" />
                </div>

                <span className="h-4 w-px bg-white/15 hidden sm:inline" />

                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                  <span className="text-zinc-600">nph-studio</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-500">lab</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-500">
                    {activeCodeTab === 'shader' ? 'shaders' : activeCodeTab === 'rag' ? 'ai' : '3d'}
                  </span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-white font-bold">
                    {activeCodeTab === 'shader' ? 'AuroraDistort.glsl' : activeCodeTab === 'rag' ? 'AgentRAGPipeline.ts' : 'WebGLScene.tsx'}
                  </span>
                </div>
              </div>

              {/* Right: Actions (Compile / Test + Copy Code) */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleRecompile}
                  disabled={isCompilingShader}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <IconRefresh size={13} className={isCompilingShader ? 'animate-spin text-emerald-400' : 'text-zinc-400'} />
                  <span>{isCompilingShader ? 'Compiling...' : 'Compile Shader'}</span>
                </button>

                <button
                  onClick={() => handleCopyCode(CODE_SNIPPETS[activeCodeTab])}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-[11px] font-sans font-bold transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  {codeCopied ? (
                    <>
                      <IconCheck size={14} className="text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy size={14} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Editor Tabs Navigation */}
            <div className="px-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between overflow-x-auto">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    playCyberSound(500, 'sine', 0.04);
                    setActiveCodeTab('shader');
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-mono transition-all border-b-2 cursor-pointer ${
                    activeCodeTab === 'shader'
                      ? 'border-emerald-400 text-white font-bold bg-white/[0.04]'
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>AuroraDistort.glsl</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    GLSL 3.0 ES
                  </span>
                </button>

                <button
                  onClick={() => {
                    playCyberSound(500, 'sine', 0.04);
                    setActiveCodeTab('rag');
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-mono transition-all border-b-2 cursor-pointer ${
                    activeCodeTab === 'rag'
                      ? 'border-cyan-400 text-white font-bold bg-white/[0.04]'
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>AgentRAGPipeline.ts</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    TypeScript
                  </span>
                </button>

                <button
                  onClick={() => {
                    playCyberSound(500, 'sine', 0.04);
                    setActiveCodeTab('r3f');
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-mono transition-all border-b-2 cursor-pointer ${
                    activeCodeTab === 'r3f'
                      ? 'border-purple-400 text-white font-bold bg-white/[0.04]'
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>WebGLScene.tsx</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    React 19 / R3F
                  </span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-zinc-500 pr-2">
                <span>Format: ES Modules</span>
                <span>•</span>
                <span>Zero-Latency Stream</span>
              </div>
            </div>

            {/* High-End Syntax Highlighted Code Body */}
            <div className="p-4 sm:p-6 bg-[#040406] overflow-x-auto select-text min-h-[340px] max-h-[520px] overflow-y-auto">
              <CodeHighlighter code={CODE_SNIPPETS[activeCodeTab]} />
            </div>

            {/* Status Bar at Bottom (VS Code / Xcode Style) */}
            <div className="px-5 py-2.5 bg-white/[0.03] border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {compileStatus}
                </span>
              </div>

              <div className="flex items-center gap-4 text-zinc-400">
                <span>Target: {activeCodeTab === 'shader' ? 'WebGL 2.0 / WebGPU' : activeCodeTab === 'rag' ? 'Supabase pgvector' : 'React 19 Server/Client'}</span>
                <span>•</span>
                <span>UTF-8</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">100% Type-Safe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PERFORMANCE BENCHMARKS VS TRADITIONAL OS */}
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
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
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
      {/* SECTION 7: DEPLOYMENT & QUICK INSTALL */}
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-sans font-bold transition-all shrink-0 cursor-pointer"
            >
              {copiedInstall ? (
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
      {/* SECTION 8: HIRE NPH STUDIO (HIGH-CONVERTING AGENCY CTA FOR VIDEO VIEWERS) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black/80 to-cyan-950/40 border border-white/20 backdrop-blur-2xl text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Q1 / Q2 Enterprise Engagements
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              Ready To Build With <span className="text-emerald-400">NPH Studio</span>?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 mb-8 leading-relaxed">
              Whether you need an award-winning 3D web experience, an ultra-fast Next.js SaaS MVP, or a proprietary AI / RAG pipeline, our engineering studio delivers production-grade results.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-2"
              >
                <span>Book Technical Consultation</span>
                <IconArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/918787205784?text=Hi%20NPH%20Studio!%20I%20saw%20your%20Lab%20Hero%20experiment%20and%20want%20to%20build%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-widest hover:bg-emerald-500/30 transition-all flex items-center gap-2"
              >
                <span>WhatsApp Founder</span>
              </a>
            </div>

            {/* Social Share Callout for Video Creators */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
              <span className="text-zinc-500">Share Experiment:</span>
              <a
                href="https://linkedin.com/company/nph-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <IconBrandLinkedin size={14} /> LinkedIn
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <IconBrandX size={14} /> Twitter / X
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <IconBrandYoutube size={14} /> YouTube
              </a>
            </div>
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
              Aurora OS is an exploratory production prototype demonstrating Three.js WebGL spatial shaders and edge AI pipelines.
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
