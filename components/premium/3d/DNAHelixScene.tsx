'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

export interface BasePairInfo {
  index: number;
  base1: 'A' | 'T' | 'C' | 'G';
  base2: 'A' | 'T' | 'C' | 'G';
  name1: string;
  name2: string;
  color1: string;
  color2: string;
  bonds: number;
  p1: [number, number, number];
  p2: [number, number, number];
  midpoint: [number, number, number];
  locus: string;
}

const NUCLEOTIDE_CONFIG = {
  A: { name: 'Adenine', color: '#10B981', pair: 'T', bonds: 2 }, // Emerald
  T: { name: 'Thymine', color: '#F59E0B', pair: 'A', bonds: 2 }, // Amber
  C: { name: 'Cytosine', color: '#06B6D4', pair: 'G', bonds: 3 }, // Cyan
  G: { name: 'Guanine', color: '#8B5CF6', pair: 'C', bonds: 3 }, // Violet
} as const;

const SEQUENCE_PATTERN: ('A' | 'T' | 'C' | 'G')[] = [
  'A', 'G', 'C', 'T', 'G', 'A', 'T', 'C', 'C', 'G', 'A', 'T',
  'T', 'A', 'C', 'G', 'A', 'G', 'T', 'C', 'G', 'A', 'A', 'T'
];

