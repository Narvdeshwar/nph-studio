'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Sparkles, Html, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';

function Carousel() {
  const group = useRef<THREE.Group>(null);
  const radius = 6.5; // Tighter circle
  const count = caseStudies.length;

  useFrame((state, delta) => {
    // Faster auto-rotate so users immediately realize it's a 3D carousel
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {caseStudies.map((study, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <Float key={study.title} speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <ProjectCard 
              study={study} 
              position={[x, 0, z]} 
              rotation={[0, angle, 0]} 
              index={i}
            />
          </Float>
        );
      })}
    </group>
  );
}

function ProjectCard({ study, position, rotation, index }: { study: import('@/data/case-studies').CaseStudyData, position: [number, number, number], rotation: [number, number, number], index: number }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.color.lerp(
        new THREE.Color(hovered ? study.color || '#ffffff' : study.bg || '#111111'),
        0.1
      );
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        hovered ? 0.9 : 0.6,
        0.1
      );
    }
    if (groupRef.current) {
      const targetScale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef}
      position={position} 
      rotation={rotation}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'grab'; }}
      onClick={() => study.slug && router.push(`/work/${study.slug}`)}
    >
      {/* 3D Glass Pane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[5, 7]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={study.bg || "#111"} 
          roughness={0.2} 
          metalness={0.8}
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
        <Edges 
          linewidth={hovered ? 4 : 2} 
          scale={1} 
          threshold={15} 
          color={hovered ? (study.color || "white") : "white"} 
        />
      </mesh>

      {/* Floating HTML Content - Mathematically scaled 1:1 to match 5x7 plane */}
      <Html
        position={[0, 0, 0.05]}
        transform
        pointerEvents="none"
        scale={0.01} // 500px * 0.01 = 5 units 
      >
        <div 
          className="flex flex-col items-center justify-between text-center transition-all duration-300 rounded-2xl overflow-hidden relative"
          style={{ 
            width: '500px',
            height: '700px',
            padding: '40px',
            opacity: hovered ? 1 : 0.8, 
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            background: hovered ? 'rgba(0,0,0,0.6)' : 'transparent',
          }}
        >
          {study.image && (
            <div className="absolute inset-0 w-full h-full z-0 transition-opacity duration-500" style={{ opacity: hovered ? 0.15 : 0.4 }}>
              <img src={study.image} alt={study.title} className="w-full h-full object-cover grayscale" />
            </div>
          )}
          
          <div className="relative z-10 w-full flex flex-col items-center mt-10">
            <span 
              className="text-lg font-bold uppercase tracking-[0.5em] mb-6"
              style={{ color: hovered ? 'white' : 'rgba(255,255,255,0.7)' }}
            >
              0{index + 1} — {study.category}
            </span>
            <h2 
              className="text-[80px] font-black uppercase tracking-tighter leading-[0.85] break-words"
              style={{ color: hovered ? (study.color || 'white') : 'white' }}
            >
              {study.title}
            </h2>
          </div>

          <div className="relative z-10 w-full mb-10">
             <div 
               className="mx-auto px-10 py-4 rounded-full border-2 text-xl font-bold tracking-widest uppercase transition-all duration-300 inline-block"
               style={{
                 borderColor: hovered ? study.color : 'rgba(255,255,255,0.2)',
                 backgroundColor: hovered ? (study.color || 'white') : 'rgba(0,0,0,0.5)',
                 color: hovered ? '#000' : 'white',
                 opacity: hovered ? 1 : 0,
                 transform: hovered ? 'translateY(0)' : 'translateY(20px)'
               }}
             >
               View Project
             </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export function Work3DGallery() {
  return (
    <div className="w-full h-screen bg-[#050505] overflow-hidden cursor-grab active:cursor-grabbing relative z-10">
      
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <h1 className="text-white text-xs font-black uppercase tracking-[0.5em] opacity-50 mb-2">Drag to Rotate</h1>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      <div className="absolute inset-0 w-full h-full">
        {/* Pulled camera WAY back (z: 22) so the entire carousel is visible at once */}
        <Canvas camera={{ position: [0, 0, 22], fov: 35 }}>
          
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 10, 0]} intensity={3} color="#ffffff" />
          <pointLight position={[0, -10, 0]} intensity={2} color="#0EA5E9" />
          <pointLight position={[10, 0, 10]} intensity={1.5} color="#ffffff" />

          <PresentationControls 
            global 
            snap={true} 
            rotation={[0, 0, 0]} 
            polar={[-0.2, 0.2]} 
            azimuth={[-Infinity, Infinity]} 
          >
            <Carousel />
          </PresentationControls>

          <Sparkles count={800} scale={30} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
          
        </Canvas>
      </div>
    </div>
  );
}
