'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

export interface NeuralNodeData {
  id: string;
  name: string;
  category: string;
  color: string;
  position: [number, number, number];
  size: number;
  dim: string;
  latency: string;
  throughput: string;
  description: string;
  tags: string[];
}

export const NEURAL_NODES: NeuralNodeData[] = [
  {
    id: 'reasoning',
    name: 'Deep Reasoning Core',
    category: 'Cognitive Engine',
    color: '#8B5CF6', // Violet
    position: [0, 0.4, 0],
    size: 0.55,
    dim: '4096-dim',
    latency: '0.14 ms',
    throughput: '2,400 tok/s',
    description: 'Multi-step Chain-of-Thought planning engine with self-correcting Monte Carlo Tree Search verification.',
    tags: ['CoT', 'MCTS', 'FP8-Quantized', 'Attention-v3'],
  },
  {
    id: 'vector-rag',
    name: 'Vector Memory Matrix',
    category: 'Spatial Storage',
    color: '#06B6D4', // Cyan
    position: [-2.2, 1.2, -0.6],
    size: 0.4,
    dim: '1536-dim',
    latency: '0.08 ms',
    throughput: '120k QPS',
    description: 'HNSW spatial vector index with cosine similarity lookup and semantic reranking over 10M embeddings.',
    tags: ['HNSW', 'L2-Distance', 'Semantic Rerank', 'Zero-Copy'],
  },
  {
    id: 'agent-swarm',
    name: 'Autonomous Agent Swarm',
    category: 'Coordination',
    color: '#F59E0B', // Amber
    position: [2.2, 0.9, -0.4],
    size: 0.42,
    dim: '2048-dim',
    latency: '0.22 ms',
    throughput: '64 Agents',
    description: 'Decentralized micro-agent consensus protocol with autonomous goal decomposition and task delegation.',
    tags: ['Swarm Consensus', 'Dynamic Sharding', 'Event Bus'],
  },
  {
    id: 'tools',
    name: 'Tool Execution Fabric',
    category: 'Action Runtime',
    color: '#10B981', // Emerald
    position: [-1.8, -1.3, 0.8],
    size: 0.38,
    dim: '512-dim',
    latency: '0.19 ms',
    throughput: '1,800 ops/s',
    description: 'Sandboxed WebAssembly runtime for real-time API integrations, database transactions, and browser actuators.',
    tags: ['WASM', 'Isolated Sandbox', 'Typed RPC'],
  },
  {
    id: 'vision',
    name: 'Multimodal Vision Encoder',
    category: 'Perception',
    color: '#F43F5E', // Rose
    position: [1.9, -1.1, 0.7],
    size: 0.39,
    dim: '1024-dim',
    latency: '0.28 ms',
    throughput: '90 FPS',
    description: 'Spatial visual token patch encoder with cross-attention grounding for 3D UI scene comprehension.',
    tags: ['Patch-14', 'Cross-Attention', 'Spatial Depth'],
  },
  {
    id: 'context',
    name: '1M Context Cache',
    category: 'Long-term Memory',
    color: '#14B8A6', // Teal
    position: [0.3, 2.3, 0.5],
    size: 0.36,
    dim: '1M Tokens',
    latency: '0.05 ms',
    throughput: 'KV Cache Lock',
    description: 'Compressive KV cache with linear ring buffers and FlashAttention-4 kernel hardware dispatch.',
    tags: ['FlashAttention', 'Ring-Buffer', 'Lock-Free'],
  },
  {
    id: 'alignment',
    name: 'Safety & Guardrail Enclave',
    category: 'Security',
    color: '#6366F1', // Indigo
    position: [0.1, -2.2, -0.5],
    size: 0.35,
    dim: '256-dim',
    latency: '0.03 ms',
    throughput: 'Zero Bypass',
    description: 'Post-quantum signed verification barrier enforcing constitutional ethics and prompt injection rejection.',
    tags: ['Post-Quantum', 'Constitutional AI', 'Red-Team Guard'],
  },
];

