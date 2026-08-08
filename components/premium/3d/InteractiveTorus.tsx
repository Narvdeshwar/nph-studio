'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const SPHERE_RADIUS = 1.4;

function BouncingLetter({ text, startPos, color }: { text: string, startPos: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Physics state (using useState initializer for pure render)
  const [physics] = useState(() => {
    return {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
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
    if (!meshRef.current) return;

    // Update position
    const speedMultiplier = 1.5; 
    const velDelta = physics.velocity.clone().multiplyScalar(delta * speedMultiplier);
    physics.position.add(velDelta);

    // Collision with sphere boundary
    const dist = physics.position.length();
    const collisionRadius = SPHERE_RADIUS - 0.3; // Account for letter size

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
  });

  return (
    <Text
      ref={meshRef}
      fontSize={0.6}
      characters="NPH"
      color={hovered ? "#ffffff" : color}
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
        e.stopPropagation();
        physics.velocity.multiplyScalar(1.5); // Speed boost
      }}
    >
      {text}
    </Text>
  );
}

export function InteractiveTorus() {
  const outerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  // Animate the rotation on every frame
  useFrame((state, delta) => {
    if (outerRef.current) {
      // Slow rotation for the outer wireframe
      outerRef.current.rotation.x += delta * 0.2;
      outerRef.current.rotation.y += delta * 0.3;
      
      // Mouse interaction: slight tilt towards cursor
      const targetRotationX = (state.pointer.y * Math.PI) / 6;
      const targetRotationY = (state.pointer.x * Math.PI) / 6;
      
      outerRef.current.rotation.x += 0.05 * (targetRotationX - outerRef.current.rotation.x);
      outerRef.current.rotation.y += 0.05 * (targetRotationY - outerRef.current.rotation.y);
      
      // Scale pulse when hovered
      const targetScale = hovered ? 1.05 : 1;
      outerRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={2} 
      floatingRange={[-0.1, 0.1]}
    >
      <group
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        {/* Inner Glowing Octahedron Core */}
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={hovered ? "#FF5A36" : "#ffffff"}
            emissive={hovered ? "#FF5A36" : "#222222"}
            emissiveIntensity={hovered ? 2 : 0.5}
            metalness={1}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Tech Wireframe */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[SPHERE_RADIUS, 1]} />
          <meshStandardMaterial
            color={hovered ? "#FF5A36" : "#888888"}
            wireframe={true}
            transparent={true}
            opacity={hovered ? 0.8 : 0.3}
          />
        </mesh>

        {/* Bouncing NPH Text inside the Wireframe */}
        <BouncingLetter text="N" startPos={[-0.4, 0, 0]} color="#FF5A36" />
        <BouncingLetter text="P" startPos={[0, 0.4, 0]} color="#7C3AED" />
        <BouncingLetter text="H" startPos={[0.4, -0.4, 0]} color="#ffffff" />
      </group>
    </Float>
  );
}
