'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconCrosshair, IconRadar } from '@tabler/icons-react';
import * as THREE from 'three';

// 1. Massive Celestial Database
const CELESTIAL_DATA: Record<string, { 
  name: string, desc: string, status: string, category: string, 
  color: string, distort: number, speed: number, scale: number, wireframe?: boolean 
}> = {
  // Stars
  sol: { name: 'Sol (The Sun)', desc: 'G-type main-sequence star. Center of the Solar System.', status: 'CRITICAL', category: 'Star', color: '#FDE047', distort: 0.6, speed: 5, scale: 4.0 },
  sirius: { name: 'Sirius A', desc: 'Brightest star in Earth\'s night sky. A-type main-sequence.', status: 'STABLE', category: 'Star', color: '#BAE6FD', distort: 0.4, speed: 3, scale: 3.5 },
  betelgeuse: { name: 'Betelgeuse', desc: 'Red supergiant in Orion. Near supernova stage.', status: 'WARNING', category: 'Star', color: '#EF4444', distort: 0.9, speed: 6, scale: 5.5 },
  proxima: { name: 'Proxima Centauri', desc: 'Closest star to Sol. Flare star red dwarf.', status: 'WARNING', category: 'Star', color: '#FCA5A5', distort: 0.5, speed: 4, scale: 1.5 },

  // Solar System
  mercury: { name: 'Mercury', desc: 'Sun-scorched rock. Extreme temperature variance.', status: 'HOSTILE', category: 'Planet', color: '#A3A3A3', distort: 0.05, speed: 1, scale: 1.2 },
  venus: { name: 'Venus', desc: 'Toxic atmosphere. Crushing pressure.', status: 'CRITICAL', category: 'Planet', color: '#FCD34D', distort: 0.15, speed: 2, scale: 1.8 },
  earth: { name: 'Terra (Earth)', desc: 'Habitable zone. Abundant liquid water.', status: 'STABLE', category: 'Planet', color: '#0EA5E9', distort: 0.1, speed: 1, scale: 2 },
  mars: { name: 'Mars', desc: 'Cold desert world. High iron oxide surface.', status: 'WARNING', category: 'Planet', color: '#EF4444', distort: 0.1, speed: 1.2, scale: 1.6 },
  jupiter: { name: 'Jupiter', desc: 'Massive gas giant. Violent storms detected.', status: 'DANGER', category: 'Planet', color: '#F59E0B', distort: 0.3, speed: 4, scale: 3.5 },
  saturn: { name: 'Saturn', desc: 'Gas giant. Complex ring system.', status: 'WARNING', category: 'Planet', color: '#FDE68A', distort: 0.25, speed: 3, scale: 3.0 },
  uranus: { name: 'Uranus', desc: 'Ice giant. Extreme axial tilt.', status: 'STABLE', category: 'Planet', color: '#6EE7B7', distort: 0.15, speed: 1.5, scale: 2.5 },
  neptune: { name: 'Neptune', desc: 'Ice giant. Supersonic wind speeds.', status: 'HOSTILE', category: 'Planet', color: '#3B82F6', distort: 0.2, speed: 2.5, scale: 2.4 },
  pluto: { name: 'Pluto', desc: 'Dwarf planet. Nitrogen ice glaciers.', status: 'STABLE', category: 'Dwarf', color: '#E5E7EB', distort: 0.02, speed: 0.5, scale: 1.0 },
  
  // Famous Moons
  luna: { name: 'Luna (Moon)', desc: 'Earth satellite. Tidally locked.', status: 'STABLE', category: 'Moon', color: '#D4D4D8', distort: 0.05, speed: 0.5, scale: 0.8 },
  titan: { name: 'Titan', desc: 'Saturn moon. Dense atmosphere, methane lakes.', status: 'UNKNOWN', category: 'Moon', color: '#F59E0B', distort: 0.15, speed: 1, scale: 1.1 },
  europa: { name: 'Europa', desc: 'Jupiter moon. Subsurface ocean detected.', status: 'UNKNOWN', category: 'Moon', color: '#93C5FD', distort: 0.08, speed: 1, scale: 0.9 },

  // Galaxies & Deep Space
  milky_way: { name: 'Milky Way', desc: 'Our home galaxy. Barred spiral structure.', status: 'STABLE', category: 'Galaxy', color: '#C4B5FD', distort: 0.8, speed: 5, scale: 4.5, wireframe: true },
  andromeda: { name: 'Andromeda', desc: 'Nearest major galaxy. On collision course.', status: 'WARNING', category: 'Galaxy', color: '#818CF8', distort: 0.9, speed: 6, scale: 5, wireframe: true },
  sombrero: { name: 'Sombrero Galaxy', desc: 'Unbarred spiral. Massive central bulge.', status: 'UNKNOWN', category: 'Galaxy', color: '#FCD34D', distort: 0.7, speed: 4, scale: 4, wireframe: true },
  triangulum: { name: 'Triangulum', desc: 'Local group spiral galaxy.', status: 'STABLE', category: 'Galaxy', color: '#6EE7B7', distort: 0.7, speed: 5, scale: 3.8, wireframe: true },
  orion: { name: 'Orion Nebula', desc: 'Stellar nursery. High ionizing radiation.', status: 'DANGER', category: 'Nebula', color: '#EC4899', distort: 0.6, speed: 3, scale: 3.5, wireframe: true },
  crab: { name: 'Crab Nebula', desc: 'Supernova remnant. Pulsar wind nebula.', status: 'HOSTILE', category: 'Nebula', color: '#10B981', distort: 0.7, speed: 4.5, scale: 3 },
  black_hole: { name: 'Sagittarius A*', desc: 'Supermassive Black Hole. Infinite density.', status: 'CRITICAL', category: 'Anomaly', color: '#000000', distort: 1.5, speed: 10, scale: 2 },
};

