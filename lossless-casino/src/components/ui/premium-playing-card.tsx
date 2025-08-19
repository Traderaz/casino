"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';

export interface PremiumPlayingCardProps {
  suit: '♠' | '♥' | '♦' | '♣';
  rank: 'A' | 'K' | 'Q' | 'J' | '10';
  isRevealed?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  title?: string;
  description?: string;
  status?: 'active' | 'upcoming' | 'future';
}

const suitColors = {
  '♠': '#E9EEF5', // White for spades
  '♥': '#DC2626', // Red for hearts
  '♦': '#DC2626', // Red for diamonds
  '♣': '#E9EEF5', // White for clubs
};

const statusColors = {
  active: '#00E28A',
  upcoming: '#D9B45B',
  future: '#A6B0BF'
};

const sizeConfigs = {
  small: { width: 126, height: 198 },
  medium: { width: 90, height: 126 },
  large: { width: 156, height: 218 }
};

export const PremiumPlayingCard = memo(function PremiumPlayingCard({
  suit,
  rank,
  isRevealed = false,
  onClick,
  className = '',
  size = 'large',
  title,
  description,
  status = 'future'
}: PremiumPlayingCardProps) {
  const suitColor = suitColors[suit];
  const statusColor = statusColors[status];
  const { width, height } = sizeConfigs[size];

  return (
    <motion.div 
      className={`relative ${className}`} 
      style={{ width, height }}
      animate={{
        filter: isRevealed 
          ? [`drop-shadow(0 0 0px ${statusColor}00)`, `drop-shadow(0 0 20px ${statusColor}80)`, `drop-shadow(0 0 10px ${statusColor}60)`]
          : `drop-shadow(0 0 0px ${statusColor}00)`
      }}
      transition={{ 
        filter: { duration: 1, ease: "easeOut" }
      }}
    >
      <motion.div
        className="w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ 
          rotateY: isRevealed ? 180 : 0,
          scale: isRevealed ? [1, 1.1, 1] : 1,
          y: isRevealed ? [0, -10, 0] : 0
        }}
        transition={{ 
          rotateY: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
          scale: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
          y: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Card Back */}
        <motion.div
          className="absolute inset-0 rounded-xl shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(217, 180, 91, 0.3) 0%, 
                rgba(217, 180, 91, 0.1) 30%, 
                #1a1d23 100%
              )
            `,
            border: '2px solid #D9B45B',
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.1),
              inset 0 -2px 4px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(217, 180, 91, 0.2)
            `
          }}
        >
          {/* Ornate back pattern */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-lg border border-[#D9B45B]/30 flex items-center justify-center">
            <div className="text-2xl sm:text-4xl md:text-6xl text-[#D9B45B]/40 font-bold">🎰</div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-2 h-2 sm:w-4 sm:h-4 border-l-2 border-t-2 border-[#D9B45B]/50 rounded-tl-lg" />
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-2 h-2 sm:w-4 sm:h-4 border-r-2 border-t-2 border-[#D9B45B]/50 rounded-tr-lg" />
          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-2 h-2 sm:w-4 sm:h-4 border-l-2 border-b-2 border-[#D9B45B]/50 rounded-bl-lg" />
          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-2 h-2 sm:w-4 sm:h-4 border-r-2 border-b-2 border-[#D9B45B]/50 rounded-br-lg" />
        </motion.div>

        {/* Card Front */}
        <motion.div
          className="absolute inset-0 rounded-xl shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            rotateY: 180,
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(248, 250, 252, 0.9) 100%
              )
            `,
            border: `2px solid ${statusColor}`,
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3),
              inset 0 -2px 4px rgba(0, 0, 0, 0.1),
              0 0 20px ${statusColor}40
            `
          }}
        >
          {/* Playing card layout */}
          <div className="relative w-full h-full p-1 sm:p-2 md:p-3">
            {/* Top left rank and suit */}
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 flex flex-col items-center leading-none">
              <div 
                className="text-xs sm:text-sm md:text-lg font-bold"
                style={{ color: suitColor === '#E9EEF5' ? '#1F2937' : suitColor }}
              >
                {rank}
              </div>
              <div 
                className="text-xs sm:text-sm md:text-lg"
                style={{ color: suitColor === '#E9EEF5' ? '#1F2937' : suitColor }}
              >
                {suit}
              </div>
            </div>

            {/* Bottom right rank and suit (rotated) */}
            <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex flex-col items-center leading-none transform rotate-180">
              <div 
                className="text-xs sm:text-sm md:text-lg font-bold"
                style={{ color: suitColor === '#E9EEF5' ? '#1F2937' : suitColor }}
              >
                {rank}
              </div>
              <div 
                className="text-xs sm:text-sm md:text-lg"
                style={{ color: suitColor === '#E9EEF5' ? '#1F2937' : suitColor }}
              >
                {suit}
              </div>
            </div>

            {/* Center content area */}
            <div className="absolute inset-2 sm:inset-3 md:inset-4 lg:inset-6 flex flex-col items-center justify-center text-center">
              {/* Large center suit */}
              <div 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2"
                style={{ color: suitColor === '#E9EEF5' ? '#1F2937' : suitColor }}
              >
                {suit}
              </div>

              {/* Phase content */}
              {title && (
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-xs text-gray-600 leading-tight">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Status indicator */}
            <div 
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white flex items-center justify-center z-20"
              style={{ 
                backgroundColor: statusColor,
                boxShadow: `0 2px 8px ${statusColor}66`
              }}
            >
              <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating chips around active card */}
      {status === 'active' && (
        <>
          <motion.div
            className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8"
            animate={{ 
              rotate: [0, 360],
              y: [-2, 2, -2]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div 
              className="w-4 h-4 sm:w-8 sm:h-8 rounded-full border-2"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${statusColor}80, ${statusColor}40)`,
                borderColor: statusColor,
                boxShadow: `0 4px 12px ${statusColor}60`
              }}
            />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-3 h-3 sm:w-6 sm:h-6"
            animate={{ 
              rotate: [360, 0],
              y: [2, -2, 2]
            }}
            transition={{ 
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          >
            <div 
              className="w-3 h-3 sm:w-6 sm:h-6 rounded-full border-2"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${statusColor}80, ${statusColor}40)`,
                borderColor: statusColor,
                boxShadow: `0 3px 9px ${statusColor}60`
              }}
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
});