function HelixStructure({
  selectedIdx,
  targetIdx,
  isEditing,
  onSelectBase,
}: {
  selectedIdx: number;
  targetIdx: number;
  isEditing: boolean;
  onSelectBase: (bp: BasePairInfo) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Generate 24 Base Pairs
  const basePairs = useMemo<BasePairInfo[]>(() => {
    const pairs: BasePairInfo[] = [];
    const count = 24;
    const R = 1.35;
    const dy = 0.32;
    const dTheta = 0.44;

    for (let i = 0; i < count; i++) {
      const offsetI = i - count / 2;
      const theta = offsetI * dTheta;
      const y = offsetI * dy;

      const p1: [number, number, number] = [R * Math.cos(theta), y, R * Math.sin(theta)];
      const p2: [number, number, number] = [R * Math.cos(theta + Math.PI), y, R * Math.sin(theta + Math.PI)];
      const midpoint: [number, number, number] = [(p1[0] + p2[0]) / 2, y, (p1[2] + p2[2]) / 2];

      const b1 = SEQUENCE_PATTERN[i % SEQUENCE_PATTERN.length];
      const cfg1 = NUCLEOTIDE_CONFIG[b1];
      const b2 = cfg1.pair as 'A' | 'T' | 'C' | 'G';
      const cfg2 = NUCLEOTIDE_CONFIG[b2];

      pairs.push({
        index: i,
        base1: b1,
        base2: b2,
        name1: cfg1.name,
        name2: cfg2.name,
        color1: cfg1.color,
        color2: cfg2.color,
        bonds: cfg1.bonds,
        p1,
        p2,
        midpoint,
        locus: `Chr17:${43044295 + i * 3}`,
      });
    }
    return pairs;
  }, []);

  // Continuous ribbon line coordinates for Strand 1 & Strand 2
  const { strand1Points, strand2Points } = useMemo(() => {
    const s1: number[] = [];
    const s2: number[] = [];

    for (let i = 0; i < basePairs.length - 1; i++) {
      const cur = basePairs[i];
      const nxt = basePairs[i + 1];
      s1.push(cur.p1[0], cur.p1[1], cur.p1[2]);
      s1.push(nxt.p1[0], nxt.p1[1], nxt.p1[2]);

      s2.push(cur.p2[0], cur.p2[1], cur.p2[2]);
      s2.push(nxt.p2[0], nxt.p2[1], nxt.p2[2]);
    }
    return {
      strand1Points: new Float32Array(s1),
      strand2Points: new Float32Array(s2),
    };
  }, [basePairs]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous smooth helical spin
      groupRef.current.rotation.y += delta * (isEditing ? 0.7 : 0.25);
      // Subtle float oscillation
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sugar-Phosphate Backbone Ribbons (Strand 1 & 2) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[strand1Points, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#06B6D4" transparent opacity={0.6} />
      </lineSegments>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[strand2Points, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#10B981" transparent opacity={0.6} />
      </lineSegments>

      {/* Render Base Pairs and Connecting Bridges */}
      {basePairs.map((bp) => {
        const isSelected = selectedIdx === bp.index;
        const isTarget = targetIdx === bp.index;
        const isHovered = hoveredIdx === bp.index;

        return (
          <group
            key={bp.index}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBase(bp);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIdx(bp.index);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredIdx(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Strand 1 Backbone Sphere */}
            <mesh position={bp.p1}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color="#06B6D4"
                emissive="#06B6D4"
                emissiveIntensity={isSelected ? 3 : 1.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Strand 2 Backbone Sphere */}
            <mesh position={bp.p2}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color="#10B981"
                emissive="#10B981"
                emissiveIntensity={isSelected ? 3 : 1.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Base Pair Bridge Half 1 (p1 to midpoint) */}
            <mesh
              position={[
                (bp.p1[0] + bp.midpoint[0]) / 2,
                bp.midpoint[1],
                (bp.p1[2] + bp.midpoint[2]) / 2,
              ]}
            >
              <sphereGeometry args={[isTarget && isEditing ? 0.16 : 0.08, 12, 12]} />
              <meshStandardMaterial
                color={isTarget && isEditing ? '#EF4444' : bp.color1}
                emissive={isTarget && isEditing ? '#EF4444' : bp.color1}
                emissiveIntensity={isTarget ? 3.5 : isSelected ? 2.5 : 1.0}
              />
            </mesh>

            {/* Base Pair Bridge Half 2 (midpoint to p2) */}
            <mesh
              position={[
                (bp.p2[0] + bp.midpoint[0]) / 2,
                bp.midpoint[1],
                (bp.p2[2] + bp.midpoint[2]) / 2,
              ]}
            >
              <sphereGeometry args={[isTarget && isEditing ? 0.16 : 0.08, 12, 12]} />
              <meshStandardMaterial
                color={isTarget && isEditing ? '#EF4444' : bp.color2}
                emissive={isTarget && isEditing ? '#EF4444' : bp.color2}
                emissiveIntensity={isTarget ? 3.5 : isSelected ? 2.5 : 1.0}
              />
            </mesh>

            {/* Central Hydrogen Bonding Node */}
            <mesh position={bp.midpoint}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={isTarget ? 4 : isSelected ? 2.5 : 1.0}
              />
            </mesh>

            {/* CRISPR Cleavage Targeting Sparkles */}
            {(isTarget || (isSelected && isEditing)) && (
              <Sparkles
                count={25}
                scale={1.2}
                size={3}
                speed={2.0}
                color={isEditing ? '#EF4444' : '#F59E0B'}
              />
            )}

            {/* Locus Indicator Tooltip on Selected or Target */}
            {(isSelected || isHovered) && (
              <Html position={[0, bp.midpoint[1], 0]} center distanceFactor={7}>
                <div className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/90 text-white border border-cyan-500/40 whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.4)] pointer-events-none">
                  {bp.base1}-{bp.base2} ({bp.bonds} H-Bonds)
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Floating Ambient Molecular Sparkles */}
      <Sparkles count={200} scale={10} size={2.5} speed={0.4} opacity={0.5} color="#06B6D4" />
      <Sparkles count={150} scale={8} size={2} speed={0.6} opacity={0.4} color="#10B981" />
    </group>
  );
}

export function DNAHelixScene({
  selectedIdx = 10,
  targetIdx = 10,
  isEditing = false,
  onSelectBase,
}: {
  selectedIdx: number;
  targetIdx: number;
  isEditing: boolean;
  onSelectBase: (bp: BasePairInfo) => void;
}) {
  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#06B6D4" />
        <pointLight position={[0, 0, 3]} intensity={2.5} color="#10B981" distance={10} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <HelixStructure
            selectedIdx={selectedIdx}
            targetIdx={targetIdx}
            isEditing={isEditing}
            onSelectBase={onSelectBase}
          />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