// 3D Scene Component
function SpaceScene({ targetKey }: { targetKey: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const current = CELESTIAL_DATA[targetKey];

  useFrame((state, delta) => {
    if (groupRef.current) {
       groupRef.current.rotation.y += delta * 0.02;
       groupRef.current.rotation.x += delta * 0.01;
    }
    if (bodyRef.current) {
       bodyRef.current.rotation.y += delta * (current.category === 'Galaxy' ? 0.3 : 0.1);
    }
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * (current.scale + 1);
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * (current.scale + 1);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={10000} factor={4} saturation={1} fade speed={2} />
      
      {/* Dynamic particles based on object size/type */}
      <Sparkles 
        count={current.category === 'Galaxy' ? 2000 : 500} 
        scale={current.scale * 10} 
        size={current.category === 'Galaxy' ? 3 : 2} 
        speed={current.speed} 
        color={current.color} 
        opacity={0.6} 
      />
      
      <Sphere ref={bodyRef} args={[current.scale, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color={current.color}
          emissive={current.category === 'Anomaly' ? '#ffffff' : current.color}
          emissiveIntensity={current.category === 'Anomaly' ? 2 : 0.2}
          clearcoat={1} 
          clearcoatRoughness={0.2} 
          metalness={current.category === 'Anomaly' ? 1 : 0.9} 
          roughness={0.1}
          distort={current.distort}
          speed={current.speed}
          wireframe={current.wireframe}
        />
      </Sphere>

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -5]} intensity={10} color={current.color} />
      <Environment preset="night" />
    </group>
  );
}

// UI Overlay Component
export default function GalaxiumPage() {
  const [activeTarget, setActiveTarget] = useState('earth');
  const [coords, setCoords] = useState({ x: 142, y: 89, z: 231 });
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Simulate changing coordinates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        x: prev.x + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 9),
        y: prev.y + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 9),
        z: prev.z + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 9),
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const currentData = CELESTIAL_DATA[activeTarget];
  const categories = ['All', ...Array.from(new Set(Object.values(CELESTIAL_DATA).map(d => d.category)))];
  
  const filteredTargets = Object.entries(CELESTIAL_DATA).filter(([_, data]) => 
    categoryFilter === 'All' || data.category === categoryFilter
  );

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-white/30 selection:text-white">
      
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0 cursor-crosshair">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <SpaceScene targetKey={activeTarget} />
          <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} maxDistance={20} minDistance={3} />
        </Canvas>
      </div>

      {/* Cinematic HUD Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-8">
        
        {/* Top Bar */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-start"
        >
          <div className="flex items-center gap-6">
            <Link href="/lab" className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black transition-colors duration-300">
              <IconArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-1">Galaxium OS // UNIVERSAL DB</h1>
              <div className="text-sm font-mono tracking-widest text-emerald-400">HYPERDRIVE ONLINE</div>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Target Coordinates</div>
            <div className="text-xl font-mono tracking-widest text-emerald-400 font-bold">
              {String(Math.abs(coords.x)).padStart(4, '0')} : {String(Math.abs(coords.y)).padStart(4, '0')} : {String(Math.abs(coords.z)).padStart(4, '0')}
            </div>
          </div>
        </motion.div>

        {/* Middle Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] flex items-center justify-center pointer-events-none mix-blend-screen">
          <div className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] border-[1px] border-white/30 rounded-full flex items-center justify-center">
            <div className="w-[48vw] h-[48vw] max-w-[580px] max-h-[580px] border-[1px] border-emerald-400/20 rounded-full border-dashed animate-[spin_40s_linear_infinite]" />
          </div>
          <IconCrosshair size={40} className="absolute text-emerald-400/50" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 h-[40vh] md:h-[30vh]">
          
          {/* Target Info Panel */}
          <motion.div 
            key={activeTarget}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-[400px] bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shrink-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <IconRadar className="text-emerald-400 animate-[spin_3s_linear_infinite]" size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Current Target // {currentData.category}</span>
            </div>
            
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white" style={{ textShadow: `0 0 20px ${currentData.color}80` }}>
              {currentData.name}
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-mono mb-6 h-10">{currentData.desc}</p>
            
            <div className="flex items-center justify-between py-3 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">Threat Level</span>
              <span className={`text-xs font-black uppercase tracking-[0.2em] ${
                currentData.status === 'STABLE' ? 'text-emerald-400' : 
                currentData.status === 'WARNING' ? 'text-amber-400' : 
                currentData.status === 'CRITICAL' ? 'text-red-500' : 
                currentData.status === 'HOSTILE' ? 'text-orange-500' : 'text-purple-400'
              }`}>
                {currentData.status}
              </span>
            </div>
          </motion.div>

          {/* Navigational Computer (Scrollable Target List) */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[600px] h-full flex flex-col pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6"
          >
            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                    categoryFilter === cat ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-2 gap-2">
              <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
              `}} />
              {filteredTargets.map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveTarget(key)}
                  className={`flex flex-col text-left px-4 py-3 rounded-xl transition-all duration-300 border ${
                    activeTarget === key 
                      ? 'bg-white/10 border-emerald-500/50 text-white' 
                      : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest truncate">{data.name}</span>
                  <span className="text-[9px] font-mono uppercase text-white/30 truncate mt-1">{data.category}</span>
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
