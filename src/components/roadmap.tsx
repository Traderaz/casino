"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { CasinoBackground } from "@/components/ui/casino-background";
import { PremiumPlayingCard } from "@/components/ui/premium-playing-card";
import { useState } from "react";

// Poker hand progression - building toward Royal Flush
const pokerCards = {
  0: { suit: '♠' as const, rank: 'A' as const }, // Ace of Spades - MVP
  1: { suit: '♠' as const, rank: 'K' as const }, // King of Spades - Multi-game
  2: { suit: '♠' as const, rank: 'Q' as const }, // Queen of Spades - Lossless Casino
  3: { suit: '♠' as const, rank: 'J' as const }, // Jack of Spades - Mobile & Multi-chain
};

const statusColors = {
  active: "#00E28A",
  upcoming: "#D9B45B", 
  future: "#A6B0BF"
};

export function Roadmap() {
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards(prev => [...prev, index]);
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.15} />
      
      {/* Poker Table Felt Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, 
              rgba(34, 139, 34, 0.4) 0%, 
              rgba(0, 100, 0, 0.3) 40%, 
              rgba(0, 50, 0, 0.2) 80%, 
              transparent 100%
            )
          `
        }}
      />
      
      {/* Separator */}
      <div className="separator absolute top-0 left-0 right-0 z-20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-display-lg text-[#E9EEF5] mb-4">
              The Royal Flush Roadmap
            </h2>
            <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-6">
              Building toward the ultimate hand - click each card to reveal our journey to the perfect Royal Flush
            </p>
            
            {/* Poker hand indicator */}
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-[#D9B45B] bg-gradient-to-r from-[#D9B45B]/20 to-[#D9B45B]/10 backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="text-2xl">♠</div>
              <span className="text-[#D9B45B] font-bold text-sm">ROYAL FLUSH IN SPADES</span>
              <div className="text-2xl">♠</div>
            </motion.div>
          </motion.div>

          {/* Poker Hand Layout */}
          <div className="relative">
            
            {/* Desktop poker table layout */}
            <div className="hidden lg:block">
              
              {/* Poker table felt arc */}
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] rounded-full border-4 border-[#D9B45B]/30 opacity-20"
                style={{
                  background: `
                    radial-gradient(ellipse 100% 50% at 50% 100%, 
                      rgba(34, 139, 34, 0.3) 0%, 
                      transparent 70%
                    )
                  `
                }}
              />
              
              {/* Cards arrangement in poker hand formation */}
              <div className="flex justify-center items-center gap-6 pt-8">
                {content.roadmap.phases.map((phase, index) => {
                  const card = pokerCards[index as keyof typeof pokerCards];
                  const isRevealed = revealedCards.includes(index);
                  
                  return (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20, rotateY: -90 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.2
                      }}
                    >
                      <PremiumPlayingCard
                        suit={card.suit}
                        rank={card.rank}
                        isRevealed={isRevealed}
                        onClick={() => handleCardClick(index)}
                        size="large"
                        title={phase.title}
                        description={phase.description}
                        status={phase.status as 'active' | 'upcoming' | 'future'}
                      />
                      
                      {/* Phase label below card */}
                      <motion.div 
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isRevealed ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className="text-xs font-bold px-4 py-2 rounded-full border-2 backdrop-blur-sm inline-block"
                          style={{ 
                            color: statusColors[phase.status as keyof typeof statusColors],
                            borderColor: statusColors[phase.status as keyof typeof statusColors],
                            backgroundColor: `${statusColors[phase.status as keyof typeof statusColors]}15`,
                            textShadow: `0 0 8px ${statusColors[phase.status as keyof typeof statusColors]}88`
                          }}
                        >
                          {phase.phase} • {phase.timeline}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Hand strength indicator */}
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border-2 border-[#D9B45B] bg-gradient-to-r from-[#D9B45B]/20 to-[#D9B45B]/10 backdrop-blur-sm">
                  <div className="text-3xl">👑</div>
                  <div>
                    <div className="text-[#D9B45B] font-bold text-lg">ROYAL FLUSH</div>
                    <div className="text-[#A6B0BF] text-sm">The Ultimate Casino Experience</div>
                  </div>
                  <div className="text-3xl">👑</div>
                </div>
              </motion.div>
            </div>

            {/* Mobile poker layout */}
            <div className="lg:hidden space-y-8">
              {content.roadmap.phases.map((phase, index) => {
                const card = pokerCards[index as keyof typeof pokerCards];
                const isRevealed = revealedCards.includes(index);
                
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20, rotateY: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.15
                    }}
                  >
                    <PremiumPlayingCard
                      suit={card.suit}
                      rank={card.rank}
                      isRevealed={isRevealed}
                      onClick={() => handleCardClick(index)}
                      size="medium"
                      title={phase.title}
                      description={phase.description}
                      status={phase.status as 'active' | 'upcoming' | 'future'}
                    />
                    
                    {/* Phase info below card */}
                    <motion.div 
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isRevealed ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col gap-2">
                        <div 
                          className="text-xs font-bold px-4 py-2 rounded-full border-2 backdrop-blur-sm"
                          style={{ 
                            color: statusColors[phase.status as keyof typeof statusColors],
                            borderColor: statusColors[phase.status as keyof typeof statusColors],
                            backgroundColor: `${statusColors[phase.status as keyof typeof statusColors]}15`,
                            textShadow: `0 0 8px ${statusColors[phase.status as keyof typeof statusColors]}88`
                          }}
                        >
                          {phase.phase} • {phase.timeline}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
              
              {/* Mobile hand strength indicator */}
              <motion.div 
                className="text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border-2 border-[#D9B45B] bg-gradient-to-r from-[#D9B45B]/20 to-[#D9B45B]/10 backdrop-blur-sm">
                  <div className="text-2xl">👑</div>
                  <div>
                    <div className="text-[#D9B45B] font-bold">ROYAL FLUSH</div>
                    <div className="text-[#A6B0BF] text-xs">Ultimate Experience</div>
                  </div>
                  <div className="text-2xl">👑</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}