// Defined connections between nodes
const CONNECTIONS: [number, number][] = [
  [0, 1], // Reasoning <-> Vector RAG
  [0, 2], // Reasoning <-> Agent Swarm
  [0, 3], // Reasoning <-> Tools
  [0, 4], // Reasoning <-> Vision
  [0, 5], // Reasoning <-> Context
  [0, 6], // Reasoning <-> Alignment
  [1, 5], // Vector RAG <-> Context
  [2, 3], // Agent Swarm <-> Tools
  [4, 0], // Vision <-> Reasoning
  [3, 6], // Tools <-> Alignment
  [1, 2], // Vector RAG <-> Agent Swarm
];

interface SynapsePulse {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  color: string;
}

function SynapseNetwork({
  selectedNodeId,
  onSelectNode,
  stimulusActive,
}: {
  selectedNodeId: string;
  onSelectNode: (node: NeuralNodeData) => void;
  stimulusActive: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Line segments geometry
  const linePositions = useMemo(() => {
    const points: number[] = [];
    CONNECTIONS.forEach(([fromIdx, toIdx]) => {
      const from = NEURAL_NODES[fromIdx].position;
      const to = NEURAL_NODES[toIdx].position;
      points.push(from[0], from[1], from[2]);
      points.push(to[0], to[1], to[2]);
    });
    return new Float32Array(points);
  }, []);

  // Animated pulses along connections
  const pulses = useRef<SynapsePulse[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle float rotation
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.05;
    }

    // Spawn pulses when stimulus active or randomly
    if (stimulusActive && Math.random() > 0.4) {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      pulses.current.push({
        start: new THREE.Vector3(...NEURAL_NODES[conn[0]].position),
        end: new THREE.Vector3(...NEURAL_NODES[conn[1]].position),
        progress: 0,
        color: NEURAL_NODES[conn[0]].color,
      });
    } else if (Math.random() > 0.85) {
      const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
      pulses.current.push({
        start: new THREE.Vector3(...NEURAL_NODES[conn[0]].position),
        end: new THREE.Vector3(...NEURAL_NODES[conn[1]].position),
        progress: 0,
        color: NEURAL_NODES[conn[0]].color,
      });
    }

    // Update pulses
    pulses.current.forEach((p) => {
      p.progress += delta * (stimulusActive ? 3.0 : 1.2);
    });
    pulses.current = pulses.current.filter((p) => p.progress <= 1);
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Synapse Connection Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={stimulusActive ? 0.6 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Synapse Nodes */}
      {NEURAL_NODES.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;
        const effectiveSize = isSelected ? node.size * 1.3 : isHovered ? node.size * 1.15 : node.size;

        return (
          <group key={node.id} position={node.position}>
            {/* Outer Energy Shell */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNodeId(node.id);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHoveredNodeId(null);
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[effectiveSize, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 3.5 : isHovered ? 2.5 : stimulusActive ? 2.0 : 1.2}
                roughness={0.15}
                metalness={0.8}
                wireframe={false}
              />
            </mesh>

            {/* Pulsing Wireframe Halo */}
            <mesh scale={isSelected ? 1.4 : 1.25}>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                wireframe
                transparent
                opacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.25}
              />
            </mesh>

            {/* Sparkles around active nodes */}
            {(isSelected || isHovered || stimulusActive) && (
              <Sparkles count={18} scale={node.size * 3} size={2} color={node.color} speed={1.2} />
            )}

            {/* Node Floating Label */}
            <Html
              position={[0, node.size + 0.35, 0]}
              center
              distanceFactor={8}
              className="pointer-events-none select-none transition-opacity duration-300"
            >
              <div
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold whitespace-nowrap backdrop-blur-md border ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : isHovered
                    ? 'bg-black/80 text-white border-white/40'
                    : 'bg-black/50 text-zinc-400 border-white/10 opacity-70'
                }`}
              >
                {node.name}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Orbiting Ambient Micro-Particles */}
      <Sparkles count={180} scale={10} size={2.5} speed={0.4} opacity={0.5} color="#8B5CF6" />
      <Sparkles count={120} scale={8} size={2} speed={0.6} opacity={0.4} color="#06B6D4" />
    </group>
  );
}

export function NeuralSynapseScene({
  selectedNodeId,
  onSelectNode,
  stimulusActive,
}: {
  selectedNodeId: string;
  onSelectNode: (node: NeuralNodeData) => void;
  stimulusActive: boolean;
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8B5CF6" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#06B6D4" distance={8} />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <SynapseNetwork
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            stimulusActive={stimulusActive}
          />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.6}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
