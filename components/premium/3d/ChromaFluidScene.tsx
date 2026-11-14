'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

export type ChromaTheme = 'mercury' | 'prismatic' | 'obsidian' | 'neon';

interface ThemeConfig {
  name: string;
  color: string;
  emissive: string;
  lightColor: string;
  accentHex: string;
  roughness: number;
  metalness: number;
  iridescence: number;
  wireframeColor: string;
}

export const CHROMA_THEMES: Record<ChromaTheme, ThemeConfig> = {
  mercury: {
    name: 'Liquid Mercury',
    color: '#e2e8f0',
    emissive: '#0f172a',
    lightColor: '#ffffff',
    accentHex: '#94a3b8',
    roughness: 0.02,
    metalness: 1.0,
    iridescence: 0.85,
    wireframeColor: '#cbd5e1',
  },
  prismatic: {
    name: 'Hyper Prismatic',
    color: '#f8fafc',
    emissive: '#3b0764',
    lightColor: '#c084fc',
    accentHex: '#ec4899',
    roughness: 0.04,
    metalness: 0.95,
    iridescence: 1.0,
    wireframeColor: '#a855f7',
  },
  obsidian: {
    name: 'Obsidian Gold',
    color: '#09090b',
    emissive: '#451a03',
    lightColor: '#f59e0b',
    accentHex: '#fbbf24',
    roughness: 0.08,
    metalness: 0.98,
    iridescence: 0.7,
    wireframeColor: '#f59e0b',
  },
  neon: {
    name: 'Cyber Turquoise',
    color: '#042f2e',
    emissive: '#064e3b',
    lightColor: '#2dd4bf',
    accentHex: '#14b8a6',
    roughness: 0.03,
    metalness: 0.96,
    iridescence: 0.9,
    wireframeColor: '#06b6d4',
  },
};

function LiquidChromeKnot({
  themeKey,
  speedMultiplier,
  isShockwave,
}: {
  themeKey: ChromaTheme;
  speedMultiplier: number;
  isShockwave: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  const theme = CHROMA_THEMES[themeKey];

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Rotation based on time + speedMultiplier
      meshRef.current.rotation.x += delta * 0.4 * speedMultiplier;
      meshRef.current.rotation.y += delta * 0.6 * speedMultiplier;
      meshRef.current.rotation.z = Math.sin(elapsed * 0.5) * 0.2;

      // Mouse interactive tilt
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.06);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.06);

      // Shockwave bounce
      const targetScale = isShockwave ? 1.45 : 1.25;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.3 * speedMultiplier;
      wireRef.current.rotation.y -= delta * 0.5 * speedMultiplier;
    }

    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 8, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.pointer.y * 8, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      {/* Dynamic tracking cursor spotlight */}
      <spotLight
        ref={lightRef}
        position={[0, 0, 8]}
        intensity={8}
        color={theme.lightColor}
        distance={18}
        penumbra={1}
      />

      {/* Main Liquid Chrome Torus Knot */}
      <mesh ref={meshRef} scale={1.25}>
        <torusKnotGeometry args={[1, 0.32, 180, 36, 2, 3]} />
        <meshPhysicalMaterial
          color={theme.color}
          emissive={theme.emissive}
          emissiveIntensity={0.4}
          roughness={theme.roughness}
          metalness={theme.metalness}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          iridescence={theme.iridescence}
          iridescenceIOR={1.6}
          reflectivity={1.0}
        />
      </mesh>

      {/* Orbiting Thin Lattice Wireframe */}
      <mesh ref={wireRef} scale={1.55}>
        <torusGeometry args={[1.6, 0.04, 16, 100]} />
        <meshBasicMaterial
          color={theme.wireframeColor}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Quantum Sparkle Swarms */}
      <Sparkles
        count={240}
        scale={7}
        size={3}
        speed={0.8 * speedMultiplier}
        opacity={0.6}
        color={theme.accentHex}
      />
      <Sparkles
        count={120}
        scale={9}
        size={2}
        speed={0.5 * speedMultiplier}
        opacity={0.4}
        color="#ffffff"
      />
    </Float>
  );
}

export function ChromaFluidScene({
  themeKey = 'prismatic',
  speedMultiplier = 1.0,
  isShockwave = false,
}: {
  themeKey: ChromaTheme;
  speedMultiplier?: number;
  isShockwave?: boolean;
}) {
  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.8} color={CHROMA_THEMES[themeKey].accentHex} />
        <directionalLight position={[0, -10, 5]} intensity={1.2} color="#38bdf8" />

        <LiquidChromeKnot
          themeKey={themeKey}
          speedMultiplier={speedMultiplier}
          isShockwave={isShockwave}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
