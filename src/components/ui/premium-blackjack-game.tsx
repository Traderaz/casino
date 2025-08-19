"use client";

import React, { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BlackjackCard {
  id: number;
  title: string;
  description: string;
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
  color: string;
}

export interface PremiumBlackjackGameProps {
  cards: BlackjackCard[];
  isDealing: boolean;
  onDeal: () => void;
  className?: string;
}

export const PremiumBlackjackGame = memo(function PremiumBlackjackGame({
  cards,
  isDealing,
  onDeal,
  className = ''
}: PremiumBlackjackGameProps) {
  const [dealtCards, setDealtCards] = useState<BlackjackCard[]>([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [dealingIndex, setDealingIndex] = useState(-1);
  const [gameId, setGameId] = useState(0);
  const dealingInProgress = useRef(false);

  useEffect(() => {
    if (isDealing && cards.length > 0 && !dealingInProgress.current) {
      dealingInProgress.current = true;
      
      // Reset state and increment game ID for unique keys
      setDealtCards([]);
      setCurrentTotal(0);
      setDealingIndex(-1);
      setGameId(prev => prev + 1);
      
      // Only deal the first 3 cards to ensure we get exactly 3
      const cardsToDeal = cards.slice(0, 3);
      
      // Deal cards one by one with delays
      cardsToDeal.forEach((card, index) => {
        setTimeout(() => {
          setDealingIndex(index);
          setTimeout(() => {
            setDealtCards(prev => {
              // Prevent duplicates by checking if card already exists
              if (prev.find(existingCard => existingCard.id === card.id)) {
                return prev;
              }
              return [...prev, card];
            });
            setCurrentTotal(prev => prev + card.value);
            setDealingIndex(-1);
            
            // Mark dealing as complete after last card
            if (index === cardsToDeal.length - 1) {
              setTimeout(() => {
                dealingInProgress.current = false;
              }, 500);
            }
          }, 800); // Card flip delay
        }, index * 1500); // Staggered dealing
      });
    }
  }, [isDealing, cards]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Blackjack Table */}
      <div className="relative w-full max-w-6xl">
        {/* Table Felt */}
        <div 
          className="w-full h-[24rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem] xl:h-[32rem] rounded-xl sm:rounded-2xl md:rounded-3xl relative overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, 
                rgba(34, 139, 34, 0.8) 0%, 
                rgba(0, 100, 0, 0.6) 40%, 
                rgba(0, 50, 0, 0.4) 80%, 
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

          {/* Card Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-end">
              {/* Deck Position */}
              <div className="relative">
                <motion.div
                  className="w-14 h-36 sm:w-16 sm:h-24 md:w-20 md:h-28 lg:w-24 lg:h-36 xl:w-28 xl:h-42 rounded-lg sm:rounded-xl border-2 border-[#D9B45B] bg-gradient-to-b from-[#1a1d29] to-[#0f1117] shadow-2xl"
                  animate={{ 
                    scale: isDealing ? [1, 1.05, 1] : 1 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    repeat: isDealing ? Infinity : 0 
                  }}
                >
                  <div className="absolute inset-1 sm:inset-2 md:inset-3 lg:inset-4 flex items-center justify-center">
                    <div className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-[#D9B45B]/60">🎰</div>
                  </div>
                </motion.div>
                <div className="text-center mt-2">
                  <span className="text-[#A6B0BF] text-xs font-semibold">DECK</span>
                </div>
              </div>

              {/* Dealt Cards */}
              <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 items-end min-h-[220px] sm:min-h-[120px] md:min-h-[150px] lg:min-h-[200px] xl:min-h-[250px]">
                <AnimatePresence>
                  {dealtCards.map((card, index) => (
                    <motion.div
                      key={`${gameId}-${card.id}`}
                      className="relative"
                      initial={{ x: -100, y: -50, rotate: -10, opacity: 0 }}
                      animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.2 
                      }}
                    >
                      {/* Card */}
                      <motion.div
                        className={`${dealtCards.length === cards.length && !isDealing 
                          ? 'w-20 h-52 sm:w-24 sm:h-36 md:w-28 md:h-42 lg:w-32 lg:h-48 xl:w-40 xl:h-60' 
                          : 'w-14 h-36 sm:w-16 sm:h-24 md:w-20 md:h-28 lg:w-24 lg:h-36 xl:w-28 xl:h-42'} 
                        rounded-md sm:rounded-lg md:rounded-xl shadow-2xl cursor-pointer transition-all duration-1000`}
                        whileHover={{ y: -10, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ perspective: '1000px' }}
                      >
                        <motion.div
                          className="relative w-full h-full"
                          style={{ transformStyle: 'preserve-3d' }}
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          {/* Card Back */}
                          <div 
                            className="absolute inset-0 w-full h-full rounded-xl border-2 border-[#D9B45B] shadow-2xl"
                            style={{ 
                              backfaceVisibility: 'hidden',
                              background: 'linear-gradient(135deg, #1a1d29 0%, #0f1117 100%)',
                              transform: 'rotateY(180deg)'
                            }}
                          >
                            <div className="absolute inset-3 border-2 border-[#D9B45B]/30 rounded-lg flex items-center justify-center">
                              <div className="text-4xl text-[#D9B45B]/60">LC</div>
                            </div>
                          </div>

                          {/* Card Front */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-white rounded-xl border-2 border-gray-300 shadow-2xl"
                            style={{ 
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(0deg)'
                            }}
                          >
                            <div className="relative w-full h-full p-1 sm:p-2 md:p-3 lg:p-4">
                              {/* Top Left */}
                              <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 md:top-2 md:left-2 lg:top-3 lg:left-3 text-center">
                                <div className={`text-xs sm:text-sm md:text-lg lg:text-xl font-bold ${card.color}`}>
                                  {card.rank}
                                </div>
                                <div className={`text-xs sm:text-xs md:text-base lg:text-lg ${card.color}`}>
                                  {card.suit}
                                </div>
                              </div>
                              
                              {/* Bottom Right (rotated) */}
                              <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 lg:bottom-3 lg:right-3 text-center transform rotate-180">
                                <div className={`text-xs sm:text-sm md:text-lg lg:text-xl font-bold ${card.color}`}>
                                  {card.rank}
                                </div>
                                <div className={`text-xs sm:text-xs md:text-base lg:text-lg ${card.color}`}>
                                  {card.suit}
                                </div>
                              </div>

                              {/* Center Content */}
                              <div className="flex flex-col items-center justify-center h-full text-center px-0.5 sm:px-1 md:px-2 lg:px-3">
                                <div className={`${dealtCards.length === cards.length && !isDealing 
                                  ? 'text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2 md:mb-3 lg:mb-4' 
                                  : 'text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-0.5 sm:mb-1 md:mb-2 lg:mb-3'} 
                                  ${card.color} transition-all duration-1000`}>
                                  {card.suit}
                                </div>
                                <h3 className={`${dealtCards.length === cards.length && !isDealing 
                                  ? 'text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2 md:mb-3 lg:mb-4' 
                                  : 'text-xs sm:text-sm mb-0.5 sm:mb-1 md:mb-2'} 
                                  font-bold text-gray-800 leading-tight transition-all duration-1000`}>
                                  {card.title}
                                </h3>
                                <p className={`${dealtCards.length === cards.length && !isDealing 
                                  ? 'text-xs sm:text-sm' 
                                  : 'text-xs'} 
                                  text-gray-600 leading-relaxed transition-all duration-1000`}>
                                  {/* Always show full description on mobile, conditional on desktop */}
                                  <span className="sm:hidden">{card.description}</span>
                                  <span className="hidden sm:inline">
                                    {dealtCards.length === cards.length && !isDealing ? card.description : card.description.split('.')[0] + '.'}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Card Label */}
                      <div className="text-center mt-2">
                        <span className="text-[#A6B0BF] text-xs font-semibold">
                          VALUE: {card.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>


              </div>
            </div>
          </div>

          {/* Total Display */}
          <AnimatePresence>
            {dealtCards.length > 0 && (
              <motion.div 
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 bg-black/70 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-[#D9B45B] backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-[#D9B45B] text-xs font-semibold mb-1">TOTAL</div>
                    <motion.div 
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white"
                      animate={{ 
                        scale: currentTotal === 21 ? [1, 1.2, 1] : 1,
                        color: currentTotal === 21 ? ['#ffffff', '#00E28A', '#ffffff'] : '#ffffff'
                      }}
                      transition={{ 
                        duration: 0.5,
                        repeat: currentTotal === 21 ? Infinity : 0
                      }}
                    >
                      {currentTotal}
                    </motion.div>
                    {currentTotal === 21 && (
                      <motion.div 
                        className="text-[#00E28A] text-xs font-bold mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        BLACKJACK!
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Celebration Message */}
      <AnimatePresence>
        {dealtCards.length === cards.length && !isDealing && (
          <motion.div 
            className="mt-4 sm:mt-6 md:mt-8 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="text-lg sm:text-xl md:text-2xl font-bold text-[#00E28A] mb-2 sm:mb-3 md:mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎊 Perfect Hand - All Innovations Revealed! 🎊
            </motion.div>
            <p className="text-[#A6B0BF] text-sm sm:text-base md:text-lg">
              Each card now shows the complete innovation details
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
