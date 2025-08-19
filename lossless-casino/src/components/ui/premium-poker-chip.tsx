"use client";

import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";

interface PremiumPokerChipProps {
  color: 'green' | 'red' | 'gold' | 'purple' | 'blue';
  value: number;
  size?: 'small' | 'medium' | 'large';
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const chipConfigs = {
  green: {
    primary: '#00B366',
    secondary: '#00E28A',
    accent: '#004D2A',
    highlight: '#66FFB3',
    shadow: 'rgba(0, 179, 102, 0.4)'
  },
  red: {
    primary: '#DC2626',
    secondary: '#EF4444',
    accent: '#7F1D1D',
    highlight: '#FCA5A5',
    shadow: 'rgba(220, 38, 38, 0.4)'
  },
  gold: {
    primary: '#D9B45B',
    secondary: '#F59E0B',
    accent: '#92400E',
    highlight: '#FDE68A',
    shadow: 'rgba(217, 180, 91, 0.4)'
  },
  purple: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#5B21B6',
    highlight: '#C4B5FD',
    shadow: 'rgba(139, 92, 246, 0.4)'
  },
  blue: {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#1E40AF',
    highlight: '#DBEAFE',
    shadow: 'rgba(59, 130, 246, 0.4)'
  }
};

const sizeConfigs = {
  small: { size: 64, fontSize: 'text-lg', suitSize: 'text-sm', padding: 2 },
  medium: { size: 100, fontSize: 'text-2xl', suitSize: 'text-base', padding: 3 },
  large: { size: 120, fontSize: 'text-3xl', suitSize: 'text-lg', padding: 4 }
};

export const PremiumPokerChip = memo(function PremiumPokerChip({ 
  color, 
  value, 
  size = 'medium', 
  isSelected = false, 
  onClick,
  className = "" 
}: PremiumPokerChipProps) {
  const [mounted, setMounted] = useState(false);
  const config = chipConfigs[color];
  const sizeConfig = sizeConfigs[size];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        filter: "brightness(1.1) saturate(1.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      style={{ width: sizeConfig.size, height: sizeConfig.size }}
    >
      {/* Selection ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${config.highlight}, ${config.secondary}, ${config.highlight})`,
            padding: '3px'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-[#0B0D10]" />
        </motion.div>
      )}

      {/* Main chip container */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(
              ellipse at 30% 30%,
              ${config.highlight}33,
              ${config.secondary} 40%,
              ${config.primary} 70%,
              ${config.accent} 100%
            )
          `,
          boxShadow: `
            0 ${sizeConfig.size * 0.1}px ${sizeConfig.size * 0.3}px ${config.shadow},
            inset 0 ${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(255, 255, 255, 0.4),
            inset 0 -${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(0, 0, 0, 0.3),
            0 0 ${sizeConfig.size * 0.5}px ${config.shadow}
          `
        }}
        animate={{
          boxShadow: [
            `0 ${sizeConfig.size * 0.1}px ${sizeConfig.size * 0.3}px ${config.shadow}, inset 0 ${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(255, 255, 255, 0.4), inset 0 -${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(0, 0, 0, 0.3), 0 0 ${sizeConfig.size * 0.5}px ${config.shadow}`,
            `0 ${sizeConfig.size * 0.15}px ${sizeConfig.size * 0.4}px ${config.shadow}, inset 0 ${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(255, 255, 255, 0.4), inset 0 -${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(0, 0, 0, 0.3), 0 0 ${sizeConfig.size * 0.6}px ${config.shadow}`,
            `0 ${sizeConfig.size * 0.1}px ${sizeConfig.size * 0.3}px ${config.shadow}, inset 0 ${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(255, 255, 255, 0.4), inset 0 -${sizeConfig.size * 0.02}px ${sizeConfig.size * 0.04}px rgba(0, 0, 0, 0.3), 0 0 ${sizeConfig.size * 0.5}px ${config.shadow}`
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Outer decorative ring - simplified */}
        <div 
          className="absolute rounded-full border-2"
          style={{
            inset: sizeConfig.size * 0.1,
            borderColor: `${config.accent}66`,
            background: `radial-gradient(circle, transparent 60%, ${config.accent}22 100%)`
          }}
        />

                {/* Playing card suits around the edge - only 4 symbols for clarity */}
        {Array.from({ length: 4 }).map((_, suitIndex) => {
          const suits = ['♠', '♥', '♦', '♣'];
          const suit = suits[suitIndex];
          const angle = (suitIndex * 90) * (Math.PI / 180); // 90 degrees apart
          const radius = sizeConfig.size * 0.32;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isRed = suit === '♥' || suit === '♦';
          
          return (
            <div
              key={suitIndex}
              className={`absolute font-bold ${isRed ? 'text-red-300' : 'text-white'} flex items-center justify-center z-20`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${sizeConfig.size * 0.16}px`, // Make symbols larger
                textShadow: `0 2px 4px rgba(0,0,0,0.9), 0 0 ${sizeConfig.size * 0.05}px rgba(255,255,255,0.6)`,
                filter: `drop-shadow(0 0 ${sizeConfig.size * 0.03}px rgba(255,255,255,0.7))`
              }}
            >
              {suit}
            </div>
          );
        })}

        {/* Inner beveled ring */}
        <div 
          className="absolute rounded-full"
          style={{
            inset: sizeConfig.size * 0.22,
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(255,255,255,0.3) 0%, 
                transparent 50%
              ),
              radial-gradient(circle at 70% 70%, 
                rgba(0,0,0,0.4) 0%, 
                transparent 50%
              ),
              ${config.primary}
            `,
            boxShadow: `
              inset 0 ${sizeConfig.size * 0.01}px ${sizeConfig.size * 0.02}px rgba(255,255,255,0.6),
              inset 0 -${sizeConfig.size * 0.01}px ${sizeConfig.size * 0.02}px rgba(0,0,0,0.4)
            `
          }}
        />

        {/* Center value display */}
        <div 
          className={`absolute inset-0 flex items-center justify-center ${sizeConfig.fontSize} font-bold text-white z-10`}
          style={{
            textShadow: `
              0 1px 3px rgba(0,0,0,0.8),
              0 0 ${sizeConfig.size * 0.05}px rgba(255,255,255,0.3)
            `,
            filter: `drop-shadow(0 0 ${sizeConfig.size * 0.02}px rgba(255,255,255,0.4))`
          }}
        >
          {value}
        </div>

        {/* Subtle rotating highlight */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: sizeConfig.size * 0.15,
            background: `
              conic-gradient(
                from 0deg,
                transparent 0deg,
                rgba(255,255,255,0.15) 30deg,
                rgba(255,255,255,0.05) 60deg,
                transparent 90deg,
                transparent 360deg
              )
            `
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Additional premium glow effect */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: sizeConfig.size * 0.12,
            background: `radial-gradient(circle at 50% 50%, ${config.shadow} 0%, transparent 70%)`,
            opacity: 0.3
          }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle texture ring instead of lines */}
        <div 
          className="absolute rounded-full"
          style={{ 
            inset: sizeConfig.size * 0.18,
            background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)`,
            border: `1px solid rgba(255,255,255,0.1)`
          }}
        />
      </motion.div>
    </motion.div>
  );
});
