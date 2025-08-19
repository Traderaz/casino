"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function VegasCasinoBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Deep casino black base with subtle gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(215, 38, 56, 0.02) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 20% 100%, rgba(255, 215, 0, 0.015) 0%, transparent 50%),
            radial-gradient(ellipse 100% 70% at 80% 100%, rgba(0, 255, 136, 0.01) 0%, transparent 50%),
            #000000
          `
        }}
      />

      {/* Sweeping spotlight beams */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`spotlight-${i}`}
          className="absolute top-0 w-2 h-full opacity-30"
          style={{
            left: `${20 + i * 20}%`,
            background: `linear-gradient(180deg, 
              rgba(255, 215, 0, 0.4) 0%, 
              rgba(255, 215, 0, 0.2) 30%, 
              rgba(255, 215, 0, 0.1) 60%, 
              transparent 100%)`,
            filter: 'blur(8px)',
            transform: 'skewX(-15deg)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Floating gold dust particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }, (_, i) => (
          <motion.div
            key={`gold-dust-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `radial-gradient(circle, #FFD700 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%)`,
              boxShadow: '0 0 4px rgba(255, 215, 0, 0.8)',
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Velvet felt texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='feltTexture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23feltTexture)' opacity='0.3'/%3E%3C/svg%3E")
          `,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Ambient casino lighting from floor */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `
            linear-gradient(0deg, 
              rgba(215, 38, 56, 0.05) 0%, 
              rgba(255, 215, 0, 0.03) 50%, 
              transparent 100%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)
          `
        }}
      />
    </div>
  );
}
