'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { InteractiveTorus } from './InteractiveTorus';
import { HolographicHomepage } from './HolographicHomepage';
import { InteractiveCell } from './InteractiveCell';

export function ImmersiveLabScene({ activeExperiment = 'torus' }: { activeExperiment?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#7C3AED" />

      {/* Sci-Fi Starfield Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Suspense fallback={null}>
        {activeExperiment === 'torus' && (
          <group position={[0, 0, 0]}>
            <InteractiveTorus />
          </group>
        )}

        {activeExperiment === 'hologram' && (
          <group position={[0, 0, 0]} scale={1.5}>
            <HolographicHomepage />
          </group>
        )}

        {activeExperiment === 'cell' && (
          <group position={[0, 0, 0]}>
            <Suspense fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="purple" wireframe />
              </mesh>
            }>
              <InteractiveCell />
            </Suspense>
          </group>
        )}
      </Suspense>

      {/* Allows the user to pan and rotate the entire camera */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
