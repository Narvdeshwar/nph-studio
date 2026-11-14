'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

export interface StrikePoint {
  strike: string;
  iv: string;
  delta: string;
  gamma: string;
  volume: string;
  position: [number, number, number];
  color: string;
}

export const STRIKE_POINTS: StrikePoint[] = [
  { strike: '$88,000', iv: '52.4%', delta: '+0.88', gamma: '0.0012', volume: '$14.2M', position: [-1.8, 0.4, -0.8], color: '#10B981' },
  { strike: '$92,000', iv: '56.1%', delta: '+0.72', gamma: '0.0028', volume: '$28.6M', position: [-0.9, 0.8, -0.2], color: '#06B6D4' },
  { strike: '$94,500', iv: '61.8%', delta: '+0.50', gamma: '0.0045', volume: '$42.1M', position: [0.0, 1.2, 0.2], color: '#38BDF8' }, // ATM
  { strike: '$98,000', iv: '67.2%', delta: '+0.31', gamma: '0.0031', volume: '$19.4M', position: [1.0, 0.7, 0.6], color: '#8B5CF6' },
  { strike: '$102,000', iv: '74.5%', delta: '+0.15', gamma: '0.0018', volume: '$11.8M', position: [1.9, 0.3, 1.1], color: '#F43F5E' },
];

function VolatilityMesh({
  isShockwave,
  selectedStrike,
  onSelectStrike,
}: {
  isShockwave: boolean;
  selectedStrike: string;
  onSelectStrike: (pt: StrikePoint) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Original geometry positions
  const { geometry, wireGeometry, originalPositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 4.5, 36, 36);
    const wire = new THREE.PlaneGeometry(6, 4.5, 36, 36);
    geo.rotateX(-Math.PI / 2.6);
    wire.rotateX(-Math.PI / 2.6);

    const orig = geo.attributes.position.clone();
    return { geometry: geo, wireGeometry: wire, originalPositions: orig };
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Subtle float rotation
      groupRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.08;
    }

    if (meshRef.current && wireRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      const wirePos = wireRef.current.geometry.attributes.position;
      const orig = originalPositions;

      const shockAmp = isShockwave ? 0.6 : 0.0;

      for (let i = 0; i < pos.count; i++) {
        const x = orig.getX(i);
        const z = orig.getZ(i);

        // Volatility surface wave equation
        const wave =
          Math.sin(x * 1.2 + elapsed * 1.5) * Math.cos(z * 1.4 + elapsed * 1.2) * 0.28 +
          Math.cos(x * 2.2 - elapsed * 0.8) * 0.12 +
          (isShockwave ? Math.sin(Math.sqrt(x * x + z * z) * 4 - elapsed * 8) * shockAmp : 0);

        pos.setY(i, orig.getY(i) + wave);
        wirePos.setY(i, orig.getY(i) + wave);
      }

      pos.needsUpdate = true;
      wirePos.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <group ref={groupRef}>
      {/* Translucent Solid Surface Base */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#031525"
          emissive="#082f49"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Glowing Wireframe Grid Overlay */}
      <mesh ref={wireRef} geometry={wireGeometry}>
        <meshBasicMaterial
          color={isShockwave ? '#F43F5E' : '#06B6D4'}
          wireframe
          transparent
          opacity={isShockwave ? 0.8 : 0.45}
        />
      </mesh>

      {/* 3D Vertical Marker Beams at Key Strike Prices */}
      {STRIKE_POINTS.map((pt) => {
        const isSelected = selectedStrike === pt.strike;

        return (
          <group
            key={pt.strike}
            position={pt.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectStrike(pt);
            }}
          >
            {/* Vertical Marker Beam Cylinder */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
              <meshBasicMaterial color={pt.color} transparent opacity={isSelected ? 1.0 : 0.6} />
            </mesh>

            {/* Glowing Peak Node */}
            <mesh
              position={[0, 0.8, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[isSelected ? 0.14 : 0.09, 16, 16]} />
              <meshStandardMaterial
                color={pt.color}
                emissive={pt.color}
                emissiveIntensity={isSelected ? 4.0 : 2.0}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>

            {/* Floating Price Pill */}
            <Html position={[0, 1.15, 0]} center distanceFactor={7}>
              <div
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold whitespace-nowrap backdrop-blur-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110'
                    : 'bg-black/80 text-zinc-300 border-white/20 hover:border-white/60'
                }`}
              >
                {pt.strike} (IV: {pt.iv})
              </div>
            </Html>
          </group>
        );
      })}

      {/* Floating Order Inflow Sparkles */}
      <Sparkles count={180} scale={6} size={2.5} speed={0.8} color="#06B6D4" opacity={0.6} />
      <Sparkles count={120} scale={7} size={2} speed={1.2} color="#10B981" opacity={0.5} />
    </group>
  );
}

export function QuantumVolatilityScene({
  isShockwave = false,
  selectedStrike = '$94,500',
  onSelectStrike,
}: {
  isShockwave: boolean;
  selectedStrike: string;
  onSelectStrike: (pt: StrikePoint) => void;
}) {
  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2.4, 5.0], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-10, 10, -5]} intensity={1.5} color="#06B6D4" />
        <directionalLight position={[0, -10, 5]} intensity={1.2} color="#8B5CF6" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <VolatilityMesh
            isShockwave={isShockwave}
            selectedStrike={selectedStrike}
            onSelectStrike={onSelectStrike}
          />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3.4}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
