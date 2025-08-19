"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CasinoWheel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 opacity-30"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="relative w-full h-full">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-8 border-yellow-400"
          style={{
            background: `conic-gradient(
              #D72638 0deg, #D72638 11.25deg,
              #000000 11.25deg, #000000 22.5deg,
              #D72638 22.5deg, #D72638 33.75deg,
              #000000 33.75deg, #000000 45deg,
              #D72638 45deg, #D72638 56.25deg,
              #000000 56.25deg, #000000 67.5deg,
              #D72638 67.5deg, #D72638 78.75deg,
              #000000 78.75deg, #000000 90deg,
              #D72638 90deg, #D72638 101.25deg,
              #000000 101.25deg, #000000 112.5deg,
              #D72638 112.5deg, #D72638 123.75deg,
              #000000 123.75deg, #000000 135deg,
              #D72638 135deg, #D72638 146.25deg,
              #000000 146.25deg, #000000 157.5deg,
              #D72638 157.5deg, #D72638 168.75deg,
              #000000 168.75deg, #000000 180deg,
              #D72638 180deg, #D72638 191.25deg,
              #000000 191.25deg, #000000 202.5deg,
              #D72638 202.5deg, #D72638 213.75deg,
              #000000 213.75deg, #000000 225deg,
              #D72638 225deg, #D72638 236.25deg,
              #000000 236.25deg, #000000 247.5deg,
              #D72638 247.5deg, #D72638 258.75deg,
              #000000 258.75deg, #000000 270deg,
              #D72638 270deg, #D72638 281.25deg,
              #000000 281.25deg, #000000 292.5deg,
              #D72638 292.5deg, #D72638 303.75deg,
              #000000 303.75deg, #000000 315deg,
              #D72638 315deg, #D72638 326.25deg,
              #000000 326.25deg, #000000 337.5deg,
              #D72638 337.5deg, #D72638 348.75deg,
              #000000 348.75deg, #000000 360deg
            )`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-300 shadow-lg shadow-yellow-400/50" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-400/20 via-transparent to-transparent animate-pulse" />
      </div>
    </motion.div>
  );
}

// Keep the same fallback for consistency
export function CasinoWheelFallback() {
  return <CasinoWheel />;
}