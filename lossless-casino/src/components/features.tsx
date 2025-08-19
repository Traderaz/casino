"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { CasinoBackground } from "@/components/ui/casino-background";
import { SimpleBlackjackGame, BlackjackCard } from "@/components/ui/simple-blackjack-game";

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

  // Generate random blackjack cards that always add up to 21
  const generateRandomCards = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const colors = ['text-gray-800', 'text-red-600', 'text-red-600', 'text-gray-800'];
    
    // Possible combinations that add to 21
    const combinations = [
      [{ rank: 'A', value: 11 }, { rank: '10', value: 10 }], // Ace + 10 (natural blackjack)
      [{ rank: 'A', value: 11 }, { rank: '5', value: 5 }, { rank: '5', value: 5 }], // Ace + 5 + 5
      [{ rank: 'A', value: 11 }, { rank: '4', value: 4 }, { rank: '6', value: 6 }], // Ace + 4 + 6
      [{ rank: 'A', value: 11 }, { rank: '3', value: 3 }, { rank: '7', value: 7 }], // Ace + 3 + 7
      [{ rank: 'A', value: 11 }, { rank: '2', value: 2 }, { rank: '8', value: 8 }], // Ace + 2 + 8
      [{ rank: '7', value: 7 }, { rank: '7', value: 7 }, { rank: '7', value: 7 }], // Triple 7s
      [{ rank: '10', value: 10 }, { rank: '6', value: 6 }, { rank: '5', value: 5 }], // 10 + 6 + 5
      [{ rank: '9', value: 9 }, { rank: '6', value: 6 }, { rank: '6', value: 6 }], // 9 + 6 + 6
      [{ rank: '8', value: 8 }, { rank: '7', value: 7 }, { rank: '6', value: 6 }], // 8 + 7 + 6
    ];
    
    // Pick a random combination
    const randomCombination = combinations[Math.floor(Math.random() * combinations.length)];
    
    // Assign random suits and create cards
    return randomCombination.map((card, index) => {
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      const suitIndex = suits.indexOf(randomSuit);
      
      return {
        id: index,
        title: content.features[index % content.features.length].title,
        description: content.features[index % content.features.length].description,
        suit: randomSuit as '♠' | '♥' | '♦' | '♣',
        rank: card.rank,
        value: card.value,
        color: colors[suitIndex]
      };
    });
  };

  const [blackjackCards, setBlackjackCards] = useState<BlackjackCard[]>([]);

  const handleDeal = () => {
    if (isDealing) return;
    setIsDealing(true);
    
    // Generate new random cards that add to 21
    setBlackjackCards(generateRandomCards());
    
    // Reset after dealing animation completes
    setTimeout(() => {
      setIsDealing(false);
    }, 4000); // Cards dealing animation duration + buffer
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
              Watch the dealer reveal each innovation card to build the perfect hand - two or more cards that add up to <span className="text-[#00E28A]">21 (Blackjack)</span>
            </p>
            
            {/* Deal Controls */}
            <div className="flex flex-col items-center justify-center gap-4 px-4">
              {/* Deal Status */}
              <motion.div 
                className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full border-2 border-[#D9B45B]/30 bg-gradient-to-r from-[#D9B45B]/10 to-[#D9B45B]/5 backdrop-blur-sm"
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
                  <div className="text-[#D9B45B] font-bold text-xs sm:text-sm">
                    {isDealing ? 'DEALING...' : 'READY TO DEAL'}
                  </div>
                  <div className="text-[#A6B0BF] text-xs hidden sm:block">
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
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-[#D9B45B] to-[#B8860B] rounded-lg sm:rounded-xl md:rounded-2xl text-black font-bold text-sm sm:text-base md:text-lg shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: isDealing ? [-100, 300] : -100 }}
                  transition={{ duration: 1.5, repeat: isDealing ? Infinity : 0 }}
                />
                
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <motion.div
                    animate={{ rotate: isDealing ? 360 : 0 }}
                    transition={{ duration: 0.5, repeat: isDealing ? Infinity : 0, ease: "linear" }}
                  >
                    🃏
                  </motion.div>
                  <span className="whitespace-nowrap">{isDealing ? "DEALING..." : "DEAL THE CARDS"}</span>
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
            <SimpleBlackjackGame
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