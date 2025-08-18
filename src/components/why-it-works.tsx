"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CasinoBackground } from "@/components/ui/casino-background";
import { PremiumSlotMachine, SlotSymbol } from "@/components/ui/premium-slot-machine";

// Why It Works - Real content that cycles through the slot machine
const whyItWorksPoints = [
  {
    title: "Lossless Entry",
    icon: "🛡️",
    description: "Users never lose their principal — only yield is risked. Removes the biggest psychological barrier: fear of losing your stack."
  },
  {
    title: "Constant Jackpot Flow", 
    icon: "🔄",
    description: "Unlike traditional casinos, jackpots refill automatically from yield farming. No need to mint endless tokens to fund prizes."
  },
  {
    title: "Positive-Sum Casino",
    icon: "📈", 
    description: "Normal casinos are negative-sum (house always wins). Here, the 'house' grows alongside players via fees + treasury scaling."
  },
  {
    title: "Treasury Growth",
    icon: "🏛️",
    description: "Treasury compounds yield, increasing jackpot size + runway. The bigger the treasury, the more attractive jackpots become."
  },
  {
    title: "Degenerate Upside",
    icon: "🎰",
    description: "Players still get the dopamine of slots/roulette/jackpots. But their capital base is untouched — 'degen without regret.'"
  },
  {
    title: "Sticky TVL",
    icon: "🔒",
    description: "Once funds are deposited, there's little reason to withdraw. Users are constantly eligible for jackpots as long as funds stay locked."
  },
  {
    title: "Infinite Narratives",
    icon: "🎭",
    description: "'The first casino you can't lose at.' 'House edge? No — house flywheel.' This storytelling fuels community + meme virality."
  },
  {
    title: "Cross-Chain Growth",
    icon: "🌐",
    description: "Start on Solana. Later → expand to ETH L2s, Sui, Aptos. Each chain = new liquidity base, new jackpot pools."
  },
  {
    title: "Insurance Vault",
    icon: "🛡️",
    description: "Treasury-backed protection fund ensures solvency. Proves seriousness to investors + degens alike. 'Safer than Vegas, powered by DeFi.'"
  },
  {
    title: "Addictive Yet Safe",
    icon: "♻️",
    description: "Casinos thrive on addictive gameplay. Here, you get the same loop without liquidation risk. Users feel the high, keep their stack."
  }
];

// Normal slot machine symbols for spinning and jackpot
const whyItWorksSymbols: SlotSymbol[][] = [
  // Reel 1 - Security & Protection symbols
  [
    { type: 'chip', color: 'blue', value: '1' },
    { type: 'icon', icon: '🛡️' },
    { type: 'dice', value: '1' },
    { type: 'chip', color: 'green', value: '2' },
    { type: 'icon', icon: '🔒' },
    { type: 'dice', value: '2' },
    { type: 'icon', icon: '💎' },
  ],
  // Reel 2 - Yield & Returns symbols
  [
    { type: 'chip', color: 'gold', value: '3' },
    { type: 'icon', icon: '📈' },
    { type: 'dice', value: '3' },
    { type: 'chip', color: 'purple', value: '4' },
    { type: 'icon', icon: '⚡' },
    { type: 'dice', value: '4' },
    { type: 'icon', icon: '🎯' },
  ],
  // Reel 3 - Games & Risk symbols
  [
    { type: 'chip', color: 'red', value: '5' },
    { type: 'icon', icon: '🎰' },
    { type: 'dice', value: '5' },
    { type: 'chip', color: 'blue', value: '6' },
    { type: 'icon', icon: '🎲' },
    { type: 'dice', value: '1' },
    { type: 'icon', icon: '🏆' },
  ],
  // Reel 4 - Technology & Trust symbols
  [
    { type: 'chip', color: 'green', value: '1' },
    { type: 'icon', icon: '🤖' },
    { type: 'dice', value: '2' },
    { type: 'chip', color: 'gold', value: '2' },
    { type: 'icon', icon: '🔍' },
    { type: 'dice', value: '3' },
    { type: 'icon', icon: '📊' },
  ]
];

// Jackpot combination - when all align
const jackpotResults: SlotSymbol[] = [
  { type: 'icon', icon: '👑', text: 'LOSSLESS', isJackpot: true },
  { type: 'icon', icon: '🎰', text: 'CASINO', isJackpot: true },
  { type: 'icon', icon: '💎', text: 'JACKPOT', isJackpot: true },
  { type: 'icon', icon: '🏆', text: 'WINNER', isJackpot: true }
];

