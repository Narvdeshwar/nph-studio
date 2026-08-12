'use client';

import { useState, useRef } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Html, Sphere, Capsule, Float } from '@react-three/drei';
import * as THREE from 'three';

type OrganelleData = {
  id: string;
  name: string;
  description: string;
};

const CELL_DATA: Record<string, OrganelleData> = {
  nucleus: {
    id: 'nucleus',
    name: 'Nucleus',
    description: 'The control center of the cell, housing the genetic material (DNA). It directs protein synthesis and cell reproduction.',
  },
  mitochondria: {
    id: 'mitochondria',
    name: 'Mitochondria',
    description: 'The powerhouse of the cell. Generates most of the chemical energy needed to power the cell\'s biochemical reactions.',
  },
  membrane: {
    id: 'membrane',
    name: 'Cell Membrane',
    description: 'A semi-permeable boundary that controls the movement of substances in and out of the cell, protecting its interior.',
  }
};

export function InteractiveCell() {
  const [selectedOrganelle, setSelectedOrganelle] = useState<OrganelleData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const cellRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire cell
  useFrame((state, delta) => {
    if (cellRef.current) {
      cellRef.current.rotation.y += delta * 0.1;
      cellRef.current.rotation.z += delta * 0.05;
    }
  });

  const handlePointerOver = (id: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setHovered(id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setHovered(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (id: string) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelectedOrganelle(CELL_DATA[id]);
  };

  const closeCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedOrganelle(null);
  };

  return (
    <group ref={cellRef}>

      {/* HTML Card Overlay */}
      {selectedOrganelle && (
        <Html center position={[0, 0, 0]} zIndexRange={[100, 0]} transform={false}>
          <div className="bg-black/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-80 text-white shadow-[0_0_50px_rgba(124,58,237,0.5)] flex flex-col gap-4 animate-in fade-in zoom-in duration-300 pointer-events-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">Organelle Data</span>
                <h3 className="text-xl font-black uppercase tracking-tighter">{selectedOrganelle.name}</h3>
              </div>
              <button
                onClick={closeCard}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {selectedOrganelle.description}
            </p>
          </div>
        </Html>
      )}

      {/* --- CELL MEMBRANE --- */}
      <Sphere
        args={[3, 64, 64]}
        onPointerOver={handlePointerOver('membrane')}
        onPointerOut={handlePointerOut()}
        onClick={handleClick('membrane')}
      >
        <meshPhysicalMaterial
          color="#2dd4bf"
          transparent
          opacity={0.15}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          emissive={hovered === 'membrane' ? '#2dd4bf' : '#000000'}
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* --- NUCLEUS --- */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere
          args={[0.8, 32, 32]}
          position={[0, 0, 0]}
          onPointerOver={handlePointerOver('nucleus')}
          onPointerOut={handlePointerOut()}
          onClick={handleClick('nucleus')}
        >
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#7c3aed"
            emissiveIntensity={hovered === 'nucleus' ? 1.5 : 0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      {/* --- MITOCHONDRIA 1 --- */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <Capsule
          args={[0.2, 0.6, 16, 16]}
          position={[1.5, 1, 0.5]}
          rotation={[Math.PI / 4, Math.PI / 3, 0]}
          onPointerOver={handlePointerOver('mitochondria')}
          onPointerOut={handlePointerOut()}
          onClick={handleClick('mitochondria')}
        >
          <meshStandardMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={hovered === 'mitochondria' ? 1.5 : 0.5}
            roughness={0.4}
          />
        </Capsule>
      </Float>

      {/* --- MITOCHONDRIA 2 --- */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <Capsule
          args={[0.15, 0.5, 16, 16]}
          position={[-1.2, -1.5, -0.8]}
          rotation={[-Math.PI / 6, Math.PI / 2, Math.PI / 8]}
          onPointerOver={handlePointerOver('mitochondria')}
          onPointerOut={handlePointerOut()}
          onClick={handleClick('mitochondria')}
        >
          <meshStandardMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={hovered === 'mitochondria' ? 1.5 : 0.5}
            roughness={0.4}
          />
        </Capsule>
      </Float>

      {/* --- MITOCHONDRIA 3 --- */}
      <Float speed={4} rotationIntensity={2.5} floatIntensity={1}>
        <Capsule
          args={[0.25, 0.7, 16, 16]}
          position={[0.5, -1, 1.5]}
          rotation={[0, -Math.PI / 4, Math.PI / 3]}
          onPointerOver={handlePointerOver('mitochondria')}
          onPointerOut={handlePointerOut()}
          onClick={handleClick('mitochondria')}
        >
          <meshStandardMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={hovered === 'mitochondria' ? 1.5 : 0.5}
            roughness={0.4}
          />
        </Capsule>
      </Float>

    </group>
  );
}
