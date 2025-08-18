"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { CasinoBackground } from "@/components/ui/casino-background";
import { PremiumBlackjackGame, BlackjackCard } from "@/components/ui/premium-blackjack-game";

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
  const [isDealing, setIsDealing] = useState(false);

  // Transform features into blackjack cards that add up to 21
  const blackjackCards: BlackjackCard[] = content.features.map((feature, index) => ({
    id: index,
    title: feature.title,
    description: feature.description,
    suit: index === 0 ? '♠' : index === 1 ? '♥' : '♦', // Spades, Hearts, Diamonds
    rank: index === 0 ? 'A' : index === 1 ? 'K' : 'Q', // Ace, King, Queen
    value: index === 0 ? 11 : index === 1 ? 5 : 5, // 11 + 5 + 5 = 21 (Blackjack!)
    color: index === 0 ? 'text-gray-800' : index === 1 ? 'text-red-600' : 'text-red-600'
  }));

  const handleDeal = () => {
    if (isDealing) return;
    setIsDealing(true);
    
    // Reset dealing state after all cards are dealt
    setTimeout(() => {
      setIsDealing(false);
    }, blackjackCards.length * 1500 + 2000); // Total dealing time + buffer
  };

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
              What it <span className="text-[#D9B45B]">is</span>
            </h2>
            <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-8">
              Watch the dealer reveal each innovation card to build the perfect hand - three cards that add up to <span className="text-[#00E28A]">21 (Blackjack!)</span>
            </p>
            
            {/* Deal Controls */}
            <div className="flex items-center justify-center gap-6">
              {/* Deal Status */}
              <motion.div 
                className="inline-flex items-center gap-4 px-6 py-3 rounded-full border-2 border-[#D9B45B]/30 bg-gradient-to-r from-[#D9B45B]/10 to-[#D9B45B]/5 backdrop-blur-sm"
                animate={{ 
                  opacity: isDealing ? [1, 0.7, 1] : 1,
                  scale: isDealing ? [1, 1.05, 1] : 1
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: isDealing ? Infinity : 0 
                }}
              >
                <div className="text-2xl">
                  {isDealing ? '🃏' : '🎯'}
                </div>
                <div className="text-center">
                  <div className="text-[#D9B45B] font-bold text-sm">
                    {isDealing ? 'DEALING...' : 'READY TO DEAL'}
                  </div>
                  <div className="text-[#A6B0BF] text-xs">
                    {isDealing ? 'Cards in motion' : 'Discover innovations'}
                  </div>
                </div>
                <div className="text-2xl">
                  {isDealing ? '🃏' : '💎'}
                </div>
              </motion.div>
            
              <motion.button
                onClick={handleDeal}
                disabled={isDealing}
                className="px-8 py-4 bg-gradient-to-r from-[#D9B45B] to-[#B8860B] rounded-2xl text-black font-bold text-lg shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: isDealing ? [-100, 300] : -100 }}
                  transition={{ duration: 1.5, repeat: isDealing ? Infinity : 0 }}
                />
                
                <div className="relative flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: isDealing ? 360 : 0 }}
                    transition={{ duration: 0.5, repeat: isDealing ? Infinity : 0, ease: "linear" }}
                  >
                    🃏
                  </motion.div>
                  <span>{isDealing ? "DEALING..." : "DEAL THE CARDS"}</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Premium Blackjack Game */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PremiumBlackjackGame
              cards={blackjackCards}
              isDealing={isDealing}
              onDeal={handleDeal}
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}