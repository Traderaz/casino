"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { content } from "@/lib/content";
import { CasinoBackground } from "@/components/ui/casino-background";

const featureIcons = {
  spark: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-casino-green">
      {/* Casino chip icon */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  trend: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-casino-gold">
      {/* Dice icon */}
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="7" cy="7" r="1" fill="currentColor"/>
      <circle cx="17" cy="17" r="1" fill="currentColor"/>
      <circle cx="15" cy="15" r="1" fill="currentColor"/>
      <circle cx="19" cy="19" r="1" fill="currentColor"/>
      <path d="M12 3L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  swords: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-casino-red">
      {/* Playing cards icon */}
      <rect x="3" y="5" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="8" y="3" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M7 9h2M7 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7h2M12 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
};

export function Features() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const flipCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const flipAllCards = () => {
    if (flippedCards.length === 3) {
      setFlippedCards([]);
    } else {
      setFlippedCards([0, 1, 2]);
    }
  };

  // Card suits and colors for each feature
  const cardData = [
    { suit: '♠', color: 'text-casino-green', rank: 'A' },
    { suit: '♦', color: 'text-casino-red', rank: 'K' }, 
    { suit: '♥', color: 'text-casino-red', rank: 'Q' }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.12} />
      
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
              What it <span className="text-casino-gold">is</span>
            </h2>
            <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-8">
              Three core innovations that make <span className="text-casino-green">lossless gaming</span> possible
            </p>
            <button
              onClick={flipAllCards}
              className="px-6 py-3 bg-gradient-to-r from-casino-green to-emerald-600 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {flippedCards.length === 3 ? 'Hide Cards' : 'Reveal Cards'}
            </button>
          </motion.div>

          {/* Playing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {content.features.map((feature, index) => {
              const card = cardData[index];
              const isFlipped = flippedCards.includes(index);
              
              return (
                <motion.div
                  key={index}
                  className="relative h-80 cursor-pointer"
                  style={{ perspective: '1000px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut",
                    delay: index * 0.2
                  }}
                  onClick={() => flipCard(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Card Container */}
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Card Back */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-2xl border-2 border-white/20 shadow-2xl"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #1a1d29 0%, #0f1117 100%)'
                      }}
                    >
                      <div className="relative w-full h-full p-6 flex flex-col items-center justify-center">
                        {/* Card Back Pattern */}
                        <div className="absolute inset-4 border-2 border-casino-gold/30 rounded-xl"></div>
                        <div className="absolute inset-6 border border-casino-gold/20 rounded-lg"></div>
                        
                        {/* Center Logo */}
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-casino-gold to-yellow-600 flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-black">LC</span>
                          </div>
                          <p className="text-casino-gold text-sm font-semibold tracking-wider">
                            LOSSLESS CASINO
                          </p>
                        </div>
                        
                        {/* Corner decorations */}
                        <div className="absolute top-4 left-4 text-casino-gold/40 text-xs">♠</div>
                        <div className="absolute top-4 right-4 text-casino-red/40 text-xs">♥</div>
                        <div className="absolute bottom-4 left-4 text-casino-red/40 text-xs">♦</div>
                        <div className="absolute bottom-4 right-4 text-casino-green/40 text-xs">♣</div>
                      </div>
                    </div>

                    {/* Card Front */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-white rounded-2xl border-2 border-gray-300 shadow-2xl"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="relative w-full h-full p-6">
                        {/* Card Rank and Suit - Top Left */}
                        <div className="absolute top-4 left-4 text-center">
                          <div className={`text-2xl font-bold ${card.color}`}>
                            {card.rank}
                          </div>
                          <div className={`text-xl ${card.color}`}>
                            {card.suit}
                          </div>
                        </div>
                        
                        {/* Card Rank and Suit - Bottom Right (rotated) */}
                        <div className="absolute bottom-4 right-4 text-center transform rotate-180">
                          <div className={`text-2xl font-bold ${card.color}`}>
                            {card.rank}
                          </div>
                          <div className={`text-xl ${card.color}`}>
                            {card.suit}
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                          {/* Large center suit */}
                          <div className={`text-6xl mb-4 ${card.color}`}>
                            {card.suit}
                          </div>
                          
                          {/* Feature content */}
                          <h3 className="text-lg font-bold text-gray-800 mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}