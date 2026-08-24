'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function LiquidSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    // Smooth pointer tracking for interactive physics
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    if (meshRef.current) {
      // Base rotation + interactive tilt
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      
      // Interpolate towards mouse position for a "magnetic" feel
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= 0.008;
      wireframeRef.current.rotation.y -= 0.005;
    }

    // Dynamic light tracking the cursor to cast real-time reflections
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 10, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.pointer.y * 10, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Interactive Spotlight */}
      <spotLight ref={lightRef} position={[0, 0, 10]} intensity={5} color="#10B981" distance={20} penumbra={1} />

      <Sphere ref={meshRef} args={[1, 128, 128]} scale={1.8}>
        <MeshDistortMaterial
          color="#064e3b" // Deep dark emerald base
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={3}
        />
      </Sphere>
      
      <Sphere ref={wireframeRef} args={[1, 64, 64]} scale={2.1}>
        <MeshDistortMaterial
          color="#0EA5E9" // Sky blue
          attach="material"
          distort={0.6}
          speed={2.5}
          roughness={0.2}
          metalness={1}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </Sphere>

      <Sparkles 
        count={300} 
        scale={8} 
        size={3} 
        speed={0.6} 
        opacity={0.6} 
        color="#10B981"
      />
    </Float>
  );
}

export function LiquidAurora() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#0EA5E9" />
        <LiquidSphere />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
