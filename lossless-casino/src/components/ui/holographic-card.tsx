"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HolographicCard({ children, className = "", delay = 0 }: HolographicCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, z: -100, rotateX: 45, scale: 0.8 }}
      animate={{ opacity: 1, z: 0, rotateX: 0, scale: 1 }}
      transition={{ 
        duration: 1.2, 
        delay,
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 60,
        damping: 15
      }}
      whileHover={{
        z: 20,
        rotateX: -5,
        rotateY: 5,
        scale: 1.02,
      }}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Main holographic surface */}
      <div 
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(0, 255, 200, 0.1) 0%, 
              rgba(0, 100, 255, 0.05) 50%, 
              rgba(255, 0, 150, 0.08) 100%
            )
          `,
          backdropFilter: 'blur(20px) saturate(200%)',
          border: '1px solid rgba(0, 255, 200, 0.3)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 10px 30px rgba(0, 255, 200, 0.1),
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(0, 255, 200, 0.1)
          `,
        }}
      >
        {/* Holographic shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                rgba(0, 255, 200, 0.2) 30%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(0, 255, 200, 0.2) 70%,
                transparent 100%
              )
            `,
            transform: 'translateX(-100%)',
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />

        {/* Holographic grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 200, 0.1) 25%, rgba(0, 255, 200, 0.1) 26%, transparent 27%),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 200, 0.1) 25%, rgba(0, 255, 200, 0.1) 26%, transparent 27%)
            `,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Floating particles inside the card */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(0, 255, 200, 0.8) 0%, transparent 70%)`,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Corner holographic indicators */}
        <div className="absolute top-2 left-2 w-4 h-4">
          <div className="absolute inset-0 border-l-2 border-t-2 border-cyan-400 opacity-60" />
          <motion.div
            className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              boxShadow: [
                '0 0 4px rgba(0, 255, 200, 0.5)',
                '0 0 12px rgba(0, 255, 200, 0.8)',
                '0 0 4px rgba(0, 255, 200, 0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <div className="absolute top-2 right-2 w-4 h-4">
          <div className="absolute inset-0 border-r-2 border-t-2 border-cyan-400 opacity-60" />
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              boxShadow: [
                '0 0 4px rgba(0, 255, 200, 0.5)',
                '0 0 12px rgba(0, 255, 200, 0.8)',
                '0 0 4px rgba(0, 255, 200, 0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* Holographic depth shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          background: 'rgba(0, 255, 200, 0.05)',
          filter: 'blur(10px)',
          transform: 'translateZ(-10px) translateY(5px)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
