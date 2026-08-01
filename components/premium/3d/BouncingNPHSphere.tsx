'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

const SPHERE_RADIUS = 2.0;

function BouncingLetter({ text, startPos, color }: { text: string, startPos: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const [hovered, setHovered] = useState(false);

  // Physics state
  const [physics] = useState(() => {
    return {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      position: new THREE.Vector3(...startPos),
      rotationVelocity: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      )
    };
  });

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Update position
    const speedMultiplier = 1.2; // Adjust speed here
    const velDelta = physics.velocity.clone().multiplyScalar(delta * speedMultiplier);
    physics.position.add(velDelta);

    // Collision with sphere boundary
    const dist = physics.position.length();
    const collisionRadius = SPHERE_RADIUS - 0.4; // Account for letter size

    if (dist > collisionRadius) {
      // Normal vector at collision point
      const normal = physics.position.clone().normalize();
      
      // Reflect velocity: v = v - 2(v.n)n
      const dot = physics.velocity.dot(normal);
      const reflection = normal.clone().multiplyScalar(2 * dot);
      physics.velocity.sub(reflection);
      
      // Push back inside to prevent getting stuck
      physics.position.copy(normal.clone().multiplyScalar(collisionRadius - 0.01));
    }

    // Apply physics state to mesh
    meshRef.current.position.copy(physics.position);
    meshRef.current.rotation.x += physics.rotationVelocity.x * delta;
    meshRef.current.rotation.y += physics.rotationVelocity.y * delta;
    meshRef.current.rotation.z += physics.rotationVelocity.z * delta;

    // Handle glowing animation
    const targetEmissive = hovered ? 4.0 : 0.0;
    materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      materialRef.current.emissiveIntensity,
      targetEmissive,
      0.15
    );
  });

  return (
    <Text
      ref={meshRef}
      fontSize={0.8}
      characters="NPH"
      color={color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHovered(false);
      }}
      onPointerDown={(e) => {
        // Give it a speed boost when clicked
        e.stopPropagation();
        physics.velocity.multiplyScalar(1.5);
      }}
    >
      {text}
      <meshStandardMaterial 
        attach="material"
        ref={materialRef} 
        color={color} 
        emissive={color}
        emissiveIntensity={0}
        toneMapped={false}
      />
    </Text>
  );
}

export function BouncingNPHSphere() {
  return (
    <PresentationControls
      global={false}
      rotation={[0, 0, 0]}
      polar={[-Math.PI, Math.PI]}
      azimuth={[-Math.PI, Math.PI]}
      snap={true}
    >
      <group>
        {/* The Glass Bubble */}
        <mesh>
          <sphereGeometry args={[SPHERE_RADIUS, 64, 64]} />
          <meshPhysicalMaterial
            transmission={1}
            roughness={0.05}
            thickness={2}
            ior={1.5}
            color="#ffffff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* The Bouncing Letters */}
        <BouncingLetter text="N" startPos={[-0.5, 0, 0]} color="#FF5A36" />
        <BouncingLetter text="P" startPos={[0, 0.5, 0]} color="#7C3AED" />
        <BouncingLetter text="H" startPos={[0.5, -0.5, 0]} color="#ffffff" />
      </group>
    </PresentationControls>
  );
}
