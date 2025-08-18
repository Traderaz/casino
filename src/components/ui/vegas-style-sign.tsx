"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function VegasStyleSign() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="relative mx-auto mb-16"
      style={{ width: '600px', height: '280px' }}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Professional Vegas-inspired sign */}
      <div className="relative w-full h-full">
        
        {/* Premium decorative elements above the sign */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
          {/* Left ornamental element */}
          <motion.div
            className="w-16 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.8) 50%, transparent 100%)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)'
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Center crown/diamond icon */}
          <motion.div
            className="w-8 h-8 relative"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div
              style={{
                clipPath: 'polygon(50% 0%, 80% 35%, 100% 35%, 75% 100%, 25% 100%, 0% 35%, 20% 35%)',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
                width: '100%',
                height: '100%'
              }}
            />
          </motion.div>
          
          {/* Right ornamental element */}
          <motion.div
            className="w-16 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.8) 50%, transparent 100%)',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)'
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>

        {/* Main sign background with premium glass effect */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 rounded-3xl relative overflow-hidden backdrop-blur-xl"
          style={{
            width: '520px',
            height: '220px',
            background: `
              linear-gradient(135deg, 
                rgba(15, 23, 42, 0.95) 0%,
                rgba(30, 41, 59, 0.95) 30%,
                rgba(15, 23, 42, 0.95) 70%,
                rgba(0, 0, 0, 0.98) 100%
              )
            `,
            border: '3px solid rgba(255, 215, 0, 0.4)',
            boxShadow: `
              0 30px 60px rgba(0, 0, 0, 0.6),
              0 0 0 1px rgba(255, 255, 255, 0.08),
              inset 0 2px 0 rgba(255, 255, 255, 0.15),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 215, 0, 0.2)
            `
          }}
        >
          {/* Subtle accent lights - minimal and elegant */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`accent-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), rgba(255, 215, 0, 0.2))',
                left: `${15 + (i * 14)}%`,
                top: '8px',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)'
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Bottom accent lights */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`bottom-accent-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), rgba(255, 215, 0, 0.2))',
                left: `${15 + (i * 14)}%`,
                bottom: '8px',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)'
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.5 + 1.5,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Professional typography layout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            
            {/* "WELCOME TO" - subtle and elegant */}
            <div className="mb-2">
              <span 
                className="text-white/70 font-medium tracking-[0.3em] uppercase"
                style={{ 
                  fontSize: '12px',
                  fontFamily: 'var(--font-inter)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Welcome to
              </span>
            </div>
            
            {/* Main brand text */}
            <div className="flex items-center gap-4 mb-2">
              {/* "LOSSLESS" */}
              <motion.div
                animate={{
                  textShadow: [
                    '0 0 20px rgba(220, 38, 38, 0.4)',
                    '0 0 30px rgba(220, 38, 38, 0.6)',
                    '0 0 20px rgba(220, 38, 38, 0.4)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span 
                  className="font-bold tracking-wider text-white"
                  style={{ 
                    fontSize: '48px',
                    fontFamily: 'var(--font-space-grotesk)',
                    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #DC2626 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 20px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  LOSSLESS
                </span>
              </motion.div>
              
              {/* "CASINO" */}
              <motion.div
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0, 179, 102, 0.4)',
                    '0 0 30px rgba(0, 179, 102, 0.6)',
                    '0 0 20px rgba(0, 179, 102, 0.4)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <span 
                  className="font-bold tracking-wider text-white"
                  style={{ 
                    fontSize: '48px',
                    fontFamily: 'var(--font-space-grotesk)',
                    background: 'linear-gradient(135deg, #00B366 0%, #10B981 50%, #00B366 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 20px rgba(0, 179, 102, 0.4)'
                  }}
                >
                  CASINO
                </span>
              </motion.div>
            </div>

            {/* "SOLANA" - sophisticated subtitle */}
            <div>
              <span 
                className="text-casino-gold/80 font-medium tracking-[0.4em] uppercase"
                style={{ 
                  fontSize: '11px',
                  fontFamily: 'var(--font-inter)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Powered by Solana
              </span>
            </div>
          </div>

          {/* Premium corner accents with enhanced glow */}
          <motion.div 
            className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-casino-gold/40 rounded-tl-lg"
            animate={{
              borderColor: [
                'rgba(255, 215, 0, 0.4)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(255, 215, 0, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-casino-gold/40 rounded-tr-lg"
            animate={{
              borderColor: [
                'rgba(255, 215, 0, 0.4)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(255, 215, 0, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-casino-gold/40 rounded-bl-lg"
            animate={{
              borderColor: [
                'rgba(255, 215, 0, 0.4)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(255, 215, 0, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.div 
            className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-casino-gold/40 rounded-br-lg"
            animate={{
              borderColor: [
                'rgba(255, 215, 0, 0.4)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(255, 215, 0, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.25 }}
          />

          {/* Side accent beams */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-16 rounded-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-16 rounded-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.25
            }}
          />
        </div>

        {/* Hanging Dice - Premium 3D effect */}
        {[0, 1, 2].map((diceIndex) => {
          const positions = [
            { left: '15%', delay: 0 },
            { left: '50%', delay: 0.5 },
            { left: '85%', delay: 1 }
          ];
          const pos = positions[diceIndex];
          
          return (
            <div key={`hanging-dice-${diceIndex}`} className="absolute" style={{ left: pos.left, top: '240px' }}>
              {/* Chain/String */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0.4) 100%)',
                  boxShadow: '0 0 4px rgba(255, 215, 0, 0.3)',
                  top: '-32px'
                }}
                animate={{
                  scaleY: [1, 1.1, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 2 + (diceIndex * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay
                }}
              />
              
              {/* 3D Dice */}
              <motion.div
                className="relative"
                style={{
                  width: '24px',
                  height: '24px',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  y: [0, -4, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotateX: { duration: 8 + (diceIndex * 2), repeat: Infinity, ease: "linear" },
                  rotateY: { duration: 6 + (diceIndex * 1.5), repeat: Infinity, ease: "linear" },
                  y: { duration: 2 + (diceIndex * 0.5), repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: pos.delay }
                }}
              >
                {/* Dice faces */}
                {[
                  { face: 'front', transform: 'rotateY(0deg) translateZ(12px)', dots: 1 },
                  { face: 'back', transform: 'rotateY(180deg) translateZ(12px)', dots: 6 },
                  { face: 'right', transform: 'rotateY(90deg) translateZ(12px)', dots: 2 },
                  { face: 'left', transform: 'rotateY(-90deg) translateZ(12px)', dots: 5 },
                  { face: 'top', transform: 'rotateX(90deg) translateZ(12px)', dots: 3 },
                  { face: 'bottom', transform: 'rotateX(-90deg) translateZ(12px)', dots: 4 }
                ].map(({ face, transform, dots }) => (
                  <div
                    key={face}
                    className="absolute w-6 h-6 flex items-center justify-center text-white font-bold rounded-sm"
                    style={{
                      transform,
                      background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 0 8px rgba(255, 215, 0, 0.2)',
                      fontSize: '8px'
                    }}
                  >
                    {/* Dice dots pattern */}
                    <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
                      {Array.from({ length: 9 }, (_, i) => {
                        const dotPatterns = {
                          1: [4],
                          2: [0, 8],
                          3: [0, 4, 8],
                          4: [0, 2, 6, 8],
                          5: [0, 2, 4, 6, 8],
                          6: [0, 1, 2, 6, 7, 8]
                        };
                        const pattern = dotPatterns[dots as keyof typeof dotPatterns] || [];
                        return pattern.includes(i) ? (
                          <div
                            key={i}
                            className="w-1 h-1 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, #FFD700, #FFA500)',
                              boxShadow: '0 0 2px rgba(255, 215, 0, 0.6)'
                            }}
                          />
                        ) : (
                          <div key={i} />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}

        {/* Premium bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-1 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.8) 20%, rgba(255, 215, 0, 1) 50%, rgba(255, 215, 0, 0.8) 80%, transparent 100%)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 -5px 20px rgba(255, 215, 0, 0.3)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scaleX: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
