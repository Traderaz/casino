"use client";

import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import { PremiumDice } from "@/components/ui/premium-dice";

interface DiceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface PremiumDiceFeaturesProps {
  cards: DiceCard[];
  isRolling: boolean;
  onRoll: () => void;
  className?: string;
}

export const PremiumDiceFeatures = memo(function PremiumDiceFeatures({
  cards,
  isRolling,
  onRoll,
  className = ''
}: PremiumDiceFeaturesProps) {
  const [rolledDice, setRolledDice] = useState<DiceCard[]>([]);
  const [rollingIndex, setRollingIndex] = useState(-1);
  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    if (isRolling && cards.length > 0) {
      // Reset state
      setRolledDice([]);
      setRollingIndex(-1);
      setGameId(prev => prev + 1);
      
      // Roll all dice simultaneously (like a real dice throw)
      const diceToRoll = cards.slice(0, 3);
      
      // Show rolling state briefly
      setRollingIndex(0);
      
      // After a short delay, show all dice landing
      setTimeout(() => {
        setRollingIndex(-1);
        // Add all dice at once but with staggered landing times
        diceToRoll.forEach((dice, index) => {
          setTimeout(() => {
            setRolledDice(prev => [...prev, dice]);
          }, index * 200); // Quick succession for realistic effect
        });
      }, 800); // Brief rolling animation
    }
  }, [isRolling, cards]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Casino Table */}
      <div className="relative w-full max-w-6xl">
        {/* Table Felt */}
        <div 
          className="w-full h-[24rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem] xl:h-[32rem] rounded-xl sm:rounded-2xl md:rounded-3xl relative overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, 
                rgba(139, 34, 34, 0.8) 0%, 
                rgba(100, 0, 0, 0.6) 40%, 
                rgba(50, 0, 0, 0.4) 80%, 
                rgba(0, 0, 0, 0.8) 100%
              )
            `,
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.8),
              inset 0 4px 8px rgba(255, 255, 255, 0.1),
              inset 0 -4px 8px rgba(0, 0, 0, 0.5)
            `
          }}
        >
          {/* Table Border */}
          <div className="absolute inset-2 sm:inset-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-[#D9B45B] opacity-30" />
          
          {/* Dealer Area Label */}
          <div className="absolute top-2 sm:top-4 md:top-8 left-1/2 transform -translate-x-1/2">
            <div className="px-2 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 bg-black/50 rounded-full border border-[#D9B45B]/50 backdrop-blur-sm">
              <span className="text-[#D9B45B] font-bold text-xs sm:text-sm">LOSSLESS CASINO</span>
            </div>
          </div>

          {/* Dice Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Deck placeholder when no dice rolled */}
            {rolledDice.length === 0 && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="relative transform-gpu"
                  animate={{ 
                    rotateY: [0, 5, -5, 0],
                    rotateX: [0, -2, 2, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  {/* Deck Dice Shadow */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-black/30 rounded-full blur-lg" />
                  
                  <PremiumDice
                    values={[1, 2, 3, 4, 5, 6]}
                    size="large"
                    className="drop-shadow-2xl"
                    style={{
                      filter: `drop-shadow(0 0 20px #D9B45B40) drop-shadow(0 8px 32px rgba(0,0,0,0.4))`
                    }}
                  />
                </motion.div>
                <div className="text-[#D9B45B] text-xs sm:text-sm font-bold mt-2 sm:mt-3">
                  DICE
                </div>
              </motion.div>
            )}

            {/* Rolled Dice Display */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-2 sm:px-4">
              {rolledDice.map((dice, index) => (
                <motion.div
                  key={`${gameId}-${dice.id}`}
                  className="flex flex-col items-center"
                  initial={{ 
                    x: Math.random() * 200 - 100, // Random horizontal start position
                    y: -150 - Math.random() * 100, // High drop from above
                    rotateX: Math.random() * 360,
                    rotateY: Math.random() * 360,
                    rotateZ: Math.random() * 360,
                    scale: 0.3,
                    opacity: 0.8 
                  }}
                  animate={{ 
                    x: [
                      Math.random() * 200 - 100, // Initial random position
                      Math.random() * 60 - 30,   // Bounce position
                      Math.random() * 20 - 10,   // Small settle bounce
                      0                          // Final center position
                    ], 
                    y: [
                      -150 - Math.random() * 100, // High drop
                      -20 - Math.random() * 30,   // First bounce (not quite settled)
                      -5,                         // Small bounce
                      0                           // Final settled position
                    ], 
                    rotateX: [
                      Math.random() * 360,        // Random initial rotation
                      Math.random() * 720 + 360,  // Multiple spins during fall
                      Math.random() * 180,        // Settle rotation
                      0                           // Final settled rotation
                    ],
                    rotateY: [
                      Math.random() * 360,
                      Math.random() * 720 + 360,
                      Math.random() * 180,
                      0
                    ],
                    rotateZ: [
                      Math.random() * 360,
                      Math.random() * 360 + 180,
                      Math.random() * 90,
                      0
                    ],
                    scale: [0.3, 1.2, 0.9, 1],    // Bounce effect on landing
                    opacity: [0.8, 1, 1, 1]
                  }}
                  transition={{ 
                    duration: 1.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index * 0.3,
                    times: [0, 0.4, 0.8, 1]        // Control timing of keyframes
                  }}
                >
                  {/* Premium 3D Dice */}
                  <div
                    className="relative transform-gpu"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    {/* Dice Shadow */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-6 sm:w-16 sm:h-8 bg-black/40 rounded-full blur-lg" />
                    
                    <PremiumDice
                      values={[
                        ((index % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
                        (((index + 1) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
                        (((index + 2) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
                        (((index + 3) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
                        (((index + 4) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
                        (((index + 5) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6
                      ]}
                      size="large"
                      className="drop-shadow-2xl"
                      style={{
                        filter: `drop-shadow(0 0 20px #D9B45B40) drop-shadow(0 8px 32px rgba(0,0,0,0.4))`
                      }}
                    />

                    {/* Feature Icon Overlay */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl pointer-events-none"
                      style={{
                        textShadow: '0 0 8px rgba(0,0,0,0.8), 0 0 16px rgba(217, 180, 91, 0.6)',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        zIndex: 10
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {dice.icon}
                    </motion.div>
                  </div>

                  {/* Card Info Below Dice (Desktop) */}
                  <motion.div 
                    className="mt-3 sm:mt-4 text-center max-w-[120px] sm:max-w-[140px] md:max-w-[160px] hidden sm:block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                  >
                    <h3 className="text-[#D9B45B] font-bold text-xs sm:text-sm md:text-base mb-1 leading-tight">
                      {dice.title}
                    </h3>
                    <p className="text-[#A6B0BF] text-xs leading-relaxed">
                      {dice.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}

              {/* Rolling Animation */}
              {rollingIndex >= 0 && (
                <motion.div
                  className="relative transform-gpu"
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    rotateZ: [0, 360],
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "linear",
                    repeat: Infinity
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  {/* Rolling Dice Shadow */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-black/40 rounded-full blur-lg" />
                  
                  <PremiumDice
                    values={[1, 2, 3, 4, 5, 6]}
                    size="large"
                    className="drop-shadow-2xl"
                    style={{
                      filter: `drop-shadow(0 0 20px #D9B45B60) drop-shadow(0 8px 32px rgba(0,0,0,0.4))`
                    }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Info Cards (appear below table) */}
        <div className="sm:hidden mt-4 space-y-3">
          {rolledDice.map((dice, index) => (
            <motion.div
              key={`mobile-${gameId}-${dice.id}`}
              className="p-3 rounded-xl border backdrop-blur-sm"
              style={{ 
                borderColor: '#D9B45B40',
                backgroundColor: '#D9B45B10'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{dice.icon}</div>
                <div>
                  <h3 className="text-[#D9B45B] font-bold text-sm">{dice.title}</h3>
                  <p className="text-[#A6B0BF] text-xs leading-relaxed">{dice.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});
