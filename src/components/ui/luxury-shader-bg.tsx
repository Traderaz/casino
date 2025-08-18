"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LuxuryShaderBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base liquid black gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(215, 38, 56, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 70%, rgba(0, 255, 136, 0.015) 0%, transparent 50%),
            linear-gradient(180deg, #000000 0%, #0F1115 30%, #000000 100%)
          `
        }}
      />
      
      {/* Sweeping light beams */}
      <div className="spotlight-sweep" />
      <div 
        className="spotlight-sweep" 
        style={{ animationDelay: '4s', animationDirection: 'reverse' }}
      />
      
      {/* Floating gold particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={`gold-particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Subtle brushed metal lines */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 49%, rgba(255, 215, 0, 0.1) 50%, transparent 51%),
            linear-gradient(90deg, transparent 49%, rgba(255, 215, 0, 0.05) 50%, transparent 51%)
          `,
          backgroundSize: '100px 100px, 150px 150px',
        }}
      />
      
      {/* Soft vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)
          `
        }}
      />
      
      {/* Bottom fade for readability */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>
  );
}