export function WhyItWorks() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [currentResults, setCurrentResults] = useState<SlotSymbol[]>([
    whyItWorksSymbols[0][0],
    whyItWorksSymbols[1][0], 
    whyItWorksSymbols[2][0],
    whyItWorksSymbols[3][0]
  ]);
  const [showJackpot, setShowJackpot] = useState(false);
  const [showingContent, setShowingContent] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowJackpot(false);
    setShowingContent(false);
    
    // Step 1: Spin for 3 seconds
    setTimeout(() => {
      setIsSpinning(false);
      
      // Step 2: Always show jackpot first
      setCurrentResults(jackpotResults);
      setShowJackpot(true);
      
      // Step 3: After 3 seconds of jackpot celebration, show the educational content
      setTimeout(() => {
        const newSpinCount = spinCount + 1;
        setSpinCount(newSpinCount);
        
        // Generate 4 unique "Why It Works" points for educational content
        const shuffledPoints = [...whyItWorksPoints].sort(() => Math.random() - 0.5);
        const selectedPoints = shuffledPoints.slice(0, 4);
        const educationalResults = selectedPoints.map(point => ({ 
          type: 'text' as const, 
          icon: point.icon, 
          text: point.title,
          description: point.description
        }));
        
        setShowJackpot(false);
        setCurrentResults(educationalResults);
        setShowingContent(true);
        
        // Keep content visible for a while, then reset to normal symbols
        setTimeout(() => {
          setShowingContent(false);
          // Reset to normal slot symbols
          const normalResults = whyItWorksSymbols.map(reel => 
            reel[Math.floor(Math.random() * reel.length)]
          );
          setCurrentResults(normalResults);
        }, 8000); // Show content for 8 seconds
        
      }, 3000); // Wait 3 seconds after jackpot before showing content
      
    }, 3000); // Initial spin duration
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[#0B0D10]">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.08} />
      
      {/* Separator */}
      <div className="separator absolute top-0 left-0 right-0 z-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display-lg text-[#E9EEF5] mb-4">
            Why it <span className="text-[#D9B45B]">works</span>
          </h2>
          <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-8">
            Spin the premium 4-reel slot machine to discover why <span className="text-[#00E28A]">lossless gaming</span> is revolutionary
          </p>
          
          {/* Status indicator */}
          <motion.div 
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full border-2 border-[#D9B45B]/30 bg-gradient-to-r from-[#D9B45B]/10 to-[#D9B45B]/5 backdrop-blur-sm"
            animate={{ 
              opacity: showJackpot ? [1, 0.7, 1] : 1,
              scale: showJackpot ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              duration: 0.8, 
              repeat: showJackpot ? Infinity : 0 
            }}
          >
            <div className="text-2xl">
              {isSpinning ? '🎰' : showJackpot ? '🏆' : showingContent ? '📚' : '🎲'}
            </div>
            <div className="text-center">
              <div className="text-[#D9B45B] font-bold text-sm">
                {isSpinning ? 'SPINNING...' : 
                 showJackpot ? 'JACKPOT!' : 
                 showingContent ? 'LEARNING!' : 
                 'READY TO WIN'}
              </div>
              <div className="text-[#A6B0BF] text-xs">
                {isSpinning ? 'Reels in motion' : 
                 showJackpot ? 'Celebrating victory' : 
                 showingContent ? 'Showing benefits' : 
                 'Every spin wins!'}
              </div>
            </div>
            <div className="text-2xl">
              {isSpinning ? '🎰' : showJackpot ? '🏆' : showingContent ? '📚' : '💎'}
            </div>
          </motion.div>
        </motion.div>

        {/* Premium 4-Reel Slot Machine */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PremiumSlotMachine
            reels={whyItWorksSymbols}
            isSpinning={isSpinning}
            results={currentResults}
            onSpin={handleSpin}
            showJackpot={showJackpot}
            showingContent={showingContent}
            className="w-full"
          />
        </motion.div>

        {/* Content explanation when showing content */}
        <AnimatePresence>
          {showingContent && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="text-2xl font-bold text-[#00E28A] mb-4"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎊 Your Winning Combination Shows Why Lossless Gaming Works! 🎊
              </motion.div>
              <p className="text-[#A6B0BF] text-lg max-w-3xl mx-auto">
                Each reel displays a key benefit of our revolutionary lossless casino system
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static feature highlights when not showing content */}
        {!showingContent && !showJackpot && !isSpinning && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whyItWorksPoints.slice(0, 4).map((feature, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl border border-[#D9B45B]/20 bg-gradient-to-b from-[#D9B45B]/5 to-transparent backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1), duration: 0.4 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'rgba(217, 180, 91, 0.4)',
                    boxShadow: '0 8px 32px rgba(217, 180, 91, 0.2)'
                  }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-[#E9EEF5] font-bold mb-2">{feature.title}</h3>
                  <p className="text-[#A6B0BF] text-sm">{feature.description.split('.')[0] + '.'}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}