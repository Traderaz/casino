"use client";

import { motion } from "framer-motion";
import { PremiumPokerChip } from "@/components/ui/premium-poker-chip";
import { PremiumDice } from "@/components/ui/premium-dice";
import { memo, useMemo } from "react";

interface CasinoBackgroundProps {
  variant?: 'hero' | 'section';
  opacity?: number;
  className?: string;
}

// Deterministic random function for consistent SSR/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  const result = x - Math.floor(x);
  // Round to 4 decimal places to ensure consistency
  return Math.round(result * 10000) / 10000;
};

// Memoized background suits generation for better performance
const useBackgroundSuits = (count: number) => {
  return useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.round((seededRandom(i * 4.3) * 95 + 2.5) * 100) / 100,
      y: Math.round((seededRandom(i * 2.7) * 90 + 5) * 100) / 100,
      delay: Math.round(seededRandom(i * 6.1) * 3 * 100) / 100,
      duration: Math.round((6 + seededRandom(i * 2.3) * 6) * 100) / 100,
      suit: ['♦', '♠', '♥', '♣'][i % 4]
    })), [count]
  );
};

export const CasinoBackground = memo(function CasinoBackground({ 
  variant = 'section', 
  opacity = 0.15, 
  className = "" 
}: CasinoBackgroundProps) {
  const isHero = variant === 'hero';
  const chipCount = isHero ? 6 : 2; // 50% reduction
  const diceCount = isHero ? 3 : 1;
  const chipScale = isHero ? [0.4, 0.55, 0.4] : [0.3, 0.45, 0.3];
  const diceScale = isHero ? [0.7, 0.9, 0.7] : [0.5, 0.7, 0.5];
  const backgroundSuits = useBackgroundSuits(isHero ? 6 : 4); // 50% reduction in background suits

  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      {/* Background with vignette */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0B0D10]" />
        {!isHero && <div className="vignette" />}
      </div>

      {/* Casino-themed floating elements */}
      <div className="absolute inset-0">
        {/* Premium 3D Poker Chips */}
        {Array.from({ length: chipCount }, (_, i) => {
          const chipColors: Array<'green' | 'red' | 'gold' | 'purple' | 'blue'> = ['green', 'red', 'gold', 'purple', 'blue'];
          const chipColor = chipColors[i % chipColors.length];
          const chipValue = (i % 5) + 1;
          
          return (
            <motion.div
              key={`casino-chip-${i}`}
              className="absolute will-change-transform"
              style={{
                left: `${Math.round((seededRandom(i * 3.7) * 85 + 7.5) * 100) / 100}%`,
                top: `${Math.round((seededRandom(i * 2.1) * 75 + 12.5) * 100) / 100}%`,
                opacity: 0.7
              }}
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.8, 0.4],
                scale: chipScale
              }}
              transition={{
                duration: 8 + seededRandom(i * 4.1) * 6,
                repeat: Infinity,
                delay: seededRandom(i * 5.3) * 3,
                ease: "easeInOut"
              }}
            >
              <PremiumPokerChip
                color={chipColor}
                value={chipValue}
                size="small"
                isSelected={false}
                className="pointer-events-none will-change-transform"
              />
            </motion.div>
          );
        })}

        {/* Premium 3D Floating Dice */}
        {Array.from({ length: diceCount }, (_, i) => {
          // Create realistic dice where opposite faces add up to 7
          const frontValue = (i % 6) + 1 as 1 | 2 | 3 | 4 | 5 | 6;
          const backValue = (7 - frontValue) as 1 | 2 | 3 | 4 | 5 | 6;
          const rightValue = ((i + 1) % 6) + 1 as 1 | 2 | 3 | 4 | 5 | 6;
          const leftValue = (7 - rightValue) as 1 | 2 | 3 | 4 | 5 | 6;
          const topValue = ((i + 2) % 6) + 1 as 1 | 2 | 3 | 4 | 5 | 6;
          const bottomValue = (7 - topValue) as 1 | 2 | 3 | 4 | 5 | 6;
          
          const diceValues: [1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6] = [
            frontValue, rightValue, topValue, backValue, leftValue, bottomValue
          ];
          
          return (
            <motion.div
              key={`casino-dice-${i}`}
              className="absolute will-change-transform"
              style={{
                left: `${Math.round((seededRandom(i * 7.1) * 80 + 10) * 100) / 100}%`,
                top: `${Math.round((seededRandom(i * 3.9) * 70 + 15) * 100) / 100}%`,
                opacity: 0.6
              }}
              animate={{
                x: [-10, 10, -10],
                y: [-12, 12, -12],
                opacity: [0.3, 0.7, 0.3],
                scale: diceScale
              }}
              transition={{
                duration: 12 + seededRandom(i * 6.7) * 8,
                repeat: Infinity,
                delay: seededRandom(i * 4.3) * 4,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{
                  rotateX: [0, 180, 360],
                  rotateY: [0, -180, -360],
                  rotateZ: [0, 90, 180]
                }}
                transition={{
                  duration: 15 + seededRandom(i * 8.2) * 10,
                  repeat: Infinity,
                  delay: seededRandom(i * 3.7) * 5,
                  ease: "linear"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <PremiumDice
                  values={diceValues}
                  size="small"
                  className="pointer-events-none will-change-transform"
                />
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Enhanced floating card suits with casino colors */}
        {['♠', '♥', '♦', '♣'].map((suit, i) => (
          <motion.div
            key={`suit-${i}`}
            className="absolute text-2xl font-bold will-change-transform"
            style={{
              left: `${(i * 20 + 10) % 80 + 10}%`,
              top: `${(i * 25 + 20) % 70 + 15}%`,
              color: suit === '♥' || suit === '♦' ? '#DC2626' : '#00B366',
              opacity: 0.4,
              textShadow: `0 0 10px ${suit === '♥' || suit === '♦' ? '#DC262620' : '#00B36620'}`
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {suit}
          </motion.div>
        ))}

        {/* Floating playing card suits background */}
        {backgroundSuits.map((suitData) => {
          const isRed = suitData.suit === '♥' || suitData.suit === '♦';
          const color = isRed ? '#DC2626' : '#00B366';
          const shadowColor = isRed ? '#DC262640' : '#00B36640';
          
          return (
            <motion.div
              key={`suit-bg-${suitData.id}`}
              className="absolute text-3xl font-bold select-none will-change-transform"
              style={{
                left: `${suitData.x}%`,
                top: `${suitData.y}%`,
                color: color,
                opacity: '0.4',
                textShadow: `0 0 16px ${shadowColor}`,
                fontSize: '32px'
              }}
              animate={{
                scale: [0.9, 1.3, 0.9],
                opacity: [0.25, 0.45, 0.25],
                rotate: [-8, 8, -8]
              }}
              transition={{
                duration: suitData.duration,
                repeat: Infinity,
                delay: suitData.delay,
                ease: "easeInOut"
              }}
            >
              {suitData.suit}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});