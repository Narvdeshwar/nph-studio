'use client';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface LiquidAuroraProps {
  baseColor?: string;
  wireframeColor?: string;
  lightColor?: string;
  distort?: number;
  speed?: number;
  roughness?: number;
  metalness?: number;
  wireframeOpacity?: number;
  showWireframe?: boolean;
  showSparkles?: boolean;
  sparkleCount?: number;
  sphereScale?: number;
  pulseTrigger?: number;
}

function LiquidSphere({
  baseColor = '#064e3b',
  wireframeColor = '#0EA5E9',
  lightColor = '#10B981',
  distort = 0.5,
  speed = 2,
  roughness = 0.1,
  metalness = 1,
  wireframeOpacity = 0.3,
  showWireframe = true,
  showSparkles = true,
  sparkleCount = 300,
  sphereScale = 1.8,
  pulseTrigger = 0,
}: LiquidAuroraProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const pulseRef = useRef(0);

  // Trigger pulse kick
  useEffect(() => {
    if (pulseTrigger > 0) {
      pulseRef.current = 1.0;
    }
  }, [pulseTrigger]);

  useFrame((state, delta) => {
    // Smooth decay of pulse
    if (pulseRef.current > 0) {
      pulseRef.current = Math.max(0, pulseRef.current - delta * 2.5);
    }
    const pulseFactor = 1 + pulseRef.current * 0.4;

    // Smooth pointer tracking for interactive physics
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    if (meshRef.current) {
      // Base rotation + interactive tilt
      meshRef.current.rotation.x += 0.005 + pulseRef.current * 0.03;
      meshRef.current.rotation.y += 0.008 + pulseRef.current * 0.03;
      
      // Interpolate towards mouse position for a "magnetic" feel
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
      
      meshRef.current.scale.setScalar(sphereScale * pulseFactor);

      const mat = meshRef.current.material as unknown as { distort?: number };
      if (mat && typeof mat.distort === 'number') {
        mat.distort = distort + pulseRef.current * 0.35;
      }
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= 0.008 + pulseRef.current * 0.02;
      wireframeRef.current.rotation.y -= 0.005 + pulseRef.current * 0.02;
      wireframeRef.current.scale.setScalar((sphereScale + 0.3) * pulseFactor);

      const mat = wireframeRef.current.material as unknown as { distort?: number };
      if (mat && typeof mat.distort === 'number') {
        mat.distort = distort + 0.1 + pulseRef.current * 0.25;
      }
    }

    // Dynamic light tracking the cursor to cast real-time reflections
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 10, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.pointer.y * 10, 0.1);
      lightRef.current.intensity = 5 + pulseRef.current * 8;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      {/* Interactive Spotlight */}
      <spotLight ref={lightRef} position={[0, 0, 10]} intensity={5} color={lightColor} distance={20} penumbra={1} />

      <Sphere ref={meshRef} args={[1, 128, 128]} scale={sphereScale}>
        <MeshDistortMaterial
          color={baseColor}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={3}
        />
      </Sphere>
      
      {showWireframe && (
        <Sphere ref={wireframeRef} args={[1, 64, 64]} scale={sphereScale + 0.3}>
          <MeshDistortMaterial
            color={wireframeColor}
            attach="material"
            distort={distort + 0.1}
            speed={speed * 1.25}
            roughness={0.2}
            metalness={1}
            wireframe={true}
            transparent={true}
            opacity={wireframeOpacity}
          />
        </Sphere>
      )}

      {showSparkles && (
        <Sparkles 
          count={sparkleCount} 
          scale={8} 
          size={3} 
          speed={0.6} 
          opacity={0.6} 
          color={lightColor}
        />
      )}
    </Float>
  );
}

export function LiquidAurora(props: LiquidAuroraProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#0EA5E9" />
        <LiquidSphere {...props} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
