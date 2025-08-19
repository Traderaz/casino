"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

function RouletteWheel() {
  const wheelRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const [spinning, setSpinning] = useState(true);

  useFrame((state) => {
    if (wheelRef.current && spinning) {
      wheelRef.current.rotation.z += 0.02;
    }
    if (ballRef.current && spinning) {
      ballRef.current.rotation.y += 0.1;
      ballRef.current.position.x = Math.cos(state.clock.elapsedTime * 2) * 2.8;
      ballRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 2.8;
    }
  });

  // Roulette numbers and colors (European layout)
  const rouletteNumbers = [
    { num: 0, color: 'green' },
    { num: 32, color: 'red' }, { num: 15, color: 'black' }, { num: 19, color: 'red' },
    { num: 4, color: 'black' }, { num: 21, color: 'red' }, { num: 2, color: 'black' },
    { num: 25, color: 'red' }, { num: 17, color: 'black' }, { num: 34, color: 'red' },
    { num: 6, color: 'black' }, { num: 27, color: 'red' }, { num: 13, color: 'black' },
    { num: 36, color: 'red' }, { num: 11, color: 'black' }, { num: 30, color: 'red' },
    { num: 8, color: 'black' }, { num: 23, color: 'red' }, { num: 10, color: 'black' },
    { num: 5, color: 'red' }, { num: 24, color: 'black' }, { num: 16, color: 'red' },
    { num: 33, color: 'black' }, { num: 1, color: 'red' }, { num: 20, color: 'black' },
    { num: 14, color: 'red' }, { num: 31, color: 'black' }, { num: 9, color: 'red' },
    { num: 22, color: 'black' }, { num: 18, color: 'red' }, { num: 29, color: 'black' },
    { num: 7, color: 'red' }, { num: 28, color: 'black' }, { num: 12, color: 'red' },
    { num: 35, color: 'black' }, { num: 3, color: 'red' }, { num: 26, color: 'black' }
  ];

  return (
    <group ref={wheelRef}>
      {/* Outer rim - gold */}
      <mesh>
        <torusGeometry args={[3.2, 0.2, 16, 100]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Inner rim - black */}
      <mesh>
        <torusGeometry args={[2.8, 0.15, 16, 100]} />
        <meshStandardMaterial color="#000000" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Main wheel surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.2, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Number pockets */}
      {rouletteNumbers.map((pocket, index) => {
        const angle = (index / rouletteNumbers.length) * Math.PI * 2;
        const radius = 2.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        const pocketColor = 
          pocket.color === 'red' ? '#D72638' : 
          pocket.color === 'green' ? '#00FF88' : '#000000';

        return (
          <group key={pocket.num}>
            {/* Pocket */}
            <mesh position={[x, 0.1, z]} rotation={[-Math.PI / 2, 0, angle]}>
              <boxGeometry args={[0.3, 0.15, 0.4]} />
              <meshStandardMaterial 
                color={pocketColor}
                metalness={0.2}
                roughness={0.8}
                emissive={pocketColor}
                emissiveIntensity={0.05}
              />
            </mesh>
            
            {/* Number text would go here in a real implementation */}
          </group>
        );
      })}

      {/* Center hub - gold */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Roulette ball */}
      <mesh ref={ballRef} position={[2.8, 0.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

export function RouletteWheel3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute right-8 top-1/2 -translate-y-1/2 w-96 h-96 opacity-60"
      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
      animate={{ opacity: 0.6, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 2, 
        ease: [0.23, 1, 0.32, 1],
        delay: 1
      }}
    >
      <Canvas
        camera={{ position: [0, 8, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Key light from above */}
        <directionalLight 
          position={[0, 10, 5]} 
          intensity={1} 
          color="#FFD700"
          castShadow
        />
        
        {/* Rim light */}
        <directionalLight 
          position={[5, 5, -5]} 
          intensity={0.5} 
          color="#D72638"
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-5, 3, 5]} 
          intensity={0.3} 
          color="#00FF88"
        />

        <RouletteWheel />
      </Canvas>

      {/* Glow effect around the wheel */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)
          `,
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
