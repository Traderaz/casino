"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function CasinoWheel3D() {
  const [mounted, setMounted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // Physics-based rotation
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { 
    stiffness: 50, 
    damping: 20,
    mass: 2
  });
  
  // 3D transforms for depth
  const rotateX = useTransform(springRotation, [0, 360], [0, 5]);
  const scale = useTransform(springRotation, 
    [0, 90, 180, 270, 360], 
    [1, 1.05, 1, 0.95, 1]
  );

  useEffect(() => {
    setMounted(true);
    
    // Auto-spin with realistic physics
    const startSpin = () => {
      setIsSpinning(true);
      const targetRotation = rotation.get() + 360 * (3 + Math.random() * 4);
      rotation.set(targetRotation);
      
      setTimeout(() => {
        setIsSpinning(false);
      }, 4000);
    };

    // Start initial spin
    setTimeout(startSpin, 1000);
    
    // Periodic spins
    const interval = setInterval(startSpin, 12000);
    return () => clearInterval(interval);
  }, [rotation]);

  if (!mounted) return null;

  const segments = [
    { color: '#D72638', label: 'JACKPOT' },
    { color: '#000000', label: '2X' },
    { color: '#00FF88', label: 'WIN' },
    { color: '#000000', label: '5X' },
    { color: '#D72638', label: 'BONUS' },
    { color: '#000000', label: '3X' },
    { color: '#00FF88', label: 'FREE' },
    { color: '#000000', label: '10X' },
    { color: '#D72638', label: 'MEGA' },
    { color: '#000000', label: '4X' },
    { color: '#00FF88', label: 'SPIN' },
    { color: '#000000', label: '7X' },
  ];

  return (
    <motion.div
      ref={wheelRef}
      className="absolute right-8 top-1/2 -translate-y-1/2 w-96 h-96"
      initial={{ opacity: 0, scale: 0, rotateY: -90 }}
      animate={{ opacity: 0.8, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 2, 
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{
        perspective: '1000px',
        filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateZ: springRotation,
          rotateX,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer Ring with Segments */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offset"/>
                <feFlood floodColor="#000000" floodOpacity="0.3"/>
                <feComposite in2="offset" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {segments.map((segment, index) => {
              const angle = (360 / segments.length) * index;
              const nextAngle = (360 / segments.length) * (index + 1);
              const startAngleRad = (angle - 90) * (Math.PI / 180);
              const endAngleRad = (nextAngle - 90) * (Math.PI / 180);
              
              const x1 = 200 + 180 * Math.cos(startAngleRad);
              const y1 = 200 + 180 * Math.sin(startAngleRad);
              const x2 = 200 + 180 * Math.cos(endAngleRad);
              const y2 = 200 + 180 * Math.sin(endAngleRad);
              
              const largeArcFlag = (nextAngle - angle) > 180 ? 1 : 0;
              
              const pathData = [
                `M 200 200`,
                `L ${x1} ${y1}`,
                `A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="#FFD700"
                    strokeWidth="2"
                    filter="url(#innerShadow)"
                  />
                  <text
                    x={200 + 120 * Math.cos((angle + (nextAngle - angle) / 2 - 90) * (Math.PI / 180))}
                    y={200 + 120 * Math.sin((angle + (nextAngle - angle) / 2 - 90) * (Math.PI / 180))}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFD700"
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="Inter, sans-serif"
                    filter="url(#glow)"
                    transform={`rotate(${angle + (nextAngle - angle) / 2}, ${200 + 120 * Math.cos((angle + (nextAngle - angle) / 2 - 90) * (Math.PI / 180))}, ${200 + 120 * Math.sin((angle + (nextAngle - angle) / 2 - 90) * (Math.PI / 180))})`}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Gold Outer Ring */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              conic-gradient(from 0deg, 
                #FFD700 0deg, #F6C85A 30deg, #FFD700 60deg, #F6C85A 90deg,
                #FFD700 120deg, #F6C85A 150deg, #FFD700 180deg, #F6C85A 210deg,
                #FFD700 240deg, #F6C85A 270deg, #FFD700 300deg, #F6C85A 330deg, #FFD700 360deg
              )
            `,
            padding: '8px',
            boxShadow: `
              inset 0 0 20px rgba(255, 215, 0, 0.5),
              0 0 60px rgba(255, 215, 0, 0.4),
              0 0 100px rgba(255, 215, 0, 0.2)
            `,
          }}
        >
          <div className="w-full h-full rounded-full bg-black" />
        </div>

        {/* Center Hub */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-cinzel font-bold text-2xl"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #FFE55C 0%, #FFD700 50%, #F6C85A 100%)
            `,
            boxShadow: `
              inset 0 4px 8px rgba(255, 255, 255, 0.3),
              inset 0 -4px 8px rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(0, 0, 0, 0.5),
              0 0 40px rgba(255, 215, 0, 0.6)
            `,
            color: '#000000',
            textShadow: '0 2px 4px rgba(255, 255, 255, 0.3)',
            transform: 'translateZ(20px)',
          }}
          animate={{
            boxShadow: isSpinning ? [
              "inset 0 4px 8px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.6)",
              "inset 0 4px 8px rgba(255, 255, 255, 0.5), inset 0 -4px 8px rgba(0, 0, 0, 0.5), 0 12px 32px rgba(0, 0, 0, 0.7), 0 0 80px rgba(255, 215, 0, 0.8)",
              "inset 0 4px 8px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.6)"
            ] : undefined
          }}
          transition={{
            duration: 0.5,
            repeat: isSpinning ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          LC
        </motion.div>

        {/* Pointer */}
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '24px solid #FFD700',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
            transform: 'translateZ(30px)',
          }}
        />

        {/* Particle Effects */}
        {isSpinning && (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: '#FFD700',
                  left: '50%',
                  top: '50%',
                  boxShadow: '0 0 10px #FFD700',
                }}
                initial={{ 
                  scale: 0, 
                  x: 0, 
                  y: 0,
                  opacity: 1
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.cos(i * 18 * Math.PI / 180) * 200),
                  y: (Math.sin(i * 18 * Math.PI / 180) * 200),
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
