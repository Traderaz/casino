"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { CasinoBackground } from "@/components/ui/casino-background";
import { useState, useEffect, useRef } from "react";

// Simple Playing Cards Roadmap

const statusColors = {
  active: "#00E28A",
  upcoming: "#D9B45B", 
  future: "#A6B0BF"
};

// Playing card suits and values for each phase
const cardData = [
  { suit: '♠', value: 'A', color: 'text-black' }, // P1 - Ace of Spades
  { suit: '♥', value: 'K', color: 'text-red-500' }, // P2 - King of Hearts
  { suit: '♦', value: 'Q', color: 'text-red-500' }, // P3 - Queen of Diamonds
  { suit: '♣', value: 'J', color: 'text-black' }  // P4 - Jack of Clubs
];

export function Roadmap() {
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll-based card reveals
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !revealedCards.includes(index)) {
                setTimeout(() => {
                  setRevealedCards(prev => {
                    if (!prev.includes(index)) {
                      return [...prev, index];
                    }
                    return prev;
                  });
                }, index * 300); // Stagger each card by 300ms
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
          }
        );
        
        observer.observe(cardRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [revealedCards]);

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.15} />
      
      {/* Casino Table Felt Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, 
              rgba(139, 34, 34, 0.4) 0%, 
              rgba(100, 0, 0, 0.3) 40%, 
              rgba(50, 0, 0, 0.2) 80%, 
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
              Roadmap
            </h2>
            <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-6">
              Our development journey unfolds like a royal flush - each phase building toward the ultimate casino experience
            </p>
            
            {/* Casino indicator */}
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-[#D9B45B] bg-gradient-to-r from-[#D9B45B]/20 to-[#D9B45B]/10 backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="text-2xl">🃏</div>
              <span className="text-[#D9B45B] font-bold text-sm">ROYAL FLUSH ROADMAP</span>
              <div className="text-2xl">🎰</div>
            </motion.div>
          </motion.div>

          {/* Playing Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {content.roadmap.phases.map((phase, index) => {
              const isRevealed = revealedCards.includes(index);
              const card = cardData[index];
              
              return (
                <motion.div
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="flex flex-col items-center"
                >
                  {/* Playing Card */}
                  <motion.div
                    className="relative w-48 h-64 sm:w-52 sm:h-72 mb-6"
                    initial={{ rotateY: 0, scale: 0.8 }}
                    animate={{ 
                      rotateY: isRevealed ? 180 : 0, 
                      scale: isRevealed ? 1 : 0.8 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.2
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Card Back - Initially Visible */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-xl border-2 border-[#D9B45B] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F172A] shadow-2xl group-hover:shadow-[0_0_30px_rgba(217,180,91,0.3)] transition-shadow duration-300"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        background: `
                          linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F172A 100%),
                          repeating-conic-gradient(from 0deg at 50% 50%, #D9B45B 0deg 10deg, transparent 10deg 20deg)
                        `,
                        backgroundBlendMode: 'overlay'
                      }}
                    >
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl opacity-30">🎰</div>
                      </div>
                    </div>

                    {/* Card Front - Revealed on Flip */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-xl bg-white border-2 border-gray-200 shadow-2xl p-4 flex flex-col"
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        transform: 'rotateY(180deg)' 
                      }}
                    >
                      {/* Card Corner - Top Left */}
                      <div className={`absolute top-3 left-3 flex flex-col items-center ${card.color}`}>
                        <div className="text-xl font-bold">{card.value}</div>
                        <div className="text-lg">{card.suit}</div>
                      </div>

                      {/* Card Corner - Bottom Right (Rotated) */}
                      <div className={`absolute bottom-3 right-3 flex flex-col items-center rotate-180 ${card.color}`}>
                        <div className="text-xl font-bold">{card.value}</div>
                        <div className="text-lg">{card.suit}</div>
                      </div>

                      {/* Phase Information on Card */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                        {/* Phase Badge */}
                        <div className="bg-black/90 px-3 py-1 rounded-full mb-3">
                          <span className="text-white text-xs font-bold">{phase.phase}</span>
                        </div>
                        
                        {/* Phase Title */}
                        <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">{phase.title}</h3>
                        
                        {/* Phase Description */}
                        <p className="text-xs text-gray-600 mb-3 leading-tight px-1">{phase.description}</p>
                        
                        {/* Timeline and Status */}
                        <div className="flex items-center justify-between w-full px-2">
                          <span className="text-xs text-gray-500">{phase.timeline}</span>
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: statusColors[phase.status as keyof typeof statusColors] }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Royal Flush Complete */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border-2 border-[#D9B45B] bg-gradient-to-r from-[#D9B45B]/20 to-[#D9B45B]/10 backdrop-blur-sm">
              <div className="text-3xl">👑</div>
              <div>
                <div className="text-[#D9B45B] font-bold text-lg">ROYAL FLUSH</div>
                <div className="text-[#A6B0BF] text-sm">Complete Lossless Casino</div>
              </div>
              <div className="text-3xl">👑</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}