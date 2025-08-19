"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface DiceProps {
  phase: {
    title: string;
    description: string;
    status: 'active' | 'upcoming' | 'future';
    phase: string;
    timeline: string;
  };
  isRevealed: boolean;
  onClick: () => void;
  size?: 'small' | 'large';
  index: number;
}

const statusColors = {
  active: "#00E28A",
  upcoming: "#D9B45B", 
  future: "#A6B0BF"
};

// Dice face symbols for each phase
const diceSymbols = {
  0: "🚀", // MVP - Rocket
  1: "🎮", // Multi-game - Game controller
  2: "🏆", // Lossless Casino - Trophy
  3: "📱", // Mobile & Multi-chain - Mobile
};

export function PremiumDiceRoadmap({ phase, isRevealed, onClick, size = 'large', index }: DiceProps) {
  const [isRolling, setIsRolling] = useState(false);
  const statusColor = statusColors[phase.status];
  const symbol = diceSymbols[index as keyof typeof diceSymbols];
  
  const sizeClasses = {
    small: "w-20 h-20",
    large: "w-28 h-28"
  };

  const textSizes = {
    small: {
      symbol: "text-2xl",
      title: "text-xs",
      phase: "text-xs"
    },
    large: {
      symbol: "text-4xl",
      title: "text-sm", 
      phase: "text-sm"
    }
  };

  useEffect(() => {
    if (isRevealed && !isRolling) {
      setIsRolling(true);
      // Reset rolling state after animation
      setTimeout(() => setIsRolling(false), 1000);
    }
  }, [isRevealed, isRolling]);

  return (
    <div className="flex flex-col items-center">
      {/* 3D Dice Container */}
      <motion.div
        className={`
          ${sizeClasses[size]} 
          relative cursor-pointer perspective-1000
        `}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Dice Shadow */}
        <motion.div
          className={`
            absolute -bottom-2 left-1/2 transform -translate-x-1/2
            ${size === 'small' ? 'w-16 h-8' : 'w-24 h-10'}
            bg-black/20 rounded-full blur-md
          `}
          animate={{
            scale: isRevealed ? 1 : 0.5,
            opacity: isRevealed ? 0.3 : 0.1
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Main Dice */}
        <motion.div
          className={`
            ${sizeClasses[size]}
            relative transform-gpu
            rounded-2xl border-4 backdrop-blur-sm
            bg-gradient-to-br from-white/20 to-white/5
            shadow-2xl overflow-hidden
          `}
          style={{ 
            borderColor: statusColor,
            boxShadow: `
              0 0 20px ${statusColor}40,
              inset 0 0 20px ${statusColor}20,
              0 8px 32px rgba(0,0,0,0.4)
            `
          }}
          initial={{ 
            rotateX: -90,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.8,
            opacity: 0
          }}
          animate={isRevealed ? {
            rotateX: isRolling ? [0, 360, 720, 0] : 0,
            rotateY: isRolling ? [0, 180, 360, 0] : 0,
            rotateZ: isRolling ? [0, 90, 180, 0] : 0,
            scale: 1,
            opacity: 1
          } : {
            rotateX: -90,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.8,
            opacity: 0.3
          }}
          transition={{ 
            duration: isRolling ? 1.2 : 0.8,
            ease: isRolling ? [0.25, 0.46, 0.45, 0.94] : [0.16, 1, 0.3, 1],
            times: isRolling ? [0, 0.3, 0.7, 1] : undefined
          }}
        >
          {/* Dice Face Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            {/* Symbol */}
            <motion.div
              className={`${textSizes[size].symbol} mb-1`}
              animate={{
                scale: isRevealed ? [1, 1.2, 1] : 0.8,
                opacity: isRevealed ? 1 : 0.5
              }}
              transition={{ 
                duration: 0.6,
                delay: isRevealed ? 0.8 : 0
              }}
            >
              {symbol}
            </motion.div>
            
            {/* Phase Number */}
            <motion.div
              className={`
                ${textSizes[size].phase} font-black text-center leading-none
              `}
              style={{ 
                color: statusColor,
                textShadow: `0 0 8px ${statusColor}88`,
                WebkitTextStroke: `1px ${statusColor}40`
              }}
              animate={{
                opacity: isRevealed ? 1 : 0.3
              }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              {phase.phase}
            </motion.div>
          </div>

          {/* Glowing Edge Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(45deg, ${statusColor}20, transparent, ${statusColor}20)`
            }}
            animate={{
              opacity: isRevealed ? [0, 0.6, 0] : 0
            }}
            transition={{
              duration: 2,
              repeat: isRevealed ? Infinity : 0,
              repeatType: "reverse"
            }}
          />

          {/* Corner Dots (Traditional Dice Style) */}
          <div className="absolute inset-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`
                  absolute w-1.5 h-1.5 rounded-full
                  ${i === 0 ? 'top-0 left-0' : ''}
                  ${i === 1 ? 'top-0 right-0' : ''}
                  ${i === 2 ? 'bottom-0 left-0' : ''}
                  ${i === 3 ? 'bottom-0 right-0' : ''}
                `}
                style={{ backgroundColor: statusColor }}
                animate={{
                  scale: isRevealed ? [0, 1] : 0,
                  opacity: isRevealed ? 0.8 : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: 1 + (i * 0.1) 
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Phase Information */}
      <motion.div 
        className="mt-4 text-center max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isRevealed ? 1 : 0.7,
          y: isRevealed ? 0 : 10
        }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        {/* Title */}
        <motion.h3 
          className={`
            ${textSizes[size].title} font-bold mb-2 leading-tight
          `}
          style={{ 
            color: statusColor,
            textShadow: `0 0 8px ${statusColor}60`
          }}
        >
          {phase.title}
        </motion.h3>

        {/* Status Badge */}
        <motion.div 
          className={`
            inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 backdrop-blur-sm mb-2
            ${size === 'small' ? 'text-xs' : 'text-sm'}
          `}
          style={{ 
            color: statusColor,
            borderColor: statusColor,
            backgroundColor: `${statusColor}15`,
            textShadow: `0 0 8px ${statusColor}88`
          }}
          animate={{
            scale: isRevealed ? [1, 1.05, 1] : 1,
            boxShadow: isRevealed ? `0 0 20px ${statusColor}40` : 'none'
          }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <span className="font-bold">{phase.timeline}</span>
        </motion.div>

        {/* Description (Desktop only) */}
        {size === 'large' && (
          <motion.p 
            className="text-xs text-[#A6B0BF] leading-relaxed hidden sm:block"
            animate={{ opacity: isRevealed ? 1 : 0.6 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          >
            {phase.description}
          </motion.p>
        )}
      </motion.div>

      {/* Mobile Info Card (appears below dice on mobile) */}
      {size === 'small' && isRevealed && (
        <motion.div
          className="mt-3 p-3 rounded-xl border backdrop-blur-sm sm:hidden max-w-xs"
          style={{ 
            borderColor: `${statusColor}40`,
            backgroundColor: `${statusColor}10`
          }}
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.8 }}
        >
          <p className="text-xs text-[#A6B0BF] leading-relaxed text-center">
            {phase.description}
          </p>
        </motion.div>
      )}
    </div>
  );
}
