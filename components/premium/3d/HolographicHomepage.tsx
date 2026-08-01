'use client';

import { useRef } from 'react';
import { Html, PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';

export function HolographicHomepage() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      snap={true}
    >
      <Float rotationIntensity={0.4} floatIntensity={2} speed={1.5}>
        <mesh ref={meshRef}>
          {/* Glass Pane Backdrop - Adjusted for 16:10 aspect ratio */}
          <boxGeometry args={[4.8, 3.0, 0.05]} />
          <meshPhysicalMaterial
            transmission={1}
            roughness={0.2}
            thickness={0.5}
            color="#000000"
            transparent
            opacity={0.8}
            metalness={0.5}
          />

          {/* The Holographic HTML Content */}
          <Html
            transform
            distanceFactor={1.2}
            position={[0, 0, 0.03]}
          >
            <div 
              className="w-[1440px] h-[900px] bg-background text-foreground rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ pointerEvents: 'auto' }}
              onWheel={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            >
              {/* Using an iframe gives you the ENTIRE website including Navbar, Footer, and working navigation inside the 3D space! */}
              <iframe 
                src="/" 
                className="w-full h-full border-none"
                title="NPH Studio Hologram"
              />
            </div>
          </Html>
        </mesh>
      </Float>
    </PresentationControls>
  );
}
