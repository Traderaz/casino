"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SpinningChip() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute right-16 top-1/2 -translate-y-1/2 w-80 h-80 opacity-20"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full h-full">
        {/* Main chip body with red/green segments */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: `
              conic-gradient(
                from 0deg,
                #D72638 0deg, #D72638 30deg,
                #000000 30deg, #000000 60deg,
                #00FF88 60deg, #00FF88 90deg,
                #000000 90deg, #000000 120deg,
                #D72638 120deg, #D72638 150deg,
                #000000 150deg, #000000 180deg,
                #00FF88 180deg, #00FF88 210deg,
                #000000 210deg, #000000 240deg,
                #D72638 240deg, #D72638 270deg,
                #000000 270deg, #000000 300deg,
                #00FF88 300deg, #00FF88 330deg,
                #000000 330deg, #000000 360deg
              )
            `,
            boxShadow: `
              inset 0 4px 8px rgba(0, 0, 0, 0.3),
              inset 0 -4px 8px rgba(255, 255, 255, 0.1),
              0 0 40px rgba(255, 215, 0, 0.3)
            `
          }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />

        {/* Gold edge ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-8 border-yellow-400"
          style={{
            background: `
              radial-gradient(circle, transparent 70%, rgba(255, 215, 0, 0.1) 100%)
            `,
            boxShadow: `
              inset 0 2px 4px rgba(255, 215, 0, 0.4),
              inset 0 -2px 4px rgba(255, 215, 0, 0.2),
              0 0 60px rgba(255, 215, 0, 0.4),
              0 0 100px rgba(255, 215, 0, 0.2)
            `
          }}
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />

        {/* Center hub with logo */}
        <div 
          className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-cinzel font-bold text-2xl"
          style={{
            background: `
              radial-gradient(circle, #FFD700 0%, #F6C85A 100%)
            `,
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.3),
              inset 0 -2px 4px rgba(0, 0, 0, 0.3),
              0 4px 12px rgba(0, 0, 0, 0.5)
            `,
            color: '#000000',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)'
          }}
        >
          LC
        </div>

        {/* Soft bloom effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)
            `
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ridged texture lines */}
        <div className="absolute inset-8 rounded-full overflow-hidden">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                top: '50%',
                transformOrigin: 'center',
                transform: `rotate(${i * 15}deg) translateY(-50%)`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
