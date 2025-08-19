"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo, useRef } from "react";

export interface BlackjackCard {
  id: number;
  title: string;
  description: string;
  suit: '♠' | '♥' | '♦' | '♣';
  rank: string;
  value: number;
  color: string;
}

export interface SimpleBlackjackGameProps {
  cards: BlackjackCard[];
  isDealing: boolean;
  onDeal: () => void;
  className?: string;
}

export const SimpleBlackjackGame = memo(function SimpleBlackjackGame({
  cards,
  isDealing,
  onDeal,
  className = ''
}: SimpleBlackjackGameProps) {
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
      
      // Deal cards one by one with delays
      const cardsToDeal = cards.slice(0, 3);
      cardsToDeal.forEach((card, index) => {
        setTimeout(() => {
          setDealingIndex(index);
          setTimeout(() => {
            setDealtCards(prev => {
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
        }, index * 1200); // Staggered dealing
      });
    }
  }, [isDealing, cards]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Bigger Blackjack Table */}
      <div className="relative w-full max-w-7xl">
        {/* Enhanced Table Felt */}
        <div 
          className="w-full h-[32rem] sm:h-[36rem] md:h-[40rem] lg:h-[44rem] xl:h-[48rem] rounded-2xl sm:rounded-3xl md:rounded-3xl relative overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% 50%, 
                rgba(34, 139, 34, 0.95) 0%, 
                rgba(0, 120, 0, 0.8) 25%, 
                rgba(0, 100, 0, 0.6) 50%, 
                rgba(0, 80, 0, 0.4) 75%, 
                rgba(0, 0, 0, 0.9) 100%
              )
            `,
            boxShadow: `
              0 30px 100px rgba(0, 0, 0, 0.9),
              inset 0 8px 16px rgba(255, 255, 255, 0.2),
              inset 0 -8px 16px rgba(0, 0, 0, 0.7),
              0 0 0 4px rgba(212, 175, 55, 0.4),
              0 0 40px rgba(212, 175, 55, 0.2)
            `
          }}
        >
          {/* Enhanced Table Border */}
          <div className="absolute inset-3 sm:inset-4 md:inset-6 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-[#D9B45B] opacity-40" />
          
          {/* Dealer Area Label */}
          <div className="absolute top-4 sm:top-6 md:top-8 lg:top-12 left-1/2 transform -translate-x-1/2">
            <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-black/60 rounded-full border-2 border-[#D9B45B]/60 backdrop-blur-sm">
              <span className="text-[#D9B45B] font-bold text-sm sm:text-base md:text-lg">LOSSLESS CASINO</span>
            </div>
          </div>

          {/* Card Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Deck placeholder when no cards dealt */}
            {dealtCards.length === 0 && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border-3 border-[#D9B45B] shadow-2xl flex items-center justify-center"
                  animate={{ 
                    rotateY: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  <div className="text-[#D9B45B] text-3xl sm:text-4xl font-bold">🂠</div>
                </motion.div>
                <div className="text-[#D9B45B] text-base sm:text-lg font-bold mt-4">
                  DECK
                </div>
              </motion.div>
            )}

            {/* Simple Cards in a Line */}
            <div className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 px-4">
              <AnimatePresence>
                {dealtCards.map((card, index) => (
                  <motion.div
                    key={`${gameId}-${card.id}`}
                    className="flex flex-col items-center"
                    initial={{ 
                      x: -200, 
                      y: -100, 
                      rotate: -15,
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{ 
                      x: 0, 
                      y: 0, 
                      rotate: 0,
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 1,
                      ease: [0.23, 1, 0.32, 1],
                      delay: index * 0.3
                    }}
                  >
                    {/* Simple Card with Just Number - Bigger Size */}
                    <motion.div
                      className="w-24 h-32 sm:w-36 sm:h-48 md:w-40 md:h-52 lg:w-44 lg:h-56 rounded-xl shadow-2xl cursor-pointer bg-white border-2 border-gray-200 flex flex-col items-center justify-center relative overflow-hidden"
                      whileHover={{ y: -8, scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ 
                        backgroundColor: '#ffffff',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.1)'
                      }}
                      animate={{ 
                        rotateY: dealingIndex === index ? [0, 180, 0] : 0,
                        scale: dealingIndex === index ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Card Corner Rank/Suit */}
                      <div className="absolute top-2 left-2 flex flex-col items-center">
                        <div className={`text-sm sm:text-2xl md:text-3xl font-bold ${card.color}`}>
                          {card.rank}
                        </div>
                        <div className={`text-xs sm:text-lg md:text-xl ${card.color}`}>
                          {card.suit}
                        </div>
                      </div>
                      
                      {/* Playing Card Suit Pattern - Balanced positioning */}
                      <div className="absolute top-[28%] bottom-[28%] left-[18%] right-[18%] flex items-center justify-center">
                        {/* All cards - single center suit */}
                        <div className="w-full h-full flex items-center justify-center">
                          <div className={`text-3xl sm:text-7xl md:text-8xl ${card.color}`}>{card.suit}</div>
                        </div>
                      </div>

                      {/* Bottom Corner (Upside Down) */}
                      <div className="absolute bottom-2 right-2 flex flex-col items-center rotate-180">
                        <div className={`text-sm sm:text-2xl md:text-3xl font-bold ${card.color}`}>
                          {card.rank}
                        </div>
                        <div className={`text-xs sm:text-lg md:text-xl ${card.color}`}>
                          {card.suit}
                        </div>
                      </div>

                      {/* Dealing Animation Overlay */}
                      {dealingIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#D9B45B]/20 to-transparent rounded-xl"
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 0.8, repeat: 2 }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Blackjack Total Display */}
            {dealtCards.length > 0 && (
              <motion.div
                className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <div className="px-6 py-3 bg-black/70 rounded-full border-2 border-[#D9B45B] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[#A6B0BF] text-sm font-semibold">TOTAL:</span>
                    <span className="text-[#D9B45B] text-2xl font-black">{currentTotal}</span>
                    {currentTotal === 21 && (
                      <motion.span 
                        className="text-[#00E28A] text-sm font-bold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        BLACKJACK! 🎉
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Info Tiles Below Table */}
      {dealtCards.length > 0 && (
        <motion.div
          className="mt-8 sm:mt-12 w-full max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
            {dealtCards.map((card, index) => (
              <motion.div
                key={`info-${gameId}-${card.id}`}
                className="p-4 sm:p-6 rounded-xl border border-[#D9B45B]/20 bg-gradient-to-br from-[#D9B45B]/10 to-[#D9B45B]/5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 2 + (index * 0.2), 
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(217, 180, 91, 0.4)',
                  boxShadow: '0 8px 32px rgba(217, 180, 91, 0.2)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`text-3xl sm:text-4xl font-black ${card.color} bg-white rounded-lg w-12 h-16 flex items-center justify-center shadow-lg`}>
                      {card.value}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#E9EEF5] font-bold text-sm sm:text-base mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[#A6B0BF] text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
});
