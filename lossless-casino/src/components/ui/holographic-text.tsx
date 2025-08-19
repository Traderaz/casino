"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface HolographicTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glitchEffect?: boolean;
}

export function HolographicText({ 
  children, 
  className = "", 
  delay = 0, 
  glitchEffect = false 
}: HolographicTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, z: -50, rotateX: 90 }}
      animate={{ opacity: 1, z: 0, rotateX: 0 }}
      transition={{ 
        duration: 1.5, 
        delay,
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 50,
        damping: 12
      }}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Main holographic text */}
      <motion.div
        className="relative"
        style={{
          textShadow: `
            0 0 5px rgba(0, 255, 200, 0.8),
            0 0 10px rgba(0, 255, 200, 0.6),
            0 0 20px rgba(0, 255, 200, 0.4),
            0 0 40px rgba(0, 255, 200, 0.2),
            0 0 80px rgba(0, 255, 200, 0.1)
          `,
          color: '#00FFC8',
          filter: 'brightness(1.2) saturate(1.3)',
        }}
        animate={glitchEffect ? {
          textShadow: [
            '0 0 5px rgba(0, 255, 200, 0.8), 0 0 10px rgba(0, 255, 200, 0.6), 0 0 20px rgba(0, 255, 200, 0.4)',
            '2px 0 5px rgba(255, 0, 100, 0.8), -2px 0 10px rgba(0, 255, 200, 0.6), 0 0 20px rgba(0, 255, 200, 0.4)',
            '0 0 5px rgba(0, 255, 200, 0.8), 0 0 10px rgba(0, 255, 200, 0.6), 0 0 20px rgba(0, 255, 200, 0.4)',
          ],
          transform: [
            'translateX(0px)',
            'translateX(2px)',
            'translateX(0px)',
          ]
        } : {
          textShadow: [
            '0 0 5px rgba(0, 255, 200, 0.8), 0 0 10px rgba(0, 255, 200, 0.6), 0 0 20px rgba(0, 255, 200, 0.4)',
            '0 0 8px rgba(0, 255, 200, 1.0), 0 0 15px rgba(0, 255, 200, 0.8), 0 0 30px rgba(0, 255, 200, 0.6)',
            '0 0 5px rgba(0, 255, 200, 0.8), 0 0 10px rgba(0, 255, 200, 0.6), 0 0 20px rgba(0, 255, 200, 0.4)',
          ]
        }}
        transition={{
          duration: glitchEffect ? 0.1 : 2,
          repeat: Infinity,
          ease: glitchEffect ? "easeInOut" : "easeInOut",
          repeatType: glitchEffect ? "reverse" : "reverse",
        }}
      >
        {children}
      </motion.div>

      {/* Holographic depth layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          color: '#00FFC8',
          opacity: 0.3,
          transform: 'translateZ(-5px) translateY(1px)',
          filter: 'blur(1px)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          color: '#0088FF',
          opacity: 0.2,
          transform: 'translateZ(-10px) translateY(2px)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        {children}
      </motion.div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        <motion.div
          className="absolute w-full h-0.5"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 200, 0.8) 50%, transparent 100%)',
            boxShadow: '0 0 10px rgba(0, 255, 200, 0.5)',
          }}
          animate={{
            top: ['-2px', '100%', '-2px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      </motion.div>

      {/* Holographic particles around text */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`text-particle-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              background: 'rgba(0, 255, 200, 0.8)',
              boxShadow: '0 0 4px rgba(0, 255, 200, 0.5)',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
